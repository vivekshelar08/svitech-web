import type { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { programs } = await getSiteSettings();
  return { title: programs.seoTitle, description: programs.seoDescription };
}

export default async function ProgramsPage() {
  const programList = await getPrograms();
  const { programs } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {programs.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {programs.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {programs.intro}
      </p>

      <ul className="mt-14 divide-y divide-line border-y border-line">
        {programList.map((program) => (
          <li
            key={program.slug}
            className="grid gap-3 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:gap-10"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                <Link href={`/programs/${program.slug}`} className="hover:text-brand">
                  {program.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-brand">{program.detail}</p>
            </div>
            <div>
              <p className="leading-relaxed text-ink-muted">{program.summary}</p>
              <Link
                href={`/programs/${program.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-brand"
              >
                {programs.itemCtaLabel}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <Link
          href={programs.bottomCtaHref}
          className="bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110"
        >
          {programs.bottomCtaLabel}
        </Link>
      </div>
    </div>
  );
}
