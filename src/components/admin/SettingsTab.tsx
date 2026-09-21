"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useAdminConfirm } from "@/components/admin/AdminDialog";
import {
  SettingsFormBody,
  type SettingsSection,
} from "@/components/admin/settings-fields";
import {
  AdminAlert,
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminStatus,
} from "@/components/admin/admin-ui";
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
  const { confirm, dialog: confirmDialog } = useAdminConfirm();
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

  async function discardChanges() {
    if (!baseline) return;
    if (dirty) {
      const ok = await confirm({
        title: "Discard unsaved changes?",
        description: "Your edits on this page will be lost. The last saved version will be restored.",
        confirmLabel: "Discard changes",
        cancelLabel: "Keep editing",
        tone: "danger",
      });
      if (!ok) return;
    }
    setSettings(JSON.parse(baseline) as SiteSettings);
    setError("");
    setStatus("Reverted to last saved version.");
  }

  if (loading) {
    return (
      <AdminCard>
        <p className="text-sm text-ink-muted" role="status">
          Loading settings…
        </p>
      </AdminCard>
    );
  }

  const previewHref = previewBySection[section] || "/";

  return (
    <form onSubmit={onSave} className="space-y-6">
      {confirmDialog}
      <div className="flex flex-wrap items-center gap-2">
        {dirty ? (
          <AdminBadge tone="warning">Unsaved changes</AdminBadge>
        ) : (
          <AdminBadge tone="brand">In sync</AdminBadge>
        )}
        <a
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-8 items-center rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink transition hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          Preview page ↗
        </a>
        <span className="text-xs text-ink-muted">
          Edit freely — nothing goes live until you Save.
        </span>
      </div>

      {error ? (
        <AdminAlert tone="error" title="Could not save">
          {error}
        </AdminAlert>
      ) : null}

      <AdminCard padding="lg">
        <SettingsFormBody section={section} settings={settings} setSettings={setSettings} />
      </AdminCard>

      <div className="sticky bottom-4 z-10 mb-[env(safe-area-inset-bottom)] flex flex-wrap items-center gap-3 rounded-2xl border border-line/80 bg-white/95 px-4 py-3 shadow-[0_8px_30px_rgba(18,28,46,0.1)] backdrop-blur-md sm:gap-4 sm:px-5 sm:py-4">
        <AdminButton type="submit" variant="primary" disabled={saving || !dirty}>
          {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          disabled={!dirty || saving}
          onClick={() => void discardChanges()}
        >
          Discard
        </AdminButton>
        {!error ? <AdminStatus tone="success">{status}</AdminStatus> : null}
      </div>
    </form>
  );
}
