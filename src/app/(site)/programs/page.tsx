import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProgramsExplorer } from "@/components/ProgramsExplorer";
import { getPrograms } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { programs } = await getSiteSettings();
  return { title: programs.seoTitle, description: programs.seoDescription };
}

export default async function ProgramsPage() {
  const programList = await getPrograms();
  const { programs } = await getSiteSettings();
  const heroImage =
    programs.bannerImage ||
    programList.find((program) => program.coverImage)?.coverImage ||
    "";

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="relative min-h-[14rem] sm:min-h-[16rem] md:min-h-[18rem]">
          {heroImage ? (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-bright to-bg-deep" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/70 via-bg-deep/25 to-bg-deep/10" />
          <div className="absolute inset-x-0 bottom-5 flex justify-center px-4 sm:bottom-6">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 p-1 backdrop-blur-md"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/30"
              >
                <span className="sm:hidden">⌂</span> {programs.breadcrumbHome || "Home"}
              </Link>
              <span className="rounded-full border border-white/70 bg-white px-3.5 py-2 text-xs font-semibold text-ink">
                {programs.eyebrow || "Programmes"}
              </span>
            </nav>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {programs.headline}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            {programs.intro}
          </p>
        </div>

        <ProgramsExplorer
          programs={programList}
          itemCtaLabel={programs.itemCtaLabel}
          filtersTitle={programs.filtersTitle || "Programmes"}
        />

        {programList.length === 0 && (
          <p className="mt-10 text-center text-ink-muted">
            {programs.emptyMessage}
          </p>
        )}

        <div className="mt-14 text-center">
          <Link
            href={programs.bottomCtaHref}
            className="inline-flex bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            {programs.bottomCtaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
