<script lang="ts">
	import { base } from '$app/paths';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Log in — Piliyandala Forum</title>
	<meta name="description" content="Log in to the Piliyandala community forum with your email." />
</svelte:head>

<div class="wrap" style="max-width:640px">
	{#if form?.sent}
		<div class="sent-state">
			<span class="eyebrow" style="display:block;margin-bottom:1rem">Log in</span>
			<h1>Check your inbox</h1>
			<p>
				We've sent a sign-in link to
				<span class="sent-state__email">{form.email}</span>. Click the link in the email to
				finish logging in — it will bring you straight back here.
			</p>
			<p class="form-note">
				You can open the link in your usual browser, even if it is different from this one.
				No email yet? Check your spam folder, then try again.
			</p>
		</div>
	{:else}
		<div class="auth-card">
			<span class="eyebrow" style="display:block;margin-bottom:0.9rem">Forum</span>
			<h1>Log in with your email</h1>
			<p class="lede">
				No password needed. Enter your email and we'll send you a magic sign-in link.
				Reading the forum is free — logging in lets you post.
			</p>

			{#if data.errorMessage}
				<p class="form-error">{data.errorMessage}</p>
			{/if}
			{#if form?.error}
				<p class="form-error">{form.error}</p>
			{/if}

			<form method="post" action="?/signin">
				<input type="hidden" name="next" value={form?.next ?? data.next} />
				<div class="field">
					<label for="email">Email address</label>
					<input
						id="email"
						class="input"
						type="email"
						name="email"
						value={form?.email ?? ''}
						required
						autocomplete="email"
						placeholder="you@example.com"
					/>
				</div>
				<button class="btn btn--primary" type="submit" style="width:100%">
					Send sign-in link
				</button>
			</form>
			<p class="form-note">
				By posting you agree to keep it civil — this is a small-town forum, not a battleground.
			</p>
		</div>
	{/if}
</div>
