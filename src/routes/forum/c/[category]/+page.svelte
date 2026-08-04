<script lang="ts">
	import { base } from '$app/paths';
	import RelativeTime from '$lib/components/RelativeTime.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category.name} — Piliyandala Forum</title>
	<meta name="description" content={data.category.description} />
</svelte:head>

<div class="wrap">
	<header class="forum-head">
		<div>
			<span class="eyebrow" style="display:block;margin-bottom:0.7rem">
				<a href="{base}/forum" class="muted" style="color:inherit">Forum</a> / Category
			</span>
			<h1 class="page-title" style="font-size:clamp(1.9rem,4.5vw,2.6rem)">
				{data.category.name}
			</h1>
			<p class="page-lede" style="margin-top:0.9rem;max-width:56ch">
				{data.category.description}
			</p>
		</div>
		{#if data.user}
			<a class="btn btn--primary" href="{base}/forum/new?category={data.category.slug}">
				New thread
			</a>
		{:else}
			<a class="btn" href="{base}/login?next={base}/forum/c/{data.category.slug}">
				Log in to post
			</a>
		{/if}
	</header>

	{#if data.threads.length > 0}
		<div class="thread-list">
			{#each data.threads as t (t.id)}
				<div class="thread-item">
					<div>
						<a class="thread-item__title" href="{base}/forum/t/{t.id}">
							{t.title}
							{#if t.pinned}<span class="badge badge--accent">Pinned</span>{/if}
							{#if t.locked}<span class="badge">Locked</span>{/if}
						</a>
						<div class="thread-item__meta">
							<span>
								by
								<a href="{base}/forum/profile/{t.author_id}">
									{t.author?.display_name ?? 'a member'}
								</a>
							</span>
							<span><RelativeTime datetime={t.updated_at} /></span>
						</div>
					</div>
					<div class="thread-item__count">{t.post_count} reply{t.post_count === 1 ? '' : 's'}</div>
				</div>
			{/each}
		</div>
		<Pagination
			page={data.page}
			pages={data.pages}
			total={data.total}
			label="Threads"
			baseHref="{base}/forum/c/{data.category.slug}"
		/>
	{:else}
		<div class="empty-state">
			<p>No threads in this category yet.</p>
			{#if data.user}
				<a class="btn btn--primary" href="{base}/forum/new?category={data.category.slug}">
					Start the first thread
				</a>
			{:else}
				<a class="btn" href="{base}/login?next={base}/forum/c/{data.category.slug}">
					Log in to start one
				</a>
			{/if}
		</div>
	{/if}
</div>
