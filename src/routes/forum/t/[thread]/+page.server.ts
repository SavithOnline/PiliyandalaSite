import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getPosts, getThreadDetail, POSTS_PER_PAGE } from '$lib/server/data';
import { base } from '$app/paths';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const thread = await getThreadDetail(locals.supabase, params.thread);
	if (!thread) {
		error(404, { message: 'Thread not found' });
	}

	const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
	const { posts, total, pages } = await getPosts(locals.supabase, thread.id, page);

	return { thread, posts, total, pages, page };
};

export const actions: Actions = {
	reply: async ({ locals, request, params }) => {
		const { user } = await locals.safeGetSession();
		if (!user) {
			redirect(303, `${base}/login?next=${base}/forum/t/${params.thread}`);
		}

		const form = await request.formData();
		const body = String(form.get('body') ?? '').trim();
		if (body.length < 1 || body.length > 20000) {
			return fail(400, { error: 'Your reply must be between 1 and 20,000 characters.', body });
		}

		const thread = await getThreadDetail(locals.supabase, params.thread);
		if (!thread) error(404, { message: 'Thread not found' });
		if (thread!.locked) {
			return fail(403, { error: 'This thread is locked and no longer accepts replies.', body });
		}

		const { data, error: err } = await locals.supabase
			.from('posts')
			.insert({ thread_id: thread!.id, author_id: user.id, body })
			.select('id')
			.single();

		if (err) {
			return fail(500, {
				error: 'Could not post your reply. Please try again.',
				body
			});
		}

		const lastPage = Math.max(1, Math.ceil((thread!.post_count + 1) / POSTS_PER_PAGE));
		redirect(303, `${base}/forum/t/${thread!.id}?page=${lastPage}#p-${data!.id}`);
	},

	editPost: async ({ locals, request, params }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'You must be logged in.' });

		const form = await request.formData();
		const postId = String(form.get('post_id') ?? '');
		const body = String(form.get('body') ?? '').trim();

		if (body.length < 1 || body.length > 20000) {
			return fail(400, { error: 'The post body must be between 1 and 20,000 characters.' });
		}

		const { data: existing, error: fetchErr } = await locals.supabase
			.from('posts')
			.select('id, author_id')
			.eq('id', postId)
			.maybeSingle();
		if (fetchErr || !existing) return fail(404, { error: 'Post not found.' });
		if (existing.author_id !== user.id) return fail(403, { error: 'Not your post.' });

		const { error: err } = await locals.supabase
			.from('posts')
			.update({ body, edited_at: new Date().toISOString() })
			.eq('id', postId);
		if (err) return fail(500, { error: 'Could not save your edit. Please try again.' });

		redirect(303, `${base}/forum/t/${params.thread}#p-${postId}`);
	},

	deletePost: async ({ locals, request, params }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'You must be logged in.' });

		const form = await request.formData();
		const postId = String(form.get('post_id') ?? '');

		const { data: existing, error: fetchErr } = await locals.supabase
			.from('posts')
			.select('id, author_id')
			.eq('id', postId)
			.maybeSingle();
		if (fetchErr || !existing) return fail(404, { error: 'Post not found.' });

		const { data: profile } = await locals.supabase
			.from('profiles')
			.select('is_admin')
			.eq('id', user.id)
			.maybeSingle();
		const isAdmin = profile?.is_admin === true;

		if (existing.author_id !== user.id && !isAdmin) {
			return fail(403, { error: 'Not your post.' });
		}

		const { error: err } = await locals.supabase.from('posts').delete().eq('id', postId);
		if (err) return fail(500, { error: 'Could not delete the post. Please try again.' });

		redirect(303, `${base}/forum/t/${params.thread}`);
	},

	deleteThread: async ({ locals, request }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'You must be logged in.' });

		const form = await request.formData();
		const threadId = String(form.get('thread_id') ?? '');

		const { data: existing, error: fetchErr } = await locals.supabase
			.from('threads')
			.select('id, author_id, category:categories(slug)')
			.eq('id', threadId)
			.maybeSingle();
		if (fetchErr || !existing) return fail(404, { error: 'Thread not found.' });

		const { data: profile } = await locals.supabase
			.from('profiles')
			.select('is_admin')
			.eq('id', user.id)
			.maybeSingle();
		const isAdmin = profile?.is_admin === true;

		if (existing.author_id !== user.id && !isAdmin) {
			return fail(403, { error: 'Not your thread.' });
		}

		const { error: err } = await locals.supabase.from('threads').delete().eq('id', threadId);
		if (err) return fail(500, { error: 'Could not delete the thread. Please try again.' });

		const slug = (existing as any).category?.slug;
		redirect(303, slug ? `${base}/forum/c/${slug}` : `${base}/forum`);
	}
};
