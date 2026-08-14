import { fail, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { Actions, PageServerLoad } from './$types';

const BUCKET = 'photo-feed';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MIME_EXTENSIONS: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif'
};

export const load: PageServerLoad = async ({ locals, url }) => {
	const { data, error } = await locals.supabase
		.from('photo_posts')
		.select('id, caption, storage_path, created_at, author:profiles!photo_posts_author_id_fkey(display_name)')
		.order('created_at', { ascending: false })
		.limit(60);

	if (error) {
		console.error('[photos] Could not load photo feed:', error);
		return { photos: [], feedUnavailable: true, uploaded: false };
	}

	const photos = (data ?? []).map((photo) => ({
		...photo,
		imageUrl: locals.supabase.storage.from(BUCKET).getPublicUrl(photo.storage_path).data.publicUrl
	}));

	return {
		photos,
		feedUnavailable: false,
		uploaded: url.searchParams.get('uploaded') === '1'
	};
};

export const actions: Actions = {
	upload: async ({ locals, request }) => {
		const { user } = await locals.safeGetSession();
		if (!user) {
			redirect(303, `${base}/login?next=${base}/photos`);
		}

		const form = await request.formData();
		const caption = String(form.get('caption') ?? '').trim();
		const image = form.get('image');

		if (!(image instanceof File) || image.size === 0) {
			return fail(400, { error: 'Choose a picture to upload.', caption });
		}
		if (!MIME_EXTENSIONS[image.type]) {
			return fail(400, { error: 'Upload a JPG, PNG, WebP or GIF image.', caption });
		}
		if (image.size > MAX_FILE_SIZE) {
			return fail(400, { error: 'The picture must be 5 MB or smaller.', caption });
		}
		if (caption.length > 240) {
			return fail(400, { error: 'The caption must be 240 characters or fewer.', caption });
		}

		const storagePath = `${user.id}/${crypto.randomUUID()}.${MIME_EXTENSIONS[image.type]}`;
		const { error: uploadError } = await locals.supabase.storage
			.from(BUCKET)
			.upload(storagePath, image, { contentType: image.type, upsert: false });

		if (uploadError) {
			console.error('[photos] Image upload failed:', uploadError);
			return fail(500, { error: 'Could not upload the picture. Please try again.', caption });
		}

		const { error: insertError } = await locals.supabase.from('photo_posts').insert({
			author_id: user.id,
			storage_path: storagePath,
			caption
		});

		if (insertError) {
			console.error('[photos] Could not save photo post:', insertError);
			await locals.supabase.storage.from(BUCKET).remove([storagePath]);
			return fail(500, { error: 'The picture uploaded, but the post could not be saved. Please try again.', caption });
		}

		redirect(303, `${base}/photos?uploaded=1`);
	}
};
