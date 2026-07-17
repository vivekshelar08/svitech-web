import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventRegisterForm } from "@/components/forms/EventRegisterForm";
import { getEvent, getEvents } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event" };
  return { title: event.title, description: event.summary };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  const { detailPages } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link href="/events" className="text-sm font-semibold text-brand">
        {detailPages.eventsBack}
      </Link>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden">
        <Image
          src={event.coverImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <p className="mt-8 text-sm text-brand">
        {new Date(event.startsAt).toLocaleString("en-IN")} · {event.location}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
        {event.title}
      </h1>
      <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-muted">
        {event.body}
      </p>
      {event.registrationOpen ? (
        <EventRegisterForm eventSlug={event.slug} />
      ) : (
        <p className="mt-8 text-sm text-ink-muted">{detailPages.eventsClosedNote}</p>
      )}
    </div>
  );
}
