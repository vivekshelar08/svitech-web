import type { Metadata } from "next";
import { GalleryExplorer } from "@/components/GalleryExplorer";
import { getGalleryItems } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { gallery } = await getSiteSettings();
  return { title: gallery.seoTitle, description: gallery.seoDescription };
}

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([getGalleryItems(), getSiteSettings()]);
  const { gallery } = settings;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {gallery.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {gallery.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{gallery.intro}</p>

      <div className="mt-12">
        <GalleryExplorer items={items} />
      </div>
    </div>
  );
}
