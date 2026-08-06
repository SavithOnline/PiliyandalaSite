<script lang="ts">
	import { base } from '$app/paths';
	import Avatar from '$lib/components/Avatar.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Account — Piliyandala Forum</title>
	<meta name="description" content="Manage your Piliyandala Forum account." />
</svelte:head>

<div class="wrap">
	<section class="account-card">
		<span class="eyebrow" style="display:block;margin-bottom:0.9rem">Your account</span>
		<h1>Account</h1>

		<div class="account-summary">
			<Avatar user={data.profile} />
			<div>
				<p class="account-summary__name">{form?.displayName ?? data.profile?.display_name}</p>
				<p class="account-summary__email">{data.user?.email}</p>
			</div>
		</div>

		{#if form?.saved}
			<p class="account-success">Name updated.</p>
		{/if}
		{#if form?.error}
			<p class="form-error" style="margin:0 0 1rem">{form.error}</p>
		{/if}

		<form method="post" action="?/updateName">
			<div class="field">
				<label for="display-name">Display name</label>
				<input
					id="display-name"
					class="input"
					type="text"
					name="display_name"
					value={form?.displayName ?? data.profile?.display_name ?? ''}
					minlength="2"
					maxlength="40"
					autocomplete="name"
					required
				/>
			</div>
			<div class="account-actions">
				<button class="btn btn--primary" type="submit">Save name</button>
				<a class="btn" href="{base}/forum/profile/{data.user?.id}">View profile</a>
			</div>
		</form>

		<hr class="account-divider" />

		<form action="{base}/logout?/signout" method="post">
			<button class="btn" type="submit">Log out</button>
		</form>
	</section>
</div>
