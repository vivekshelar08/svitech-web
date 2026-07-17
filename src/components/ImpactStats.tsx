"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactStat } from "@/lib/site-settings-defaults";

function parseStatNumber(value: string): number | null {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function StatItem({ stat, active }: { stat: ImpactStat; active: boolean }) {
  const target = parseStatNumber(stat.value);
  const [display, setDisplay] = useState(target === null ? stat.value : "0");

  useEffect(() => {
    if (!active || target === null) {
      setDisplay(stat.value);
      return;
    }

    const finalTarget = target;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(finalTarget * eased).toLocaleString("en-IN"));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, stat.value, target]);

  return (
    <li className="text-center">
      <p className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
        {display}
        {stat.suffix && (
          <span className="text-2xl text-brand-bright md:text-3xl">{stat.suffix}</span>
        )}
      </p>
      <p className="mt-2 text-sm leading-snug text-white/70 md:text-base">{stat.label}</p>
    </li>
  );
}

export function ImpactStats({
  eyebrow,
  headline,
  stats,
}: {
  eyebrow: string;
  headline: string;
  stats: ImpactStat[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (stats.length === 0) return null;

  return (
    <section
      ref={ref}
      className="border-y border-white/10 bg-bg-deep text-surface"
      aria-labelledby="impact-stats-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-bright">
          {eyebrow}
        </p>
        <h2
          id="impact-stats-heading"
          className="mt-3 text-center font-display text-2xl font-bold tracking-tight text-white md:text-3xl"
        >
          {headline}
        </h2>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={active} />
          ))}
        </ul>
      </div>
    </section>
  );
}
