import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm } from "@/components/donate/DonateForm";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support SVITECH Foundation with a one-time or monthly donation. Funds facilitator stipends, lab equipment, and open curriculum.",
};

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Donate
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Fund skills communities can keep.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Your gift supports facilitator stipends, shared devices, and open learning
            materials—not overhead theater. Choose one-time or monthly giving.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ink-muted">
            <li>· Transparent programs and published reports</li>
            <li>· Receipt emailed after successful payment</li>
            <li>· Card, UPI, and netbanking via Razorpay</li>
          </ul>
          <p className="mt-8 text-sm text-ink-muted">
            Prefer partnership or CSR?{" "}
            <Link href="/contact" className="font-semibold text-brand underline">
              Talk to us
            </Link>
            . See{" "}
            <Link href="/impact" className="font-semibold text-brand underline">
              impact stories
            </Link>{" "}
            and{" "}
            <Link href="/reports" className="font-semibold text-brand underline">
              reports
            </Link>
            .
          </p>
        </div>
        <DonateForm />
      </div>
    </div>
  );
}
