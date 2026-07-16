import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, partner, or donate to support SVITECH Foundation’s community technology programs.",
};

const ways = [
  {
    title: "Volunteer",
    copy: "Teach a workshop, mentor a cohort, or help translate open learning materials.",
  },
  {
    title: "Partner",
    copy: "Bring SVITECH Foundation programs to your school, library, or community organization.",
  },
  {
    title: "Advocate",
    copy: "Share our open curriculum and help more communities find tools they can trust.",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        Get involved
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        Help put technology in service of people.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Whether you give time, expertise, or resources, you strengthen programs that
        communities can grow on their own.
      </p>

      <ul className="mt-14 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
        {ways.map((way) => (
          <li key={way.title}>
            <h2 className="font-display text-xl font-bold text-ink">{way.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              {way.copy}
            </p>
          </li>
        ))}
      </ul>

      <section
        id="donate"
        className="mt-20 scroll-mt-28 border border-line bg-surface px-6 py-12 md:px-10 md:py-14"
      >
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
          Donate
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
          Your support funds facilitator stipends, shared lab equipment, and free
          curriculum that stays open for everyone. This demo site uses a contact
          path—connect payment later when you’re ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Talk to us about giving
          </Link>
          <a
            href="mailto:hello@svitech.org?subject=I%20want%20to%20support%20SVITECH%20Foundation"
            className="border border-line bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Email hello@svitech.org
          </a>
        </div>
      </section>
    </div>
  );
}
