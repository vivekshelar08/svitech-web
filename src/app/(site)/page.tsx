import Image from "next/image";
import Link from "next/link";
import { ImpactMap } from "@/components/ImpactMap";
import { getImpactStories, getPosts } from "@/lib/content";
import {
  headlineMetrics,
  identity,
  media,
  programImages,
  programs,
  theoryOfChange,
} from "@/lib/svitech";

export const revalidate = 60;

/** Educate Girls–style “What We Do” outcome pillars with photo overlays */
const outcomePillars = [
  {
    title: "ENTITLEMENTS UNLOCKED",
    copy: "Welfare camps and E-Seva desks link households to PMJAY, E-Shram, Ladki Bahin, and more.",
    image: media.welfareCamp,
    href: "/work/samriddhi",
  },
  {
    title: "DIGITAL SKILLS BUILT",
    copy: "Accredited labs and Women Learning Centers certify first-generation learners—78% female.",
    image: media.heroDigital,
    href: "/work/techshala",
  },
  {
    title: "CIVIC VOICE STRENGTHENED",
    copy: "Community Vigilance Groups, health drives, Anganwadi upgrades, and STEM champions.",
    image: media.civicMeeting,
    href: "/work/lok-adhikar",
  },
] as const;

const impactStatements = [
  "Link a household and they gain health cover for a generation",
  "Train a young woman and she enters the digital economy",
  "Certify a learner and she teaches the next neighbour",
  "Audit a ration shop and food security becomes real",
  "Hand over a lab and the community owns the asset",
  "Build a vigilance group and civic systems stay accountable",
] as const;

