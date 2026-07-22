-- Harden inbox + storage RLS.
-- Public forms write via Next.js API routes using the service role (bypasses RLS).
-- Open anon INSERT policies allowed anyone with the publishable key to spam/bypass the app.

drop policy if exists "anon_insert_contact" on public.contact_messages;
drop policy if exists "anon_insert_volunteer" on public.volunteer_applications;
drop policy if exists "anon_insert_newsletter" on public.newsletter_subscribers;
drop policy if exists "anon_insert_donations" on public.donations;
drop policy if exists "anon_insert_event_reg" on public.event_registrations;

-- admin_credentials: RLS on with no policies = deny all API roles (service role still works).
-- Explicit revoke for clarity.
revoke all on table public.admin_credentials from anon, authenticated;

-- Public bucket URLs work without a SELECT policy that lists every object.
drop policy if exists "public_read_media" on storage.objects;

-- Uploads use service role from /api/admin/upload — no authenticated client uploads.
drop policy if exists "authenticated_insert_media" on storage.objects;
drop policy if exists "authenticated_update_media" on storage.objects;
