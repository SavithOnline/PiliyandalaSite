<script lang="ts">
	import { base } from '$app/paths';
	import RelativeTime from '$lib/components/RelativeTime.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.profile.display_name} — Piliyandala Forum</title>
	<meta
		name="description"
		content={`Profile of ${data.profile.display_name} on the Piliyandala community forum.`}
	/>
</svelte:head>

<div class="wrap" style="max-width:780px">
	<header class="profile-head">
		{#if data.profile.avatar_url}
			<span class="avatar">
				<img src={data.profile.avatar_url} alt="" width="64" height="64" />
			</span>
		{:else}
			<span class="avatar" aria-hidden="true">
				{data.profile.display_name.trim().slice(0, 2).toUpperCase()}
			</span>
		{/if}
		<div>
			<h1>{data.profile.display_name}</h1>
			<p class="joined">
				Joined <RelativeTime datetime={data.profile.created_at} long />
				{#if data.user?.id === data.profile.id} · this is you{/if}
			</p>
		</div>
	</header>

	<section class="section">
		<div class="section__head">
			<h2>Recent threads</h2>
		</div>
		{#if data.threads.length > 0}
			<div class="thread-list">
				{#each data.threads as t (t.id)}
					<div class="thread-item">
						<div>
							<a class="thread-item__title" href="{base}/forum/t/{t.id}">{t.title}</a>
							<div class="thread-item__meta">
								<span>
									in
									<a href="{base}/forum/c/{t.category?.slug}">
										{t.category?.name ?? 'Forum'}
									</a>
								</span>
								<span><RelativeTime datetime={t.created_at} /></span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="muted">No threads yet.</p>
		{/if}
	</section>

	<section class="section">
		<div class="section__head">
			<h2>Recent replies</h2>
		</div>
		{#if data.posts.length > 0}
			<div class="thread-list">
				{#each data.posts as p (p.id)}
					<div class="thread-item">
						<div>
							<a class="thread-item__title" href="{base}/forum/t/{p.thread?.id}#p-{p.id}">
								{p.thread?.title ?? 'Thread'}
							</a>
							<div class="thread-item__meta">
								<span><RelativeTime datetime={p.created_at} /></span>
								<span class="post__body" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:60ch">
									{p.body}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="muted">No replies yet.</p>
		{/if}
	</section>
</div>
