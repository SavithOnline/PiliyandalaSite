<script lang="ts">
	import { base } from '$app/paths';
	import RelativeTime from '$lib/components/RelativeTime.svelte';

	let { data } = $props();

	const teasers = [
		{
			href: '/geoportal',
			index: '00',
			title: 'Geo-Portal',
			desc: 'Explore community services and landmarks on an interactive map, then download the spatial datasets.'
		},
		{
			href: '/history',
			index: '01',
			title: 'History',
			desc: 'The Prince Sapumal legend and a timeline from the Kingdom of Kotte to a 21st-century transport hub.'
		},
		{
			href: '/landmarks',
			index: '02',
			title: 'Landmarks & culture',
			desc: 'The 78-foot Clock Tower, the Vesak Thorana, places of worship and Bolgoda Lake.'
		},
		{
			href: '/geography',
			index: '03',
			title: 'Geography & climate',
			desc: 'Location, boundaries, the tropical monsoon climate and the Pili Andi Dola stream.'
		},
		{
			href: '/transport',
			index: '04',
			title: 'Transport',
			desc: 'Bus routes, the road network, expressway access — and why there is no railway station.'
		},
		{
			href: '/education',
			index: '05',
			title: 'Education',
			desc: 'Piliyandala Central College, the first National Sports School in Sri Lanka.'
		},
		{
			href: '/healthcare',
			index: '06',
			title: 'Healthcare',
			desc: 'The Divisional Hospital and primary care, free under the national health policy.'
		},
		{
			href: '/development',
			index: '07',
			title: 'Development',
			desc: 'Sukitha Purawara, road rehabilitation and the plans to become a major transport hub.'
		}
	];
</script>

<svelte:head>
	<title>Piliyandala — A Local Guide &amp; Forum</title>
	<meta
		name="description"
		content="Piliyandala, a town in the Colombo District of Sri Lanka — history, landmarks, transport and a local forum."
	/>
</svelte:head>

<section class="hero">
	<div class="wrap">
		<span class="hero__sinhala">පිළියන්දල</span>
		<span class="hero__english">Piliyandala</span>
		<span class="hero__tamil">பிலியந்தலை</span>
		<p class="hero__lede">
			A major suburban town about 18 km south of Colombo — home to one of the island’s
			tallest clock towers and a vibrant central market. This is a local guide and forum
			for the town.
		</p>
		<div class="hero__actions">
			<a class="btn btn--primary" href="{base}/geoportal">Open the Geo-Portal</a>
			<a class="btn" href="{base}/about">Explore the town</a>
			<a class="btn" href="{base}/photos">Community photos</a>
			<a class="btn" href="{base}/forum">Join the forum</a>
		</div>
	</div>
</section>

<section class="quickfacts" aria-label="Quick facts">
	<div class="quickfacts__item">
		<span class="quickfacts__value">~18 km</span>
		<span class="quickfacts__label">South of Colombo</span>
	</div>
	<div class="quickfacts__item">
		<span class="quickfacts__value">78 ft</span>
		<span class="quickfacts__label">Clock Tower</span>
	</div>
	<div class="quickfacts__item">
		<span class="quickfacts__value">245,232</span>
		<span class="quickfacts__label">Kesbewa DS pop. (2012)</span>
	</div>
	<div class="quickfacts__item">
		<span class="quickfacts__value">10300</span>
		<span class="quickfacts__label">Postal code</span>
	</div>
	<div class="quickfacts__item">
		<span class="quickfacts__value">2,039 mm</span>
		<span class="quickfacts__label">Annual rainfall</span>
	</div>
</section>

<section class="wrap" style="padding-block:3rem">
	<div class="section__head" style="margin-bottom:0">
		<h2 style="font-size:1.35rem;font-weight:700">Explore the town</h2>
	</div>
</section>

<section class="wrap" style="padding-bottom:3rem">
	<div class="teasers">
		{#each teasers as t (t.href)}
			<a class="teaser" href="{base}{t.href}">
				<span class="teaser__index">{t.index}</span>
				<span class="teaser__title">{t.title}</span>
				<span class="teaser__desc">{t.desc}</span>
				<span class="teaser__more">Read more →</span>
			</a>
		{/each}
	</div>
</section>

<section class="wrap" style="padding-bottom:4.5rem">
	<div class="section__head">
		<h2 style="font-size:1.35rem;font-weight:700">Latest from the forum</h2>
		<a class="nav-cta" href="{base}/forum">All discussions →</a>
	</div>

	{#if data.recentThreads.length > 0}
		<div class="thread-list">
			{#each data.recentThreads as t (t.id)}
				<div class="thread-item">
					<div>
						<a class="thread-item__title" href="{base}/forum/t/{t.id}">{t.title}</a>
						<div class="thread-item__meta">
							<span>in <a href="{base}/forum/c/{t.category?.slug}">{t.category?.name ?? 'Forum'}</a></span>
							<span>by <a href="{base}/forum/profile/{t.author_id}">{t.author?.display_name ?? 'a member'}</a></span>
							<span><RelativeTime datetime={t.updated_at} /></span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="muted" style="padding:1rem 0;border-top:1px solid var(--line)">
			No discussions yet — be the first to start one.
		</p>
	{/if}
</section>