export default async function HomePage() {
  const [stories, posts] = await Promise.all([
    getImpactStories(),
    getPosts(),
  ]);
  const storiesPreview = posts.slice(0, 3);

  return (
    <>
      {/* 1. EG hero — full-bleed photo + DONATE NOW */}
      <section className="relative min-h-[92svh] overflow-hidden text-white">
        <Image
          src={media.heroCommunity}
          alt="Community members standing together at sunset"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,38,58,0.55) 0%, rgba(18,38,58,0.35) 40%, rgba(18,38,58,0.78) 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col items-start justify-end px-4 pb-16 pt-28 sm:px-5 md:px-8 md:pb-24">
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Self-reliant communities shape stronger generations
          </h1>
          <Link href="/donate" className="btn-primary mt-8 text-sm font-bold uppercase tracking-[0.12em]">
            Donate now
          </Link>
        </div>
      </section>

      {/* 2. Mission strip — EG “protects & promotes” + help CTA */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-5 md:grid-cols-2 md:gap-14 md:px-8 md:py-20">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-snug text-ink sm:text-4xl">
              SVITECH Foundation protects &amp; promotes every family’s right to
              entitlements, skills, and civic voice
            </h2>
            <Link
              href="/donate"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-brand"
            >
              Yes! I want to help
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={media.womenLearning}
              alt="Women learning digital skills in a community centre"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 3. Featured voice — EG TED-style feature block */}
      <section className="relative overflow-hidden bg-bg-deep text-white">
        <div className="absolute inset-0 opacity-30">
          <Image src={media.civicMeeting} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-5 md:px-8 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            Director’s vision
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-snug sm:text-4xl md:text-5xl">
            A bold plan to institutionalize self-reliance at the last mile
          </h2>
          <p className="mt-4 text-lg text-white/75">— {identity.director}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            {identity.directorQuote.slice(0, 220)}…
          </p>
          <Link href="/about#leadership" className="btn-ghost mt-8 inline-flex">
            Watch our story →
          </Link>
        </div>
      </section>

      {/* 4. What We Do — EG three photo pillars */}
      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              SVITECH works with government, community facilitators, and CSR
              partners to ensure every vulnerable household is included,
              digitally skilled, and empowered with choices and voice.
            </p>
            <Link
              href="/donate"
              className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.14em] text-brand"
            >
              Yes! I want to help →
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
            {outcomePillars.map((pillar) => (
              <li key={pillar.title}>
                <Link
                  href={pillar.href}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {pillar.copy}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Recognition / credentials — EG award band */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-5 md:grid-cols-[1fr_1.2fr] md:px-8 md:py-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-accent-soft">
            <Image
              src={media.mumbaiSkyline}
              alt="Mumbai operational footprint"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div>
            <p className="site-eyebrow">Statutory credentials</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Audit-ready delivery you can fund
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              ISO 9001:2015 quality systems, Section 12A &amp; 80G registration,
              and MCA CSR-1 enable corporate board reviews with geo-tagged field
              verification and competitive vendor due diligence.
            </p>
            <Link href="/about#governance" className="link-underline mt-6 inline-block">
              Learn more about this foundation →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Impact Since Inception — EG big numbers row */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <h2 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
            Impact Since Inception
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {headlineMetrics.map((metric) => (
              <li key={metric.label} className="text-center">
                <p className="font-display text-4xl font-semibold text-brand sm:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-ink">
                  {metric.label}
                </p>
                <p className="mx-auto mt-2 max-w-[12rem] text-xs leading-relaxed text-ink-muted">
                  {metric.note}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/impact" className="link-underline">
              View full impact dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Impact statements — EG “Educate a Girl and she will…” strip */}
      <section className="overflow-hidden bg-brand text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 md:px-8">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {impactStatements.map((line) => (
              <li
                key={line}
                className="border border-white/25 bg-white/10 px-5 py-4 font-display text-lg font-medium leading-snug"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. How We Work — EG step cards */}
      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            How We Work
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {theoryOfChange.flatMap((stage, stageIndex) =>
              stage.points.slice(0, 3).map((point, pointIndex) => (
                <li
                  key={`${stage.stage}-${pointIndex}`}
                  className="border border-line bg-white p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                    Step {stageIndex * 3 + pointIndex + 1}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {stage.title.split("&")[0]?.trim() || stage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {point}
                  </p>
                </li>
              )),
            ).slice(0, 6)}
          </ol>
        </div>
      </section>

      {/* 9. Mid donate CTA — EG “Yes! I want to help / DONATE NOW” */}
      <section className="relative overflow-hidden text-white">
        <Image src={media.healthCamp} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-bg-deep/80" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-5 md:py-28">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
            Yes! I want to help
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
            Fund welfare camps, digital labs, health drives, and civic leadership
            with audit-ready reporting.
          </p>
          <Link
            href="/donate"
            className="btn-primary mt-8 inline-flex text-sm font-bold uppercase tracking-[0.12em]"
          >
            Donate now
          </Link>
        </div>
      </section>

      {/* 10. Achievement map */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <ImpactMap
            stories={stories}
            mapEyebrow="Where we work"
            mapHeadline="Achievement map across hubs & corridors"
          />
        </div>
      </section>

      {/* 11. Our Intervention cards */}
      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Our Intervention
            </h2>
            <Link href="/work" className="link-underline">
              View all →
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <li key={program.slug}>
                <Link
                  href={`/work/${program.slug}`}
                  className="group block overflow-hidden border border-line bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={programImages[program.slug] || media.heroCommunity}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-ink group-hover:text-brand">
                      {program.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">{program.focus}</p>
                    <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.14em] text-brand">
                      Read more →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. Stories & Updates — EG news grid */}
      {storiesPreview.length > 0 ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Stories &amp; Updates
              </h2>
              <Link href="/news" className="link-underline">
                View all →
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {storiesPreview.map((post) => (
                <li key={post.slug}>
                  <Link href={`/news/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-ink group-hover:text-brand">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 inline-block text-xs font-bold uppercase tracking-[0.14em] text-brand">
                      Read more
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 13. Bottom contribute CTA — EG footer CTA */}
      <section className="bg-accent text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-5 md:flex-row md:items-center md:px-8 md:py-16">
          <h2 className="max-w-xl font-display text-3xl font-semibold sm:text-4xl">
            Interested in contributing towards last-mile delivery?
          </h2>
          <Link
            href="/donate"
            className="inline-flex bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-accent transition hover:bg-surface"
          >
            Yes! I want to help
          </Link>
        </div>
      </section>
    </>
  );
}
