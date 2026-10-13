import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  economicProtection,
  eSevaCenters,
  eSevaInfrastructure,
  eSevaServices,
  headlineMetrics,
  masterDashboard,
  yearOnYear,
} from "@/lib/svitech";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "SVITECH Foundation master impact dashboard and year-on-year growth matrix from multi-year programme cycles.",
};

export default function ImpactPage() {
  return (
    <div>
      <section className="border-b border-line bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            Impact
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Master multi-year impact dashboard
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
            Verified cumulative performance metrics across all operational
            programme cycles—geo-tagged camps, signed registers, and de-duplicated
            beneficiary counts.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:px-8 md:py-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {headlineMetrics.map((metric) => (
              <li key={metric.label} className="border border-line bg-surface p-5">
                <p className="stat-value font-display text-3xl font-semibold sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">{metric.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{metric.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Consolidated milestones</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Organizational performance ledger
            </h2>
          </Reveal>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-muted">
                  <th className="py-3 pr-4 font-semibold">Dimension</th>
                  <th className="py-3 pr-4 font-semibold">Output</th>
                  <th className="py-3 font-semibold">Validation & footprint</th>
                </tr>
              </thead>
              <tbody>
                {masterDashboard.map((row) => (
                  <tr key={row.dimension} className="border-b border-line/70 align-top">
                    <td className="py-4 pr-4 font-medium text-ink">{row.dimension}</td>
                    <td className="py-4 pr-4 font-semibold text-accent">{row.output}</td>
                    <td className="py-4 text-ink-muted">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Year-on-year growth</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              FY 2023–24 through FY 2025–26
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ink-muted">
              Digital certifications include multi-year school partnerships,
              PMGDISHA cycles, and Women Learning Center programmes.
            </p>
          </Reveal>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-[52rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-muted">
                  <th className="py-3 pr-4 font-semibold">Indicator</th>
                  {yearOnYear.columns.map((column) => (
                    <th key={column} className="py-3 pr-4 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {yearOnYear.rows.map((row) => (
                  <tr key={row.indicator} className="border-b border-line/70 align-top">
                    <td className="py-4 pr-4 font-medium text-ink">{row.indicator}</td>
                    {row.values.map((value) => (
                      <td key={`${row.indicator}-${value}`} className="py-4 pr-4 text-ink-muted">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Economic protection</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Value unlocked beyond enrollment counts
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {economicProtection.map((item) => (
              <li key={item.label} className="border border-line bg-background p-5">
                <p className="stat-value font-display text-3xl font-semibold">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Permanent touchpoints</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              E-Seva Kendra network
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {eSevaCenters.map((center) => (
              <li key={center.name} className="border border-line bg-surface p-5">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {center.name}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{center.catchment}</p>
                <p className="mt-3 text-sm text-ink">{center.needs}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-accent">
                  {center.status}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">
                Center infrastructure
              </h3>
              <ul className="mt-5 space-y-4">
                {eSevaInfrastructure.map((item) => (
                  <li key={item.title} className="border border-line bg-surface/80 p-4">
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.copy}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">
                Walk-in service portfolio
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-1">
                {(
                  [
                    ["Citizen identity & legal records", eSevaServices.identity],
                    ["Financial inclusion & social security", eSevaServices.financial],
                    ["Public distribution & utility services", eSevaServices.utilities],
                  ] as const
                ).map(([title, items]) => (
                  <div key={title} className="border border-line bg-surface/80 p-4">
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="btn-row mt-10 flex flex-wrap gap-3">
            <Link href="/work" className="btn-primary">
              Explore practices
            </Link>
            <Link href="/partner" className="btn-secondary">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
