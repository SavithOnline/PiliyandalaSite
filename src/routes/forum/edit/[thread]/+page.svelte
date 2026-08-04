<script lang="ts">
	import { base } from '$app/paths';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Edit thread — Piliyandala Forum</title>
	<meta name="description" content="Edit your thread in the Piliyandala forum." />
</svelte:head>

<div class="wrap" style="max-width:720px">
	<header class="forum-head" style="padding-bottom:1.6rem">
		<div>
			<span class="eyebrow" style="display:block;margin-bottom:0.7rem">
				<a href="{base}/forum" style="color:inherit">Forum</a> / Edit thread
			</span>
			<h1 class="page-title" style="font-size:clamp(1.8rem,4vw,2.3rem)">Edit thread</h1>
		</div>
	</header>

	{#if form?.error}
		<p class="form-error">{form.error}</p>
	{/if}

	<form method="post" action="?/update">
		<div class="field">
			<label for="category">Category</label>
			<input
				id="category"
				class="input"
				type="text"
				value={data.thread.category?.name ?? ''}
				disabled
			/>
		</div>

		<div class="field">
			<label for="title">Title</label>
			<input
				id="title"
				class="input"
				type="text"
				name="title"
				value={form?.title ?? data.thread.title}
				required
				minlength="3"
				maxlength="200"
			/>
		</div>

		<div class="field">
			<label for="body">First post</label>
			<textarea
				id="body"
				class="input"
				name="body"
				required
				rows="8"
				maxlength="20000"
			>{form?.body ?? data.thread.body}</textarea
			>
		</div>

		<div style="display:flex;gap:0.7rem;align-items:center">
			<button class="btn btn--primary" type="submit">Save changes</button>
			<a class="btn" href="{base}/forum/t/{data.thread.id}">Cancel</a>
		</div>
	</form>
</div>
