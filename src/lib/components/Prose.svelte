<script lang="ts">
	import type { ContentBlock } from '$lib/content/types';

	let { blocks }: { blocks: ContentBlock[] } = $props();
</script>

{#each blocks as block, i (i)}
	{#if block.type === 'p'}
		<p>{@html block.text}</p>
	{:else if block.type === 'h3'}
		<h3>{block.text}</h3>
	{:else if block.type === 'ul'}
		<ul>
			{#each block.items as item (item)}
				<li>{@html item}</li>
			{/each}
		</ul>
	{:else if block.type === 'ol'}
		<ol>
			{#each block.items as item (item)}
				<li>{@html item}</li>
			{/each}
		</ol>
	{:else if block.type === 'quote'}
		<blockquote>
			<p>{block.text}</p>
			{#if block.cite}<cite>{block.cite}</cite>{/if}
		</blockquote>
	{:else if block.type === 'note'}
		<p class="note">{block.text}</p>
	{:else if block.type === 'table'}
		<div class="table-scroll">
			<table>
				{#if block.head}
					<thead>
						<tr>
							{#each block.head as h (h)}
								<th scope="col">{h}</th>
							{/each}
						</tr>
					</thead>
				{/if}
				<tbody>
					{#each block.rows as row, r (r)}
						<tr>
							{#each row as cell, c (c)}
								<td>{@html cell}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if block.caption}<p class="table-caption">{block.caption}</p>{/if}
	{:else if block.type === 'metricGrid'}
		<dl class="snapshot-grid">
			{#each block.items as item (item.label)}
				<div class="snapshot-grid__item">
					<dt>{item.label}</dt>
					<dd>{item.value}</dd>
					{#if item.detail}<span>{item.detail}</span>{/if}
				</div>
			{/each}
		</dl>
	{:else if block.type === 'barCharts'}
		<div class="chart-grid">
			{#each block.charts as chart (chart.title)}
				<figure class="bar-chart">
					<figcaption>
						<strong>{chart.title}</strong>
						<span>{chart.caption}</span>
					</figcaption>
					<div class="bar-chart__plot">
						{#each chart.items as item (item.label)}
							<div class="bar-chart__row">
								<div class="bar-chart__label">
									<span>{item.label}</span>
									<strong>{item.display}</strong>
								</div>
								<div class="bar-chart__track" aria-hidden="true">
									<span style={`--bar-size: ${Math.max(0, Math.min(100, (item.value / chart.max) * 100))}%`}></span>
								</div>
							</div>
						{/each}
					</div>
				</figure>
			{/each}
		</div>
	{:else if block.type === 'timeline'}
		<ol class="timeline">
			{#each block.items as item, n (n)}
				<li class="timeline__item">
					<div class="timeline__year">{item.year}</div>
					<span class="timeline__marker" aria-hidden="true"></span>
					<div class="timeline__body">
						{#if item.title}<h3>{item.title}</h3>{/if}
						<p>{@html item.text}</p>
					</div>
				</li>
			{/each}
		</ol>
	{/if}
{/each}
