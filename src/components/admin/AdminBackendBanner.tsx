"use client";

import { AdminAlert } from "@/components/admin/admin-ui";

export function AdminBackendBanner({
  backend,
}: {
  backend: { supabase: boolean; supabaseServiceRole: boolean } | null;
}) {
  if (!backend || backend.supabaseServiceRole) return null;

  return (
    <div className="mb-6">
      <AdminAlert title="CMS and inbox need Supabase service role" tone="warning">
        <p>
          Publish, save, inbox, and site settings will not work on the live server until{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> is set in Hostinger and the app is redeployed.
        </p>
        {!backend.supabase && (
          <p className="mt-2 text-xs">
            Also set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
          </p>
        )}
      </AdminAlert>
    </div>
  );
}
