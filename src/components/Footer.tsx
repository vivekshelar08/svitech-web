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
    <footer className="border-t border-line bg-bg-deep text-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] md:px-8">
        <div>
          <SiteLogo size="md" {...logoProps} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {general.footerBlurb}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            {footer.exploreHeading}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {footer.exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            {footer.takePartHeading}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {footer.takePartLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${general.contactEmail}`} className="hover:text-white">
                {general.contactEmail}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            {footer.newsletterHeading}
          </p>
          <p className="mt-4 text-sm text-white/70">{general.newsletterBlurb}</p>
          <div className="mt-4 [&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/45">
            <NewsletterForm source="footer" compact />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/45 md:px-8">
          © {new Date().getFullYear()} {general.siteName}. {general.copyrightNote}
        </p>
      </div>
    </footer>
  );
}
