<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.name} — Piliyandala Geo-Portal</title>
	<meta name="description" content={`Full-screen map showing ${data.name} in Piliyandala.`} />
</svelte:head>

<section class="full-map" aria-label={`Map of ${data.name}`}>
	<header class="full-map__bar">
		<a class="full-map__back" href="{base}/geoportal" aria-label="Back to the Geo-Portal">← Back</a>
		<div>
			<span>Geo-Portal</span>
			<strong>{data.name}</strong>
		</div>
		<p>{data.lat.toFixed(5)}° N, {data.lon.toFixed(5)}° E</p>
	</header>
	<iframe title={`Full-screen map of ${data.name}`} src={data.embedUrl}></iframe>
</section>

<style>
	.full-map {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		grid-template-rows: auto minmax(0, 1fr);
		background: var(--paper);
	}

	.full-map__bar {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: 1rem;
		align-items: center;
		min-height: 4.5rem;
		padding: 0.7rem clamp(1rem, 3vw, 2rem);
		border-bottom: 1px solid var(--line-strong);
		background: var(--paper);
	}

	.full-map__back {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--line-strong);
		border-radius: var(--r);
		color: var(--accent);
		font-weight: 650;
	}

	.full-map__back:hover { text-decoration: none; background: var(--accent-soft); }
	.full-map__bar div { min-width: 0; }
	.full-map__bar span { display: block; color: var(--muted); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; }
	.full-map__bar strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.full-map__bar p { margin: 0; color: var(--muted); font-size: 0.78rem; font-variant-numeric: tabular-nums; }

	.full-map iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}

	@media (max-width: 600px) {
		.full-map__bar { grid-template-columns: auto minmax(0, 1fr); }
		.full-map__bar p { display: none; }
	}
</style>
