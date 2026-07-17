import type { Metadata } from "next";
import Link from "next/link";
import { getReports } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { reports } = await getSiteSettings();
  return {
    title: "Reports & governance",
    description: reports.intro.slice(0, 160),
  };
}

export default async function ReportsPage() {
  const reportList = await getReports();
  const { reports, board } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {reports.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {reports.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {reports.intro}
      </p>

      <section className="mt-14 border-t border-line pt-12">
        <h2 className="font-display text-2xl font-bold text-ink">Annual reports</h2>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {reportList.map((report) => (
            <li
              key={report.year}
              className="flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {report.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-ink-muted">
                  {report.description}
                </p>
              </div>
              <a
                href={report.fileUrl}
                className="inline-flex bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                Download PDF
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-muted">
          Placeholder PDFs can be replaced in <code>public/reports/</code>. For tax
          exemption / 80G documents, add them here when available.
        </p>
      </section>

      <section className="mt-16 border-t border-line pt-12">
        <h2 className="font-display text-2xl font-bold text-ink">{reports.boardTitle}</h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {board.map((member) => (
            <li key={member.name}>
              <h3 className="font-display text-lg font-bold text-ink">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand">{member.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {member.bio}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-14 text-sm text-ink-muted">
        Questions about finances or partnerships?{" "}
        <Link href="/contact" className="font-semibold text-brand underline">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
