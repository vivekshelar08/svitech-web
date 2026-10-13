import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getProgram, programs } from "@/lib/svitech";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Practice" };
  return {
    title: program.name,
    description: program.highlight,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const index = programs.findIndex((item) => item.slug === program.slug);
  const prev = programs[(index - 1 + programs.length) % programs.length];
  const next = programs[(index + 1) % programs.length];

  return (
    <div>
      <section className="border-b border-line bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Link
            href="/work"
            className="text-xs font-bold uppercase tracking-[0.16em] text-brand-bright hover:text-white"
          >
            ← Our Work
          </Link>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {program.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/78">{program.focus}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            {program.highlight}
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-5 md:grid-cols-2 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">The problem</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Why this practice exists
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {program.problem}
            </p>
          </Reveal>
          <Reveal>
            <p className="site-eyebrow">The field model</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              How delivery works
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {program.model}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-surface/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:px-8">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {program.metrics.map((metric) => (
              <div key={metric.label} className="border border-line bg-background p-5">
                <dt className="stat-value font-display text-3xl font-semibold">
                  {metric.value}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-ink">{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-5 md:px-8 md:py-20">
        {program.sections.map((section) => (
          <Reveal key={section.title}>
            <article className="border border-line bg-surface/60 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {section.title}
              </h2>
              {section.copy ? (
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted">
                  {section.copy}
                </p>
              ) : null}
              {section.bullets ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-ink sm:text-base"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand"
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.rows ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-muted">
                        <th className="py-3 pr-4 font-semibold">Item</th>
                        <th className="py-3 pr-4 font-semibold">Reach</th>
                        <th className="py-3 font-semibold">Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row) => (
                        <tr key={row.label} className="border-b border-line/70">
                          <td className="py-3 pr-4 font-medium text-ink">
                            {row.label}
                          </td>
                          <td className="py-3 pr-4 text-accent">{row.value}</td>
                          <td className="py-3 text-ink-muted">
                            {row.detail || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </article>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-line bg-surface/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-8">
          <Link href={`/work/${prev.slug}`} className="link-underline">
            ← {prev.shortName}
          </Link>
          <div className="btn-row flex flex-wrap gap-3">
            <Link href="/partner" className="btn-primary">
              Partner on this practice
            </Link>
            <Link href="/donate" className="btn-secondary">
              Donate
            </Link>
          </div>
          <Link href={`/work/${next.slug}`} className="link-underline sm:text-right">
            {next.shortName} →
          </Link>
        </div>
      </section>
    </div>
  );
}
