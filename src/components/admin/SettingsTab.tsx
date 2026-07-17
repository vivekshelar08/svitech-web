"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  SettingsFormBody,
  type SettingsSection,
} from "@/components/admin/settings-fields";
import { AdminButton, AdminCard } from "@/components/admin/admin-ui";
import { defaultSiteSettings, type SiteSettings } from "@/lib/site-settings-defaults";

export function SettingsTab({ section }: { section: SettingsSection }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      setLoading(false);
      if (!res.ok) {
        setStatus("Could not load settings");
        return;
      }
      const json = (await res.json()) as { settings: SiteSettings };
      setSettings(json.settings);
      setStatus("");
    })();
  }, [section]);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    setSaving(false);
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setStatus(json.error || "Save failed");
      return;
    }
    const json = (await res.json()) as { settings: SiteSettings };
    setSettings(json.settings);
    setStatus("Saved — changes are live on the public site.");
  }

  if (loading) {
    return (
      <AdminCard>
        <p className="text-sm text-ink-muted">Loading settings…</p>
      </AdminCard>
    );
  }

  return (
    <form onSubmit={onSave} className="space-y-6">
      <AdminCard padding="lg">
        <SettingsFormBody section={section} settings={settings} setSettings={setSettings} />
      </AdminCard>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-4 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_8px_30px_rgba(12,46,47,0.08)] backdrop-blur">
        <AdminButton type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </AdminButton>
        {status && (
          <p
            className={
              status.includes("failed") || status.includes("Could not")
                ? "text-sm text-accent"
                : "text-sm text-brand"
            }
          >
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
