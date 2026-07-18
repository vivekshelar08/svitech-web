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
    <section
      className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
      aria-labelledby="home-programs-heading"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="site-eyebrow">{eyebrow}</p>
          <h2
            id="home-programs-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            {headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{intro}</p>
        </div>
        <Link href={ctaHref} className="link-underline shrink-0 self-start md:self-auto">
          {ctaLabel}
        </Link>
      </div>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((program, index) => (
          <li key={program.slug}>
            <Link
              href={`/programs/${program.slug}`}
              className="panel-lift group flex h-full flex-col overflow-hidden border border-line/80 bg-white/80"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                {program.coverImage ? (
                  <Image
                    src={program.coverImage}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-accent-soft" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/70 via-bg-deep/10 to-transparent" />
                <span className="absolute bottom-3 left-3 font-display text-xs font-bold tracking-wider text-white/90">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col border-t border-line/60 p-5">
                <h3 className="font-display text-lg font-bold text-ink transition group-hover:text-brand">
                  {program.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {program.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {itemCtaLabel}
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
