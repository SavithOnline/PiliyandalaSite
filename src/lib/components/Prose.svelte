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
	{:else if block.type === 'timeline'}
		<div class="timeline">
			{#each block.items as item, n (n)}
				<div class="timeline__item">
					<div class="timeline__year">{item.year}</div>
					<div class="timeline__body">
						{#if item.title}<h3>{item.title}</h3>{/if}
						<p>{@html item.text}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
{/each}
