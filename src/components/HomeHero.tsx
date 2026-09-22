import Image from "next/image";
import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
import type { SiteSettings } from "@/lib/site-settings-defaults";

export function HomeHero({
  home,
  logoProps,
}: {
  home: SiteSettings["home"];
  logoProps: {
    logoUrl: string;
    logoAlt: string;
    logoAriaLabel: string;
  };
}) {
  return (
    <section className="relative overflow-hidden bg-bg-deep text-surface">
      <div className="absolute inset-0">
        <Image
          src={home.heroImage}
          alt={home.heroImageAlt}
          fill
          priority
          className="animate-ken object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep via-bg-deep/90 to-bg-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-bg-deep/25" />
        <div className="circuit-mesh absolute inset-0 opacity-35" aria-hidden />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-8.5rem)] max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-5 sm:pb-16 sm:pt-16 md:grid-cols-[1.2fr_0.8fr] md:gap-14 md:px-8 md:pb-20 md:pt-20">
        <div className="min-w-0">
          <div className="animate-rise">
            <SiteLogo href="" size="lg" priority {...logoProps} />
            <span
              className="animate-draw mt-5 block h-0.5 w-16 bg-gradient-to-r from-brand-bright to-accent"
              aria-hidden
            />
          </div>

          {home.heroEyebrow ? (
            <p className="animate-rise-delay-1 mt-7 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-bright">
              {home.heroEyebrow}
            </p>
          ) : null}

          <h1 className="animate-rise-delay-1 mt-4 max-w-xl font-display text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.55rem] lg:text-[2.85rem]">
            {home.heroHeadline}
          </h1>

          <p className="animate-rise-delay-2 mt-5 max-w-lg text-[0.95rem] leading-relaxed text-white/78 sm:text-lg">
            {home.heroSubhead}
          </p>

          <div className="animate-rise-delay-2 btn-row mt-8 flex flex-wrap gap-3">
            <Link href={home.heroCtaPrimaryHref} className="btn-primary sm:w-auto">
              {home.heroCtaPrimary}
            </Link>
            <Link href={home.heroCtaSecondaryHref} className="btn-ghost sm:w-auto">
              {home.heroCtaSecondary}
            </Link>
          </div>

          {home.heroTrustChecks?.length ? (
            <ul className="animate-rise-delay-3 mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/65">
              {home.heroTrustChecks.map((check) => (
                <li key={check} className="inline-flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  {check}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="animate-slide-in relative mx-auto hidden w-full max-w-md md:mx-0 md:block md:justify-self-end">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/15 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.65)]">
            <Image
              src={home.heroSecondaryImage || home.heroImage}
              alt={home.heroSecondaryImageAlt || home.heroImageAlt}
              fill
              className="object-cover"
              sizes="380px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 via-transparent to-transparent" />
            {home.heroImpactBadge ? (
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-bg-deep/75 px-4 py-3.5 backdrop-blur-sm">
                <p className="font-display text-sm font-bold tracking-wide text-white">
                  {home.heroImpactBadge}
                </p>
              </div>
            ) : null}
          </div>
          <div
            className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 border border-accent/40"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
