import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getSiteSettings();
  return { title: contact.seoTitle, description: contact.seoDescription };
}

export default async function ContactPage() {
  const { contact, general } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {contact.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {contact.headline}
          </h1>
          <p className="mt-6 leading-relaxed text-ink-muted">{contact.intro}</p>
          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-ink">{contact.emailLabel}</dt>
              <dd className="mt-1 text-ink-muted">
                <a
                  href={`mailto:${general.contactEmail}`}
                  className="border-b border-brand/40 text-brand hover:border-brand"
                >
                  {general.contactEmail}
                </a>
              </dd>
            </div>
            {general.contactPhone ? (
              <div>
                <dt className="font-semibold text-ink">{contact.phoneLabel}</dt>
                <dd className="mt-1 text-ink-muted">
                  <a
                    href={`tel:${general.contactPhone.replace(/\s/g, "")}`}
                    className="border-b border-brand/40 text-brand hover:border-brand"
                  >
                    {general.contactPhone}
                  </a>
                </dd>
              </div>
            ) : null}
            {general.officeAddress ? (
              <div>
                <dt className="font-semibold text-ink">{contact.addressLabel}</dt>
                <dd className="mt-1 text-ink-muted">{general.officeAddress}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold text-ink">{contact.responseTimeLabel}</dt>
              <dd className="mt-1 text-ink-muted">{general.responseTime}</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
