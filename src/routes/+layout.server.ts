import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession();

	let profile: App.PageData['profile'] = null;
	if (user) {
		const { data } = await locals.supabase
			.from('profiles')
			.select('id, display_name, avatar_url, is_admin, created_at')
			.eq('id', user.id)
			.maybeSingle();
		profile = data ?? null;
	}

	return { user, profile };
};
