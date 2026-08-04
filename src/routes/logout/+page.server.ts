import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { base } from '$app/paths';

export const load: PageServerLoad = async () => {
	redirect(307, `${base}/`);
};

export const actions: Actions = {
	signout: async ({ locals }) => {
		const { error } = await locals.supabase.auth.signOut();
		if (error) {
			console.error('[auth] signOut failed:', error);
		}
		redirect(303, `${base}/`);
	}
};
