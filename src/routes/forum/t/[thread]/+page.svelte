<script lang="ts">
	import { base } from '$app/paths';
	import RelativeTime from '$lib/components/RelativeTime.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	let { data, form } = $props();

	let editingPostId = $state<string | null>(null);

	function toggleEdit(id: string | null) {
		editingPostId = editingPostId === id ? null : id;
	}
</script>

<svelte:head>
	<title>{data.thread.title} — Piliyandala Forum</title>
	<meta name="description" content={`${data.thread.body.slice(0, 160)}…`} />
</svelte:head>

<div class="wrap" style="max-width:780px">
	<nav style="padding-top:2.2rem;font-size:0.88rem">
		<a href="{base}/forum">Forum</a>
		<span class="muted"> / </span>
		<a href="{base}/forum/c/{data.thread.category?.slug}">
			{data.thread.category?.name ?? 'Category'}
		</a>
	</nav>

	<header style="padding-block:1.2rem 0">
		<h1 class="thread-view__title">
			{data.thread.title}
			{#if data.thread.pinned}<span class="badge badge--accent">Pinned</span>{/if}
			{#if data.thread.locked}<span class="badge">Locked</span>{/if}
		</h1>
		<div class="thread-view__meta">
			<span>
				by
				<a href="{base}/forum/profile/{data.thread.author_id}">
					{data.thread.author?.display_name ?? 'a member'}
				</a>
			</span>
			<span><RelativeTime datetime={data.thread.created_at} long /></span>
			<span>{data.total} post{data.total === 1 ? '' : 's'}</span>
		</div>
	</header>

	{#if form?.error}
		<p class="form-error">{form.error}</p>
	{/if}

	<!-- Original post -->
	<article class="post post--op" style="padding-top:2rem">
		<header class="post__head">
			<div>
				<a class="post__author" href="{base}/forum/profile/{data.thread.author_id}">
					{data.thread.author?.display_name ?? 'a member'}
				</a>
				<span class="post__time" style="margin-left:0.6rem">
					<RelativeTime datetime={data.thread.created_at} />
				</span>
				<span class="badge badge--accent" style="margin-left:0.6rem">Original post</span>
			</div>
			{#if data.user?.id === data.thread.author_id}
				<div class="post__actions">
					<a class="btn btn--sm" href="{base}/forum/edit/{data.thread.id}">Edit</a>
					<form action="?/deleteThread" method="post">
						<input type="hidden" name="thread_id" value={data.thread.id} />
						<button
							class="btn btn--sm btn--danger"
							type="submit"
							onsubmit={(e) => {
								if (!confirm('Delete this thread and all its replies?')) e.preventDefault();
							}}
						>
							Delete
						</button>
					</form>
				</div>
			{/if}
		</header>
		<div class="post__body">{data.thread.body}</div>
		{#if data.thread.updated_at !== data.thread.created_at}
			<p class="post__edited">Edited <RelativeTime datetime={data.thread.updated_at} /></p>
		{/if}
	</article>

	<!-- Replies -->
	{#each data.posts as post (post.id)}
		<article class="post" id="p-{post.id}">
			<header class="post__head">
				<div>
					<a class="post__author" href="{base}/forum/profile/{post.author_id}">
						{post.author?.display_name ?? 'a member'}
					</a>
					<span class="post__time" style="margin-left:0.6rem">
						<RelativeTime datetime={post.created_at} />
					</span>
				</div>
				{#if data.user?.id === post.author_id}
					<div class="post__actions">
						<button
							class="btn btn--sm"
							type="button"
							onclick={() => toggleEdit(post.id)}
						>
							Edit
						</button>
						<form action="?/deletePost" method="post">
							<input type="hidden" name="post_id" value={post.id} />
						<button
							class="btn btn--sm btn--danger"
							type="submit"
							onsubmit={(e) => {
								if (!confirm('Delete this reply?')) e.preventDefault();
							}}
						>
							Delete
						</button>
						</form>
					</div>
				{/if}
			</header>

			{#if editingPostId === post.id}
				<form method="post" action="?/editPost">
					<input type="hidden" name="post_id" value={post.id} />
					<textarea class="input" name="body" required rows="5" maxlength="20000">
{post.body}</textarea
					>
					<div style="display:flex;gap:0.6rem;margin-top:0.7rem">
						<button class="btn btn--sm btn--primary" type="submit">Save edit</button>
						<button class="btn btn--sm" type="button" onclick={() => toggleEdit(null)}>
							Cancel
						</button>
					</div>
				</form>
			{:else}
				<div class="post__body">{post.body}</div>
				{#if post.edited_at}
					<p class="post__edited">Edited <RelativeTime datetime={post.edited_at} /></p>
				{/if}
			{/if}
		</article>
	{/each}

	{#if data.posts.length === 0}
		<div class="empty-state" style="margin-top:1.6rem">
			<p>No replies yet.</p>
		</div>
	{/if}

	{#if data.pages > 1}
		<Pagination
			page={data.page}
			pages={data.pages}
			total={data.total}
			label="Replies"
			baseHref="{base}/forum/t/{data.thread.id}"
		/>
	{/if}

	<!-- Reply box -->
	<section class="reply-box" id="replies">
		<h2>Reply to this thread</h2>
		{#if data.thread.locked}
			<p class="muted">This thread is locked and no longer accepts replies.</p>
		{:else if data.user}
			<form method="post" action="?/reply">
				<div class="field" style="margin-bottom:0.8rem">
					<label for="reply-body">Your reply</label>
					<textarea
						id="reply-body"
						class="input"
						name="body"
						required
						rows="6"
						maxlength="20000"
						placeholder="Share your thoughts…"
					></textarea>
				</div>
				<button class="btn btn--primary" type="submit">Post reply</button>
			</form>
		{:else}
			<p class="muted">
				<a href="{base}/login?next={base}/forum/t/{data.thread.id}">Log in</a> with your
				email to reply to this thread.
			</p>
		{/if}
	</section>
</div>
