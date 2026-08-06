import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			csrf: {
				// savith.online is the public origin. Its portfolio deployment proxies
				// /Piliyandala to this Vercel project, whose internal origin differs.
				trustedOrigins: ['https://savith.online']
			},
			paths: {
				base: '/Piliyandala',
				relative: false
			}
		})
	]
});
