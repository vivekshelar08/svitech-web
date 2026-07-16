import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-deep text-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <SiteLogo size="md" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            A nonprofit putting technology in service of communities—through
            digital literacy, open education, and tools that people can trust.
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
              <Link href="/get-involved" className="hover:text-white">
                Get Involved
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Reach us
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href="mailto:hello@svitech.org" className="hover:text-white">
                hello@svitech.org
              </a>
            </li>
            <li>Serving communities worldwide</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/45 md:px-8">
          © {new Date().getFullYear()} SVITECH Foundation. Built for social impact.
        </p>
      </div>
    </footer>
  );
}
