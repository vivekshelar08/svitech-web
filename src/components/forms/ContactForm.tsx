"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({
  nameLabel = "Name",
  emailLabel = "Email",
  topicLabel = "Topic",
  messageLabel = "Message",
  submitLabel = "Send message",
  successMessage = "Thanks — we received your message and will reply soon.",
  topics = ["Partnership", "Volunteer", "Donation", "Media", "Other"],
}: {
  nameLabel?: string;
  emailLabel?: string;
  topicLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
  successMessage?: string;
  topics?: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const topicOptions = topics.length > 0 ? topics : ["Other"];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      topic: String(data.get("topic") || topicOptions[0] || "Other"),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
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
      setError(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <form
      className="space-y-5 border border-line bg-surface p-6 md:p-8"
      onSubmit={onSubmit}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          {nameLabel}
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-brand"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          {emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-brand"
        />
      </div>
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-ink">
          {topicLabel}
        </label>
        <select
          id="topic"
          name="topic"
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-brand"
          defaultValue={topicOptions[0]}
        >
          {topicOptions.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          {messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-brand"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-bright disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
      {status === "success" && (
        <p className="text-sm text-brand" role="status">
          {successMessage}
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
