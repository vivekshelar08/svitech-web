import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm } from "@/components/donate/DonateForm";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { donate } = await getSiteSettings();
  return { title: donate.seoTitle, description: donate.seoDescription };
}

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string }>;
}) {
  const { donate, general } = await getSiteSettings();
  const params = await searchParams;
  const parsed = Number(params.amount);
  const initialAmount =
    Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : undefined;

  return (
    <div className="relative overflow-hidden">
      <section className="relative bg-bg-deep text-white">
        <div className="circuit-mesh absolute inset-0 opacity-45" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-bg-deep via-bg-deep/90 to-brand/30"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            {donate.eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {donate.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">
            {donate.intro}
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14 md:px-8 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
          <div className="space-y-6 lg:-mt-24">
            <div className="border border-line/80 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(11,20,36,0.35)] sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                Your gift supports
              </p>
              <ul className="mt-4 space-y-3.5 text-sm leading-relaxed text-ink-muted">
                {donate.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span className="text-ink">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">{donate.footerNote}</p>
            <p className="text-sm text-ink-muted">
              Questions about CSR or bank transfer?{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand underline-offset-2 hover:underline"
              >
                Contact {general.siteName}
              </Link>
              .
            </p>
          </div>

          <div className="lg:-mt-24">
            <DonateForm
              initialAmount={initialAmount}
              presetAmounts={donate.presetAmounts}
              organizationName={general.siteName}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
