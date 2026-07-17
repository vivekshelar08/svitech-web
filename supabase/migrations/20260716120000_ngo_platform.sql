-- SVITECH Foundation NGO platform schema
-- Run in Supabase SQL Editor (or via CLI) before going live.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Contact messages
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null default 'Other',
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "anon_insert_contact"
  on public.contact_messages for insert to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- Volunteer applications
-- ---------------------------------------------------------------------------
create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  skills text not null,
  availability text not null,
  motivation text not null,
  created_at timestamptz not null default now()
);

alter table public.volunteer_applications enable row level security;

create policy "anon_insert_volunteer"
  on public.volunteer_applications for insert to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- Newsletter
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "anon_insert_newsletter"
  on public.newsletter_subscribers for insert to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- Donations (no crypto)
-- ---------------------------------------------------------------------------
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  amount_paise integer not null check (amount_paise >= 10000),
  currency text not null default 'INR',
  frequency text not null check (frequency in ('one_time', 'monthly')),
  status text not null default 'created'
    check (status in ('created', 'pending', 'paid', 'failed', 'cancelled')),
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_subscription_id text,
  receipt_sent boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists donations_email_idx on public.donations (email);
create index if not exists donations_order_idx on public.donations (razorpay_order_id);

alter table public.donations enable row level security;

create policy "anon_insert_donations"
  on public.donations for insert to anon, authenticated
  with check (true);

-- Public reads blocked; service role used for updates/admin.

-- ---------------------------------------------------------------------------
-- Event registrations
-- ---------------------------------------------------------------------------
create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,
  name text not null,
  email text not null,
  phone text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.event_registrations enable row level security;

create policy "anon_insert_event_reg"
  on public.event_registrations for insert to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- CMS: posts, events, impact stories, reports, programs
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  body text not null,
  location text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  cover_image text,
  registration_open boolean not null default true,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.impact_stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null,
  lat double precision,
  lng double precision,
  metric_label text not null,
  metric_value text not null,
  summary text not null,
  body text not null,
  cover_image text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  title text not null,
  description text not null,
  file_url text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text not null,
  detail text not null,
  body text not null,
  cover_image text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.events enable row level security;
alter table public.impact_stories enable row level security;
alter table public.reports enable row level security;
alter table public.programs enable row level security;

create policy "public_read_published_posts"
  on public.posts for select to anon, authenticated
  using (published = true);

create policy "public_read_published_events"
  on public.events for select to anon, authenticated
  using (published = true);

create policy "public_read_published_impact"
  on public.impact_stories for select to anon, authenticated
  using (published = true);

create policy "public_read_published_reports"
  on public.reports for select to anon, authenticated
  using (published = true);

create policy "public_read_published_programs"
  on public.programs for select to anon, authenticated
  using (published = true);

-- Admin writes use the service role key (bypasses RLS).
