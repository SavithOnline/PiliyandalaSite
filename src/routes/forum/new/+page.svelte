<script lang="ts">
	import { base } from '$app/paths';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Start a thread — Piliyandala Forum</title>
	<meta name="description" content="Start a new discussion in the Piliyandala forum." />
</svelte:head>

<div class="wrap" style="max-width:720px">
	<header class="forum-head" style="padding-bottom:1.6rem">
		<div>
			<span class="eyebrow" style="display:block;margin-bottom:0.7rem">
				<a href="{base}/forum" style="color:inherit">Forum</a> / New thread
			</span>
			<h1 class="page-title" style="font-size:clamp(1.8rem,4vw,2.3rem)">Start a thread</h1>
			<p class="page-lede" style="margin-top:0.8rem">
				Posts are public. Be civil, stay on topic, and respect your neighbours.
			</p>
		</div>
	</header>

	{#if form?.error}
		<p class="form-error">{form.error}</p>
	{/if}

	<form method="post" action="?/create">
		<div class="field">
			<label for="category_id">Category</label>
			<select id="category_id" class="input" name="category_id" required>
				{#if !data.presetId}<option value="" disabled selected>Choose a category…</option>{/if}
				{#each data.categories as cat (cat.id)}
					<option value={cat.id} selected={data.presetId === cat.id}>{cat.name}</option>
				{/each}
			</select>
		</div>

		<div class="field">
			<label for="title">Title</label>
			<input
				id="title"
				class="input"
				type="text"
				name="title"
				value={form?.title ?? ''}
				required
				minlength="3"
				maxlength="200"
				placeholder="A clear, short title"
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
				placeholder="What would you like to discuss?"
			>{form?.body ?? ''}</textarea
			>
		</div>

		<div style="display:flex;gap:0.7rem;align-items:center">
			<button class="btn btn--primary" type="submit">Post thread</button>
			<a class="btn" href="{base}/forum">Cancel</a>
		</div>
	</form>
</div>
