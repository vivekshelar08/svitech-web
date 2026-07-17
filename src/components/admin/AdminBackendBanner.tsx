"use client";

export function AdminBackendBanner({
  backend,
}: {
  backend: { supabase: boolean; supabaseServiceRole: boolean } | null;
}) {
  if (!backend || backend.supabaseServiceRole) return null;

  return (
    <div className="mb-6 border border-accent/50 bg-accent-soft px-4 py-3 text-sm text-ink">
      <p className="font-semibold">CMS and inbox need Supabase service role</p>
      <p className="mt-1">
        Publish, save, inbox, and site settings will not work on the live server until{" "}
        <code>SUPABASE_SERVICE_ROLE_KEY</code> is set in Hostinger environment variables
        and the app is redeployed.
      </p>
      {!backend.supabase && (
        <p className="mt-2 text-xs text-ink-muted">
          Also set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
        </p>
      )}
    </div>
  );
}
