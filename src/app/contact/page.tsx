import type { Metadata } from "next";

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

        <form
          className="space-y-5 border border-line bg-surface p-6 md:p-8"
          action="mailto:hello@svitech.org"
          method="post"
          encType="text/plain"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink">
              Name
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
              Email
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
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-brand"
              defaultValue="Partnership"
            >
              <option>Partnership</option>
              <option>Volunteer</option>
              <option>Donation</option>
              <option>Press</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink">
              Message
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
            className="bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-bright"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
