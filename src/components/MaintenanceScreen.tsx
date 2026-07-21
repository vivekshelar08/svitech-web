import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
import type { SiteSettings } from "@/lib/site-settings-defaults";

export function MaintenanceScreen({
  general,
  maintenance,
}: {
  general: SiteSettings["general"];
  maintenance: SiteSettings["maintenance"];
}) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-bg-deep text-white">
      <div className="absolute inset-0 mesh-deep" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-16 sm:px-8">
        <SiteLogo
          logoUrl={general.logoUrl}
          logoAlt={general.logoAlt}
          logoAriaLabel={general.logoAriaLabel}
          size="md"
        />
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
          Maintenance
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {maintenance.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
          {maintenance.message}
        </p>
        {maintenance.note ? (
          <p className="mt-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">
            {maintenance.note}
          </p>
        ) : null}
        {maintenance.showContact ? (
          <div className="mt-8 space-y-2 text-sm text-white/70">
            {general.contactEmail ? (
              <p>
                Email{" "}
                <a
                  href={`mailto:${general.contactEmail}`}
                  className="font-semibold text-brand-bright underline-offset-2 hover:underline"
                >
                  {general.contactEmail}
                </a>
              </p>
            ) : null}
            {general.contactPhone ? (
              <p>
                Call{" "}
                <a
                  href={`tel:${general.contactPhone.replace(/\s/g, "")}`}
                  className="font-semibold text-brand-bright underline-offset-2 hover:underline"
                >
                  {general.contactPhone}
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
        <p className="mt-12 text-xs text-white/40">
          Site administrators can sign in at{" "}
          <Link href="/admin" className="underline underline-offset-2 hover:text-white/70">
            /admin
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
