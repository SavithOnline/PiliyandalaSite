-- Limit public API writes to the fields the forum actually exposes.
-- RLS controls which rows a user may change; these grants also prevent an
-- authenticated user from promoting themselves or rewriting ownership and
-- moderation fields by calling the REST API directly.

revoke insert, update, delete on public.profiles from anon;
revoke insert, update on public.profiles from authenticated;
grant update (display_name, avatar_url) on public.profiles to authenticated;

revoke insert, update, delete on public.categories from anon, authenticated;

revoke insert, update, delete on public.threads from anon;
revoke insert, update on public.threads from authenticated;
grant insert (category_id, author_id, title, body) on public.threads to authenticated;
grant update (title, body) on public.threads to authenticated;

revoke insert, update, delete on public.posts from anon;
revoke insert, update on public.posts from authenticated;
grant insert (thread_id, author_id, body) on public.posts to authenticated;
grant update (body, edited_at) on public.posts to authenticated;
