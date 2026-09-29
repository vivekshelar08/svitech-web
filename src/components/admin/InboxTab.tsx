"use client";

import { useMemo, useState } from "react";
import { useAdminConfirm } from "@/components/admin/AdminDialog";
import {
  AdminButton,
  AdminEmpty,
  AdminField,
  AdminStatus,
  adminInputClass,
  adminSelectClass,
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

const KIND_META: Record<InboxKind, { label: string }> = {
  contact: { label: "Contact" },
  volunteers: { label: "Volunteers" },
  newsletter: { label: "Newsletter" },
  donations: { label: "Donations" },
  events: { label: "Event signups" },
};

const TYPE_OPTIONS = [
  ["all", "All types"],
  ["contact", "Contact"],
  ["volunteers", "Volunteers"],
  ["newsletter", "Newsletter"],
  ["donations", "Donations"],
  ["events", "Event signups"],
] as const;

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
  const { confirm, dialog: confirmDialog } = useAdminConfirm();

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

  const selected = filtered.find((entry) => entry.id === selectedId) || null;

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
    const ok = await confirm({
      title: `Delete ${entry.kindLabel.toLowerCase()}?`,
      description: `This permanently removes “${title}” and cannot be undone.`,
      confirmLabel: "Delete permanently",
      cancelLabel: "Keep record",
      tone: "danger",
    });
    if (!ok) return;
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

  function moveSelection(delta: number) {
    if (filtered.length === 0) return;
    const index = selected ? filtered.findIndex((entry) => entry.id === selected.id) : -1;
    const nextIndex =
      index < 0
        ? delta > 0
          ? 0
          : filtered.length - 1
        : Math.min(filtered.length - 1, Math.max(0, index + delta));
    setSelectedId(filtered[nextIndex].id);
  }

  if (!inbox) {
    return (
      <div className="rounded-2xl border border-line/80 bg-white p-6">
        <AdminEmpty
          title="Loading inbox…"
          description="Refresh if this stays empty."
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {confirmDialog}

      <div className="grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-end">
        <AdminField label="Type" htmlFor="inbox-type">
          <select
            id="inbox-type"
            className={cn(adminSelectClass, "mt-1.5")}
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value as "all" | InboxKind);
              setSelectedId(null);
            }}
          >
            {TYPE_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label} ({counts[value]})
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Search" htmlFor="inbox-search">
          <input
            id="inbox-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, email, or message"
            className={cn(adminInputClass, "mt-1.5")}
          />
        </AdminField>
      </div>

      <AdminStatus
        tone={
          status.includes("fail") || status.includes("Could not")
            ? "error"
            : status === "Deleted."
              ? "success"
              : "info"
        }
      >
        {status}
      </AdminStatus>

      <div className="overflow-hidden rounded-2xl border border-line/80 bg-white shadow-[0_1px_2px_rgba(18,28,46,0.04),0_10px_28px_rgba(18,28,46,0.05)] lg:grid lg:min-h-[36rem] lg:grid-cols-[minmax(17rem,22rem)_minmax(0,1fr)]">
        <div
          className={cn(
            "flex min-h-0 flex-col border-line/70 lg:border-r",
            selected ? "hidden lg:flex" : "flex",
          )}
        >
          <p className="border-b border-line/70 px-4 py-3 text-sm text-ink-muted">
            {filtered.length === 0
              ? "No messages"
              : `${filtered.length} ${filtered.length === 1 ? "message" : "messages"}`}
          </p>
          {filtered.length === 0 ? (
            <div className="p-4">
              <AdminEmpty
                title="Nothing here"
                description="Try another type or clear the search."
              />
            </div>
          ) : (
            <ul
              className="max-h-[70vh] flex-1 overflow-auto"
              role="listbox"
              aria-label="Inbox messages"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  moveSelection(1);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  moveSelection(-1);
                }
              }}
            >
              {filtered.map((entry) => {
                const active = selected?.id === entry.id;
                const amount = formatAmount(entry.row);
                return (
                  <li key={entry.id} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(entry.id)}
                      className={cn(
                        "flex min-h-16 w-full flex-col justify-center border-b border-line/50 px-4 py-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/30",
                        active ? "bg-brand/8" : "hover:bg-surface/80",
                      )}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="truncate font-semibold text-ink">
                          {entryTitle(entry)}
                        </span>
                        <span className="shrink-0 text-xs text-ink-muted">
                          {formatWhenShort(entry.row.created_at)}
                        </span>
                      </span>
                      <span className="mt-1 truncate text-sm text-ink-muted">
                        {entry.kindLabel}
                        {amount ? ` · ${amount}` : ""}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={cn("min-w-0", selected ? "block" : "hidden lg:block")}>
          {!selected ? (
            <div className="flex h-full min-h-[20rem] items-center p-6">
              <AdminEmpty
                title="Select a message"
                description="Choose a row on the left to read it and reply."
              />
            </div>
          ) : (
            <article className="flex h-full min-h-0 flex-col">
              <div className="border-b border-line/70 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  className="mb-3 inline-flex min-h-10 items-center text-sm font-semibold text-brand lg:hidden"
                  onClick={() => setSelectedId(null)}
                >
                  ← All messages
                </button>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  {entryTitle(selected)}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {selected.kindLabel}
                  {selected.row.email != null ? ` · ${String(selected.row.email)}` : ""}
                  {` · ${formatWhen(selected.row.created_at)}`}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.row.email != null ? (
                    <AdminButton
                      variant="primary"
                      onClick={() => {
                        window.location.href = mailtoHref(selected);
                      }}
                    >
                      Reply
                    </AdminButton>
                  ) : null}
                  <AdminButton
                    variant="secondary"
                    onClick={() => void copyText(formatEntryPlain(selected), "Details")}
                  >
                    Copy
                  </AdminButton>
                  <AdminButton
                    variant="danger"
                    disabled={busy}
                    onClick={() => void deleteEntry(selected)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </div>
              <dl className="min-h-0 flex-1 overflow-auto px-5 py-2 sm:px-6">
                {detailFields(selected).map((field) => (
                  <div key={field.label} className="border-b border-line/50 py-4 last:border-b-0">
                    <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                      {field.label}
                    </dt>
                    <dd className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

function entryTitle(entry: InboxEntry) {
  return String(entry.row.name || entry.row.email || entry.row.title || "Record");
}

function formatAmount(row: Record<string, unknown>) {
  if (row.amount_paise == null) return null;
  return `₹${Math.round(Number(row.amount_paise) / 100).toLocaleString("en-IN")}`;
}

function formatWhen(value: unknown) {
  if (!value) return "";
  return new Date(String(value)).toLocaleString("en-IN");
}

function formatWhenShort(value: unknown) {
  if (!value) return "";
  return new Date(String(value)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
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

function detailFields(entry: InboxEntry): Array<{ label: string; value: string }> {
  const row = entry.row;
  const fields: Array<{ label: string; value: string }> = [];

  const push = (label: string, key: string) => {
    const value = row[key];
    if (value == null || String(value).trim() === "") return;
    fields.push({ label, value: String(value) });
  };

  push("Name", "name");
  push("Email", "email");
  push("Phone", "phone");
  push("Topic", "topic");
  push("Skills", "skills");
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
  push("Message", "message");
  push("Motivation", "motivation");
  push("Notes", "notes");
  fields.push({
    label: "Received",
    value: formatWhen(row.created_at) || "—",
  });

  return fields;
}

function formatEntryPlain(entry: InboxEntry) {
  return detailFields(entry)
    .map((field) => `${field.label}: ${field.value}`)
    .join("\n");
}
