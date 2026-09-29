import type { Metadata } from "next";
import Link from "next/link";
import {
  campLocations,
  capabilities,
  curricula,
  deliverySteps,
  foundationProfile,
  globalContext,
  headlineStats,
  impactAreas,
  jobRoles,
  people,
  programmes,
  recognitions,
  record,
  sdgs,
  servicesDelivered,
  sourcesNote,
  stories,
  targets2030,
  timeline,
} from "@/content/foundation-profile";

export const metadata: Metadata = {
  title: "Foundation profile",
  description:
    "How SVITECH Foundation trains women and youth, places them in local jobs, and brings public services to Mumbai communities — with the figures and the global evidence kept distinct.",
};

export default function FoundationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {foundationProfile.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {foundationProfile.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {foundationProfile.lede}
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
        {foundationProfile.meaning}
      </p>

      <dl className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {headlineStats.map((stat) => (
          <div key={stat.label} className="bg-surface px-5 py-6">
            <dt className="font-display text-3xl font-bold text-ink">{stat.value}</dt>
            <dd className="mt-2 text-sm font-semibold text-ink">{stat.label}</dd>
            <dd className="mt-1 text-xs leading-relaxed text-ink-muted">{stat.note}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-20 grid gap-12 border-t border-line pt-14 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            The wider picture
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
            {globalContext.title}
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
            {globalContext.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ul className="space-y-5">
          {sdgs.map((goal) => (
            <li key={goal.code} className="border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">
                <span className="text-brand">SDG {goal.code}</span>
                <span className="text-ink-muted"> · </span>
                {goal.name}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{goal.copy}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Our journey
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink">
          From an evening classroom to a Section 8 foundation.
        </h2>
        <ol className="mt-10 space-y-0">
          {timeline.map((item) => (
            <li
              key={item.year}
              className="grid gap-2 border-t border-line py-6 md:grid-cols-[8rem_1fr] md:gap-10"
            >
              <p className="font-display text-lg font-bold text-brand">{item.year}</p>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-ink-muted">{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          What the work is for
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink">
          Four results a household can feel.
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-2">
          {impactAreas.map((area) => (
            <li key={area.index}>
              <p className="font-display text-sm font-bold text-brand">{area.index}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">{area.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{area.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          How a programme actually runs
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink">
          Enrol, practise, then follow the file until it clears.
        </h2>
        <ol className="mt-10 grid gap-10 lg:grid-cols-3">
          {deliverySteps.map((step) => (
            <li key={step.step}>
              <p className="font-display text-sm font-bold tracking-[0.14em] text-brand">{step.step}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div key={item.label}>
              <dt className="font-display text-2xl font-bold text-ink">{item.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_16rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              The classroom
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
              What a trainee is expected to do on Monday morning.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
              Roles the course is built for, in small and medium firms around Mumbai.
              Cohorts stay small — about 15 for job skills — so weekly tests are real.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
              Curriculum
            </h3>
            <ul className="mt-4 space-y-2">
              {curricula.map((item) => (
                <li key={item} className="border-b border-line py-2 text-sm text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
              Roles employers hire for
            </h3>
            <ul className="mt-4 space-y-2">
              {jobRoles.map((item) => (
                <li key={item} className="border-b border-line py-2 text-sm text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-20 space-y-16 border-t border-line pt-14">
        {programmes.map((programme) => (
          <article key={programme.id} className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {programme.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
              {programme.title}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-muted">
              {programme.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Where the camps run
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink">
          More than 30 locations. These are the ones named in the record.
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2">
          {campLocations.map((place) => (
            <li
              key={place}
              className="border border-line bg-surface px-3 py-1.5 text-sm text-ink"
            >
              {place}
            </li>
          ))}
        </ul>
        <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-ink">
          Services the camps complete
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {servicesDelivered.map((service) => (
            <li key={service} className="text-sm leading-relaxed text-ink-muted">
              {service}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          The record, with its periods
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink">
          Two documents, several years. We did not merge the totals.
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          The annual report and the later profile sometimes count the same kind of
          work over different windows. Publishing one blended number would look
          cleaner and would be wrong.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {record.map((row) => (
            <li key={row.fact} className="grid gap-2 py-5 md:grid-cols-[12rem_1fr] md:gap-8">
              <p className="text-sm font-semibold text-brand">{row.period}</p>
              <p className="text-sm leading-relaxed text-ink-muted">{row.fact}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Two pathways
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink">
          What a completed course looked like for two learners.
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          {stories.map((story) => (
            <article key={story.name}>
              <p className="text-sm font-semibold text-brand">{story.place}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">{story.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{story.role}</p>
              <blockquote className="mt-5 border-l-2 border-brand pl-4 text-sm leading-relaxed text-ink">
                {story.quote}
              </blockquote>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-muted">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          People who run it
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
          Leadership named in the 2024–25 profile.
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2">
          {people.map((person) => (
            <li key={person.name}>
              <h3 className="font-display text-xl font-bold text-ink">{person.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand">{person.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{person.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Recognition
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
              Who has already checked this work.
            </h2>
            <ul className="mt-6 space-y-4">
              {recognitions.map((item) => (
                <li key={item} className="border-t border-line pt-4 text-sm leading-relaxed text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              By 2030
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
              Targets the Foundation has written down.
            </h2>
            <ul className="mt-6 space-y-6">
              {targets2030.map((target) => (
                <li key={target.value}>
                  <p className="font-display text-3xl font-bold text-ink">{target.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{target.label}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              Alongside those targets: quality, affordable education and training;
              gainful employment; and farm and non-farm livelihoods that produce an
              income. The 2027 milestone on the way is five digital skills centres
              and 25,000 youth made job-ready.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-14">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
          Visit the centre, or back a cohort.
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          The Skill Development Centre is in Ghatkopar West. Partnerships, volunteering,
          and donations are how the next camp and the next batch of fifteen get funded.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/get-involved" className="bg-accent px-6 py-3.5 text-sm font-semibold text-ink">
            Partner or volunteer
          </Link>
          <Link
            href="/programs"
            className="border border-line bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink"
          >
            See programmes
          </Link>
          <Link
            href="/donate"
            className="border border-line bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink"
          >
            Donate
          </Link>
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-muted">{sourcesNote}</p>
      </section>
    </div>
  );
}
