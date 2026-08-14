<script lang="ts">
	import { base } from '$app/paths';

	const places = [
		{
			name: 'Piliyandala town centre',
			detail: 'Clock Tower roundabout and the central commercial area',
			href: 'https://www.openstreetmap.org/?mlat=6.8011&mlon=79.9228#map=17/6.8011/79.9228'
		},
		{
			name: 'Central bus stand',
			detail: 'The main interchange for local and Colombo-bound bus routes',
			href: 'https://www.openstreetmap.org/search?query=Piliyandala%20bus%20stand'
		},
		{
			name: 'Divisional Hospital',
			detail: 'Government hospital and outpatient services',
			href: 'https://www.openstreetmap.org/search?query=Divisional%20Hospital%20Piliyandala'
		},
		{
			name: 'Piliyandala Central College',
			detail: 'National school and local educational landmark',
			href: 'https://www.openstreetmap.org/search?query=Piliyandala%20Central%20College'
		}
	];
</script>

<svelte:head>
	<title>Geo-Portal — Piliyandala</title>
	<meta
		name="description"
		content="Explore Piliyandala landmarks, services and the town centre on an interactive map."
	/>
</svelte:head>

<section class="portal-head">
	<div class="wrap portal-head__inner">
		<div>
			<span class="eyebrow">Community map</span>
			<h1>Geo-Portal</h1>
			<p>
				Explore Piliyandala’s town centre, public services and well-known landmarks. Use the map
				controls to pan and zoom, or open a place for more detail.
			</p>
		</div>
		<dl class="coordinates">
			<div><dt>Town centre</dt><dd>6.8011° N, 79.9228° E</dd></div>
			<div><dt>District</dt><dd>Colombo</dd></div>
			<div><dt>Postal code</dt><dd>10300</dd></div>
		</dl>
	</div>
</section>

<section class="wrap portal-body">
	<div class="map-shell">
		<iframe
			title="Interactive map of Piliyandala"
			src="https://www.openstreetmap.org/export/embed.html?bbox=79.895%2C6.775%2C79.951%2C6.827&layer=mapnik&marker=6.8011%2C79.9228"
			loading="eager"
		></iframe>
		<div class="map-shell__footer">
			<span>Map data © OpenStreetMap contributors</span>
			<a href="https://www.openstreetmap.org/?mlat=6.8011&mlon=79.9228#map=15/6.8011/79.9228" target="_blank" rel="noreferrer">View larger map ↗</a>
		</div>
	</div>

	<aside class="places" aria-labelledby="places-title">
		<div class="places__head">
			<h2 id="places-title">Places to explore</h2>
			<a class="download" href="{base}/data/piliyandala-centre.geojson" download>Download GeoJSON</a>
		</div>
		<div class="places__list">
			{#each places as place}
				<a href={place.href} target="_blank" rel="noreferrer">
					<strong>{place.name}</strong>
					<span>{place.detail}</span>
					<small>Open in map ↗</small>
				</a>
			{/each}
		</div>
	</aside>
</section>

<style>
	.portal-head {
		border-bottom: 1px solid var(--line);
		background: var(--paper-2);
	}

	.portal-head__inner {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 3rem;
		align-items: end;
		padding-block: clamp(2.8rem, 7vw, 5.5rem);
	}

	.portal-head h1 {
		font-size: clamp(2.7rem, 7vw, 5.4rem);
		line-height: 0.95;
		letter-spacing: -0.045em;
		margin: 0.65rem 0 1.2rem;
	}

	.portal-head p {
		max-width: 62ch;
		color: var(--ink-soft);
		font-size: 1.04rem;
		line-height: 1.65;
	}

	.coordinates {
		min-width: 15rem;
		border-left: 1px solid var(--line-strong);
		padding-left: 1.5rem;
	}

	.coordinates div + div { margin-top: 0.85rem; }
	.coordinates dt { color: var(--muted); font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.08em; }
	.coordinates dd { margin: 0.15rem 0 0; font-weight: 650; }

	.portal-body {
		display: grid;
		grid-template-columns: minmax(0, 1.75fr) minmax(18rem, 0.75fr);
		gap: 2rem;
		align-items: start;
		padding-block: 3rem 4.5rem;
	}

	.map-shell {
		border: 1px solid var(--line-strong);
		border-radius: var(--r);
		overflow: hidden;
		background: var(--paper-2);
	}

	.map-shell iframe {
		display: block;
		width: 100%;
		height: min(62vh, 38rem);
		min-height: 28rem;
		border: 0;
	}

	.map-shell__footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem 1rem;
		font-size: 0.78rem;
		color: var(--muted);
	}

	.map-shell__footer a,
	.download { color: var(--accent); font-weight: 650; }

	.places { border-top: 3px solid var(--accent); }
	.places__head { padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
	.places__head h2 { font-size: 1.2rem; margin-bottom: 0.45rem; }
	.download { font-size: 0.84rem; }
	.places__list a { display: block; padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
	.places__list a:hover { text-decoration: none; }
	.places__list strong { display: block; color: var(--ink); }
	.places__list span { display: block; color: var(--ink-soft); font-size: 0.88rem; line-height: 1.45; margin-top: 0.25rem; }
	.places__list small { display: block; color: var(--accent); margin-top: 0.55rem; font-weight: 650; }

	@media (max-width: 780px) {
		.portal-head__inner, .portal-body { grid-template-columns: 1fr; }
		.portal-head__inner { gap: 2rem; }
		.coordinates { border-left: 0; border-top: 1px solid var(--line-strong); padding: 1.2rem 0 0; }
		.map-shell iframe { min-height: 24rem; }
		.map-shell__footer { align-items: flex-start; flex-direction: column; }
	}
</style>
