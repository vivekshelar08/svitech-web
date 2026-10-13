import Image from "next/image";
import Link from "next/link";
import { ImpactMap } from "@/components/ImpactMap";
import { Reveal } from "@/components/Reveal";
import { getGalleryItems, getImpactStories } from "@/lib/content";
import {
  headlineMetrics,
  identity,
  media,
  programImages,
  programs,
  theoryOfChange,
} from "@/lib/svitech";

export const revalidate = 60;

const whatWeDo = [
  {
    title: "Financial inclusion & entitlements",
    copy: "Camps and E-Seva desks close documentation gaps and unlock statutory welfare for informal households and migrant workers.",
    image: media.welfareCamp,
    href: "/work/samriddhi",
  },
  {
    title: "Digital skills & women’s learning",
    copy: "Accredited labs and Women Learning Centers certify first-generation learners—78% of TechShala enrollment is female.",
    image: media.heroDigital,
    href: "/work/techshala",
  },
  {
    title: "Health, civic voice & sustainability",
    copy: "Diagnostic drives, Community Vigilance Groups, Anganwadi upgrades, STEM clubs, and inclusive youth programmes.",
    image: media.healthCamp,
    href: "/work",
  },
] as const;

export default async function HomePage() {
  const [stories, gallery] = await Promise.all([
    getImpactStories(),
    getGalleryItems(),
  ]);
  const galleryPreview = gallery.slice(0, 6);

  return (
    <>
      {/* Educate Girls–style full-bleed hero */}
      <section className="relative min-h-[88svh] overflow-hidden text-white">
        <Image
          src={media.heroCommunity}
          alt="Community members gathered for a SVITECH outreach programme"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(18,38,58,0.92) 0%, rgba(18,38,58,0.72) 48%, rgba(198,90,46,0.35) 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-5 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-bright motion-rise">
            {identity.legalName}
          </p>
          <h1 className="motion-rise motion-rise-delay-1 mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Self-reliance at the last mile
          </h1>
          <p className="motion-rise motion-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/82 sm:text-xl">
            {identity.designation}. We connect unorganized workers to public
            welfare, bring young women into the digital economy, and build civic
            leadership that lasts.
          </p>
          <div className="btn-row motion-rise motion-rise-delay-3 mt-9 flex flex-wrap gap-3">
            <Link href="/donate" className="btn-primary">
              Donate now
            </Link>
            <Link href="/partner" className="btn-ghost">
              Partner with us
            </Link>
            <Link href="/work" className="btn-ghost">
              What we do
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/65">
            {identity.registrations.join(" · ")} · {identity.accreditation}
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="site-eyebrow">What we do</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Process-driven delivery with government, communities, and CSR
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
              {identity.executiveSummary}
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {whatWeDo.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden border border-line bg-background transition hover:border-brand/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-semibold text-ink group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {item.copy}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-brand">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Impact since inception — EG-style dark stats band */}
      <section className="bg-bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
              Impact since inception
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Verified field numbers
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {headlineMetrics.map((metric) => (
              <li
                key={metric.label}
                className="border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
              >
                <p className="font-display text-3xl font-semibold text-brand-bright sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {metric.label}
                </p>
                <p className="mt-1 text-sm text-white/60">{metric.note}</p>
              </li>
            ))}
          </ul>
          <Link href="/impact" className="btn-ghost mt-10 inline-flex">
            Open impact dashboard
          </Link>
        </div>
      </section>

      {/* Director quote strip */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <Image
            src={media.civicMeeting}
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-surface/90" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-5 md:px-8 md:py-20">
          <Reveal>
            <p className="site-eyebrow">Director’s perspective</p>
            <blockquote className="mt-5 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
              “When corporate investments are paired with verifiable field
              systems, grassroots transformation becomes permanent.”
            </blockquote>
            <footer className="mt-6 text-sm font-semibold text-ink-muted">
              — {identity.director}, {identity.directorTitle}
            </footer>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-line bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="site-eyebrow">How we work</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Three-stage implementation framework
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {theoryOfChange.map((stage, index) => (
              <li
                key={stage.stage}
                className="relative border border-line bg-surface p-6"
              >
                <span className="font-display text-4xl font-semibold text-brand/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  {stage.stage}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {stage.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {stage.points.slice(0, 2).map((point) => (
                    <li
                      key={point}
                      className="text-sm leading-relaxed text-ink-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <Link href="/about" className="link-underline mt-8 inline-block">
            Read vision, mission & governance →
          </Link>
        </div>
      </section>

      {/* Achievement map */}
      <section className="border-b border-line bg-surface/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <ImpactMap
            stories={stories}
            mapEyebrow="Achievement map"
            mapHeadline="Where the work reaches"
          />
        </div>
      </section>

      {/* Practice portfolios with images */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="site-eyebrow">Our intervention</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Five practices. One last-mile system.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <li key={program.slug} className="lg:last:col-span-1">
                <Link
                  href={`/work/${program.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-line bg-surface transition hover:border-brand/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={programImages[program.slug] || media.heroCommunity}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/70 via-transparent to-transparent" />
                    <p className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
                      {program.shortName}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-semibold text-ink group-hover:text-brand">
                      {program.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">{program.focus}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {program.highlight}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-brand">
                      Explore practice →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Field gallery strip */}
      {galleryPreview.length > 0 ? (
        <section className="border-b border-line bg-surface/70">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8">
            <Reveal>
              <p className="site-eyebrow">From the field</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
                Stories & moments
              </h2>
            </Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {galleryPreview.map((item) => (
                <li
                  key={item.slug}
                  className="relative aspect-[4/3] overflow-hidden border border-line"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
            <Link href="/gallery" className="link-underline mt-8 inline-block">
              View gallery →
            </Link>
          </div>
        </section>
      ) : null}

      {/* Bottom CTA — EG “Yes I want to help” band */}
      <section className="relative overflow-hidden text-white">
        <Image
          src={media.womenLearning}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg-deep/85" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-5 md:px-8 md:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
              Take part
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Interested in contributing to verified last-mile delivery?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
              Fund a Schedule VII package, support a camp, or give under 80G.
            </p>
            <div className="btn-row mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/donate" className="btn-primary">
                Donate now
              </Link>
              <Link href="/partner" className="btn-ghost">
                CSR partnership menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
