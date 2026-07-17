import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImpactMap } from "@/components/ImpactMap";
import { getImpactStories } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { impact } = await getSiteSettings();
  return { title: impact.seoTitle, description: impact.seoDescription };
}

export default async function ImpactPage() {
  const stories = await getImpactStories();
  const { impact } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {impact.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {impact.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {impact.intro}
      </p>

      <div className="mt-14">
        <ImpactMap
          stories={stories}
          mapEyebrow={impact.mapEyebrow}
          mapHeadline={impact.mapHeadline}
        />
      </div>

      <ul className="mt-16 space-y-16">
        {stories.map((story) => (
          <li
            key={story.slug}
            className="grid gap-8 border-t border-line pt-12 md:grid-cols-2 md:gap-12"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={story.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {story.location}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
                {story.title}
              </h2>
              <p className="mt-4 text-3xl font-semibold text-accent">
                {story.metricValue}{" "}
                <span className="text-base font-medium text-ink-muted">
                  {story.metricLabel}
                </span>
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">{story.summary}</p>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-muted">
                {story.body}
              </p>
              <Link
                href="/donate"
                className="mt-6 inline-block border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
              >
                {impact.storyCtaLabel}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
