import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { base } from '$app/paths';

const ACCOUNT_PATH = `${base}/account`;

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) {
		redirect(303, `${base}/login?next=${encodeURIComponent(ACCOUNT_PATH)}`);
	}

	return {};
};

export const actions: Actions = {
	updateName: async ({ locals, request }) => {
		const { user } = await locals.safeGetSession();
		if (!user) {
			redirect(303, `${base}/login?next=${encodeURIComponent(ACCOUNT_PATH)}`);
		}

		const form = await request.formData();
		const displayName = String(form.get('display_name') ?? '')
			.trim()
			.replace(/\s+/g, ' ');

		if (displayName.length < 2 || displayName.length > 40) {
			return fail(400, {
				error: 'Your name must be between 2 and 40 characters.',
				displayName
			});
		}

		const { error } = await locals.supabase
			.from('profiles')
			.update({ display_name: displayName })
			.eq('id', user.id);

		if (error) {
			console.error('[account] profile update failed:', error);
			return fail(500, {
				error: 'Could not save your name. Please try again.',
				displayName
			});
		}

		return { saved: true, displayName };
	}
};
