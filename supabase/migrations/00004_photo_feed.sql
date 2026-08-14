-- Community photo feed: public viewing with member-only uploads.

create table public.photo_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  storage_path text not null unique,
  caption text not null default '' check (char_length(caption) <= 240),
  created_at timestamptz not null default now()
);

create index photo_posts_created_at_idx on public.photo_posts (created_at desc);
create index photo_posts_author_idx on public.photo_posts (author_id);

alter table public.photo_posts enable row level security;

create policy "photo_posts_select_public" on public.photo_posts
  for select using (true);

create policy "photo_posts_insert_own" on public.photo_posts
  for insert with check (auth.uid() = author_id);

create policy "photo_posts_delete_own_or_admin" on public.photo_posts
  for delete using (auth.uid() = author_id or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin
  ));

revoke insert, update, delete on public.photo_posts from anon;
revoke insert, update on public.photo_posts from authenticated;
grant insert (author_id, storage_path, caption) on public.photo_posts to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'photo-feed',
  'photo-feed',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "photo_feed_upload_own_folder" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'photo-feed'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "photo_feed_delete_own" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'photo-feed'
    and owner_id = auth.uid()::text
  );
