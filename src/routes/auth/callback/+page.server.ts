import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { base } from '$app/paths';

export const load: PageServerLoad = async ({ locals, url }) => {
	const code = url.searchParams.get('code');
	const nextParam = url.searchParams.get('next');

	// Only allow internal relative redirects to avoid open-redirect abuse.
	const next = nextParam?.startsWith('/') && !nextParam.startsWith('//') ? nextParam : `${base}/forum`;

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			redirect(303, next);
		}
		console.error('[auth] exchangeCodeForSession failed:', error);
	}

	redirect(303, `${base}/login?error=The%20sign-in%20link%20was%20invalid%20or%20has%20expired.%20Please%20try%20again.`);
};
