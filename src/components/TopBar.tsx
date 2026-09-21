import Link from "next/link";
import type { SiteSettings } from "@/lib/site-settings-defaults";

export function TopBar({
  general,
  navigation,
}: {
  general: SiteSettings["general"];
  navigation: SiteSettings["navigation"];
}) {
  if (!navigation.showTopBar) return null;

  const phone = general.contactPhone?.trim();
  const email = general.contactEmail?.trim();
  const trust = navigation.trustBadge?.trim();

  return (
    <div className="relative z-40 border-b border-white/10 bg-bg-deep text-white">
      <div className="circuit-mesh absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 text-[11px] sm:px-5 sm:text-xs md:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/75">
          {email ? (
            <a href={`mailto:${email}`} className="transition hover:text-white">
              {email}
            </a>
          ) : null}
          {phone ? (
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="transition hover:text-white">
              {phone}
            </a>
          ) : null}
          {trust ? (
            <span className="hidden border-l border-white/15 pl-4 text-white/55 sm:inline">
              {trust}
            </span>
          ) : null}
        </div>
        <Link
          href={navigation.donateHref || "/donate"}
          className="font-semibold tracking-wide text-accent transition hover:text-white"
        >
          {navigation.donateLabel || "Donate"} →
        </Link>
      </div>
    </div>
  );
}
