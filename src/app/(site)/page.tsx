import Image from "next/image";
import Link from "next/link";
import { AccreditationsStrip } from "@/components/AccreditationsStrip";
import { CampaignCards } from "@/components/CampaignCards";
import { DonateStrip } from "@/components/DonateStrip";
import { HomePrograms } from "@/components/HomePrograms";
import { HomeSpotlight } from "@/components/HomeSpotlight";
import { ImpactStats } from "@/components/ImpactStats";
import { Reveal } from "@/components/Reveal";
import { SiteLogo } from "@/components/SiteLogo";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { getPosts, getPrograms } from "@/lib/content";
import { getPublicSiteSettings } from "@/lib/public-site-gate";

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getPublicSiteSettings();
  if (settings.maintenance?.enabled) return null;

  const { home, general, navigation, about, cache } = settings;
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
          className="animate-ken object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/78 to-bg-deep/25" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_80%,rgba(27,110,245,0.22),transparent_55%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-5 sm:pb-16 sm:pt-28 md:px-8 md:pb-20">
          <div className="animate-rise">
            <SiteLogo href="" size="lg" priority {...logoProps} />
          </div>
          <span
            className="animate-draw mt-5 block h-1 w-20 bg-gradient-to-r from-brand-bright to-accent sm:w-28"
            aria-hidden
          />
          <h1 className="animate-rise-delay-1 mt-5 max-w-2xl font-display text-[1.65rem] font-semibold leading-snug tracking-tight text-white sm:mt-6 sm:text-3xl md:text-4xl">
            {home.heroHeadline}
          </h1>
          <p className="animate-rise-delay-1 mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/80 sm:mt-4 sm:text-lg">
            {home.heroSubhead}
          </p>
          <div className="animate-rise-delay-2 btn-row mt-8 flex flex-wrap gap-3 sm:flex-row">
            <Link href={home.heroCtaPrimaryHref} className="btn-primary sm:w-auto">
              {home.heroCtaPrimary}
            </Link>
            <Link href={home.heroCtaSecondaryHref} className="btn-ghost sm:w-auto">
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

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="site-eyebrow">{home.focusEyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
            {home.focusHeadline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            {home.focusIntro}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-3 md:gap-6">
          {home.focusAreas.map((item, index) => {
            const inner = (
              <>
                {item.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/55 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 font-display text-xs font-bold tracking-wider text-white/90">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ) : (
                  <div className="px-6 pt-6">
                    <span className="font-display text-xs font-bold tracking-wider text-brand/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className={item.image ? "p-5 sm:p-6" : "px-6 pb-6"}>
                  <h3 className="font-display text-xl font-bold text-ink group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                    {item.copy}
                  </p>
                  <span
                    className="mt-5 block h-0.5 w-8 bg-brand/30 transition-all duration-300 group-hover:w-14 group-hover:bg-brand"
                    aria-hidden
                  />
                </div>
              </>
            );

            return (
              <li key={item.title}>
                <Reveal delayMs={index * 80}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="group block h-full overflow-hidden border border-line/60 bg-white/70 transition hover:border-brand/25 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(11,20,36,0.35)]"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="group h-full overflow-hidden border border-line/60 bg-white/70 transition hover:border-brand/25 hover:bg-white">
                      {inner}
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {home.missionBandEnabled && (
        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2">
            <Reveal className="border-b border-line px-4 py-12 sm:px-5 sm:py-16 md:border-b-0 md:border-r md:px-8 md:py-20">
              <p className="site-eyebrow">{home.missionEyebrow}</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                {about.missionTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                {about.missionCopy}
              </p>
            </Reveal>
            <Reveal delayMs={100} className="px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20">
              <p className="site-eyebrow">{home.visionEyebrow}</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                {about.howTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                {about.howCopy}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <Reveal>
        <HomePrograms
          eyebrow={home.programsEyebrow}
          headline={home.programsHeadline}
          intro={home.programsIntro}
          programs={programs}
          ctaLabel={home.programsCtaLabel}
          ctaHref={home.programsCtaHref}
          itemCtaLabel={home.programsItemCtaLabel}
        />
      </Reveal>

      <Reveal>
        <CampaignCards
          eyebrow={home.campaignsEyebrow}
          headline={home.campaignsHeadline}
          campaigns={home.campaigns}
        />
      </Reveal>

      <section className="relative overflow-hidden border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <Image
                src={home.approachImage}
                alt={home.approachImageAlt}
                fill
                className="object-cover transition duration-700 hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              <div className="absolute bottom-0 left-0 h-1 w-24 bg-gradient-to-r from-brand to-accent" />
            </div>
          </Reveal>
          <Reveal delayMs={120}>
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
          </Reveal>
        </div>
      </section>

      <Reveal>
        <HomeSpotlight
          eyebrow={home.spotlightEyebrow}
          headline={home.spotlightHeadline}
          posts={posts}
          viewAllLabel={home.spotlightViewAllLabel}
          viewAllHref={home.spotlightViewAllHref}
        />
      </Reveal>

      <Reveal>
        <TestimonialQuote eyebrow={home.quoteEyebrow} quote={home.quote} />
      </Reveal>

      <Reveal>
        <AccreditationsStrip
          accreditationsEyebrow={home.accreditationsEyebrow}
          accreditationsHeadline={home.accreditationsHeadline}
          accreditations={home.accreditations}
          partnersEyebrow={home.partnersEyebrow}
          partners={home.partners}
        />
      </Reveal>

      <Reveal>
        <DonateStrip
          eyebrow={home.donateStripEyebrow}
          headline={home.donateStripHeadline}
          copy={home.donateStripCopy}
          amounts={home.donateStripAmounts}
          donateHref={navigation.donateHref}
          donateLabel={home.donateStripLabel}
        />
      </Reveal>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
        <Reveal>
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
            <div className="mt-8 btn-row flex flex-wrap gap-3 sm:flex-row">
              {home.ctaButtons.map((btn, i) => (
                <Link
                  key={btn.href}
                  href={btn.href}
                  className={`${i === 0 ? "btn-primary" : "btn-secondary"} sm:w-auto`}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {cache.mode === "cached" ? (
        <span className="sr-only" data-cache-mode="cached" data-revalidate={cache.revalidateSeconds} />
      ) : null}
    </>
  );
}
