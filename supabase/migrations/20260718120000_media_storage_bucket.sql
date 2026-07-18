-- Public media bucket for admin image/PDF uploads.
-- Uploads go through the service role from /api/admin/upload.
-- Public read so next/image and <img> can load assets.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  8388608,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
    'application/pdf'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public_read_media" on storage.objects;
create policy "public_read_media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

-- Service role bypasses RLS; these policies help if you later upload with authenticated users.
drop policy if exists "authenticated_insert_media" on storage.objects;
create policy "authenticated_insert_media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "authenticated_update_media" on storage.objects;
create policy "authenticated_update_media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');
