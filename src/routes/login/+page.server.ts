import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { base } from '$app/paths';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { user } = await locals.safeGetSession();
	if (user) {
		const next = url.searchParams.get('next');
		redirect(303, next?.startsWith('/') ? next : `${base}/forum`);
	}

	const errorMessage = url.searchParams.get('error');
	return { errorMessage, next: url.searchParams.get('next') ?? `${base}/forum` };
};

export const actions: Actions = {
	signin: async ({ locals, request, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim().toLowerCase();

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', email });
		}

		// The magic-link callback must use the public-facing origin — when
		// accessed through savith.online this is savith.online, otherwise the
		// direct deployment origin.
		const origin = url.origin;
		const emailRedirectTo = `${origin}${base}/auth/callback`;

		const { error } = await locals.supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo,
				shouldCreateUser: true
			}
		});

		if (error) {
			console.error('[auth] signInWithOtp failed:', error);
			return fail(500, {
				error:
					'Could not send the sign-in link. Please try again — if this keeps happening, the auth service may be misconfigured.',
				email
			});
		}

		return { sent: true, email };
	}
};
