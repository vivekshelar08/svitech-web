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
  const showMemberLogin = navigation.showMemberLogin !== false;
  const memberHref = navigation.memberLoginHref || "/member-login";
  const memberLabel = navigation.memberLoginLabel || "Member login";
  const donateHref = navigation.donateHref || "/donate";
  const donateLabel = navigation.donateLabel || "Donate";

  return (
    <div className="relative z-40 border-b border-white/10 bg-bg-deep text-white">
      <div className="circuit-mesh absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 text-[11px] sm:px-5 sm:text-xs md:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-white/75">
          {email ? (
            <a href={`mailto:${email}`} className="truncate transition hover:text-white">
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

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {showMemberLogin ? (
            <Link
              href={memberHref}
              className="inline-flex min-h-8 items-center border border-white/20 bg-white/5 px-3 py-1.5 font-semibold tracking-wide text-white/85 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              {memberLabel}
            </Link>
          ) : null}
          <Link
            href={donateHref}
            className="inline-flex min-h-8 items-center bg-accent px-3 py-1.5 font-semibold tracking-wide text-ink transition hover:brightness-110"
          >
            {donateLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
