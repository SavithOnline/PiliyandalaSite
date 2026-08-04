<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<title>Piliyandala — A Community Guide &amp; Forum</title>
	<meta
		name="description"
		content="Piliyandala, a town in the Colombo District of Sri Lanka — history, landmarks, transport and a community forum."
	/>
	<meta name="theme-color" content="#175c40" />
	<link rel="icon" href="{base}/favicon.svg" type="image/svg+xml" />
</svelte:head>

<Header user={data.user} profile={data.profile} />

<main id="main">
	{@render children()}
</main>

<Footer />
