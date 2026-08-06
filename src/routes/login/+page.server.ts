import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { base } from '$app/paths';
import { safeNextPath } from '$lib/server/auth';

const AUTH_NEXT_COOKIE = 'piliyandala-auth-next';
const AUTH_CALLBACK_PATH = `${base}/auth/callback`;
const PUBLIC_SITE_ORIGIN = 'https://savith.online';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { user } = await locals.safeGetSession();
	const next = safeNextPath(url.searchParams.get('next'));
	if (user) {
		redirect(303, next);
	}

	const errorMessage = url.searchParams.get('error');
	return { errorMessage, next };
};

export const actions: Actions = {
	signin: async ({ cookies, locals, request, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim().toLowerCase();
		const next = safeNextPath(String(form.get('next') ?? ''));

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', email, next });
		}

		// The magic-link callback must use the public-facing origin — when
		// accessed through savith.online this is savith.online, otherwise the
		// direct deployment origin.
		const requestOrigin = request.headers.get('origin');
		const origin = requestOrigin === PUBLIC_SITE_ORIGIN ? PUBLIC_SITE_ORIGIN : url.origin;
		const emailRedirectTo = `${origin}${AUTH_CALLBACK_PATH}`;

		// PKCE magic links must be completed in the same browser, so a short-lived,
		// HTTP-only cookie is also the safest place to preserve the destination.
		cookies.set(AUTH_NEXT_COOKIE, next, {
			httpOnly: true,
			maxAge: 10 * 60,
			path: AUTH_CALLBACK_PATH,
			sameSite: 'lax',
			secure: url.protocol === 'https:'
		});

		const { error } = await locals.supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo,
				shouldCreateUser: true
			}
		});

		if (error) {
			cookies.delete(AUTH_NEXT_COOKIE, { path: AUTH_CALLBACK_PATH });
			console.error('[auth] signInWithOtp failed:', error);
			return fail(500, {
				error:
					'Could not send the sign-in link. Please try again — if this keeps happening, the auth service may be misconfigured.',
				email,
				next
			});
		}

		return { sent: true, email, next };
	}
};
