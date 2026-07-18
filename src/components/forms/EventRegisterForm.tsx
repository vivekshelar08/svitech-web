"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function EventRegisterForm({ eventSlug }: { eventSlug: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      eventSlug,
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      notes: String(data.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to register");
    }
  }

  return (
    <form
      className="mt-8 space-y-4 border border-line bg-surface p-6"
      onSubmit={onSubmit}
    >
      <h3 className="font-display text-lg font-bold text-ink">Register</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="er-name" className="block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="er-name"
            name="name"
            required
            className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="er-email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="er-email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
          />
        </div>
      </div>
      <div>
        <label htmlFor="er-phone" className="block text-sm font-medium text-ink">
          Phone (optional)
        </label>
        <input
          id="er-phone"
          name="phone"
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      </div>
      <div>
        <label htmlFor="er-notes" className="block text-sm font-medium text-ink">
          Notes (optional)
        </label>
        <textarea
          id="er-notes"
          name="notes"
          rows={3}
          className="mt-2 w-full resize-y border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60"
      >
        {status === "loading" ? "Registering…" : "Register for event"}
      </button>
      {status === "success" && (
        <p className="text-sm text-brand" role="status">
          You’re registered. Check your email for confirmation.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
