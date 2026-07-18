import Image from "next/image";
import Link from "next/link";
import { AccreditationsStrip } from "@/components/AccreditationsStrip";
import { CampaignCards } from "@/components/CampaignCards";
import { DonateStrip } from "@/components/DonateStrip";
import { HomePrograms } from "@/components/HomePrograms";
import { HomeSpotlight } from "@/components/HomeSpotlight";
import { ImpactStats } from "@/components/ImpactStats";
import { SiteLogo } from "@/components/SiteLogo";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { getPosts, getPrograms } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export default async function HomePage() {
  const { home, general, navigation } = await getSiteSettings();
  const [programs, posts] = await Promise.all([getPrograms(), getPosts()]);
  const logoProps = {
    logoUrl: general.logoUrl,
    logoAlt: general.logoAlt,
    logoAriaLabel: general.logoAriaLabel,
  };

  return (
    <>
      <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-bg-deep text-surface">
        <Image
          src={home.heroImage}
          alt={home.heroImageAlt}
          fill
          priority
          className="animate-ken object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/75 to-bg-deep/30" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_80%,rgba(20,150,127,0.2),transparent_55%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <div className="animate-rise">
            <SiteLogo href="" size="lg" priority {...logoProps} />
          </div>
          <span
            className="animate-draw mt-5 block h-1 w-28 bg-gradient-to-r from-brand-bright to-accent"
            aria-hidden
          />
          <h1 className="animate-rise-delay-1 mt-6 max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
            {home.heroHeadline}
          </h1>
          <p className="animate-rise-delay-1 mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {home.heroSubhead}
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link href={home.heroCtaPrimaryHref} className="btn-primary">
              {home.heroCtaPrimary}
            </Link>
            <Link href={home.heroCtaSecondaryHref} className="btn-ghost">
              {home.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <ImpactStats
        eyebrow={home.impactStatsEyebrow}
        headline={home.impactStatsHeadline}
        stats={home.impactStats}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="site-eyebrow">{home.focusEyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {home.focusHeadline}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          {home.focusIntro}
        </p>

        <ul className="mt-14 grid gap-6 border-t border-line pt-12 md:grid-cols-3 md:gap-5">
          {home.focusAreas.map((item, index) => (
            <li
              key={item.title}
              className="group relative border border-line/60 bg-white/50 p-6 transition hover:border-brand/25 hover:bg-white"
            >
              <span className="font-display text-xs font-bold tracking-wider text-brand/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink group-hover:text-brand">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {item.copy}
              </p>
              <span
                className="mt-5 block h-0.5 w-8 bg-brand/30 transition-all duration-300 group-hover:w-14 group-hover:bg-brand"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </section>

      <HomePrograms
        eyebrow={home.programsEyebrow}
        headline={home.programsHeadline}
        intro={home.programsIntro}
        programs={programs}
        ctaLabel={home.programsCtaLabel}
        ctaHref={home.programsCtaHref}
        itemCtaLabel="Know more"
      />

      <CampaignCards
        eyebrow={home.campaignsEyebrow}
        headline={home.campaignsHeadline}
        campaigns={home.campaigns}
      />

      <section className="relative overflow-hidden border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image
              src={home.approachImage}
              alt={home.approachImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            <div className="absolute bottom-0 left-0 h-1 w-24 bg-gradient-to-r from-brand to-accent" />
          </div>
          <div>
            <p className="site-eyebrow">{home.approachEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {home.approachHeadline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
              {home.approachCopy}
            </p>
            <Link href={home.approachLinkHref} className="link-underline mt-8">
              {home.approachLinkLabel}
            </Link>
          </div>
        </div>
      </section>

      <HomeSpotlight
        eyebrow={home.spotlightEyebrow}
        headline={home.spotlightHeadline}
        posts={posts}
        viewAllLabel={home.spotlightViewAllLabel}
        viewAllHref={home.spotlightViewAllHref}
      />

      <TestimonialQuote eyebrow={home.quoteEyebrow} quote={home.quote} />

      <AccreditationsStrip
        accreditationsEyebrow={home.accreditationsEyebrow}
        accreditationsHeadline={home.accreditationsHeadline}
        accreditations={home.accreditations}
        partnersEyebrow={home.partnersEyebrow}
        partners={home.partners}
      />

      <DonateStrip
        headline={home.donateStripHeadline}
        copy={home.donateStripCopy}
        amounts={home.donateStripAmounts}
        donateHref={navigation.donateHref}
        donateLabel={home.donateStripLabel}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="relative max-w-2xl overflow-hidden border border-line/70 bg-white/60 p-8 md:p-10">
          <div
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand to-accent"
            aria-hidden
          />
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {home.ctaHeadline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            {home.ctaCopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {home.ctaButtons.map((btn, i) => (
              <Link
                key={btn.href}
                href={btn.href}
                className={i === 0 ? "btn-primary" : "btn-secondary"}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
