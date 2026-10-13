import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { programs } from "@/lib/svitech";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Five SVITECH practice portfolios: Samriddhi, TechShala, Swasthya-Setu, Lok-Adhikar, and Urja-Prayas.",
};

export default function WorkPage() {
  return (
    <div>
      <section className="border-b border-line bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            Our Work
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Practice portfolios built for audited delivery
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
            Each programme starts from a structural barrier, deploys a field
            model, and closes with verified numbers from the foundation profile.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
        <ul className="space-y-8">
          {programs.map((program, index) => (
            <li key={program.slug}>
              <Reveal>
                <article className="grid gap-6 border border-line bg-surface/80 p-6 sm:p-8 lg:grid-cols-[0.35fr_1fr] lg:gap-10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                      Practice {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
                      {program.name}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-ink-muted">
                      {program.focus}
                    </p>
                    <Link
                      href={`/work/${program.slug}`}
                      className="btn-primary mt-6 inline-flex"
                    >
                      Open practice
                    </Link>
                  </div>
                  <div>
                    <p className="text-base leading-relaxed text-ink-muted">
                      {program.problem}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-ink">
                      {program.model}
                    </p>
                    <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {program.metrics.map((metric) => (
                        <div key={metric.label}>
                          <dt className="stat-value font-display text-2xl font-semibold">
                            {metric.value}
                          </dt>
                          <dd className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                            {metric.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
