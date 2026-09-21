-- Photo gallery CMS items for home + /gallery

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  summary text not null,
  image text not null,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_items_sort_idx
  on public.gallery_items (sort_order, created_at);

create index if not exists gallery_items_category_idx
  on public.gallery_items (category);

alter table public.gallery_items enable row level security;

drop policy if exists "public_read_published_gallery" on public.gallery_items;
create policy "public_read_published_gallery"
  on public.gallery_items for select to anon, authenticated
  using (published = true);

-- Admin writes use the service role key (bypasses RLS).
