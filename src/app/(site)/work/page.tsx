import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { media, programImages, programs } from "@/lib/svitech";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Five SVITECH practice portfolios: Samriddhi, TechShala, Swasthya-Setu, Lok-Adhikar, and Urja-Prayas.",
};

export default function WorkPage() {
  return (
    <div>
      <section className="relative overflow-hidden text-white">
        <Image
          src={media.heroCommunity}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg-deep/80" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
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
                <article className="grid overflow-hidden border border-line bg-surface/80 lg:grid-cols-[0.9fr_1.2fr]">
                  <div className="relative min-h-[14rem] lg:min-h-full">
                    <Image
                      src={programImages[program.slug] || media.heroCommunity}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                      Practice {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
                      {program.name}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-ink-muted">
                      {program.focus}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-ink-muted">
                      {program.problem}
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
                    <Link
                      href={`/work/${program.slug}`}
                      className="btn-primary mt-6 inline-flex"
                    >
                      Open practice
                    </Link>
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
