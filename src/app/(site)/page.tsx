import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  eSevaCenters,
  headlineMetrics,
  identity,
  programs,
} from "@/lib/svitech";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 85% 20%, color-mix(in srgb, var(--brand) 18%, transparent), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-5 sm:pb-20 sm:pt-20 md:px-8 md:pb-28 md:pt-24">
          <p className="site-eyebrow motion-rise">{identity.legalName}</p>
          <span className="ink-rule mt-4" aria-hidden />
          <h1 className="motion-rise motion-rise-delay-1 mt-6 max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {identity.legalName}
          </h1>
          <p className="motion-rise motion-rise-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            {identity.designation}. Connecting unorganized workers to public
            welfare, bringing young women into the digital economy, and building
            civic leadership that lasts.
          </p>
          <div className="btn-row motion-rise motion-rise-delay-3 mt-9 flex flex-wrap gap-3">
            <Link href="/partner" className="btn-primary">
              Partner with us
            </Link>
            <Link href="/donate" className="btn-secondary">
              Donate
            </Link>
            <Link href="/work" className="btn-secondary">
              See our work
            </Link>
          </div>
          <p className="mt-8 max-w-xl text-sm text-ink-muted">
            {identity.registrations.join(" · ")} · {identity.accreditation}
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-8 md:py-16">
          <Reveal>
            <p className="site-eyebrow">Director’s perspective</p>
            <blockquote className="mt-5 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
              “{identity.directorQuote}”
            </blockquote>
            <footer className="mt-6 text-sm font-semibold text-ink">
              — {identity.director}, {identity.directorTitle}
            </footer>
          </Reveal>
          <Reveal>
            <div className="border border-line bg-background/80 p-6 sm:p-8">
              <p className="site-eyebrow">Executive summary</p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {identity.executiveSummary}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {identity.coverage}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="site-eyebrow">Verified cumulative impact</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Field numbers, not slogans
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {headlineMetrics.map((metric, index) => (
              <li
                key={metric.label}
                className={`motion-rise border border-line bg-surface/90 p-5 sm:p-6 motion-rise-delay-${Math.min(index, 3)}`}
              >
                <p className="stat-value font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">{metric.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {metric.note}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/impact" className="link-underline">
              Open the impact dashboard →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="site-eyebrow">Practice portfolios</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Five practices. One last-mile system.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
              Each vertical is designed for Schedule VII alignment, audited
              delivery, and permanent community assets.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <li key={program.slug}>
                <Link
                  href={`/work/${program.slug}`}
                  className="group flex h-full flex-col border border-line bg-surface/80 p-6 transition hover:border-brand/40 hover:bg-surface"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                    {program.shortName}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink group-hover:text-brand">
                    {program.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink">{program.focus}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {program.highlight}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-brand">
                    Explore practice →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
              Permanent infrastructure
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Four E-Seva Kendras across Mumbai
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Walk-in Common Service Centers keep welfare access available beyond
              camp days—in Asalpha, Backbay, Vashinaka, and Vishnu Nagar.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eSevaCenters.map((center) => (
              <li
                key={center.name}
                className="border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
              >
                <h3 className="font-display text-xl font-semibold">{center.name}</h3>
                <p className="mt-2 text-sm text-white/75">{center.catchment}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-bright">
                  {center.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-24 md:px-8">
          <Reveal>
            <p className="site-eyebrow">Take part</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Pair capital with verifiable field systems
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
              Corporate partners fund turnkey Schedule VII packages. Individuals
              can give under 80G. Both paths keep last-mile delivery auditable.
            </p>
            <div className="btn-row mt-8 flex flex-wrap gap-3">
              <Link href="/partner" className="btn-primary">
                CSR partnership menu
              </Link>
              <Link href="/donate" className="btn-secondary">
                Individual donate
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact the foundation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
