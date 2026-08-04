import type { PageServerLoad } from './$types';
import { getForumOverview } from '$lib/server/data';

export const load: PageServerLoad = async ({ locals }) => {
	let failed = false;
	let overview: Awaited<ReturnType<typeof getForumOverview>>;
	try {
		const { data, error } = await locals.supabase.rpc('category_overview');
		if (error) throw error;
		overview = (data ?? []) as Awaited<ReturnType<typeof getForumOverview>>;
	} catch (err) {
		console.error('[db] category_overview failed:', err);
		failed = true;
		overview = [];
	}

	const threadCount = overview.reduce((n, c) => n + Number(c.thread_count), 0);
	const postCount = overview.reduce((n, c) => n + Number(c.post_count), 0);

	return { overview, dbFailed: failed, threadCount, postCount };
};
