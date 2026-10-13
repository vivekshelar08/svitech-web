import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  governanceStandards,
  growthTimeline,
  identity,
  leadership,
  media,
  policyAlignments,
  theoryOfChange,
  values,
} from "@/lib/svitech";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vision, mission, leadership, and governance of SVITECH Foundation — ISO 9001:2015, 12A, 80G, CSR-1.",
};

export default function AboutPage() {
  return (
    <div>
      {/* EG-style page hero with photo */}
      <section className="relative min-h-[50svh] overflow-hidden text-white">
        <Image
          src={media.heroCommunity}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg-deep/70" aria-hidden />
        <div className="relative mx-auto flex min-h-[50svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-5 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            About Us
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Who we are
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {identity.fullForm}
          </p>
        </div>
      </section>

      {/* Subnav like EG about sections */}
      <nav className="sticky top-[3.5rem] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold sm:px-5 md:px-8">
          {[
            { href: "#vision", label: "Vision / Mission" },
            { href: "#leadership", label: "Leadership" },
            { href: "#how", label: "How we work" },
            { href: "#governance", label: "Governance" },
            { href: "#timeline", label: "Our journey" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-ink-muted transition hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="vision" className="scroll-mt-28 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-5 md:grid-cols-3 md:px-8 md:py-20">
          <div>
            <p className="site-eyebrow">Vision</p>
            <p className="mt-4 font-display text-xl font-medium leading-snug text-ink">
              {identity.vision}
            </p>
          </div>
          <div>
            <p className="site-eyebrow">Mission</p>
            <p className="mt-4 font-display text-xl font-medium leading-snug text-ink">
              {identity.mission}
            </p>
          </div>
          <div>
            <p className="site-eyebrow">Goal</p>
            <p className="mt-4 font-display text-xl font-medium leading-snug text-ink">
              Institutionalize self-reliance—connecting unorganized workers to
              public welfare, bringing young women into the digital economy, and
              empowering grassroots leaders to resolve civic challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-16">
          <h2 className="font-display text-3xl font-semibold text-ink">
            Our values
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <li key={value.title} className="border border-line bg-white p-6">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {value.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="leadership" className="scroll-mt-28 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <p className="site-eyebrow">Leadership</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Governing board &amp; executive leadership
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            A multidisciplinary board combining technical proficiency, operational
            rigor, and deep community trust.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {leadership.map((person) => (
              <li key={person.name} className="border border-line bg-[#faf7f2] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  {person.role}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {person.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {person.background}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  {person.responsibilities}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="how" className="scroll-mt-28 bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            How we work
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Three-stage implementation framework
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {theoryOfChange.map((stage) => (
              <li key={stage.stage} className="border border-white/15 bg-white/5 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-bright">
                  {stage.stage}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {stage.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {stage.points.map((point) => (
                    <li key={point} className="text-sm leading-relaxed text-white/70">
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="governance" className="scroll-mt-28 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <p className="site-eyebrow">Governance</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Auditability &amp; financial due diligence
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            {identity.registrations.join(" · ")} · {identity.accreditation}
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {governanceStandards.map((item) => (
              <li key={item.title} className="border border-line bg-[#faf7f2] p-5">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.copy}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-muted">
                  <th className="py-3 pr-4 font-semibold">Framework</th>
                  <th className="py-3 pr-4 font-semibold">Domain</th>
                  <th className="py-3 font-semibold">SDGs</th>
                </tr>
              </thead>
              <tbody>
                {policyAlignments.map((row) => (
                  <tr key={row.framework} className="border-b border-line/70 align-top">
                    <td className="py-4 pr-4 font-medium text-ink">{row.framework}</td>
                    <td className="py-4 pr-4 text-ink-muted">{row.domain}</td>
                    <td className="py-4 text-accent">{row.sdgs.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="timeline" className="scroll-mt-28 bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <p className="site-eyebrow">Our journey</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Strategic growth timeline
          </h2>
          <ol className="mt-10 space-y-4">
            {growthTimeline.map((item) => (
              <li
                key={item.year}
                className="grid gap-2 border border-line bg-white p-5 md:grid-cols-[8rem_1fr]"
              >
                <p className="font-display text-xl font-semibold text-brand">
                  {item.year}
                </p>
                <div>
                  <h3 className="font-semibold text-ink">{item.phase}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{item.milestone}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="btn-row mt-10 flex flex-wrap gap-3">
            <Link href="/partner" className="btn-primary">
              Partner with us
            </Link>
            <Link href="/work" className="btn-secondary">
              Our Intervention
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-accent text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-5 md:flex-row md:items-center md:px-8">
          <h2 className="max-w-xl font-display text-2xl font-semibold sm:text-3xl">
            Interested in contributing towards last-mile delivery?
          </h2>
          <Link
            href="/donate"
            className="inline-flex bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-accent"
          >
            Yes! I want to help
          </Link>
        </div>
      </section>
    </div>
  );
}
