"use client";

import type { AdminInbox, AdminStats } from "@/components/admin/admin-types";

export function DashboardTab({
  inbox,
  onSeed,
  seedStatus,
}: {
  inbox: AdminInbox | null;
  onSeed: () => void;
  seedStatus: string;
}) {
  const stats = inbox?.stats;

  return (
    <div className="space-y-8">
      {inbox?.message && (
        <p className="border border-line bg-accent-soft px-4 py-3 text-sm text-ink">
          {inbox.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Contact messages" value={stats?.contact ?? 0} />
        <StatCard label="Volunteer applications" value={stats?.volunteers ?? 0} />
        <StatCard label="Newsletter signups" value={stats?.newsletter ?? 0} />
        <StatCard label="Donations" value={stats?.donations ?? 0} />
        <StatCard label="Event registrations" value={stats?.eventRegistrations ?? 0} />
        <StatCard label="Published news" value={stats?.posts ?? 0} />
        <StatCard label="Events" value={stats?.events ?? 0} />
        <StatCard label="Programs" value={stats?.programs ?? 0} />
        <StatCard label="Impact stories" value={stats?.impactStories ?? 0} />
      </div>

      <section className="border border-line bg-surface p-6">
        <h2 className="font-display text-xl font-bold text-ink">Initial content</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Import starter news, events, programs, impact stories, and reports from the
          codebase into Supabase. Safe to run again — existing slugs are updated.
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

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-line bg-white/70 p-4">
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}

export function InboxTab({ inbox }: { inbox: AdminInbox | null }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InboxList title="Contact" rows={inbox?.contact || []} />
      <InboxList title="Volunteers" rows={inbox?.volunteers || []} />
      <InboxList title="Newsletter" rows={inbox?.newsletter || []} />
      <InboxList title="Donations" rows={inbox?.donations || []} />
      <InboxList title="Event registrations" rows={inbox?.eventRegistrations || []} />
    </div>
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
      <ul className="mt-3 max-h-80 space-y-3 overflow-auto text-sm">
        {rows.length === 0 && <li className="text-ink-muted">No records yet.</li>}
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

  return (
    <div>
      <p className="font-medium text-ink">{name}</p>
      {detail && <p className="mt-1 text-ink-muted">{detail.slice(0, 180)}</p>}
      {when && <p className="mt-1 text-xs text-ink-muted">{when}</p>}
    </div>
  );
}
