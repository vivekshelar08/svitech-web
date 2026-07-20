"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Program } from "@/content/programs";
import {
  PROGRAM_CATEGORY_OPTIONS,
  type ProgramCategoryId,
  programCategoryLabel,
} from "@/lib/program-categories";

type FilterId = "all" | ProgramCategoryId;

const PAGE_SIZE = 6;

function FilterIcon({ id }: { id: FilterId }) {
  const common = "h-4 w-4 shrink-0";
  if (id === "all") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "digital") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "education") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 8.5 12 4l9 4.5-9 4.5L3 8.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M6.5 10.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-5.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (id === "health") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5V4Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (id === "women") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path d="M12 11.5v9M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "csr") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 17V9l8-4 8 4v8l-8 4-8-4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ProgramsExplorer({
  programs,
  itemCtaLabel,
  filtersTitle = "Programmes",
}: {
  programs: Program[];
  itemCtaLabel: string;
  filtersTitle?: string;
}) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const availableFilters = useMemo(() => {
    const present = new Set(programs.map((p) => p.category));
    return PROGRAM_CATEGORY_OPTIONS.filter((option) => present.has(option.id));
  }, [programs]);

  const filtered = useMemo(() => {
    if (filter === "all") return programs;
    return programs.filter((program) => program.category === filter);
  }, [filter, programs]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function selectFilter(next: FilterId) {
    setFilter(next);
    setVisibleCount(PAGE_SIZE);
  }

  const sidebarItems: { id: FilterId; label: string }[] = [
    { id: "all", label: "All" },
    ...availableFilters.map((option) => ({ id: option.id, label: option.label })),
  ];

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[17.5rem_minmax(0,1fr)]">
      {/* Desktop sidebar — Viswa-style filter panel */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 overflow-hidden rounded-xl bg-brand text-white shadow-[0_16px_40px_-20px_rgba(12,46,47,0.55)]">
          <div className="border-b border-white/20 px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.18em]">
            {filtersTitle}
          </div>
          <nav aria-label="Programme filters">
            <ul>
              {sidebarItems.map((item, index) => {
                const active = filter === item.id;
                return (
                  <li key={item.id} className={index > 0 ? "border-t border-white/20" : ""}>
                    <button
                      type="button"
                      onClick={() => selectFilter(item.id)}
                      className={`flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm transition ${
                        active ? "bg-black/15 font-semibold" : "hover:bg-white/10"
                      }`}
                      aria-pressed={active}
                    >
                      <FilterIcon id={item.id} />
                      <span className="flex-1">{item.label}</span>
                      <span className="text-white/70" aria-hidden>
                        ›
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <div>
        {/* Mobile / tablet filter pills */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {sidebarItems.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectFilter(item.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-ink hover:border-brand/40"
                }`}
                aria-pressed={active}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p className="mb-5 text-sm text-ink-muted">
          Showing{" "}
          <span className="font-semibold text-ink">
            {filtered.length} programme{filtered.length === 1 ? "" : "s"}
          </span>
          {filter !== "all" ? (
            <>
              {" "}
              in <span className="font-semibold text-brand">{programCategoryLabel(filter)}</span>
            </>
          ) : null}
        </p>

        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-white/70 px-5 py-10 text-center text-ink-muted">
            No programmes in this category yet.
          </p>
        ) : (
          <ul className="space-y-5 md:space-y-6">
            {visible.map((program) => (
              <li key={program.slug}>
                <article className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_32px_-18px_rgba(12,46,47,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(12,46,47,0.35)]">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="grid gap-0 md:grid-cols-[minmax(12rem,0.85fr)_minmax(0,1.15fr)]"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-surface md:aspect-auto md:min-h-[12.5rem]">
                      {program.coverImage ? (
                        <Image
                          src={program.coverImage}
                          alt=""
                          fill
                          className="object-cover transition duration-700 hover:scale-105 md:rounded-none"
                          sizes="(max-width: 768px) 100vw, 38vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand/25 via-brand/10 to-accent-soft" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center px-5 py-5 sm:px-6 sm:py-6 md:px-7">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                        {programCategoryLabel(program.category)}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                        {program.name}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">
                        {program.summary}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                        {itemCtaLabel.replace(/→\s*$/, "").trim() || "Read more"}
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-brand/40 hover:text-brand"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
