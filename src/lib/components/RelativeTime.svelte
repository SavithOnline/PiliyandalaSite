<script lang="ts">
	let { datetime, long = false }: { datetime: string; long?: boolean } = $props();

	let relative = $state('');
	let mounted = $state(false);

	function formatLong(iso: string): string {
		const d = new Date(iso);
		return d.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function formatRelative(iso: string): string {
		const then = new Date(iso).getTime();
		const diff = Date.now() - then;
		const sec = Math.round(diff / 1000);
		if (sec < 45) return 'just now';
		const min = Math.round(sec / 60);
		if (min < 60) return `${min}m ago`;
		const hr = Math.round(min / 60);
		if (hr < 24) return `${hr}h ago`;
		const day = Math.round(hr / 24);
		if (day < 7) return `${day}d ago`;
		if (day < 31) return `${Math.round(day / 7)}w ago`;
		return formatLong(iso);
	}

	$effect(() => {
		mounted = true;
		relative = formatRelative(datetime);
		const id = setInterval(() => {
			relative = formatRelative(datetime);
		}, 60_000);
		return () => clearInterval(id);
	});
</script>

{#if long}
	<time datetime={datetime}>{formatLong(datetime)}</time>
{:else}
	<time datetime={datetime} title={formatLong(datetime)}>{mounted ? relative : formatLong(datetime)}</time>
{/if}
