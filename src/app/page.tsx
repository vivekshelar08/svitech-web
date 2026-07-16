import Image from "next/image";
import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";

const focusAreas = [
  {
    title: "Digital literacy",
    copy: "Hands-on workshops that help people navigate tools, safety, and opportunity online.",
  },
  {
    title: "Open education",
    copy: "Free learning paths built with local educators—practical, multilingual, and open to all.",
  },
  {
    title: "Community tech",
    copy: "Lightweight tools for nonprofits and organizers who need reliability without complexity.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-bg-deep text-surface">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80"
          alt="People gathered around laptops in a community learning space"
          fill
          priority
          className="animate-ken object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/70 to-bg-deep/35" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <div className="animate-rise">
            <SiteLogo href="" size="lg" priority />
          </div>
          <span
            className="animate-draw mt-5 block h-1 w-24 bg-brand-bright"
            aria-hidden
          />
          <h1 className="animate-rise-delay-1 mt-6 max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
            Technology that serves people first.
          </h1>
          <p className="animate-rise-delay-1 mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            We connect communities with digital skills, open education, and tools
            built for real-world impact—not just the next trend.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-involved"
              className="bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Get involved
            </Link>
            <Link
              href="/programs"
              className="border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              See our programs
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          What we do
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Bridging the gap between people and digital opportunity.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          SVITECH Foundation partners with local leaders to make technology accessible,
          ethical, and useful—especially where access has been limited.
        </p>

        <ul className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-3 md:gap-10">
          {focusAreas.map((item) => (
            <li key={item.title}>
              <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {item.copy}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
              alt="Workshop facilitator helping a learner at a shared table"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Our approach
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Local partners. Open methods. Lasting skills.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
              We don’t drop in with one-size-fits-all software. We listen, co-design
              with communities, and leave behind skills—and systems—people can own.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block border-b-2 border-brand pb-1 text-sm font-semibold text-brand transition hover:border-brand-bright hover:text-brand-bright"
            >
              Learn about SVITECH Foundation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Ready to help us expand access?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Volunteer your skills, partner with a program, or support the work that
            keeps learning free and open.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-involved#donate"
              className="bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Donate
            </Link>
            <Link
              href="/contact"
              className="border border-line bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
