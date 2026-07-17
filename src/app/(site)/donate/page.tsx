import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm } from "@/components/donate/DonateForm";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { donate } = await getSiteSettings();
  return { title: donate.seoTitle, description: donate.seoDescription };
}

export default async function DonatePage() {
  const { donate } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {donate.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {donate.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">{donate.intro}</p>
          <ul className="mt-8 space-y-3 text-sm text-ink-muted">
            {donate.bullets.map((bullet) => (
              <li key={bullet}>· {bullet}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-muted">{donate.footerNote}</p>
        </div>
        <DonateForm />
      </div>
    </div>
  );
}
