import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  governanceStandards,
  identity,
  policyAlignments,
  theoryOfChange,
  values,
} from "@/lib/svitech";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vision, mission, theory of change, and governance of SVITECH Foundation — ISO 9001:2015, 12A, 80G, CSR-1.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-line bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            About
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {identity.legalName}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/78">{identity.fullForm}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            {identity.designation}. Led by {identity.director}, {identity.directorTitle}.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-5 md:grid-cols-2 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Vision</p>
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-ink">
              {identity.vision}
            </p>
          </Reveal>
          <Reveal>
            <p className="site-eyebrow">Mission</p>
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-ink">
              {identity.mission}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-surface/70">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Institutional values</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              What every delivery system is held to
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {values.map((value) => (
              <li key={value.title} className="border border-line bg-background p-6">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{value.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Theory of change</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Three-stage implementation framework
            </h2>
          </Reveal>
          <ol className="mt-10 space-y-6">
            {theoryOfChange.map((stage) => (
              <li key={stage.stage} className="border border-line bg-surface/80 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  {stage.stage}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {stage.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {stage.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Governance</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Auditability & financial due diligence
            </h2>
            <p className="mt-4 max-w-2xl text-base text-ink-muted">
              Standard operating procedures designed for corporate board reviews
              and statutory audits under the Indian Companies Act, 2013.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {governanceStandards.map((item) => (
              <li key={item.title} className="border border-line bg-background p-5">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.copy}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 border border-line bg-background p-5">
            <p className="text-sm font-semibold text-ink">Statutory registrations</p>
            <p className="mt-2 text-sm text-ink-muted">
              {identity.registrations.join(" · ")} · {identity.accreditation}
            </p>
            <p className="mt-4 text-sm text-ink-muted">
              Leadership: {identity.director}, {identity.directorTitle}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Policy alignment</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Schedule VII & Sustainable Development Goals
            </h2>
          </Reveal>
          <div className="mt-8 overflow-x-auto">
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
          <div className="btn-row mt-10 flex flex-wrap gap-3">
            <Link href="/partner" className="btn-primary">
              Partner with us
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
