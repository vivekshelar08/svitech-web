import type { Metadata } from "next";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { volunteer } = await getSiteSettings();
  return { title: volunteer.seoTitle, description: volunteer.seoDescription };
}

export default async function VolunteerPage() {
  const { volunteer } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {volunteer.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {volunteer.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">{volunteer.intro}</p>
          <ul className="mt-8 space-y-3 text-sm text-ink-muted">
            {volunteer.bullets.map((bullet) => (
              <li key={bullet}>· {bullet}</li>
            ))}
          </ul>
        </div>
        <VolunteerForm />
      </div>
    </div>
  );
}
