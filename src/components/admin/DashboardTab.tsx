"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  activityLabels,
  type ActivityItem,
  type AdminInbox,
  type AdminStats,
  type AdminTab,
  type ContentCounts,
} from "@/components/admin/admin-types";

export function DashboardTab({
  inbox,
  email,
  backend,
  onSeed,
  seedStatus,
  onRefresh,
  onNavigate,
  refreshing,
}: {
  inbox: AdminInbox | null;
  email: string | null;
  backend: { supabase: boolean; supabaseServiceRole: boolean } | null;
  onSeed: () => void;
  seedStatus: string;
  onRefresh: () => void | Promise<void>;
  onNavigate: (tab: AdminTab) => void;
  refreshing?: boolean;
}) {
  const stats = inbox?.stats;
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {greeting}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
            {email ? `Welcome back` : "Dashboard"}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {inbox?.fetchedAt
              ? `Updated ${new Date(inbox.fetchedAt).toLocaleString("en-IN")}`
              : "Overview of submissions, content, and site health"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void onRefresh()}
            disabled={refreshing}
            className="border border-line bg-white/80 px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {refreshing ? "Refreshing…" : "Refresh data"}
          </button>
          <Link
            href="/"
            target="_blank"
            className="bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            View live site
          </Link>
        </div>
      </header>

      {inbox?.message && (
        <div className="border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-ink">
          <p className="font-semibold">Backend not fully configured</p>
          <p className="mt-1">{inbox.message}</p>
          <p className="mt-2 text-xs text-ink-muted">
            Set <code>SUPABASE_SERVICE_ROLE_KEY</code> on Hostinger and redeploy. Check{" "}
            <a href="/api/live" className="font-semibold text-brand underline" target="_blank" rel="noreferrer">
              /api/live
            </a>
            .
          </p>
        </div>
      )}

      {stats && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <HeroStat
              label="Inbox items"
              value={stats.inboxTotal}
              hint={`${stats.weekContact + stats.weekVolunteers} new this week`}
              accent="brand"
              onClick={() => onNavigate("inbox")}
            />
            <HeroStat
              label="Donations received"
              value={`₹${stats.donationsInr.toLocaleString("en-IN")}`}
              hint={`${stats.donationsPaid} paid · ${stats.weekDonations} this week`}
              accent="accent"
              onClick={() => onNavigate("inbox")}
            />
            <HeroStat
              label="Published content"
              value={
                stats.content.posts.published +
                stats.content.events.published +
                stats.content.programs.published
              }
              hint={`${totalDrafts(stats)} drafts waiting`}
              accent="ink"
              onClick={() => onNavigate("posts")}
            />
            <HeroStat
              label="Upcoming events"
              value={stats.upcomingEvents}
              hint={`${stats.events} total in CMS`}
              accent="brand"
              onClick={() => onNavigate("events")}
            />
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-ink">Quick actions</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <QuickAction label="Review inbox" onClick={() => onNavigate("inbox")} />
              <QuickAction label="New article" onClick={() => onNavigate("posts")} />
              <QuickAction label="Manage events" onClick={() => onNavigate("events")} />
              <QuickAction label="Site settings" onClick={() => onNavigate("site")} />
              <QuickAction label="Page copy" onClick={() => onNavigate("pages")} />
              <QuickAction label="Brand colors" onClick={() => onNavigate("theme")} />
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <section className="border border-line bg-surface p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-ink">Recent activity</h3>
                <button
                  type="button"
                  onClick={() => onNavigate("inbox")}
                  className="text-sm font-semibold text-brand"
                >
                  Open inbox
                </button>
              </div>
              <ActivityFeed items={inbox?.activity || []} />
            </section>

            <div className="space-y-6">
              <section className="border border-line bg-surface p-5 md:p-6">
                <h3 className="font-display text-lg font-bold text-ink">Content health</h3>
                <div className="mt-4 space-y-4">
                  <ContentBar label="News" counts={stats.content.posts} onClick={() => onNavigate("posts")} />
                  <ContentBar label="Events" counts={stats.content.events} onClick={() => onNavigate("events")} />
                  <ContentBar label="Programs" counts={stats.content.programs} onClick={() => onNavigate("programs")} />
                  <ContentBar
                    label="Impact"
                    counts={stats.content.impactStories}
                    onClick={() => onNavigate("impact_stories")}
                  />
                  <ContentBar label="Reports" counts={stats.content.reports} onClick={() => onNavigate("reports")} />
                </div>
              </section>

              <section className="border border-line bg-surface p-5 md:p-6">
                <h3 className="font-display text-lg font-bold text-ink">Submissions</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <SubmissionRow label="Contact" count={stats.contact} week={stats.weekContact} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Volunteers" count={stats.volunteers} week={stats.weekVolunteers} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Newsletter" count={stats.newsletter} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Donations" count={stats.donations} week={stats.weekDonations} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Event signups" count={stats.eventRegistrations} onClick={() => onNavigate("inbox")} />
                </ul>
              </section>

              <SystemStatus backend={backend} mode={inbox?.mode} />
            </div>
          </div>
        </>
      )}

      <section className="border border-line bg-white/70 p-6">
        <h3 className="font-display text-lg font-bold text-ink">Tools</h3>
        <p className="mt-2 text-sm text-ink-muted">
          Import starter news, events, programs, impact stories, and reports from the codebase
          into Supabase. Safe to run again — existing slugs are updated.
        </p>
        <button
          type="button"
          onClick={onSeed}
          className="mt-4 bg-accent px-5 py-2.5 text-sm font-semibold text-white"
        >
          Import starter content
        </button>
        {seedStatus && <p className="mt-3 text-sm text-ink-muted">{seedStatus}</p>}
      </section>
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
    c.reports.drafts
  );
}

