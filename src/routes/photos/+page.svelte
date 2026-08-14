<script lang="ts">
	import { base } from '$app/paths';
	import RelativeTime from '$lib/components/RelativeTime.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Community Photos â€” Piliyandala</title>
	<meta
		name="description"
		content="A community photo feed for Piliyandala, shared by local members."
	/>
</svelte:head>

<div class="wrap photo-feed">
	<header class="photo-feed__head">
		<div>
			<span class="eyebrow">Community feed</span>
			<h1 class="page-title">Piliyandala in pictures</h1>
			<p class="page-lede">Share everyday views, places and moments from around the town.</p>
		</div>

		{#if data.user}
			<a class="btn btn--primary" href="#share-photo">Upload a picture</a>
		{:else}
			<a class="btn btn--primary" href="{base}/login?next={base}/photos">Log in to upload</a>
		{/if}
	</header>

	{#if data.uploaded}
		<p class="account-success" role="status">Your picture is now in the community feed.</p>
	{/if}

	{#if data.user}
		<section class="photo-upload" id="share-photo" aria-labelledby="share-photo-title">
			<div>
				<span class="eyebrow">Add to the feed</span>
				<h2 id="share-photo-title">Share a picture</h2>
				<p>JPG, PNG, WebP or GIF, up to 5 MB. Only share pictures you have permission to post.</p>
			</div>

			<form method="post" action="?/upload" enctype="multipart/form-data">
				<div class="field">
					<label for="image">Picture</label>
					<input
						id="image"
						class="input file-input"
						type="file"
						name="image"
						accept="image/jpeg,image/png,image/webp,image/gif"
						required
					/>
				</div>
				<div class="field">
					<label for="caption">Caption <span class="muted">(optional)</span></label>
					<textarea
						id="caption"
						class="input photo-caption"
						name="caption"
						maxlength="240"
						rows="3"
						placeholder="What are we looking at?"
					>{form?.caption ?? ''}</textarea>
				</div>
				{#if form?.error}<p class="form-error" role="alert">{form.error}</p>{/if}
				<button class="btn btn--primary" type="submit">Post picture</button>
			</form>
		</section>
	{/if}

	<section class="photo-stream" aria-labelledby="latest-photos-title">
		<div class="section__head">
			<h2 id="latest-photos-title">Latest photos</h2>
			<span class="muted">{data.photos.length} {data.photos.length === 1 ? 'photo' : 'photos'}</span>
		</div>

		{#if data.feedUnavailable}
			<p class="db-banner">The photo feed is being set up. Please check back shortly.</p>
		{:else if data.photos.length === 0}
			<div class="empty-state">
				<p>No community photos yet.</p>
				{#if data.user}
					<a class="btn btn--primary" href="#share-photo">Share the first one</a>
				{:else}
					<a class="btn btn--primary" href="{base}/login?next={base}/photos">Log in to share the first one</a>
				{/if}
			</div>
		{:else}
			<div class="photo-grid">
				{#each data.photos as photo (photo.id)}
					<article class="photo-card">
						<img src={photo.imageUrl} alt={photo.caption || 'Community photo of Piliyandala'} loading="lazy" />
						<div class="photo-card__body">
							{#if photo.caption}<p>{photo.caption}</p>{/if}
							<div class="photo-card__meta">
								<span>{photo.author?.display_name ?? 'A community member'}</span>
								<span aria-hidden="true">Â·</span>
								<RelativeTime datetime={photo.created_at} />
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</section>
</div>
