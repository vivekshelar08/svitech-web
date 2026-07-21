"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  SettingsFormBody,
  type SettingsSection,
} from "@/components/admin/settings-fields";
import { AdminAlert, AdminButton, AdminCard } from "@/components/admin/admin-ui";
import { adminJson } from "@/lib/admin-fetch";
import { defaultSiteSettings, type SiteSettings } from "@/lib/site-settings-defaults";

const previewBySection: Partial<Record<SettingsSection, string>> = {
  home: "/",
  site: "/",
  theme: "/",
  navigation: "/",
  pages: "/about",
  listings: "/programs",
  board: "/reports",
  detail: "/programs",
  popup: "/",
  cache: "/",
  maintenance: "/",
};

export function SettingsTab({ section }: { section: SettingsSection }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [baseline, setBaseline] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const loadedFor = useRef<SettingsSection | null>(null);

  const serialized = useMemo(() => JSON.stringify(settings), [settings]);
  const dirty = Boolean(baseline) && serialized !== baseline;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError("");
      setStatus("");
      const result = await adminJson<{ settings: SiteSettings }>("/api/admin/settings", undefined, {
        retries: 1,
      });
      if (cancelled) return;
      setLoading(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSettings(result.data.settings);
      setBaseline(JSON.stringify(result.data.settings));
      loadedFor.current = section;
    })();
    return () => {
      cancelled = true;
    };
  }, [section]);

  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setStatus("Saving…");
    const result = await adminJson<{ settings: SiteSettings }>(
      "/api/admin/settings",
      {
        method: "PUT",
        body: JSON.stringify({ settings }),
      },
      { retries: 2 },
    );
    setSaving(false);
    if (!result.ok) {
      setStatus("");
      setError(result.error);
      return;
    }
    setSettings(result.data.settings);
    setBaseline(JSON.stringify(result.data.settings));
    setStatus("Saved — live site updated.");
  }

  function discardChanges() {
    if (!baseline) return;
    if (dirty && !confirm("Discard unsaved changes?")) return;
    setSettings(JSON.parse(baseline) as SiteSettings);
    setError("");
    setStatus("Reverted to last saved version.");
  }

  if (loading) {
    return (
      <AdminCard>
        <p className="text-sm text-ink-muted">Loading settings…</p>
      </AdminCard>
    );
  }

  const previewHref = previewBySection[section] || "/";

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {dirty ? (
          <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-ink">
            Unsaved changes
          </span>
        ) : (
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            In sync
          </span>
        )}
        <a
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
        >
          Preview page ↗
        </a>
        <span className="text-xs text-ink-muted">
          Edit freely — nothing goes live until you Save.
        </span>
      </div>

      {error && (
        <AdminAlert tone="error" title="Could not save">
          {error}
        </AdminAlert>
      )}

      <AdminCard padding="lg">
        <SettingsFormBody section={section} settings={settings} setSettings={setSettings} />
      </AdminCard>

      <div className="sticky bottom-4 z-10 mx-0 mb-[env(safe-area-inset-bottom)] flex flex-wrap items-center gap-3 rounded-2xl border border-line/80 bg-white/95 px-4 py-3 shadow-[0_8px_30px_rgba(12,46,47,0.08)] backdrop-blur sm:gap-4 sm:px-5 sm:py-4">
        <AdminButton type="submit" variant="primary" disabled={saving || !dirty}>
          {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          disabled={!dirty || saving}
          onClick={discardChanges}
        >
          Discard
        </AdminButton>
        {status && !error && <p className="text-sm text-brand">{status}</p>}
      </div>
    </form>
  );
}
