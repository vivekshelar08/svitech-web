import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/posts";

export function HomeSpotlight({
  eyebrow,
  headline,
  posts,
  viewAllLabel,
  viewAllHref,
}: {
  eyebrow: string;
  headline: string;
  posts: Post[];
  viewAllLabel: string;
  viewAllHref: string;
}) {
  const featured = posts.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section
      className="border-y border-line bg-surface"
      aria-labelledby="home-spotlight-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {eyebrow}
            </p>
            <h2
              id="home-spotlight-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
            >
              {headline}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="shrink-0 border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
          >
            {viewAllLabel}
          </Link>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((post) => (
            <li key={post.slug}>
              <Link href={`/news/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/15 to-accent-soft" />
                  )}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand">
                  {post.publishedAt}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink group-hover:text-brand">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
