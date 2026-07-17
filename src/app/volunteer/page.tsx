import type { Metadata } from "next";
import Link from "next/link";
import { VolunteerForm } from "@/components/forms/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Apply to volunteer with SVITECH Foundation—teach, mentor, translate, or support community labs.",
};

export default function VolunteerPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Volunteer
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Share skills where they multiply.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Facilitate labs, mentor a cohort, translate open curriculum, or help a
            partner nonprofit keep their tools running.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ink-muted">
            <li>· Flexible hours; remote and in-person options</li>
            <li>· Training and curriculum kits provided</li>
            <li>
              · Prefer donating time and money? Also see{" "}
              <Link href="/donate" className="font-semibold text-brand underline">
                donate
              </Link>
            </li>
          </ul>
        </div>
        <VolunteerForm />
      </div>
    </div>
  );
}
