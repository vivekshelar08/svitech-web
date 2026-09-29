"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AdminAlert,
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminEmpty,
  cn,
} from "@/components/admin/admin-ui";
import {
  activityLabels,
  websiteEditorMap,
  type ActivityItem,
  type AdminInbox,
  type AdminStats,
  type AdminTab,
  type ContentCounts,
} from "@/components/admin/admin-types";
import type { SiteSettings } from "@/lib/site-settings-defaults";

export function DashboardTab({
  inbox,
  email,
  backend,
  onSeed,
  seedStatus,
  onNavigate,
}: {
  inbox: AdminInbox | null;
  email: string | null;
  backend: { supabase: boolean; supabaseServiceRole: boolean } | null;
  onSeed: () => void;
  seedStatus: string;
  onNavigate: (tab: AdminTab) => void;
}) {
  const stats = inbox?.stats;
  const [popupEnabled, setPopupEnabled] = useState(false);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [cacheMode, setCacheMode] = useState<"live" | "cached">("live");
  const [siteBusy, setSiteBusy] = useState(false);
  const [siteMsg, setSiteMsg] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) return;
      const json = (await res.json()) as {
        settings?: {
          popup?: { enabled?: boolean };
          maintenance?: { enabled?: boolean };
          cache?: { mode?: "live" | "cached" };
        };
      };
      setPopupEnabled(Boolean(json.settings?.popup?.enabled));
      setMaintenanceEnabled(Boolean(json.settings?.maintenance?.enabled));
      setCacheMode(json.settings?.cache?.mode === "cached" ? "cached" : "live");
    })();
  }, []);

  async function patchSettings(
    patch: (settings: SiteSettings) => SiteSettings,
    okMessage: string,
  ) {
    setSiteBusy(true);
    setSiteMsg("");
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Could not load settings");
      const json = (await res.json()) as { settings: SiteSettings };
      const next = patch(json.settings);
      const save = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: next }),
      });
      if (!save.ok) {
        const err = (await save.json()) as { error?: string };
        throw new Error(err.error || "Save failed");
      }
      setSiteMsg(okMessage);
    } catch (err) {
      setSiteMsg(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSiteBusy(false);
    }
  }

  async function togglePopup(enabled: boolean) {
    setPopupEnabled(enabled);
    await patchSettings(
      (settings) => ({
        ...settings,
        popup: { ...settings.popup, enabled },
      }),
      enabled ? "Popup enabled on the public site." : "Popup disabled.",
    );
  }

  async function toggleMaintenance(enabled: boolean) {
    setMaintenanceEnabled(enabled);
    await patchSettings(
      (settings) => ({
        ...settings,
        maintenance: {
          ...settings.maintenance,
          enabled,
        },
      }),
      enabled
        ? "Maintenance mode ON — public site shows the maintenance page."
        : "Maintenance mode OFF — public site is live again.",
    );
  }

  async function toggleCacheMode(mode: "live" | "cached") {
    setCacheMode(mode);
    await patchSettings(
      (settings) => ({
        ...settings,
        cache: { ...settings.cache, mode },
      }),
      mode === "live" ? "Cache mode: live (always fresh)." : "Cache mode: cached (ISR).",
    );
  }

  async function purgeCache() {
    setSiteBusy(true);
    setSiteMsg("");
    try {
      const res = await fetch("/api/admin/revalidate", { method: "POST" });
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error || "Purge failed");
      }
      setSiteMsg("Public cache purged — pages will rebuild on next visit.");
    } catch (err) {
      setSiteMsg(err instanceof Error ? err.message : "Purge failed");
    } finally {
      setSiteBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-ink-muted">
            {getGreeting()}
            {email ? `, ${email.split("@")[0]}` : ""}
          </p>
          {inbox?.fetchedAt && (
            <p className="mt-1 text-xs text-ink-muted/80">
              Last synced {new Date(inbox.fetchedAt).toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>

      <AdminCard title="Site controls" description="These switches affect the public website immediately.">
        <div className="divide-y divide-line/70">
          <SiteControl
            label="Maintenance"
            hint="Take the public site offline. Admin still works."
            action={
              <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-ink">
                <input
                  type="checkbox"
                  checked={maintenanceEnabled}
                  disabled={siteBusy}
                  onChange={(e) => void toggleMaintenance(e.target.checked)}
                  className="h-4 w-4 rounded border-line"
                />
                {maintenanceEnabled ? "On — site offline" : "Off"}
              </label>
            }
            linkLabel="Edit message"
            onLink={() => onNavigate("maintenance")}
            alert={maintenanceEnabled}
          />
          <SiteControl
            label="Popup"
            hint="Homepage announcement with image and button."
            action={
              <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-ink">
                <input
                  type="checkbox"
                  checked={popupEnabled}
                  disabled={siteBusy}
                  onChange={(e) => void togglePopup(e.target.checked)}
                  className="h-4 w-4 rounded border-line"
                />
                {popupEnabled ? "On" : "Off"}
              </label>
            }
            linkLabel="Edit popup"
            onLink={() => onNavigate("popup")}
          />
          <SiteControl
            label="Cache"
            hint="Live pages stay fresh while you edit."
            action={
              <select
                aria-label="Cache mode"
                className="min-h-11 w-full max-w-xs rounded-xl border border-line bg-white px-3 py-2 text-sm"
                value={cacheMode}
                disabled={siteBusy}
                onChange={(e) => void toggleCacheMode(e.target.value as "live" | "cached")}
              >
                <option value="live">Live — always fresh</option>
                <option value="cached">Cached — allow ISR</option>
              </select>
            }
            extra={
              <div className="flex flex-wrap gap-2">
                <AdminButton
                  variant="secondary"
                  size="sm"
                  disabled={siteBusy}
                  onClick={() => void purgeCache()}
                >
                  Purge cache
                </AdminButton>
                <AdminButton variant="ghost" size="sm" onClick={() => onNavigate("cache")}>
                  Policy
                </AdminButton>
              </div>
            }
          />
          <SiteControl
            label="Home page"
            hint="Hero, focus areas, approach, and campaigns."
            action={
              <AdminButton variant="primary" onClick={() => onNavigate("home")}>
                Edit homepage
              </AdminButton>
            }
          />
        </div>
        {siteMsg ? (
          <p className="mt-4 text-sm font-medium text-brand" role="status" aria-live="polite">
            {siteMsg}
          </p>
        ) : null}
      </AdminCard>

      <AdminCard title="Edit a page" description="Open the editor for a public page.">
        <ul className="grid gap-1 sm:grid-cols-2">
          {websiteEditorMap.map((item) => (
            <li key={`${item.label}-${item.tab}`}>
              <button
                type="button"
                onClick={() => onNavigate(item.tab)}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-surface/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <span className="text-sm font-semibold text-ink">{item.label}</span>
                <span className="truncate text-xs text-ink-muted">{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </AdminCard>

      {inbox?.message && (
        <AdminAlert title="Backend not fully configured" tone="warning">
          <p>{inbox.message}</p>
          <p className="mt-2 text-xs">
            Set <code>SUPABASE_SERVICE_ROLE_KEY</code> on Hostinger. Check{" "}
            <a href="/api/live" className="font-semibold underline" target="_blank" rel="noreferrer">
              /api/live
            </a>
            .
          </p>
        </AdminAlert>
      )}

      {stats ? (
        <>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Inbox"
              value={String(stats.inboxTotal)}
              sub={`${stats.weekContact + stats.weekVolunteers} new this week`}
              onClick={() => onNavigate("inbox")}
            />
            <MetricCard
              label="Donations"
              value={`₹${stats.donationsInr.toLocaleString("en-IN")}`}
              sub={`${stats.donationsPaid} paid`}
              accent
              onClick={() => onNavigate("inbox")}
            />
            <MetricCard
              label="Published"
              value={String(
                stats.content.posts.published +
                  stats.content.events.published +
                  stats.content.programs.published,
              )}
              sub={`${totalDrafts(stats)} drafts`}
              onClick={() => onNavigate("posts")}
            />
            <MetricCard
              label="Upcoming events"
              value={String(stats.upcomingEvents)}
              sub={`${stats.events} in CMS`}
              onClick={() => onNavigate("events")}
            />
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
            <AdminCard
              title="Recent messages"
              description="Latest contact, volunteer, donation, and event signups"
              action={
                <AdminButton variant="ghost" size="sm" onClick={() => onNavigate("inbox")}>
                  Open inbox
                </AdminButton>
              }
            >
              <ActivityFeed items={inbox?.activity || []} />
            </AdminCard>

            <div className="space-y-6">
              <AdminCard title="Content" description="Live vs draft">
                <div className="space-y-4">
                  <ContentBar label="News" counts={stats.content.posts} onClick={() => onNavigate("posts")} />
                  <ContentBar label="Events" counts={stats.content.events} onClick={() => onNavigate("events")} />
                  <ContentBar label="Programs" counts={stats.content.programs} onClick={() => onNavigate("programs")} />
                  <ContentBar label="Impact" counts={stats.content.impactStories} onClick={() => onNavigate("impact_stories")} />
                  <ContentBar label="Gallery" counts={stats.content.galleryItems} onClick={() => onNavigate("gallery_items")} />
                  <ContentBar label="Reports" counts={stats.content.reports} onClick={() => onNavigate("reports")} />
                </div>
              </AdminCard>

              <SystemStatus backend={backend} mode={inbox?.mode} />
            </div>
          </div>
        </>
      ) : (
        <AdminEmpty
          title="Dashboard data unavailable"
          description="Connect Supabase with a service role key to load stats and activity."
        />
      )}

      <AdminCard
        title="Starter content"
        description="Import demo news, events, programs, impact stories, gallery photos, and reports into your database."
        action={
          <AdminButton variant="accent" size="sm" onClick={onSeed}>
            Import now
          </AdminButton>
        }
        padding="sm"
      >
        {seedStatus ? (
          <p className="text-sm text-ink-muted">{seedStatus}</p>
        ) : (
          <p className="text-sm text-ink-muted">
            Safe to run multiple times — existing slugs are updated, not duplicated.
          </p>
        )}
      </AdminCard>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function totalDrafts(stats: AdminStats) {
  const c = stats.content;
  return (
    c.posts.drafts +
    c.events.drafts +
    c.programs.drafts +
    c.impactStories.drafts +
    c.reports.drafts +
    c.galleryItems.drafts
  );
}

function SiteControl({
  label,
  hint,
  action,
  extra,
  linkLabel,
  onLink,
  alert,
}: {
  label: string;
  hint: string;
  action: ReactNode;
  extra?: ReactNode;
  linkLabel?: string;
  onLink?: () => void;
  alert?: boolean;
}) {
  return (
    <div className={cn("py-4 first:pt-0 last:pb-0", alert && "rounded-xl bg-accent/10 px-3")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-ink">{label}</p>
          <p className="mt-0.5 text-sm text-ink-muted">{hint}</p>
        </div>
        <div className="shrink-0">{action}</div>
      </div>
      {extra ? <div className="mt-3">{extra}</div> : null}
      {linkLabel && onLink ? (
        <button
          type="button"
          onClick={onLink}
          className="mt-2 text-sm font-semibold text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          {linkLabel}
        </button>
      ) : null}
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  accent,
  onClick,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-5 text-left shadow-sm transition hover:border-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
        accent
          ? "border-accent/20 bg-accent/8"
          : "border-line/80 bg-white",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-2 text-xs text-ink-muted">{sub}</p>
    </button>
  );
}

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return <AdminEmpty title="No activity yet" description="Submissions will appear here." />;
  }

  return (
    <ul className="max-h-[26rem] space-y-2 overflow-auto pr-1">
      {items.map((item) => (
        <li
          key={`${item.kind}-${item.id}`}
          className="flex gap-3 rounded-xl border border-line/60 bg-surface/40 p-3.5 transition hover:bg-white"
        >
          <AdminBadge tone={badgeTone(item.kind)}>{activityLabels[item.kind]}</AdminBadge>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-ink">{item.title}</p>
            {item.subtitle && (
              <p className="mt-0.5 truncate text-sm text-ink-muted">{item.subtitle}</p>
            )}
            {item.meta && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                {item.meta}
              </p>
            )}
            <p className="mt-2 text-[11px] text-ink-muted/70">
              {new Date(item.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function badgeTone(kind: ActivityItem["kind"]) {
  if (kind === "donation") return "accent" as const;
  if (kind === "volunteer") return "brand" as const;
  return "neutral" as const;
}

function ContentBar({
  label,
  counts,
  onClick,
}: {
  label: string;
  counts: ContentCounts;
  onClick: () => void;
}) {
  const pct = counts.total ? Math.round((counts.published / counts.total) * 100) : 0;

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-ink-muted">
          {counts.published}/{counts.total} live
          {counts.drafts > 0 && (
            <span className="ml-2 text-accent">· {counts.drafts} draft</span>
          )}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-bright transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </button>
  );
}

function SystemStatus({
  backend,
  mode,
}: {
  backend: { supabase: boolean; supabaseServiceRole: boolean } | null;
  mode?: string;
}) {
  const rows = [
    { label: "Data mode", ok: mode === "supabase", text: mode || "unknown" },
    { label: "Supabase", ok: backend?.supabase, text: backend?.supabase ? "Connected" : "Missing keys" },
    {
      label: "CMS / inbox",
      ok: backend?.supabaseServiceRole,
      text: backend?.supabaseServiceRole ? "Ready" : "Needs service role",
    },
  ];

  return (
    <AdminCard title="System status" padding="sm">
      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between rounded-lg bg-surface/60 px-3 py-2 text-sm"
          >
            <span className="text-ink-muted">{row.label}</span>
            <span className={cn("font-semibold", row.ok ? "text-brand" : "text-accent")}>
              {row.text}
            </span>
          </li>
        ))}
      </ul>
    </AdminCard>
  );
}
