import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how SVITECH Foundation started and why we put communities at the center of technology.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        About
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        Built for communities that deserve better tech.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        SVITECH Foundation began with a simple conviction: technology should widen
        opportunity, not deepen divides. Today we work with educators, organizers,
        and local leaders to make digital skills and tools accessible where they
        matter most.
      </p>

      <div className="relative mt-14 aspect-[21/9] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80"
          alt="Team collaborating around a shared workspace"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Our mission</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            Equip people with the confidence and capability to use technology for
            learning, livelihood, and community care—on their own terms.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">How we work</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            We co-design with partners, publish open materials, train facilitators,
            and measure success by what communities keep long after a project ends.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <h2 className="font-display text-2xl font-bold text-ink">Values we hold</h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Dignity",
              copy: "People are partners, not beneficiaries of a product pitch.",
            },
            {
              title: "Openness",
              copy: "Knowledge we create should be shareable, adaptable, and free.",
            },
            {
              title: "Stewardship",
              copy: "We choose tools that communities can maintain without us.",
            },
          ].map((value) => (
            <li key={value.title}>
              <h3 className="font-display text-lg font-bold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.copy}</p>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/programs"
        className="mt-14 inline-block border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
      >
        Explore our programs
      </Link>
    </div>
  );
}
