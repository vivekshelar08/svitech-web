import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { ReachState } from "@/lib/site-settings-defaults";

export function HomeReach({
  eyebrow,
  headline,
  intro,
  states,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  states: ReachState[];
  ctaLabel: string;
  ctaHref: string;
}) {
  if (!states?.length) return null;

  return (
    <section className="relative overflow-hidden text-surface">
      <div className="absolute inset-0 mesh-deep" aria-hidden />
      <div className="circuit-mesh absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-24">
        <Reveal>
          <p className="site-eyebrow-bright">{eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {intro}
          </p>
        </Reveal>

        <ul className="mt-10 flex flex-wrap gap-2.5 sm:mt-12 sm:gap-3">
          {states.map((state, index) => (
            <li key={state.name}>
              <Reveal delayMs={index * 50}>
                <div className="border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-[2px] transition hover:border-brand-bright/40 hover:bg-white/10">
                  <p className="font-display text-sm font-bold text-white">{state.name}</p>
                  <p className="mt-1 text-xs text-white/55">{state.note}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delayMs={200}>
          <Link href={ctaHref} className="btn-ghost mt-10 inline-flex sm:w-auto">
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
