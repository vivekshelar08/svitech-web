"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  source = "footer",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to subscribe");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={compact ? "flex flex-col gap-2 sm:flex-row" : "space-y-3"}
    >
      <label className="sr-only" htmlFor={`newsletter-${source}`}>
        Email
      </label>
      <input
        id={`newsletter-${source}`}
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        className={`border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand ${
          compact ? "min-w-0 flex-1" : "w-full"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-bright disabled:opacity-60"
      >
        {status === "loading" ? "…" : "Subscribe"}
      </button>
      {status === "success" && (
        <p className="text-xs text-brand sm:col-span-2" role="status">
          You’re subscribed. Welcome.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-accent sm:col-span-2" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
