"use client";

import { useMemo, useState } from "react";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminEmpty,
  adminInputClass,
  cn,
} from "@/components/admin/admin-ui";
import type { AdminInbox } from "@/components/admin/admin-types";

type InboxKind = "contact" | "volunteers" | "newsletter" | "donations" | "events";

type InboxEntry = {
  kind: InboxKind;
  kindLabel: string;
  id: string;
  row: Record<string, unknown>;
};

const KIND_META: Record<
  InboxKind,
  { label: string; table: string; accent: string }
> = {
  contact: { label: "Contact", table: "contact_messages", accent: "Contact" },
  volunteers: {
    label: "Volunteers",
    table: "volunteer_applications",
    accent: "Volunteer",
  },
  newsletter: {
    label: "Newsletter",
    table: "newsletter_subscribers",
    accent: "Newsletter",
  },
  donations: { label: "Donations", table: "donations", accent: "Donation" },
  events: {
    label: "Event signups",
    table: "event_registrations",
    accent: "Event",
  },
};

export function InboxTab({
  inbox,
  onRefresh,
}: {
  inbox: AdminInbox | null;
  onRefresh?: () => void | Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | InboxKind>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const entries = useMemo(() => {
    const list: InboxEntry[] = [
      ...(inbox?.contact || []).map((row) => ({
        kind: "contact" as const,
        kindLabel: KIND_META.contact.label,
        id: `contact:${row.id}`,
        row,
      })),
      ...(inbox?.volunteers || []).map((row) => ({
        kind: "volunteers" as const,
        kindLabel: KIND_META.volunteers.label,
        id: `volunteers:${row.id}`,
        row,
      })),
      ...(inbox?.newsletter || []).map((row) => ({
        kind: "newsletter" as const,
        kindLabel: KIND_META.newsletter.label,
        id: `newsletter:${row.id}`,
        row,
      })),
      ...(inbox?.donations || []).map((row) => ({
        kind: "donations" as const,
        kindLabel: KIND_META.donations.label,
        id: `donations:${row.id}`,
        row,
      })),
      ...(inbox?.eventRegistrations || []).map((row) => ({
        kind: "events" as const,
        kindLabel: KIND_META.events.label,
        id: `events:${row.id}`,
        row,
      })),
    ];

    return list.sort(
      (a, b) =>
        new Date(String(b.row.created_at || 0)).getTime() -
        new Date(String(a.row.created_at || 0)).getTime(),
    );
  }, [inbox]);

  const counts = useMemo(() => {
    const base: Record<"all" | InboxKind, number> = {
      all: entries.length,
      contact: 0,
      volunteers: 0,
      newsletter: 0,
      donations: 0,
      events: 0,
    };
    for (const entry of entries) base[entry.kind] += 1;
    return base;
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (filter !== "all" && entry.kind !== filter) return false;
      if (!q) return true;
      return Object.values(entry.row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(q),
      );
    });
  }, [entries, filter, query]);

  const selected =
    filtered.find((e) => e.id === selectedId) ||
    entries.find((e) => e.id === selectedId) ||
    filtered[0] ||
    null;

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(`${label} copied.`);
    } catch {
      setStatus(`Could not copy ${label.toLowerCase()}.`);
    }
  }

  async function deleteEntry(entry: InboxEntry) {
    const title = entryTitle(entry);
    if (
      !confirm(
        `Delete this ${entry.kindLabel.toLowerCase()} record permanently?\n\n${title}`,
      )
    ) {
      return;
    }
    setBusy(true);
    setStatus("Deleting…");
    try {
      const res = await fetch(
        `/api/admin/inbox?kind=${entry.kind}&id=${encodeURIComponent(String(entry.row.id))}`,
        { method: "DELETE" },
      );
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus(json.error || "Delete failed");
        return;
      }
      setSelectedId(null);
      setStatus("Deleted.");
      await onRefresh?.();
    } catch {
      setStatus("Delete failed — check connection.");
    } finally {
      setBusy(false);
    }
  }

  if (!inbox) {
    return (
      <AdminCard title="Inbox">
        <AdminEmpty
          title="Loading inbox…"
          description="Refresh if this stays empty."
        />
      </AdminCard>
    );
  }

  return (
    <div className="space-y-4">
      <AdminCard padding="sm">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "All"],
                ["contact", "Contact"],
                ["volunteers", "Volunteers"],
                ["newsletter", "Newsletter"],
                ["donations", "Donations"],
                ["events", "Event signups"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setFilter(value);
                  setSelectedId(null);
                }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                  filter === value
                    ? "bg-brand text-white"
                    : "border border-line/70 bg-surface/50 text-ink-muted hover:text-ink",
                )}
              >
                {label} ({counts[value]})
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, message, status…"
            className={cn(adminInputClass, "mt-0")}
          />
          {status && <p className="text-sm text-ink-muted">{status}</p>}
        </div>
      </AdminCard>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
        <AdminCard
          title="Submissions"
          description={`${filtered.length} shown`}
          padding="sm"
        >
          {filtered.length === 0 ? (
            <AdminEmpty
              title="No matching submissions"
              description="Try another type filter or clear the search."
            />
          ) : (
            <ul className="max-h-[70vh] space-y-2 overflow-auto pr-1">
              {filtered.map((entry) => {
                const active = selected?.id === entry.id;
                const amount = formatAmount(entry.row);
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(entry.id)}
                      className={cn(
                        "w-full rounded-xl border p-3.5 text-left transition",
                        active
                          ? "border-brand bg-brand/5 shadow-sm"
                          : "border-line/60 bg-surface/40 hover:border-brand/40",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">
                            {entryTitle(entry)}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-ink-muted">
                            {entrySubtitle(entry)}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <AdminBadge tone="neutral">{entry.kindLabel}</AdminBadge>
                          {amount && <AdminBadge tone="brand">{amount}</AdminBadge>}
                        </div>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                        {entryPreview(entry)}
                      </p>
                      <p className="mt-2 text-[11px] text-ink-muted/70">
                        {formatWhen(entry.row.created_at)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </AdminCard>

        <AdminCard
          title="Details"
          description={
            selected
              ? `${selected.kindLabel} · ${formatWhen(selected.row.created_at)}`
              : "Select a submission to review"
          }
          action={
            selected ? (
              <AdminBadge
                tone={
                  selected.kind === "donations" && selected.row.status === "paid"
                    ? "success"
                    : "neutral"
                }
              >
                {detailStatus(selected)}
              </AdminBadge>
            ) : undefined
          }
        >
          {!selected ? (
            <AdminEmpty
              title="Nothing selected"
              description="Choose a row on the left to read the full message and take action."
            />
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  {entryTitle(selected)}
                </h2>
                {selected.row.email != null && (
                  <p className="mt-1 text-sm text-ink-muted">
                    {String(selected.row.email)}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.row.email != null && (
                  <>
                    <AdminButton
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        window.open(
                          mailtoHref(selected),
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                    >
                      Reply by email
                    </AdminButton>
                    <AdminButton
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        void copyText(String(selected.row.email), "Email")
                      }
                    >
                      Copy email
                    </AdminButton>
                  </>
                )}
                <AdminButton
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    void copyText(formatEntryPlain(selected), "Details")
                  }
                >
                  Copy details
                </AdminButton>
                <AdminButton
                  variant="danger"
                  size="sm"
                  disabled={busy}
                  onClick={() => void deleteEntry(selected)}
                >
                  Delete
                </AdminButton>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2">
                {detailFields(selected).map((field) => (
                  <div
                    key={field.label}
                    className={cn(
                      "rounded-xl border border-line/60 bg-surface/40 p-3",
                      field.wide && "sm:col-span-2",
                    )}
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {field.label}
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}

function entryTitle(entry: InboxEntry) {
  return String(entry.row.name || entry.row.email || entry.row.title || "Record");
}

function entrySubtitle(entry: InboxEntry) {
  if (entry.kind === "contact") return String(entry.row.topic || entry.row.email || "");
  if (entry.kind === "volunteers")
    return String(entry.row.skills || entry.row.email || "").slice(0, 80);
  if (entry.kind === "newsletter") return String(entry.row.source || "website");
  if (entry.kind === "donations") {
    const amount = formatAmount(entry.row);
    return [amount, entry.row.status, entry.row.frequency]
      .filter(Boolean)
      .map(String)
      .join(" · ");
  }
  if (entry.kind === "events") return String(entry.row.event_slug || entry.row.email || "");
  return String(entry.row.email || "");
}

function entryPreview(entry: InboxEntry) {
  if (entry.kind === "contact") return String(entry.row.message || "");
  if (entry.kind === "volunteers") return String(entry.row.motivation || "");
  if (entry.kind === "newsletter") return "Newsletter subscription";
  if (entry.kind === "donations")
    return String(entry.row.notes || entry.row.status || "Donation record");
  if (entry.kind === "events") return String(entry.row.notes || "Event registration");
  return "";
}

function formatAmount(row: Record<string, unknown>) {
  if (row.amount_paise == null) return null;
  return `₹${Math.round(Number(row.amount_paise) / 100).toLocaleString("en-IN")}`;
}

function formatWhen(value: unknown) {
  if (!value) return "";
  return new Date(String(value)).toLocaleString("en-IN");
}

function detailStatus(entry: InboxEntry) {
  if (entry.kind === "donations") return String(entry.row.status || "created");
  if (entry.kind === "contact") return String(entry.row.topic || "Message");
  if (entry.kind === "events") return String(entry.row.event_slug || "Signup");
  return entry.kindLabel;
}

function mailtoHref(entry: InboxEntry) {
  const email = String(entry.row.email || "");
  const subject = encodeURIComponent(
    entry.kind === "contact"
      ? `Re: ${String(entry.row.topic || "your message")} — SVITECH Foundation`
      : entry.kind === "volunteers"
        ? "Re: your volunteer application — SVITECH Foundation"
        : entry.kind === "events"
          ? `Re: ${String(entry.row.event_slug || "event")} registration — SVITECH Foundation`
          : "SVITECH Foundation",
  );
  return `mailto:${email}?subject=${subject}`;
}

function detailFields(entry: InboxEntry): Array<{ label: string; value: string; wide?: boolean }> {
  const row = entry.row;
  const fields: Array<{ label: string; value: string; wide?: boolean }> = [];

  const push = (label: string, key: string, wide?: boolean) => {
    const value = row[key];
    if (value == null || String(value).trim() === "") return;
    fields.push({ label, value: String(value), wide });
  };

  push("Name", "name");
  push("Email", "email");
  push("Phone", "phone");
  push("Topic", "topic");
  push("Skills", "skills", true);
  push("Availability", "availability");
  push("Source", "source");
  push("Event", "event_slug");
  push("Status", "status");
  push("Frequency", "frequency");
  if (row.amount_paise != null) {
    fields.push({ label: "Amount", value: formatAmount(row) || "" });
  }
  push("Payment ID", "razorpay_payment_id");
  push("Order ID", "razorpay_order_id");
  push("Message", "message", true);
  push("Motivation", "motivation", true);
  push("Notes", "notes", true);
  fields.push({
    label: "Received",
    value: formatWhen(row.created_at) || "—",
  });

  return fields;
}

function formatEntryPlain(entry: InboxEntry) {
  return detailFields(entry)
    .map((f) => `${f.label}: ${f.value}`)
    .join("\n");
}
