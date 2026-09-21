"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY_CATEGORIES, type GalleryItem } from "@/content/gallery";

export function GalleryExplorer({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Gallery categories"
      >
        {["All", ...GALLERY_CATEGORIES].map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(category)}
              className={`border px-3 py-2 text-xs font-semibold tracking-wide transition sm:text-sm ${
                active
                  ? "border-brand bg-brand text-white"
                  : "border-line/80 bg-white/70 text-ink-muted hover:border-brand/30 hover:text-ink"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-ink-muted">No photos in this category yet.</p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.slug} className="gallery-fade">
              <article className="group overflow-hidden border border-line/60 bg-white/70">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 border border-white/20 bg-bg-deep/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h2 className="font-display text-lg font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
