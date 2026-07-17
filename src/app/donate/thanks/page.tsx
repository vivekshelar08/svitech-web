import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for supporting SVITECH Foundation.",
};

export default async function DonateThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string; frequency?: string }>;
}) {
  const params = await searchParams;
  const amount = params.amount ? Number(params.amount) : null;
  const monthly = params.frequency === "monthly";

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        Thank you
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
        Your support is in motion.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-muted">
        {amount
          ? `We received your ${monthly ? "monthly" : "one-time"} gift of ₹${amount.toLocaleString("en-IN")}.`
          : "We received your gift."}{" "}
        A receipt is on its way to your email.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/impact"
          className="bg-brand px-6 py-3.5 text-sm font-semibold text-white"
        >
          See our impact
        </Link>
        <Link
          href="/news"
          className="border border-line bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink"
        >
          Read the latest
        </Link>
      </div>
    </div>
  );
}
