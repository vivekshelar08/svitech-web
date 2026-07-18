"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function VolunteerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      skills: String(data.get("skills") || ""),
      availability: String(data.get("availability") || ""),
      motivation: String(data.get("motivation") || ""),
    };

    try {
      const res = await fetch("/api/volunteer", {
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
      setError(err instanceof Error ? err.message : "Failed to submit");
    }
  }

  return (
    <form
      className="space-y-5 border border-line bg-surface p-6 md:p-8"
      onSubmit={onSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="v-name" className="block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="v-name"
            name="name"
            required
            className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="v-email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="v-email"
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
          />
        </div>
      </div>
      <div>
        <label htmlFor="v-phone" className="block text-sm font-medium text-ink">
          Phone (optional)
        </label>
        <input
          id="v-phone"
          name="phone"
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
        />
      </div>
      <div>
        <label htmlFor="v-skills" className="block text-sm font-medium text-ink">
          Skills you can share
        </label>
        <textarea
          id="v-skills"
          name="skills"
          required
          rows={3}
          className="mt-2 w-full resize-y border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
        />
      </div>
      <div>
        <label
          htmlFor="v-availability"
          className="block text-sm font-medium text-ink"
        >
          Availability
        </label>
        <input
          id="v-availability"
          name="availability"
          required
          placeholder="e.g. weekends, 4 hours/month"
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
        />
      </div>
      <div>
        <label
          htmlFor="v-motivation"
          className="block text-sm font-medium text-ink"
        >
          Why do you want to volunteer?
        </label>
        <textarea
          id="v-motivation"
          name="motivation"
          required
          rows={4}
          className="mt-2 w-full resize-y border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit application"}
      </button>
      {status === "success" && (
        <p className="text-sm text-brand" role="status">
          Application received. We’ll follow up by email.
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
