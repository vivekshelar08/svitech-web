import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { getInvolved } = await getSiteSettings();
  return {
    title: getInvolved.seoTitle,
    description: getInvolved.seoDescription,
  };
}

export default async function GetInvolvedPage() {
  const { getInvolved } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {getInvolved.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {getInvolved.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {getInvolved.intro}
      </p>

      <ul className="mt-14 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
        {getInvolved.ways.map((way) => (
          <li key={way.title}>
            <h2 className="font-display text-xl font-bold text-ink">{way.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              {way.copy}
            </p>
            <Link
              href={way.href}
              className="mt-5 inline-block border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
            >
              {way.cta}
            </Link>
          </li>
        ))}
      </ul>

      <section
        id="donate"
        className="mt-20 scroll-mt-28 border border-line bg-surface px-6 py-12 md:px-10 md:py-14"
      >
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
          {getInvolved.donateHeadline}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
          {getInvolved.donateCopy}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={getInvolved.donateCtaPrimaryHref}
            className="bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            {getInvolved.donateCtaPrimary}
          </Link>
          <Link
            href={getInvolved.donateCtaSecondaryHref}
            className="border border-line bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink"
          >
            {getInvolved.donateCtaSecondary}
          </Link>
        </div>
      </section>
    </div>
  );
}
