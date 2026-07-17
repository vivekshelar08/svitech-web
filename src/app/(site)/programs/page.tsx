import type { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Digital literacy labs, open learning paths, and community tech builds from SVITECH Foundation.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        Programs
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        Practical programs that leave skills behind.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Every SVITECH Foundation program is built to be taught, remixed, and sustained by
        the communities who use it.
      </p>

      <ul className="mt-14 divide-y divide-line border-y border-line">
        {programs.map((program) => (
          <li
            key={program.slug}
            className="grid gap-3 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:gap-10"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                <Link href={`/programs/${program.slug}`} className="hover:text-brand">
                  {program.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-brand">{program.detail}</p>
            </div>
            <div>
              <p className="leading-relaxed text-ink-muted">{program.summary}</p>
              <Link
                href={`/programs/${program.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-brand"
              >
                Learn more →
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <Link
          href="/get-involved"
          className="bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Partner with a program
        </Link>
      </div>
    </div>
  );
}
