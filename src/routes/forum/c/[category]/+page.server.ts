import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCategoryBySlug, getThreadsByCategory } from '$lib/server/data';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const category = await getCategoryBySlug(locals.supabase, params.category);
	if (!category) {
		error(404, { message: 'Category not found' });
	}

	const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
	const { threads, total, pages } = await getThreadsByCategory(locals.supabase, category.id, page);

	return { category, threads, total, pages, page };
};
