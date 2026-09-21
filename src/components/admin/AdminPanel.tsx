"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AccountTab } from "@/components/admin/AccountTab";
import { AdminBackendBanner } from "@/components/admin/AdminBackendBanner";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ContentTab } from "@/components/admin/ContentTab";
import { DashboardTab } from "@/components/admin/DashboardTab";
import { InboxTab } from "@/components/admin/InboxTab";
import { SettingsTab } from "@/components/admin/SettingsTab";
import { AdminButton, AdminPage, NavIcon, cn } from "@/components/admin/admin-ui";
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
  const [refreshing, setRefreshing] = useState(false);
  const [navQuery, setNavQuery] = useState("");

  const navId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavRef = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (!navOpen) return;
    window.setTimeout(() => firstNavRef.current?.focus(), 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNavOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [tab]);

  async function loadInbox() {
    setRefreshing(true);
    const res = await fetch("/api/admin", { method: "PUT" });
    setRefreshing(false);
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

  function goToTab(key: AdminTab) {
    setTab(key);
    setNavOpen(false);
    setNavQuery("");
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

  const q = navQuery.trim().toLowerCase();
  let firstNavAssigned = false;

  return (
    <div className="admin-app min-h-svh">
      <a href="#admin-main" className="admin-skip-link">
        Skip to content
      </a>

      <div className="flex min-h-svh">
        <aside
          id={navId}
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-[min(18rem,88vw)] flex-col border-r border-white/10 bg-[linear-gradient(180deg,var(--bg-deep)_0%,#0a1628_100%)] text-white shadow-2xl transition-transform duration-200 md:static md:w-[17.5rem] md:translate-x-0",
            navOpen ? "translate-x-0" : "-translate-x-full",
          )}
          aria-label="Admin navigation"
          aria-hidden={navOpen ? undefined : undefined}
        >
          <div className="border-b border-white/10 px-5 py-5">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white shadow-lg shadow-brand/25"
                aria-hidden
              >
                S
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold leading-tight">SVITECH</p>
                <p className="text-xs text-white/50">Admin console</p>
              </div>
            </div>
            {email ? (
              <p className="mt-4 truncate rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                Signed in as <span className="font-medium text-white/90">{email}</span>
              </p>
            ) : null}
          </div>

          <div className="border-b border-white/10 px-3 py-3">
            <label className="sr-only" htmlFor="admin-nav-search">
              Search admin sections
            </label>
            <input
              id="admin-nav-search"
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              placeholder="Search sections…"
              autoComplete="off"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-bright/50 focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="Sections">
            {navGroups.map((group) => {
              const items = group.items.filter((key) => {
                if (!q) return true;
                return (
                  tabLabels[key].toLowerCase().includes(q) ||
                  tabHints[key].toLowerCase().includes(q) ||
                  group.label.toLowerCase().includes(q)
                );
              });
              if (items.length === 0) return null;
              return (
                <div key={group.label}>
                  <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5">
                    {items.map((key) => {
                      const active = tab === key;
                      const assignFirst = !firstNavAssigned;
                      if (assignFirst) firstNavAssigned = true;
                      return (
                        <li key={key}>
                          <button
                            ref={assignFirst ? firstNavRef : undefined}
                            type="button"
                            onClick={() => goToTab(key)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright/50",
                              active
                                ? "bg-white/12 text-white shadow-inner ring-1 ring-white/10"
                                : "text-white/70 hover:bg-white/6 hover:text-white",
                            )}
                          >
                            <NavIcon tab={key} />
                            <span className="flex-1 truncate">{tabLabels[key]}</span>
                            {key === "inbox" &&
                            inbox?.stats &&
                            inbox.stats.inboxTotal > 0 ? (
                              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-ink">
                                {inbox.stats.inboxTotal}
                              </span>
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            {q &&
              navGroups.every((group) =>
                group.items.every((key) => {
                  return !(
                    tabLabels[key].toLowerCase().includes(q) ||
                    tabHints[key].toLowerCase().includes(q) ||
                    group.label.toLowerCase().includes(q)
                  );
                }),
              ) && (
                <p className="px-3 text-sm text-white/45" role="status">
                  No matching sections.
                </p>
              )}
          </nav>

          <div className="space-y-1 border-t border-white/10 p-3">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright/50"
            >
              <span aria-hidden>↗</span> View public site
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/80 transition hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright/50"
            >
              Sign out
            </button>
          </div>
        </aside>

        {navOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-[color-mix(in_srgb,var(--bg-deep)_50%,transparent)] backdrop-blur-[2px] md:hidden"
            aria-label="Close navigation menu"
            onClick={() => {
              setNavOpen(false);
              menuButtonRef.current?.focus();
            }}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="admin-topbar sticky top-0 z-20 border-b border-line/70 px-4 py-4 md:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <button
                  ref={menuButtonRef}
                  type="button"
                  className="mb-3 inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold shadow-sm transition hover:border-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 md:hidden"
                  onClick={() => setNavOpen(true)}
                  aria-expanded={navOpen}
                  aria-controls={navId}
                >
                  <span className="flex flex-col gap-0.5" aria-hidden>
                    <span className="block h-0.5 w-4 bg-ink" />
                    <span className="block h-0.5 w-4 bg-ink" />
                    <span className="block h-0.5 w-4 bg-ink" />
                  </span>
                  Menu
                </button>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  {tab === "dashboard" ? "Overview" : "Workspace"}
                </p>
                <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">
                  {tabLabels[tab]}
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  {tabHints[tab]}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(tab === "dashboard" || tab === "inbox") && (
                  <AdminButton
                    variant="secondary"
                    onClick={() => void loadInbox()}
                    disabled={refreshing}
                    aria-busy={refreshing}
                  >
                    {refreshing ? "Refreshing…" : "Refresh"}
                  </AdminButton>
                )}
                <AdminButton
                  variant="primary"
                  onClick={() => window.open("/", "_blank")}
                  className="hidden sm:inline-flex"
                >
                  Live site
                </AdminButton>
              </div>
            </div>
          </header>

          <main
            id="admin-main"
            ref={mainRef}
            tabIndex={-1}
            className="flex-1 px-4 py-6 outline-none md:px-8 md:py-8"
          >
            <AdminPage>
              <AdminBackendBanner backend={backend} />
              {tab === "dashboard" && (
                <DashboardTab
                  inbox={inbox}
                  email={email}
                  backend={backend}
                  onSeed={() => void seedContent()}
                  seedStatus={seedStatus}
                  onNavigate={setTab}
                />
              )}
              {tab === "inbox" && (
                <InboxTab inbox={inbox} onRefresh={() => void loadInbox()} />
              )}
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
            </AdminPage>
          </main>
        </div>
      </div>
    </div>
  );
}
