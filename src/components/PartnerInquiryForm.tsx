"use client";

import { useState, type FormEvent } from "react";
import { csrTiers } from "@/lib/svitech";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-1.5 w-full border border-line bg-white px-3.5 py-3 text-base text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/15 sm:py-2.5 sm:text-sm";

export function PartnerInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const organization = String(data.get("organization") || "");
    const tier = String(data.get("tier") || "");
    const messageBody = String(data.get("message") || "");
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      topic: "Partnership",
      message: [
        organization ? `Organization: ${organization}` : null,
        tier ? `Interest tier: ${tier}` : null,
        messageBody,
      ]
        .filter(Boolean)
        .join("\n\n"),
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

  if (status === "success") {
    return (
      <div className="border border-line bg-surface p-6 sm:p-8">
        <p className="font-display text-2xl font-semibold text-ink">
          Inquiry received
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Thank you. The foundation team will reply at the email you shared,
          usually within 2–3 business days.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 border border-line bg-surface p-6 sm:p-8"
      onSubmit={onSubmit}
    >
      <div>
        <label htmlFor="partner-name" className="text-sm font-semibold text-ink">
          Name
        </label>
        <input
          id="partner-name"
          name="name"
          required
          className={fieldClass}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="partner-email" className="text-sm font-semibold text-ink">
          Work email
        </label>
        <input
          id="partner-email"
          name="email"
          type="email"
          required
          className={fieldClass}
          autoComplete="email"
        />
      </div>
      <div>
        <label
          htmlFor="partner-org"
          className="text-sm font-semibold text-ink"
        >
          Organization
        </label>
        <input
          id="partner-org"
          name="organization"
          className={fieldClass}
          autoComplete="organization"
        />
      </div>
      <div>
        <label htmlFor="partner-tier" className="text-sm font-semibold text-ink">
          CSR tier of interest
        </label>
        <select id="partner-tier" name="tier" className={fieldClass} defaultValue="">
          <option value="">Select a tier (optional)</option>
          {csrTiers.map((tier) => (
            <option key={tier.tier} value={`${tier.tier}: ${tier.name}`}>
              {tier.tier}: {tier.name} ({tier.budget})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="partner-message"
          className="text-sm font-semibold text-ink"
        >
          How can we help?
        </label>
        <textarea
          id="partner-message"
          name="message"
          required
          rows={5}
          className={fieldClass}
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-brand" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send partnership inquiry"}
      </button>
    </form>
  );
}
