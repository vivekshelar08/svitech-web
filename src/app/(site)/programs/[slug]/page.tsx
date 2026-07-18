import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgram, getPrograms } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return { title: "Program" };
  return { title: program.name, description: program.summary };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();
  const { detailPages } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link href="/programs" className="text-sm font-semibold text-brand">
        {detailPages.programsBack}
      </Link>
      {program.coverImage && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden">
          <Image
            src={program.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}
      <p className="mt-8 text-sm text-brand">{program.detail}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
        {program.name}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-muted">
        {program.summary}
      </p>
      <div className="mt-8 whitespace-pre-line leading-relaxed text-ink-muted">
        {program.body}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/get-involved"
          className="bg-accent px-6 py-3.5 text-sm font-semibold text-ink"
        >
          {detailPages.programsPartnerCta}
        </Link>
        <Link
          href="/volunteer"
          className="border border-line bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink"
        >
          {detailPages.programsVolunteerCta}
        </Link>
      </div>
    </div>
  );
}
