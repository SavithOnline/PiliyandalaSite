import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getThreadDetail, getCategories } from '$lib/server/data';
import { base } from '$app/paths';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { user } = await locals.safeGetSession();
	if (!user) {
		redirect(303, `${base}/login?next=${base}/forum/edit/${params.thread}`);
	}

	const thread = await getThreadDetail(locals.supabase, params.thread);
	if (!thread) error(404, { message: 'Thread not found' });
	if (thread!.author_id !== user.id) {
		error(403, { message: 'Only the author can edit this thread.' });
	}

	const categories = await getCategories(locals.supabase);
	return { thread: thread!, categories };
};

export const actions: Actions = {
	update: async ({ locals, request, params }) => {
		const { user } = await locals.safeGetSession();
		if (!user) {
			redirect(303, `${base}/login?next=${base}/forum/edit/${params.thread}`);
		}

		const thread = await getThreadDetail(locals.supabase, params.thread);
		if (!thread) error(404, { message: 'Thread not found' });

		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		const body = String(form.get('body') ?? '').trim();

		if (thread!.author_id !== user.id) {
			return fail(403, { error: 'Only the author can edit this thread.', title, body });
		}

		if (title.length < 3 || title.length > 200) {
			return fail(400, { error: 'The title must be between 3 and 200 characters.', title, body });
		}
		if (body.length < 1 || body.length > 20000) {
			return fail(400, { error: 'The first post must be between 1 and 20,000 characters.', title, body });
		}

		const { error: err } = await locals.supabase
			.from('threads')
			.update({ title, body })
			.eq('id', thread!.id);
		if (err) {
			return fail(500, { error: 'Could not save changes. Please try again.', title, body });
		}

		redirect(303, `${base}/forum/t/${thread!.id}`);
	}
};
