import type { Metadata } from "next";
import Link from "next/link";
import { PartnerInquiryForm } from "@/components/PartnerInquiryForm";
import { Reveal } from "@/components/Reveal";
import { csrTiers, identity, publicPartners } from "@/lib/svitech";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "CSR investment menu and institutional partnership inquiries for SVITECH Foundation — Schedule VII aligned turnkey packages.",
};

export default function PartnerPage() {
  return (
    <div>
      <section className="border-b border-line bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            Partner
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Connect CSR capital to audited implementation
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
            Ready-to-fund Schedule VII packages with measurable outputs—from
            Anganwadi modernization to corridor-scale workforce welfare.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">CSR investment menu</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Four tiers. Clear outputs.
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {csrTiers.map((tier) => (
              <li key={tier.tier} className="border border-line bg-surface p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  {tier.tier}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {tier.name}
                </h3>
                <p className="mt-2 text-lg font-semibold text-accent">{tier.budget}</p>
                <p className="mt-4 text-sm font-medium text-ink">{tier.package}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {tier.outputs}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-surface/70">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Statutory & public partners</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Institutions we already work alongside
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="border border-line bg-background p-5">
              <h3 className="font-semibold text-ink">Civic & urban administration</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                {publicPartners.civic.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="border border-line bg-background p-5">
              <h3 className="font-semibold text-ink">Law enforcement & safety</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                {publicPartners.safety.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="border border-line bg-background p-5">
              <h3 className="font-semibold text-ink">Financial & national systems</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                {publicPartners.financial.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Partnership inquiry</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Tell us which tier fits your CSR board
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Inquiries go to {identity.emails[0]}. We respond with package
              options, due-diligence materials, and field visit possibilities.
            </p>
            <div className="mt-6 space-y-2 text-sm text-ink-muted">
              <p>{identity.address}</p>
              <p>
                <a href={identity.phoneHref} className="font-semibold text-brand">
                  {identity.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${identity.emails[0]}`}
                  className="font-semibold text-brand"
                >
                  {identity.emails[0]}
                </a>
              </p>
            </div>
            <Link href="/donate" className="link-underline mt-8 inline-block">
              Prefer individual giving? Donate →
            </Link>
          </Reveal>
          <PartnerInquiryForm />
        </div>
      </section>
    </div>
  );
}
