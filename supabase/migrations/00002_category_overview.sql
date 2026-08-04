-- Piliyandala site — helper RPCs.

-- One query for the forum home page: per-category thread/post counts and the
-- most recently active thread.
create or replace function public.category_overview()
returns table (
  id bigint,
  name text,
  slug text,
  description text,
  sort_order integer,
  thread_count bigint,
  post_count bigint,
  last_thread_id uuid,
  last_thread_title text,
  last_activity_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.id,
    c.name,
    c.slug,
    c.description,
    c.sort_order,
    coalesce(stats.thread_count, 0)::bigint,
    coalesce(stats.post_count, 0)::bigint,
    stats.last_thread_id,
    stats.last_thread_title,
    stats.last_activity_at
  from public.categories c
  left join lateral (
    select
      count(distinct th.id) as thread_count,
      count(p.id) as post_count,
      (array_agg(th.id order by th.updated_at desc nulls last))[1] as last_thread_id,
      (array_agg(th.title order by th.updated_at desc nulls last))[1] as last_thread_title,
      max(th.updated_at) as last_activity_at
    from public.threads th
    left join public.posts p on p.thread_id = th.id
    where th.category_id = c.id
  ) stats on true
  order by c.sort_order, c.id;
$$;

grant execute on function public.category_overview() to anon, authenticated, service_role;
