"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AccountTab } from "@/components/admin/AccountTab";
import { AdminBackendBanner } from "@/components/admin/AdminBackendBanner";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ContentTab } from "@/components/admin/ContentTab";
import { DashboardTab, InboxTab } from "@/components/admin/DashboardTab";
import { SettingsTab } from "@/components/admin/SettingsTab";
import {
  contentTabs,
  navGroups,
  settingsTabs,
  tabHints,
  tabLabels,
  type AdminInbox,
  type AdminTab,
  type ContentTabType,
  type SettingsTabType,
} from "@/components/admin/admin-types";

export function AdminPanel({
  initialResetToken,
}: {
  initialResetToken?: string | null;
}) {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [inbox, setInbox] = useState<AdminInbox | null>(null);
  const [seedStatus, setSeedStatus] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [hasCustomPassword, setHasCustomPassword] = useState(false);
  const [hasEnvPassword, setHasEnvPassword] = useState(false);
  const [backend, setBackend] = useState<{
    supabase: boolean;
    supabaseServiceRole: boolean;
  } | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin");
      const json = (await res.json()) as {
        authenticated?: boolean;
        email?: string | null;
        hasCustomPassword?: boolean;
        hasEnvPassword?: boolean;
        backend?: { supabase: boolean; supabaseServiceRole: boolean };
      };
      setHasCustomPassword(Boolean(json.hasCustomPassword));
      setHasEnvPassword(Boolean(json.hasEnvPassword));
      setBackend(json.backend ?? null);
      if (json.authenticated) {
        setAuthed(true);
        setEmail(json.email || null);
        await loadInbox();
      }
    })();
  }, []);

  async function loadInbox() {
    const res = await fetch("/api/admin", { method: "PUT" });
    if (!res.ok) return;
    setInbox((await res.json()) as AdminInbox);
  }

  async function refreshProfile() {
    const res = await fetch("/api/admin");
    const json = (await res.json()) as {
      email?: string | null;
      hasCustomPassword?: boolean;
      hasEnvPassword?: boolean;
      backend?: { supabase: boolean; supabaseServiceRole: boolean };
    };
    setEmail(json.email || null);
    setHasCustomPassword(Boolean(json.hasCustomPassword));
    setHasEnvPassword(Boolean(json.hasEnvPassword));
    setBackend(json.backend ?? null);
  }

  async function logout() {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthed(false);
    setInbox(null);
    setTab("dashboard");
  }

  async function seedContent() {
    setSeedStatus("Importing starter content…");
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const json = (await res.json()) as { error?: string; counts?: Record<string, number> };
    if (!res.ok) {
      setSeedStatus(json.error || "Import failed");
      return;
    }
    setSeedStatus(
      `Imported: ${Object.entries(json.counts || {})
        .map(([k, v]) => `${k} ${v}`)
        .join(", ")}`,
    );
    await loadInbox();
  }

  if (!authed) {
    return (
      <AdminLogin
        initialResetToken={initialResetToken}
        onSuccess={async () => {
          setAuthed(true);
          await refreshProfile();
          await loadInbox();
        }}
      />
    );
  }

  return (
    <div className="min-h-svh bg-[radial-gradient(ellipse_at_top_left,_#e7f2ef,_transparent_45%),linear-gradient(180deg,#f7f4ef,#efe8df)]">
      <div className="mx-auto flex min-h-svh max-w-7xl">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-line bg-bg-deep text-surface transition md:static md:translate-x-0 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-5 py-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-bright">
                SVITECH
              </p>
              <p className="mt-2 font-display text-2xl font-bold">Admin</p>
              <p className="mt-1 truncate text-sm text-white/55">{email}</p>
            </div>

            <nav className="mt-8 flex-1 space-y-6 overflow-y-auto" aria-label="Admin">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                    {group.label}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((key) => (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => {
                            setTab(key);
                            setNavOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm font-medium transition ${
                            tab === key
                              ? "bg-brand text-white"
                              : "text-white/75 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {tabLabels[key]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <Link
                href="/"
                className="block px-3 py-2 text-sm text-white/70 hover:text-white"
              >
                View public site
              </Link>
              <button
                type="button"
                onClick={() => void logout()}
                className="w-full px-3 py-2 text-left text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {navOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-ink/40 md:hidden"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] px-5 py-4 backdrop-blur md:px-8">
            <div className="min-w-0">
              <button
                type="button"
                className="mb-2 border border-line px-3 py-1.5 text-xs font-semibold md:hidden"
                onClick={() => setNavOpen(true)}
              >
                Menu
              </button>
              <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">
                {tabLabels[tab]}
              </h1>
              <p className="mt-1 text-sm text-ink-muted">{tabHints[tab]}</p>
            </div>
          </header>

          <div className="flex-1 px-5 py-8 md:px-8 md:py-10">
            <AdminBackendBanner backend={backend} />
            {tab === "dashboard" && (
              <DashboardTab
                inbox={inbox}
                onSeed={() => void seedContent()}
                seedStatus={seedStatus}
              />
            )}
            {tab === "inbox" && <InboxTab inbox={inbox} />}
            {contentTabs.includes(tab as ContentTabType) && (
              <ContentTab type={tab as ContentTabType} />
            )}
            {settingsTabs.includes(tab as SettingsTabType) && (
              <SettingsTab section={tab as SettingsTabType} />
            )}
            {tab === "account" && (
              <AccountTab
                email={email}
                hasCustomPassword={hasCustomPassword}
                hasEnvPassword={hasEnvPassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
