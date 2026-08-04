import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getCategories } from '$lib/server/data';
import { base } from '$app/paths';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { user } = await locals.safeGetSession();
	if (!user) {
		redirect(303, `${base}/login?next=${base}/forum/new`);
	}

	const categories = await getCategories(locals.supabase);
	const preset = url.searchParams.get('category');
	const presetId = categories.find((c) => c.slug === preset)?.id;

	return { categories, presetId: presetId ?? undefined };
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const { user } = await locals.safeGetSession();
		if (!user) {
			redirect(303, `${base}/login?next=${base}/forum/new`);
		}

		const form = await request.formData();
		const categoryId = Number(form.get('category_id'));
		const title = String(form.get('title') ?? '').trim();
		const body = String(form.get('body') ?? '').trim();

		if (!Number.isInteger(categoryId) || categoryId <= 0) {
			return fail(400, { error: 'Please choose a category.', title, body });
		}
		if (title.length < 3 || title.length > 200) {
			return fail(400, { error: 'The title must be between 3 and 200 characters.', title, body });
		}
		if (body.length < 1 || body.length > 20000) {
			return fail(400, { error: 'The first post must be between 1 and 20,000 characters.', title, body });
		}

		const { data, error } = await locals.supabase
			.from('threads')
			.insert({ category_id: categoryId, author_id: user.id, title, body })
			.select('id')
			.single();

		if (error || !data) {
			return fail(500, { error: 'Could not create the thread. Please try again.', title, body });
		}

		redirect(303, `${base}/forum/t/${data.id}`);
	}
};
