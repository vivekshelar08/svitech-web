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
          className="animate-ken object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep via-bg-deep/88 to-bg-deep/45" />
        <div className="circuit-mesh absolute inset-0 opacity-30" aria-hidden />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-5 sm:py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:px-8 md:py-24">
        <div>
          <div className="animate-rise">
            <SiteLogo href="" size="lg" priority {...logoProps} />
          </div>
          {home.heroEyebrow ? (
            <p className="animate-rise-delay-1 mt-6 inline-flex border border-brand-bright/35 bg-brand/15 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-bright">
              {home.heroEyebrow}
            </p>
          ) : null}
          <h1 className="animate-rise-delay-1 mt-5 max-w-xl font-display text-[1.7rem] font-semibold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem]">
            {home.heroHeadline}
          </h1>
          <p className="animate-rise-delay-1 mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white/78 sm:text-lg">
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
            <ul className="animate-rise-delay-2 mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              {home.heroTrustChecks.map((check) => (
                <li key={check} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
                  {check}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="animate-rise-delay-2 relative mx-auto w-full max-w-md md:mx-0 md:justify-self-end">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/15 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.65)]">
            <Image
              src={home.heroSecondaryImage || home.heroImage}
              alt={home.heroSecondaryImageAlt || home.heroImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 380px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/70 via-transparent to-transparent" />
            {home.heroImpactBadge ? (
              <div className="absolute bottom-4 left-4 right-4 border border-white/20 bg-bg-deep/80 px-4 py-3 backdrop-blur-sm">
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
