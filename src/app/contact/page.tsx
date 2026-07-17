import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the SVITECH Foundation team for partnerships, volunteering, and support.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Let’s start a conversation.
          </h1>
          <p className="mt-6 leading-relaxed text-ink-muted">
            Tell us about your community, your organization, or how you’d like to
            help. We read every message.
          </p>
          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-ink">Email</dt>
              <dd className="mt-1 text-ink-muted">
                <a
                  href="mailto:hello@svitech.org"
                  className="border-b border-brand/40 text-brand hover:border-brand"
                >
                  hello@svitech.org
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Response time</dt>
              <dd className="mt-1 text-ink-muted">Usually within 2–3 business days</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
