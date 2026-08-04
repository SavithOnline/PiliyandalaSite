<script lang="ts">
	let {
		page = 1,
		pages = 1,
		total,
		label,
		baseHref
	}: {
		page?: number;
		pages?: number;
		total: number;
		label: string;
		baseHref: string;
	} = $props();
</script>

{#if pages > 1}
	<nav class="pagination" aria-label="Pagination">
		<span>
			{label} — page {page} of {pages}
			<span class="muted">({total} total)</span>
		</span>
		<div class="pagination__links">
			{#if page > 1}
				<a class="btn btn--sm" href="{baseHref}?page={page - 1}">← Newer</a>
			{/if}
			{#if page < pages}
				<a class="btn btn--sm" href="{baseHref}?page={page + 1}">Older →</a>
			{/if}
		</div>
	</nav>
{/if}
