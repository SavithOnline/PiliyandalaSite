<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Avatar from './Avatar.svelte';

	let { user, profile }: { user: App.PageData['user']; profile: App.PageData['profile'] } =
		$props();

	let menuOpen = $state(false);

	const nav = $derived([
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/history`, label: 'History' },
		{ href: `${base}/landmarks`, label: 'Landmarks' },
		{ href: `${base}/geography`, label: 'Geography' },
		{ href: `${base}/transport`, label: 'Transport' },
		{ href: `${base}/community`, label: 'Community' },
		{ href: `${base}/forum`, label: 'Forum' }
	]);

	function isActive(href: string): boolean {
		if (href === `${base}/`) return page.url.pathname === `${base}/`;
		return page.url.pathname.startsWith(href);
	}

	const initials = $derived(
		(profile?.display_name ?? user?.email ?? '?').trim().slice(0, 2).toUpperCase()
	);
</script>

<header class="site-header">
	<a class="skip-link" href="#main">Skip to content</a>
	<div class="wrap site-header__bar">
		<a class="wordmark" href="{base}/">
			පිළියන්දල
			<small>Piliyandala · Western Province</small>
		</a>

		<div class="site-nav">
			{#each nav as item (item.href)}
				<a
					class="site-nav__link"
					class:site-nav__link--active={isActive(item.href)}
					href={item.href}
				>{item.label}</a
				>
			{/each}
			<span aria-hidden="true" style="width:0.6rem"></span>
			{#if user}
				<a class="site-nav__link nav-cta" href="{base}/forum/profile/{user.id}">
					<Avatar user={profile} size="sm" />
					<span style="margin-left:0.4rem">{profile?.display_name ?? 'My profile'}</span>
				</a>
				<form action="{base}/logout?/signout" method="post">
					<button class="btn btn--sm" type="submit">Log out</button>
				</form>
			{:else}
				<a class="btn btn--sm btn--primary nav-cta" href="{base}/login">Log in</a>
			{/if}
		</div>

		<button
			class="nav-toggle"
			type="button"
			aria-expanded={menuOpen}
			aria-controls="mobile-nav"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? 'Close' : 'Menu'}
		</button>
	</div>

	<nav id="mobile-nav" class="mobile-nav" class:mobile-nav--open={menuOpen} aria-label="Main">
		{#each nav as item (item.href)}
			<a href={item.href} onclick={() => (menuOpen = false)}>{item.label}</a>
		{/each}
		{#if user}
			<a href="{base}/forum/profile/{user.id}" onclick={() => (menuOpen = false)}>
				My profile
			</a>
			<form action="{base}/logout?/signout" method="post">
				<button class="btn" type="submit" style="margin-top:0.6rem;width:100%">Log out</button>
			</form>
		{:else}
			<a href="{base}/login" onclick={() => (menuOpen = false)}>Log in</a>
		{/if}
	</nav>
</header>
