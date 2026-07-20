import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { SiteSettings } from "@/lib/site-settings-defaults";

export function Footer({
  general,
  footer,
}: {
  general: SiteSettings["general"];
  footer: SiteSettings["footer"];
}) {
  const logoProps = {
    logoUrl: general.logoUrl,
    logoAlt: general.logoAlt,
    logoAriaLabel: general.logoAriaLabel,
  };

  return (
    <footer className="relative overflow-hidden text-surface">
      <div className="absolute inset-0 mesh-deep" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:gap-12 sm:px-5 sm:py-16 md:grid-cols-[1.4fr_1fr_1fr_1.25fr] md:gap-10 md:px-8 md:py-20">
        <div>
          <SiteLogo size="md" {...logoProps} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            {general.footerBlurb}
          </p>
          <Link href="/donate" className="btn-primary mt-6 !px-5 !py-2.5">
            Donate
          </Link>
        </div>
        <div>
          <p className="site-eyebrow-bright text-[10px] font-bold uppercase tracking-[0.18em]">
            {footer.exploreHeading}
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {footer.exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-white/75 transition hover:text-white"
                >
                  <span
                    className="h-px w-0 bg-brand-bright transition-all duration-300 group-hover:w-3"
                    aria-hidden
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-eyebrow-bright text-[10px] font-bold uppercase tracking-[0.18em]">
            {footer.takePartHeading}
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {footer.takePartLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-white/75 transition hover:text-white"
                >
                  <span
                    className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3"
                    aria-hidden
                  />
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${general.contactEmail}`}
                className="text-white/75 transition hover:text-white"
              >
                {general.contactEmail}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="site-eyebrow-bright text-[10px] font-bold uppercase tracking-[0.18em]">
            {footer.newsletterHeading}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            {general.newsletterBlurb}
          </p>
          <div className="mt-5 [&_button]:bg-brand-bright [&_button]:hover:brightness-110 [&_input]:border-white/15 [&_input]:bg-white/8 [&_input]:text-white [&_input]:placeholder:text-white/40">
            <NewsletterForm source="footer" compact />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {general.siteName}. {general.copyrightNote}
          </p>
          <p className="font-display text-[11px] tracking-wide text-white/35">
            Technology for social good
          </p>
        </div>
      </div>
    </footer>
  );
}
