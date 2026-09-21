import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { GalleryItem } from "@/content/gallery";

export function HomeGallery({
  eyebrow,
  headline,
  intro,
  items,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  items: GalleryItem[];
  ctaLabel: string;
  ctaHref: string;
}) {
  if (!items.length) return null;
  const preview = items.slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="site-eyebrow">{eyebrow}</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              {headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{intro}</p>
          </div>
          <Link href={ctaHref} className="link-underline shrink-0">
            {ctaLabel}
          </Link>
        </div>
      </Reveal>

      <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {preview.map((item, index) => (
          <li key={item.slug}>
            <Reveal delayMs={index * 60}>
              <article className="gallery-fade group overflow-hidden border border-line/60 bg-white/70">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 border border-white/20 bg-bg-deep/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
