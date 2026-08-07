# Piliyandala

Information site and community forum for Piliyandala, Sri Lanka. Built with
SvelteKit (runes mode), TypeScript, and Supabase (Postgres + auth), deployed to
Vercel under the `/Piliyandala` base path.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) with the Vercel adapter
- [Supabase](https://supabase.com) — Postgres, Row Level Security, magic-link auth
- Content for the info pages lives verbatim in `src/lib/content/*.ts`
- Fonts: [Schibsted Grotesk Variable](https://fontsource.org/fonts/schibsted-grotesk) (Latin) with a system Noto Sans Sinhala fallback

## Project structure

```
src/
  lib/
    content/        # page content (about, history, landmarks, ...)
    components/     # Header, Footer, Prose, Pagination, Avatar, ...
    server/data.ts  # typed data access with graceful DB fallback
    database.types.ts  # hand-generated Supabase types (mirrors migrations)
  hooks.server.ts   # Supabase SSR client + safe session helper
  routes/           # pages: /, /about, /history, ..., /forum/..., /login
supabase/
  migrations/       # 00001_init.sql (schema + RLS + seed), 00002_category_overview.sql
```

## Local development

Prerequisites: Node 20+, and optionally Docker for the local Supabase stack.

```sh
npm install
npm run dev        # http://localhost:5173/Piliyandala
```

### Database

With Docker available:

```sh
supabase start
supabase db reset  # applies migrations and seeds categories
supabase gen types typescript --local > src/lib/database.types.ts
```

Copy `.env.example` to `.env` and point it at your Supabase project (local or
hosted). Values needed:

| Variable | Description |
| --- | --- |
| `PUBLIC_SUPABASE_URL` | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only) |

### Auth

Magic-link sign-in is used. In the Supabase dashboard, add the redirect URL
`http://localhost:5173/Piliyandala/auth/callback` to
Authentication → URL Configuration → Redirect URLs (and the production URL,
e.g. `https://savith.online/Piliyandala/auth/callback`).

Magic links use Supabase's implicit browser flow so a user can request the
email in one mobile browser and open it in another. The callback stores the
session in SSR cookies. It also accepts older PKCE links, though those older
links must be opened in the browser that requested them.

## Checks and build

```sh
npm run check     # svelte-check (types)
npm run build     # production build via @sveltejs/adapter-vercel
```

## Deployment (Vercel)

1. `vercel link` (project: `piliyandala`) and set the env vars above with
   `vercel env add`.
2. `vercel --prod`
3. The site serves at `<origin>/Piliyandala` (`vite.config.ts` sets
   `paths.base`). A `vercel.json` rewrite on `savith.online` proxies
   `savith.online/Piliyandala` to this deployment.

## Forum notes

- Anonymous users can browse; posting and replying require magic-link sign-in.
- Users who confirm a link from their profile email become site admins
  (`profiles.is_admin`) with rights to delete posts/threads.
- When the database is unreachable, pages render with an empty-state banner
  instead of failing (see `safe()` in `src/lib/server/data.ts`).
