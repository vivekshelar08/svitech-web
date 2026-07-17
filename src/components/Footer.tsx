import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getSiteSettings } from "@/lib/site-settings";

export async function Footer() {
  const { general } = await getSiteSettings();

  return (
    <footer className="border-t border-line bg-bg-deep text-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] md:px-8">
        <div>
          <SiteLogo size="md" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {general.footerBlurb}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-white">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/impact" className="hover:text-white">
                Impact
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-white">
                News
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Take part
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/donate" className="hover:text-white">
                Donate
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="hover:text-white">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-white">
                Reports
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <a href={`mailto:${general.contactEmail}`} className="hover:text-white">
                {general.contactEmail}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Newsletter
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
