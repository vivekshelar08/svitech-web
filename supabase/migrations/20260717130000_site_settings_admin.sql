-- Site configuration + admin password override (service-role writes)

create table if not exists public.site_settings (
  id text primary key default 'default',
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "public_read_site_settings"
  on public.site_settings for select to anon, authenticated
  using (true);

insert into public.site_settings (id, value)
values ('default', '{}'::jsonb)
on conflict (id) do nothing;

-- Admin credentials (password hash + optional reset token). Never expose to anon.
create table if not exists public.admin_credentials (
  id text primary key default 'default',
  password_hash text,
  password_salt text,
  reset_token_hash text,
  reset_expires_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.admin_credentials enable row level security;

insert into public.admin_credentials (id)
values ('default')
on conflict (id) do nothing;
