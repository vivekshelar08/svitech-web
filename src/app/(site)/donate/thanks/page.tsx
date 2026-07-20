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
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {donateThanks.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
        {donateThanks.headline}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-muted">
        {amount
          ? `We received your ${monthly ? "monthly" : "one-time"} gift of ₹${amount.toLocaleString("en-IN")}.`
          : "We received your gift."}{" "}
        {donateThanks.receiptNote}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={donateThanks.ctaPrimaryHref}
          className="bg-brand px-6 py-3.5 text-sm font-semibold text-white"
        >
          {donateThanks.ctaPrimary}
        </Link>
        <Link
          href={donateThanks.ctaSecondaryHref}
          className="border border-line bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink"
        >
          {donateThanks.ctaSecondary}
        </Link>
      </div>
    </div>
  );
}
