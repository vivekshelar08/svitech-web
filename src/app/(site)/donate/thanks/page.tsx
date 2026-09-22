import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { donateThanks } = await getSiteSettings();
  return {
    title: donateThanks.seoTitle,
    description: donateThanks.seoDescription,
  };
}

export default async function DonateThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string; frequency?: string }>;
}) {
  const params = await searchParams;
  const amount = params.amount ? Number(params.amount) : null;
  const monthly = params.frequency === "monthly";
  const { donateThanks } = await getSiteSettings();

  return (
    <div className="relative overflow-hidden">
      <section className="relative bg-bg-deep text-white">
        <div className="circuit-mesh absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-5 sm:py-20 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            {donateThanks.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {donateThanks.headline}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <div className="-mt-10 border border-line/80 bg-white p-6 text-center shadow-[0_20px_50px_-28px_rgba(11,20,36,0.4)] sm:p-8">
          <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
            {amount
              ? `We received your ${monthly ? "monthly" : "one-time"} gift of ₹${amount.toLocaleString("en-IN")}.`
              : "We received your gift."}{" "}
            {donateThanks.receiptNote}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={donateThanks.ctaPrimaryHref} className="btn-primary sm:w-auto">
              {donateThanks.ctaPrimary}
            </Link>
            <Link
              href={donateThanks.ctaSecondaryHref}
              className="inline-flex min-h-12 items-center justify-center border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand/40"
            >
              {donateThanks.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
