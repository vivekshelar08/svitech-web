"use client";

import type { ImpactStory } from "@/content/impact";

export function ImpactMap({
  stories,
  mapEyebrow,
  mapHeadline,
}: {
  stories: ImpactStory[];
  mapEyebrow: string;
  mapHeadline: string;
}) {
  return (
    <div className="border border-line bg-surface p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {mapEyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
        {mapHeadline}
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <li key={story.slug} className="border border-line bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {story.location}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-ink">
              {story.title}
            </p>
            <p className="mt-3 text-2xl font-semibold text-accent">
              {story.metricValue}
            </p>
            <p className="text-xs text-ink-muted">{story.metricLabel}</p>
            <p className="mt-1 text-[11px] text-ink-muted/80">
              {story.lat.toFixed(2)}°N, {story.lng.toFixed(2)}°E
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