function HeroStat({
  label,
  value,
  hint,
  accent,
  onClick,
}: {
  label: string;
  value: string | number;
  hint: string;
  accent: "brand" | "accent" | "ink";
  onClick?: () => void;
}) {
  const accentClass =
    accent === "brand"
      ? "border-brand/25 bg-brand/5"
      : accent === "accent"
        ? "border-accent/25 bg-accent/5"
        : "border-line bg-white/70";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`border p-5 text-left transition hover:brightness-[0.98] ${accentClass}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
      <p className="mt-2 text-xs text-ink-muted">{hint}</p>
    </button>
  );
}

function QuickAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-line bg-white/80 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
    >
      {label}
    </button>
  );
}

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return <p className="mt-4 text-sm text-ink-muted">No recent activity yet.</p>;
  }

  return (
    <ul className="mt-4 max-h-[28rem] space-y-3 overflow-auto pr-1">
      {items.map((item) => (
        <li
          key={`${item.kind}-${item.id}`}
          className="flex gap-3 border border-line bg-white/60 p-3"
        >
          <span className="mt-0.5 shrink-0 bg-brand/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand">
            {activityLabels[item.kind]}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{item.title}</p>
            {item.subtitle && (
              <p className="mt-0.5 truncate text-sm text-ink-muted">{item.subtitle}</p>
            )}
            {item.meta && (
              <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{item.meta}</p>
            )}
            <p className="mt-1 text-[11px] text-ink-muted/80">
              {new Date(item.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
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
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-ink-muted">
          {counts.published}/{counts.total} live
          {counts.drafts > 0 && (
            <span className="ml-2 text-accent">· {counts.drafts} draft</span>
          )}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden bg-line">
        <div className="h-full bg-brand transition-all" style={{ width: `${pct}%` }} />
      </div>
    </button>
  );
}

function SubmissionRow({
  label,
  count,
  week,
  onClick,
}: {
  label: string;
  count: number;
  week?: number;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between rounded px-1 py-1.5 text-left hover:bg-white/60"
      >
        <span className="text-ink">{label}</span>
        <span className="text-ink-muted">
          {count}
          {week !== undefined && week > 0 && (
            <span className="ml-2 text-brand">+{week} week</span>
          )}
        </span>
      </button>
    </li>
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
    <section className="border border-line bg-surface p-5 md:p-6">
      <h3 className="font-display text-lg font-bold text-ink">System status</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-3">
            <span className="text-ink-muted">{row.label}</span>
            <span className={`font-medium ${row.ok ? "text-brand" : "text-accent"}`}>
              {row.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InboxTab({ inbox }: { inbox: AdminInbox | null }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "contact" | "volunteers" | "newsletter" | "donations" | "events">("all");

  const sections = useMemo(
    () => [
      { key: "contact" as const, title: "Contact", rows: inbox?.contact || [] },
      { key: "volunteers" as const, title: "Volunteers", rows: inbox?.volunteers || [] },
      { key: "newsletter" as const, title: "Newsletter", rows: inbox?.newsletter || [] },
      { key: "donations" as const, title: "Donations", rows: inbox?.donations || [] },
      {
        key: "events" as const,
        title: "Event registrations",
        rows: inbox?.eventRegistrations || [],
      },
    ],
    [inbox],
  );

  const visible = sections.filter((s) => filter === "all" || filter === s.key);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border border-line bg-surface p-4 md:flex-row md:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, message…"
          className="flex-1 border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
        >
          <option value="all">All types</option>
          <option value="contact">Contact</option>
          <option value="volunteers">Volunteers</option>
          <option value="newsletter">Newsletter</option>
          <option value="donations">Donations</option>
          <option value="events">Event registrations</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visible.map((section) => (
          <InboxList
            key={section.key}
            title={section.title}
            rows={filterRows(section.rows, query)}
          />
        ))}
      </div>
    </div>
  );
}

function filterRows(rows: Array<Record<string, unknown>>, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) =>
    Object.values(row).some((value) => String(value ?? "").toLowerCase().includes(q)),
  );
}

function InboxList({
  title,
  rows,
}: {
  title: string;
  rows: Array<Record<string, unknown>>;
}) {
  return (
    <div className="border border-line bg-surface p-4">
      <h2 className="font-display text-lg font-bold text-ink">
        {title}{" "}
        <span className="text-sm font-normal text-ink-muted">({rows.length})</span>
      </h2>
      <ul className="mt-3 max-h-96 space-y-3 overflow-auto text-sm">
        {rows.length === 0 && <li className="text-ink-muted">No matching records.</li>}
        {rows.map((row) => (
          <li key={String(row.id)} className="border-t border-line pt-3">
            <InboxRow row={row} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function InboxRow({ row }: { row: Record<string, unknown> }) {
  const name = String(row.name || row.email || row.title || "Record");
  const detail =
    String(row.message || row.motivation || row.topic || row.status || "") ||
    String(row.email || "");
  const when = row.created_at ? new Date(String(row.created_at)).toLocaleString("en-IN") : "";
  const amount =
    row.amount_paise != null
      ? `₹${Math.round(Number(row.amount_paise) / 100).toLocaleString("en-IN")}`
      : null;

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-ink">{name}</p>
        {amount && <span className="shrink-0 text-xs font-semibold text-brand">{amount}</span>}
      </div>
      {row.email != null && row.name != null && (
        <p className="mt-0.5 text-xs text-ink-muted">{String(row.email)}</p>
      )}
      {detail && <p className="mt-1 text-ink-muted">{detail.slice(0, 220)}</p>}
      {when && <p className="mt-1 text-xs text-ink-muted">{when}</p>}
    </div>
  );
}
