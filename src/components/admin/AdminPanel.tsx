"use client";

import { useEffect, useState, type FormEvent } from "react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

type Inbox = {
  mode: string;
  message?: string;
  contact: Array<Record<string, unknown>>;
  volunteers: Array<Record<string, unknown>>;
  newsletter: Array<Record<string, unknown>>;
  donations: Array<Record<string, unknown>>;
  eventRegistrations: Array<Record<string, unknown>>;
};

export function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inbox, setInbox] = useState<Inbox | null>(null);
  const [cmsStatus, setCmsStatus] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin");
      const json = (await res.json()) as { authenticated?: boolean };
      if (json.authenticated) {
        setAuthed(true);
        await loadInbox();
      }
    })();
  }, []);

  async function loadInbox() {
    const res = await fetch("/api/admin", { method: "PUT" });
    if (!res.ok) return;
    setInbox((await res.json()) as Inbox);
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Invalid password");
      return;
    }
    setAuthed(true);
    await loadInbox();
  }

  async function logout() {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthed(false);
    setInbox(null);
  }

  async function publishPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCmsStatus("Publishing…");
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "post",
        slug: String(data.get("slug") || ""),
        title: String(data.get("title") || ""),
        excerpt: String(data.get("excerpt") || ""),
        body: String(data.get("body") || ""),
        coverImage: String(data.get("coverImage") || ""),
      }),
    });
    const json = (await res.json()) as { error?: string; ok?: boolean };
    if (!res.ok) {
      setCmsStatus(json.error || "Failed");
      return;
    }
    setCmsStatus("Published. It will appear on /news when Supabase is connected.");
    form.reset();
  }

  if (!authed) {
    return (
      <form onSubmit={login} className="mx-auto max-w-md space-y-4 border border-line bg-surface p-6">
        <h1 className="font-display text-2xl font-bold text-ink">Admin</h1>
        <p className="text-sm text-ink-muted">
          Sign in to review submissions and publish news (requires ADMIN_PASSWORD).
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
        <button type="submit" className="bg-brand px-5 py-2.5 text-sm font-semibold text-white">
          Sign in
        </button>
        {error && <p className="text-sm text-accent">{error}</p>}
      </form>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-ink">Inbox & CMS</h1>
        <button
          type="button"
          onClick={() => void logout()}
          className="border border-line px-4 py-2 text-sm font-semibold"
        >
          Sign out
        </button>
      </div>

      {inbox?.message && (
        <p className="border border-line bg-accent-soft px-4 py-3 text-sm text-ink">
          {inbox.message}
        </p>
      )}

      <section className="grid gap-8 lg:grid-cols-2">
        <InboxList title="Contact" rows={inbox?.contact || []} />
        <InboxList title="Volunteers" rows={inbox?.volunteers || []} />
        <InboxList title="Newsletter" rows={inbox?.newsletter || []} />
        <InboxList title="Donations" rows={inbox?.donations || []} />
        <InboxList title="Event registrations" rows={inbox?.eventRegistrations || []} />
      </section>

      <section className="border border-line bg-surface p-6">
        <h2 className="font-display text-xl font-bold text-ink">Publish a news post</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Writes to Supabase <code>posts</code> when service role is configured. Otherwise
          edit files in <code>src/content/</code>.
        </p>
        <form onSubmit={publishPost} className="mt-6 space-y-4">
          <input name="title" required placeholder="Title" className="w-full border border-line px-3 py-2.5" />
          <input name="slug" required placeholder="slug-like-this" className="w-full border border-line px-3 py-2.5" />
          <input name="excerpt" required placeholder="Short excerpt" className="w-full border border-line px-3 py-2.5" />
          <input name="coverImage" placeholder="Cover image URL" className="w-full border border-line px-3 py-2.5" />
          <textarea name="body" required rows={6} placeholder="Body" className="w-full border border-line px-3 py-2.5" />
          <button type="submit" className="bg-brand px-5 py-2.5 text-sm font-semibold text-white">
            Publish
          </button>
          {cmsStatus && <p className="text-sm text-ink-muted">{cmsStatus}</p>}
        </form>
      </section>

      <section className="border border-line bg-surface p-6">
        <h2 className="font-display text-xl font-bold text-ink">Test newsletter</h2>
        <NewsletterForm source="admin" />
      </section>
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
    <div className="border border-line bg-white/60 p-4">
      <h2 className="font-display text-lg font-bold text-ink">
        {title}{" "}
        <span className="text-sm font-normal text-ink-muted">({rows.length})</span>
      </h2>
      <ul className="mt-3 max-h-64 space-y-2 overflow-auto text-xs text-ink-muted">
        {rows.length === 0 && <li>No records yet.</li>}
        {rows.map((row, i) => (
          <li key={i} className="border-t border-line pt-2">
            <pre className="whitespace-pre-wrap break-all">
              {JSON.stringify(row, null, 0)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
