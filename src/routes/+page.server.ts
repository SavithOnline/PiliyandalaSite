import type { LayoutServerLoad } from './$types';
import { getRecentThreads, getForumOverview } from '$lib/server/data';

export const load: LayoutServerLoad = async ({ locals }) => {
	const [recentThreads, overview] = await Promise.all([
		getRecentThreads(locals.supabase, 4),
		getForumOverview(locals.supabase)
	]);

	return {
		recentThreads,
		threadCount: overview.reduce((n, c) => n + Number(c.thread_count), 0),
		postCount: overview.reduce((n, c) => n + Number(c.post_count), 0)
	};
};
