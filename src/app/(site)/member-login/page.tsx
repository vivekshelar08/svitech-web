import type { Metadata } from "next";
import { MemberLoginForm } from "@/components/MemberLoginForm";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Member login",
  description: "Sign in to the SVITECH Foundation member console.",
  robots: { index: false, follow: false },
};

export default async function MemberLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { navigation, general } = await getSiteSettings();
  const params = await searchParams;
  const label = navigation.memberLoginLabel || "Member login";

  return (
    <div className="relative overflow-hidden">
      <section className="relative bg-bg-deep text-white">
        <div className="circuit-mesh absolute inset-0 opacity-50" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand/25 via-transparent to-accent/15"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">
            {general.siteName}
          </p>
          <h1 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {label}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Access the console to publish updates, review submissions, and keep the public site current.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14 md:px-8 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="space-y-5 text-sm leading-relaxed text-ink-muted lg:-mt-28">
            <div className="border border-line/80 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">For members</p>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  Publish news, events, programs, and gallery updates
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  Review contact, volunteer, and donation submissions
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  Edit homepage, navigation, and site-wide settings
                </li>
              </ul>
            </div>
            <p>
              Need public support instead? Visit{" "}
              <a href="/contact" className="font-semibold text-brand underline-offset-2 hover:underline">
                Contact
              </a>{" "}
              or{" "}
              <a href="/donate" className="font-semibold text-brand underline-offset-2 hover:underline">
                Donate
              </a>
              .
            </p>
          </div>

          <div className="lg:-mt-28">
            <MemberLoginForm initialResetToken={params.token || null} />
          </div>
        </div>
      </section>
    </div>
  );
}
