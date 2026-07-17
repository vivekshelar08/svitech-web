import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { events } = await getSiteSettings();
  return { title: events.seoTitle, description: events.seoDescription };
}

function formatRange(startsAt: string, endsAt?: string) {
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;
  const date = start.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = start.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (!end) return `${date} · ${time}`;
  const endTime = end.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} · ${time}–${endTime}`;
}

export default async function EventsPage() {
  const eventList = await getEvents();
  const { events } = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        {events.eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {events.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {events.intro}
      </p>

      <ul className="mt-14 space-y-10">
        {eventList.map((event) => (
          <li
            key={event.slug}
            className="grid gap-6 border-t border-line pt-10 md:grid-cols-[240px_1fr] md:gap-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-square">
              <Image
                src={event.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <div>
              <p className="text-sm text-brand">
                {formatRange(event.startsAt, event.endsAt)}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                <Link href={`/events/${event.slug}`} className="hover:text-brand">
                  {event.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-ink-muted">{event.location}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
                {event.summary}
              </p>
              <Link
                href={`/events/${event.slug}`}
                className="mt-5 inline-block bg-accent px-5 py-3 text-sm font-semibold text-white"
              >
                {event.registrationOpen
                  ? events.registerOpenCta
                  : events.registerClosedCta}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
