<script lang="ts">
	interface ProfileLike {
		id: string;
		display_name: string;
		avatar_url: string | null;
	}

	let {
		user,
		size = 'md'
	}: { user: ProfileLike | null | undefined; size?: 'sm' | 'md' } = $props();

	const initials = $derived((user?.display_name ?? '?').trim().slice(0, 2).toUpperCase());
</script>

{#if user?.avatar_url}
	<span class="avatar avatar--sm" class:avatar--sm={size === 'sm'}>
		<img src={user.avatar_url} alt="" width="64" height="64" />
	</span>
{:else}
	<span class="avatar" class:avatar--sm={size === 'sm'} aria-hidden="true">{initials}</span>
{/if}
