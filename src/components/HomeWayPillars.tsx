import { Reveal } from "@/components/Reveal";
import type { ValueItem } from "@/lib/site-settings-defaults";

export function HomeWayPillars({
  eyebrow,
  headline,
  intro,
  pillars,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  pillars: ValueItem[];
}) {
  if (!pillars?.length) return null;

  return (
    <section className="relative overflow-hidden border-b border-line/60 bg-surface">
      <div className="circuit-mesh-soft absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="site-eyebrow">{eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            {intro}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pillars.map((pillar, index) => (
            <li key={pillar.title}>
              <Reveal delayMs={index * 70}>
                <article className="group way-pillar relative h-full border border-line/70 bg-white/80 p-5 transition duration-300 sm:p-6">
                  <span className="font-display text-3xl font-bold tracking-tight text-brand/25 transition duration-300 group-hover:text-brand/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-brand">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                    {pillar.copy}
                  </p>
                  <span
                    className="mt-5 block h-0.5 w-8 bg-accent/50 transition-all duration-300 group-hover:w-16 group-hover:bg-accent"
                    aria-hidden
                  />
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
