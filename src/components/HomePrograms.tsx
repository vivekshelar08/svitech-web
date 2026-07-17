import Image from "next/image";
import Link from "next/link";
import type { Program } from "@/content/programs";

export function HomePrograms({
  eyebrow,
  headline,
  intro,
  programs,
  ctaLabel,
  ctaHref,
  itemCtaLabel,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  programs: Program[];
  ctaLabel: string;
  ctaHref: string;
  itemCtaLabel: string;
}) {
  const featured = programs.slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28" aria-labelledby="home-programs-heading">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
        <h2
          id="home-programs-heading"
          className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
        >
          {headline}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{intro}</p>
      </div>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((program) => (
          <li key={program.slug}>
            <Link
              href={`/programs/${program.slug}`}
              className="group flex h-full flex-col overflow-hidden border border-line bg-white shadow-sm transition hover:border-brand/30 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                {program.coverImage ? (
                  <Image
                    src={program.coverImage}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-accent-soft" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand">
                  {program.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {program.summary}
                </p>
                <span className="mt-4 text-sm font-semibold text-brand">{itemCtaLabel}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link
          href={ctaHref}
          className="inline-block border-b-2 border-brand pb-1 text-sm font-semibold text-brand transition hover:border-brand-bright hover:text-brand-bright"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
