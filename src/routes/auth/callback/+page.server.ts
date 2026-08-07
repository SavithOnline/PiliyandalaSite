import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { base } from '$app/paths';
import { safeNextPath } from '$lib/server/auth';

const AUTH_NEXT_COOKIE = 'piliyandala-auth-next';
const AUTH_CALLBACK_PATH = `${base}/auth/callback`;

export const load: PageServerLoad = async ({ cookies, locals, url }) => {
	const code = url.searchParams.get('code');
	const tokenHash = url.searchParams.get('token_hash');
	const next = safeNextPath(url.searchParams.get('next') ?? cookies.get(AUTH_NEXT_COOKIE));
	cookies.delete(AUTH_NEXT_COOKIE, { path: AUTH_CALLBACK_PATH });

	// Token-hash links do not depend on the browser that requested the email.
	// This is the preferred mobile-safe flow used by our Supabase email template.
	if (tokenHash) {
		const { error } = await locals.supabase.auth.verifyOtp({
			token_hash: tokenHash,
			type: 'email'
		});
		if (!error) {
			redirect(303, next);
		}
		console.error('[auth] verifyOtp failed:', error);
		redirect(303, `${base}/login?error=${encodeURIComponent('The sign-in link was invalid or has expired. Please request a new one.')}`);
	}

	// Continue accepting existing PKCE links. These must be opened in the same
	// browser that requested them because that browser owns the code verifier.
	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			redirect(303, next);
		}
		console.error('[auth] exchangeCodeForSession failed:', error);
		redirect(
			303,
			`${base}/login?error=${encodeURIComponent('This older sign-in link must be opened in the same browser that requested it, or it may have expired. Please request a new link.')}`
		);
	}

	// Implicit-flow session tokens arrive in the URL fragment, which is only
	// visible to the browser. Render the callback page so it can store them.
	return { next };
};
