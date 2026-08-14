<script lang="ts">
	import { base } from '$app/paths';
	import type { ContentPage } from '$lib/content/types';
	import Prose from './Prose.svelte';

	let {
		page,
		seoTitle,
		seoDescription
	}: {
		page: ContentPage;
		seoTitle: string;
		seoDescription: string;
	} = $props();
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
</svelte:head>

<div class="wrap">
	<header class="page-head">
		<span class="eyebrow">{page.eyebrow}</span>
		<h1 class="page-title">{page.title}</h1>
		<p class="page-lede">{page.lede}</p>
	</header>

	{#if page.image}
		<figure class="feature-photo">
			<img src={`${base}${page.image.src}`} alt={page.image.alt} loading="eager" />
			<figcaption>
				<span>{page.image.caption}</span>
				<small>{page.image.credit}</small>
			</figcaption>
		</figure>
	{/if}

	{#each page.sections as section, i (i)}
		<section class="section" id={section.id}>
			<div class="section__head">
				<h2>{section.heading}</h2>
			</div>
			{#if section.lede}<p class="lede">{section.lede}</p>{/if}
			<Prose blocks={section.blocks} />
		</section>
	{/each}
</div>
