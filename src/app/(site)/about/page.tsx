import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getSiteSettings();
  return { title: about.seoTitle, description: about.seoDescription };
}

export default async function AboutPage() {
  const { about } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {about.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {about.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {about.intro}
      </p>

      <div className="relative mt-14 aspect-[21/9] overflow-hidden">
        <Image
          src={about.heroImage}
          alt={about.heroImageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{about.missionTitle}</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{about.missionCopy}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{about.howTitle}</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{about.howCopy}</p>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <h2 className="font-display text-2xl font-bold text-ink">{about.valuesTitle}</h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value) => (
            <li key={value.title}>
              <h3 className="font-display text-lg font-bold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.copy}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <h2 className="font-display text-2xl font-bold text-ink">{about.governanceTitle}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          {about.governanceCopy}
        </p>
        <Link
          href="/reports"
          className="mt-6 inline-block border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
        >
          {about.governanceLinkLabel}
        </Link>
      </div>

      <Link
        href="/programs"
        className="mt-14 inline-block border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
      >
        {about.programsLinkLabel}
      </Link>
    </div>
  );
}
