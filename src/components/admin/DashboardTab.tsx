"use client";

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
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Inbox"
              value={String(stats.inboxTotal)}
              sub={`${stats.weekContact + stats.weekVolunteers} new this week`}
              icon="📥"
              onClick={() => onNavigate("inbox")}
            />
            <MetricCard
              label="Donations"
              value={`₹${stats.donationsInr.toLocaleString("en-IN")}`}
              sub={`${stats.donationsPaid} paid`}
              icon="💚"
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
              icon="✦"
              onClick={() => onNavigate("posts")}
            />
            <MetricCard
              label="Upcoming events"
              value={String(stats.upcomingEvents)}
              sub={`${stats.events} in CMS`}
              icon="📅"
              onClick={() => onNavigate("events")}
            />
          </section>

          <AdminCard title="Quick actions" padding="sm">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <QuickAction label="Inbox" onClick={() => onNavigate("inbox")} />
              <QuickAction label="New article" onClick={() => onNavigate("posts")} />
              <QuickAction label="Events" onClick={() => onNavigate("events")} />
              <QuickAction label="Site settings" onClick={() => onNavigate("site")} />
              <QuickAction label="Page copy" onClick={() => onNavigate("pages")} />
              <QuickAction label="Colors" onClick={() => onNavigate("theme")} />
            </div>
          </AdminCard>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
            <AdminCard
              title="Recent activity"
              description="Latest submissions and signups across the site"
              action={
                <AdminButton variant="ghost" size="sm" onClick={() => onNavigate("inbox")}>
                  View all
                </AdminButton>
              }
            >
              <ActivityFeed items={inbox?.activity || []} />
            </AdminCard>

            <div className="space-y-6">
              <AdminCard title="Content health" description="Live vs draft across CMS">
                <div className="space-y-4">
                  <ContentBar label="News" counts={stats.content.posts} onClick={() => onNavigate("posts")} />
                  <ContentBar label="Events" counts={stats.content.events} onClick={() => onNavigate("events")} />
                  <ContentBar label="Programs" counts={stats.content.programs} onClick={() => onNavigate("programs")} />
                  <ContentBar label="Impact" counts={stats.content.impactStories} onClick={() => onNavigate("impact_stories")} />
                  <ContentBar label="Reports" counts={stats.content.reports} onClick={() => onNavigate("reports")} />
                </div>
              </AdminCard>

              <AdminCard title="Submissions" padding="sm">
                <ul className="divide-y divide-line/70">
                  <SubmissionRow label="Contact" count={stats.contact} week={stats.weekContact} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Volunteers" count={stats.volunteers} week={stats.weekVolunteers} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Newsletter" count={stats.newsletter} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Donations" count={stats.donations} week={stats.weekDonations} onClick={() => onNavigate("inbox")} />
                  <SubmissionRow label="Event signups" count={stats.eventRegistrations} onClick={() => onNavigate("inbox")} />
                </ul>
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
        description="Import demo news, events, programs, impact stories, and reports into your database."
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
  return c.posts.drafts + c.events.drafts + c.programs.drafts + c.impactStories.drafts + c.reports.drafts;
}

function MetricCard({
  label,
  value,
  sub,
  icon,
  accent,
  onClick,
}: {
  label: string;
  value: string;
  sub: string;
  icon: string;
  accent?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        accent
          ? "border-accent/20 bg-gradient-to-br from-accent/8 to-white"
          : "border-line/80 bg-white hover:border-brand/20",
      )}
    >
      <span className="text-xl" aria-hidden>
        {icon}
      </span>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-2 text-xs text-ink-muted">{sub}</p>
    </button>
  );
}

function QuickAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-line/80 bg-surface/80 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-brand/30 hover:bg-white hover:text-brand"
    >
      {label}
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
        className="flex w-full items-center justify-between px-1 py-3 text-left text-sm transition hover:text-brand"
      >
        <span className="font-medium text-ink">{label}</span>
        <span className="text-ink-muted">
          {count}
          {week !== undefined && week > 0 && (
            <span className="ml-2 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
              +{week}
            </span>
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
