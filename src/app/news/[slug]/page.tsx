import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "News" };
  return { title: post.title, description: post.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link href="/news" className="text-sm font-semibold text-brand">
        ← All news
      </Link>
      <p className="mt-6 text-xs text-ink-muted">
        {new Date(post.publishedAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
        {post.title}
      </h1>
      <div className="relative mt-10 aspect-[16/9] overflow-hidden">
        <Image
          src={post.coverImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="mt-10 whitespace-pre-line text-lg leading-relaxed text-ink-muted">
        {post.body}
      </div>
    </article>
  );
}
