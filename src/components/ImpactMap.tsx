"use client";

import { useId, useState } from "react";
import type { ImpactStory } from "@/content/impact";
import { INDIA_MAP } from "@/components/india-map-data";

function project(lat: number, lng: number) {
  const { minLat, maxLat, minLng, maxLng, viewWidth, viewHeight, pad } =
    INDIA_MAP;
  const x =
    pad + ((lng - minLng) / (maxLng - minLng)) * (viewWidth - pad * 2);
  const y =
    pad + ((maxLat - lat) / (maxLat - minLat)) * (viewHeight - pad * 2);
  return { x, y };
}

function shortLabel(value: string, max = 20) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export function ImpactMap({
  stories,
  mapEyebrow,
  mapHeadline,
}: {
  stories: ImpactStory[];
  mapEyebrow: string;
  mapHeadline: string;
}) {
  const titleId = useId();
  const [activeSlug, setActiveSlug] = useState(stories[0]?.slug ?? "");
  const active = stories.find((s) => s.slug === activeSlug) ?? stories[0];
  const activePoint = active ? project(active.lat, active.lng) : null;
  const { viewWidth: W, viewHeight: H, path: indiaPath } = INDIA_MAP;

  return (
    <div className="overflow-hidden border border-line bg-surface">
      <div className="border-b border-line px-5 py-6 sm:px-6 md:px-8 md:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {mapEyebrow}
        </p>
        <h2
          id={titleId}
          className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl"
        >
          {mapHeadline}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Pins mark where we work: full activities in Maharashtra, Digital Literacy in Pune, and
          Financial Inclusion projects in other states. Select a pin to read the outcome.
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative bg-[linear-gradient(165deg,#e4ebf5_0%,#f7f9fc_48%,#e9eef6_100%)] px-2 py-5 sm:px-5 md:py-8">
          <svg
            role="img"
            aria-labelledby={titleId}
            viewBox={`0 0 ${W} ${H}`}
            className="mx-auto h-auto w-full max-w-md touch-manipulation"
          >
            <defs>
              <filter id="map-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="1"
                  stdDeviation="1.4"
                  floodColor="#121c2e"
                  floodOpacity="0.2"
                />
              </filter>
            </defs>

            <path
              d={indiaPath}
              fill="#c9d8ec"
              stroke="#1b6ef5"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path
              d={indiaPath}
              fill="none"
              stroke="#121c2e"
              strokeWidth="0.6"
              strokeOpacity="0.12"
              strokeLinejoin="round"
            />

            <text
              x={W - 20}
              y={H - 18}
              textAnchor="end"
              fill="#5c6b82"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}
            >
              INDIA
            </text>

            {stories.map((story) => {
              const { x, y } = project(story.lat, story.lng);
              const isActive = story.slug === active?.slug;
              return (
                <g
                  key={story.slug}
                  transform={`translate(${x} ${y})`}
                  filter="url(#map-shadow)"
                  className="cursor-pointer outline-none"
                  onClick={() => setActiveSlug(story.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveSlug(story.slug);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${story.location}: ${story.metricValue}, ${story.metricLabel}`}
                >
                  <circle
                    r={isActive ? 11 : 7}
                    fill={isActive ? "#f0a202" : "#1b6ef5"}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                  <circle r="2.25" fill="#ffffff" />
                </g>
              );
            })}

            {active && activePoint ? (
              <g
                transform={`translate(${Math.min(
                  W - 190,
                  Math.max(12, activePoint.x + 14),
                )} ${Math.max(12, activePoint.y - 52)})`}
                filter="url(#map-shadow)"
                pointerEvents="none"
              >
                <rect
                  width="176"
                  height="44"
                  rx="2"
                  fill="#0b1424"
                  opacity="0.92"
                />
                <text
                  x="12"
                  y="18"
                  fill="#ffffff"
                  style={{ fontSize: 12, fontWeight: 700 }}
                >
                  {shortLabel(active.metricValue, 22)}
                </text>
                <text
                  x="12"
                  y="34"
                  fill="#b8c4d6"
                  style={{ fontSize: 10, fontWeight: 500 }}
                >
                  {shortLabel(active.metricLabel, 26)}
                </text>
              </g>
            ) : null}
          </svg>
        </div>

        <div className="border-t border-line lg:border-l lg:border-t-0">
          {active ? (
            <div className="border-b border-line bg-white/80 px-5 py-5 sm:px-6 md:px-8 md:py-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Selected achievement
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {active.location}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-ink md:text-2xl">
                {active.title}
              </h3>
              <p className="mt-3 text-2xl font-semibold text-accent">
                {active.metricValue}{" "}
                <span className="text-sm font-medium text-ink-muted">
                  {active.metricLabel}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {active.summary}
              </p>
            </div>
          ) : null}

          <ul className="max-h-[22rem] divide-y divide-line overflow-y-auto sm:max-h-[28rem]">
            {stories.map((story, index) => {
              const isActive = story.slug === active?.slug;
              return (
                <li key={story.slug}>
                  <button
                    type="button"
                    onClick={() => setActiveSlug(story.slug)}
                    className={`flex w-full items-start gap-3 px-5 py-3.5 text-left transition sm:gap-4 sm:px-6 sm:py-4 md:px-8 ${
                      isActive ? "bg-brand/10" : "hover:bg-white/70"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-bold ${
                        isActive
                          ? "bg-accent text-ink"
                          : "bg-brand text-white"
                      }`}
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-brand">
                        {story.location}
                      </span>
                      <span className="mt-1 block font-display text-[15px] font-bold leading-snug text-ink">
                        {story.title}
                      </span>
                      <span className="mt-1.5 block text-sm">
                        <span className="font-semibold text-accent">
                          {story.metricValue}
                        </span>
                        <span className="text-ink-muted">
                          {" "}
                          · {story.metricLabel}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
