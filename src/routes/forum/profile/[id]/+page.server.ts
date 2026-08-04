import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProfile, getUserActivity } from '$lib/server/data';

export const load: PageServerLoad = async ({ locals, params }) => {
	const profile = await getProfile(locals.supabase, params.id);
	if (!profile) {
		error(404, { message: 'Profile not found' });
	}

	const { threads, posts } = await getUserActivity(locals.supabase, profile.id);
	return { profile, threads, posts };
};
