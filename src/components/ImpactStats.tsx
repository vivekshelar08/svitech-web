"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactStat } from "@/lib/site-settings-defaults";

function parseStatNumber(value: string): number | null {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function StatItem({
  stat,
  active,
  index,
}: {
  stat: ImpactStat;
  active: boolean;
  index: number;
}) {
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
    <li className="relative px-2 text-center lg:px-4">
      {index > 0 && (
        <span
          className="absolute -left-3 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block"
          aria-hidden
        />
      )}
      <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {display}
        {stat.suffix && (
          <span className="text-xl text-brand-bright sm:text-2xl md:text-3xl">{stat.suffix}</span>
        )}
      </p>
      <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-snug text-white/65 md:text-[0.95rem]">
        {stat.label}
      </p>
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
      className="relative overflow-hidden text-surface"
      aria-labelledby="impact-stats-heading"
    >
      <div className="absolute inset-0 mesh-deep" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright/50 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <p className="site-eyebrow-bright text-center text-[0.7rem] font-bold uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
        <h2
          id="impact-stats-heading"
          className="mt-3 text-center font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl"
        >
          {headline}
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-4 lg:gap-2">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} active={active} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
