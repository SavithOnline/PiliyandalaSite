<script lang="ts">
	import { base } from '$app/paths';
	import RelativeTime from '$lib/components/RelativeTime.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Forum — Piliyandala Community</title>
	<meta
		name="description"
		content="Community discussions about Piliyandala — town news, transport, schools, heritage and more."
	/>
</svelte:head>

<div class="wrap">
	<header class="forum-head">
		<div>
			<span class="eyebrow" style="display:block;margin-bottom:0.7rem">Forum</span>
			<h1 class="page-title" style="font-size:clamp(1.9rem,4.5vw,2.6rem)">
				The Piliyandala community
			</h1>
			<p class="page-lede" style="margin-top:0.9rem;max-width:56ch">
				Discussions about the town — free to read by anyone. Log in with your email to
				start a thread or join in.
			</p>
		</div>
		{#if data.user}
			<a class="btn btn--primary" href="{base}/forum/new">Start a thread</a>
		{:else}
			<a class="btn" href="{base}/login?next={base}/forum/new">Log in to post</a>
		{/if}
	</header>

	{#if data.dbFailed}
		<p class="db-banner">
			The forum database is unreachable right now. Categories will reappear once the
			database is available.
		</p>
	{/if}

	{#if data.overview.length > 0}
		<section aria-label="Categories">
			{#each data.overview as cat (cat.id)}
				<div class="cat-row">
					<div>
						<a class="cat-row__name" href="{base}/forum/c/{cat.slug}">{cat.name}</a>
						<p class="cat-row__desc">{cat.description}</p>
					</div>
					<div class="cat-row__stat">
						<strong>{cat.thread_count}</strong>
						threads
					</div>
					<div class="cat-row__stat">
						<strong>{cat.post_count}</strong>
						posts
					</div>
					<div class="cat-row__activity">
						{#if cat.last_thread_id && cat.last_activity_at}
							<a href="{base}/forum/t/{cat.last_thread_id}">{cat.last_thread_title}</a>
							<div><RelativeTime datetime={cat.last_activity_at} /></div>
						{:else}
							No threads yet
						{/if}
					</div>
				</div>
			{/each}
		</section>
		<p class="muted" style="margin-top:1rem;font-size:0.85rem">
			{data.threadCount} threads · {data.postCount} replies across {data.overview.length}{' '}
			categories
		</p>
	{:else if !data.dbFailed}
		<div class="empty-state">
			<p>No categories yet.</p>
			<a class="btn" href="{base}/about">Back to the guide</a>
		</div>
	{/if}
</div>
