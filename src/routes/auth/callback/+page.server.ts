import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { base } from '$app/paths';
import { safeNextPath } from '$lib/server/auth';

const AUTH_NEXT_COOKIE = 'piliyandala-auth-next';
const AUTH_CALLBACK_PATH = `${base}/auth/callback`;

export const load: PageServerLoad = async ({ cookies, locals, url }) => {
	const code = url.searchParams.get('code');
	const next = safeNextPath(cookies.get(AUTH_NEXT_COOKIE));
	cookies.delete(AUTH_NEXT_COOKIE, { path: AUTH_CALLBACK_PATH });

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			redirect(303, next);
		}
		console.error('[auth] exchangeCodeForSession failed:', error);
	}

	redirect(303, `${base}/login?error=The%20sign-in%20link%20was%20invalid%20or%20has%20expired.%20Please%20try%20again.`);
};
