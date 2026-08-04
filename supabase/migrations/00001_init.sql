-- Piliyandala site & forum — initial schema, RLS, triggers, seed data.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row when a user signs up / signs in for the first time.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      split_part(coalesce(new.email, 'user'), '@', 1)
    ),
    null
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
create table public.categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique,
  description text not null default '',
  sort_order integer not null default 0
);

insert into public.categories (name, slug, description, sort_order) values
  ('General Discussion', 'general', 'Anything and everything about Piliyandala — news, questions and everyday chatter.', 1),
  ('Town News & Events', 'news-events', 'Development projects, municipal notices, festivals and community events.', 2),
  ('Transport & Roads', 'transport-roads', 'Bus routes, traffic, road works and getting around the town.', 3),
  ('Education & Schools', 'education', 'Schools, tuition, exams and education matters in and around Piliyandala.', 4),
  ('History & Heritage', 'history-heritage', 'The Clock Tower, local legends, old photographs and memories of the town.', 5),
  ('Business & Services', 'business-services', 'Local shops, markets, restaurants and recommendations.', 6);

-- ---------------------------------------------------------------------------
-- Threads
-- ---------------------------------------------------------------------------
create table public.threads (
  id uuid primary key default gen_random_uuid(),
  category_id bigint not null references public.categories (id) on delete restrict,
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 3 and 200),
  body text not null check (char_length(body) between 1 and 20000),
  pinned boolean not null default false,
  locked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index threads_category_id_idx on public.threads (category_id);
create index threads_category_activity_idx on public.threads (category_id, updated_at desc);
create index threads_author_idx on public.threads (author_id);
create index threads_created_at_idx on public.threads (created_at desc);

-- ---------------------------------------------------------------------------
-- Posts (replies)
-- ---------------------------------------------------------------------------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 20000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  edited_at timestamptz
);

create index posts_thread_id_idx on public.posts (thread_id);
create index posts_thread_created_idx on public.posts (thread_id, created_at);
create index posts_author_idx on public.posts (author_id);
create index posts_created_at_idx on public.posts (created_at desc);

-- ---------------------------------------------------------------------------
-- Updated-at maintenance
-- ---------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger threads_set_updated_at
  before update on public.threads
  for each row execute function public.set_updated_at();

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- Bump a thread's activity timestamp whenever a reply is added.
create function public.bump_thread()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.threads set updated_at = now() where id = new.thread_id;
  return new;
end;
$$;

create trigger posts_bump_thread
  after insert on public.posts
  for each row execute function public.bump_thread();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.threads enable row level security;
alter table public.posts enable row level security;

-- profiles: readable by everyone; users edit only their own row.
create policy "profiles_select_public" on public.profiles
  for select using (true);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- categories: readable by everyone, no writes from the API.
create policy "categories_select_public" on public.categories
  for select using (true);

-- threads: readable by everyone; only the author (or an admin) may
-- insert/update/delete.
create policy "threads_select_public" on public.threads
  for select using (true);

create policy "threads_insert_own" on public.threads
  for insert with check (auth.uid() = author_id);

create policy "threads_update_own_or_admin" on public.threads
  for update using (auth.uid() = author_id or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin
  ));

create policy "threads_delete_own_or_admin" on public.threads
  for delete using (auth.uid() = author_id or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin
  ));

-- posts: readable by everyone; only the author (or an admin) may
-- insert/update/delete.
create policy "posts_select_public" on public.posts
  for select using (true);

create policy "posts_insert_own" on public.posts
  for insert with check (auth.uid() = author_id);

create policy "posts_update_own_or_admin" on public.posts
  for update using (auth.uid() = author_id or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin
  ));

create policy "posts_delete_own_or_admin" on public.posts
  for delete using (auth.uid() = author_id or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin
  ));
