"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  SettingsFormBody,
  type SettingsSection,
} from "@/components/admin/settings-fields";
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
    return <p className="text-sm text-ink-muted">Loading settings…</p>;
  }

  return (
    <form onSubmit={onSave} className="space-y-8">
      <SettingsFormBody section={section} settings={settings} setSettings={setSettings} />
      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {status && <p className="text-sm text-ink-muted">{status}</p>}
      </div>
    </form>
  );
}
