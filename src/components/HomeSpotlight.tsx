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
      className="relative overflow-hidden border-y border-line bg-surface"
      aria-labelledby="home-spotlight-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_0%_50%,rgba(196,92,38,0.06),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="site-eyebrow">{eyebrow}</p>
            <h2
              id="home-spotlight-heading"
              className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl"
            >
              {headline}
            </h2>
          </div>
          <Link href={viewAllHref} className="link-underline shrink-0">
            {viewAllLabel}
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((post) => (
            <li key={post.slug}>
              <Link href={`/news/${post.slug}`} className="panel-lift group block h-full border border-line/70 bg-white/60">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/15 to-accent-soft" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                    {post.publishedAt}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink transition group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
