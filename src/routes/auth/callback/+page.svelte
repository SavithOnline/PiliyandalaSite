<script lang="ts">
	import { onMount } from 'svelte';
	import { createBrowserClient } from '@supabase/ssr';
	import { base } from '$app/paths';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

	let { data } = $props();
	let errorMessage = $state('');

	onMount(async () => {
		const params = new URLSearchParams(window.location.hash.slice(1));
		const accessToken = params.get('access_token');
		const refreshToken = params.get('refresh_token');
		const providerError = params.get('error_description');

		if (providerError || !accessToken || !refreshToken) {
			errorMessage = providerError ?? 'The sign-in link is invalid or has expired.';
			return;
		}

		const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
		const { error } = await supabase.auth.setSession({
			access_token: accessToken,
			refresh_token: refreshToken
		});

		// Remove credentials from browser history as soon as they are consumed.
		window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`);

		if (error) {
			errorMessage = 'We could not complete your login. Please request a new sign-in link.';
			return;
		}

		window.location.replace(data.next);
	});
</script>

<svelte:head>
	<title>Finishing login — Piliyandala Forum</title>
</svelte:head>

<div class="wrap" style="max-width:640px">
	<div class="auth-card">
		<span class="eyebrow" style="display:block;margin-bottom:0.9rem">Forum</span>
		{#if errorMessage}
			<h1>Login link problem</h1>
			<p class="form-error">{errorMessage}</p>
			<a class="btn btn--primary" href={`${base}/login`}>Request a new link</a>
		{:else}
			<h1>Finishing your login…</h1>
			<p class="lede">Please wait while we securely sign you in.</p>
		{/if}
	</div>
</div>
