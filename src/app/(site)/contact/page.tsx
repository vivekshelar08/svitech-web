import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { identity } from "@/lib/svitech";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getSiteSettings();
  return { title: contact.seoTitle, description: contact.seoDescription };
}

export default async function ContactPage() {
  const { contact, general } = await getSiteSettings();

  return (
    <div>
      <section className="border-b border-line bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-16 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            {contact.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {contact.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72">
            {contact.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-ink">{contact.emailLabel}</dt>
                <dd className="mt-1 space-y-1 text-ink-muted">
                  {identity.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block border-b border-brand/40 text-brand hover:border-brand"
                    >
                      {email}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">{contact.phoneLabel}</dt>
                <dd className="mt-1 text-ink-muted">
                  <a
                    href={identity.phoneHref}
                    className="border-b border-brand/40 text-brand hover:border-brand"
                  >
                    {identity.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">{contact.addressLabel}</dt>
                <dd className="mt-1 text-ink-muted">{identity.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">{contact.responseTimeLabel}</dt>
                <dd className="mt-1 text-ink-muted">{general.responseTime}</dd>
              </div>
            </dl>
            <div className="btn-row mt-8 flex flex-wrap gap-3">
              <Link href="/partner" className="btn-primary">
                CSR partnership
              </Link>
              <Link href="/donate" className="btn-secondary">
                Donate
              </Link>
            </div>
          </div>

          <ContactForm
            nameLabel={contact.formNameLabel}
            emailLabel={contact.formEmailLabel}
            topicLabel={contact.formTopicLabel}
            messageLabel={contact.formMessageLabel}
            submitLabel={contact.formSubmitLabel}
            successMessage={contact.formSuccessMessage}
            topics={contact.formTopics}
          />
        </div>
      </div>
    </div>
  );
}
