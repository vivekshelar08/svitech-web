import { events as seedEvents } from "@/content/events";
import { impactStories as seedImpact } from "@/content/impact";
import { reports as seedReports } from "@/content/governance";
import { posts as seedPosts } from "@/content/posts";
import { programs as seedPrograms } from "@/content/programs";
import { getAdminClient } from "@/lib/supabase";

export const contentTypes = [
  "posts",
  "events",
  "programs",
  "impact_stories",
  "reports",
] as const;

export type ContentType = (typeof contentTypes)[number];

export function requireAdminClient() {
  const admin = getAdminClient();
  if (!admin) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for admin content management.",
    );
  }
  return admin;
}

export async function listContent(type: ContentType) {
  const admin = requireAdminClient();
  const order =
    type === "posts"
      ? { column: "published_at", ascending: false }
      : type === "events"
        ? { column: "starts_at", ascending: true }
        : type === "reports"
          ? { column: "year", ascending: false }
          : { column: "sort_order", ascending: true };

  const { data, error } = await admin
    .from(type)
    .select("*")
    .order(order.column, { ascending: order.ascending });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertPost(input: {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  published?: boolean;
  publishedAt?: string;
}) {
  const admin = requireAdminClient();
  const { error } = await admin.from("posts").upsert(
    {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      body: input.body,
      cover_image: input.coverImage || null,
      published: input.published ?? true,
      published_at: input.publishedAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (error) throw new Error(error.message);
}

export async function upsertEvent(input: {
  slug: string;
  title: string;
  summary: string;
  body: string;
  location: string;
  startsAt: string;
  endsAt?: string;
  coverImage?: string;
  registrationOpen?: boolean;
  published?: boolean;
}) {
  const admin = requireAdminClient();
  const { error } = await admin.from("events").upsert(
    {
      slug: input.slug,
      title: input.title,
      summary: input.summary,
      body: input.body,
      location: input.location,
      starts_at: input.startsAt,
      ends_at: input.endsAt || null,
      cover_image: input.coverImage || null,
      registration_open: input.registrationOpen ?? true,
      published: input.published ?? true,
    },
    { onConflict: "slug" },
  );
  if (error) throw new Error(error.message);
}

export async function upsertProgram(input: {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  body: string;
  coverImage?: string;
  sortOrder?: number;
  published?: boolean;
}) {
  const admin = requireAdminClient();
  const { error } = await admin.from("programs").upsert(
    {
      slug: input.slug,
      name: input.name,
      summary: input.summary,
      detail: input.detail,
      body: input.body,
      cover_image: input.coverImage || null,
      sort_order: input.sortOrder ?? 0,
      published: input.published ?? true,
    },
    { onConflict: "slug" },
  );
  if (error) throw new Error(error.message);
}

export async function upsertImpactStory(input: {
  slug: string;
  title: string;
  location: string;
  lat?: number;
  lng?: number;
  metricLabel: string;
  metricValue: string;
  summary: string;
  body: string;
  coverImage?: string;
  sortOrder?: number;
  published?: boolean;
}) {
  const admin = requireAdminClient();
  const { error } = await admin.from("impact_stories").upsert(
    {
      slug: input.slug,
      title: input.title,
      location: input.location,
      lat: input.lat ?? null,
      lng: input.lng ?? null,
      metric_label: input.metricLabel,
      metric_value: input.metricValue,
      summary: input.summary,
      body: input.body,
      cover_image: input.coverImage || null,
      sort_order: input.sortOrder ?? 0,
      published: input.published ?? true,
    },
    { onConflict: "slug" },
  );
  if (error) throw new Error(error.message);
}

export async function upsertReport(input: {
  id?: string;
  year: number;
  title: string;
  description: string;
  fileUrl: string;
  published?: boolean;
}) {
  const admin = requireAdminClient();
  const row = {
    year: input.year,
    title: input.title,
    description: input.description,
    file_url: input.fileUrl,
    published: input.published ?? true,
  };

  if (input.id) {
    const { error } = await admin.from("reports").update(row).eq("id", input.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await admin.from("reports").insert(row);
  if (error) throw new Error(error.message);
}

export async function deleteContent(type: ContentType, id: string) {
  const admin = requireAdminClient();
  const { error } = await admin.from(type).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function togglePublished(
  type: ContentType,
  id: string,
  published: boolean,
) {
  const admin = requireAdminClient();
  const patch: Record<string, unknown> = { published };
  if (type === "posts") patch.updated_at = new Date().toISOString();
  const { error } = await admin.from(type).update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

async function unpublishSlugsNotIn(
  type: Exclude<ContentType, "reports">,
  keep: Set<string>,
) {
  const admin = requireAdminClient();
  const { data, error } = await admin.from(type).select("id, slug");
  if (error) throw new Error(error.message);
  const staleIds = (data || [])
    .filter((row) => !keep.has(String(row.slug)))
    .map((row) => String(row.id));
  if (!staleIds.length) return 0;
  const { error: updErr } = await admin
    .from(type)
    .update({
      published: false,
      ...(type === "posts" ? { updated_at: new Date().toISOString() } : {}),
    })
    .in("id", staleIds);
  if (updErr) throw new Error(updErr.message);
  return staleIds.length;
}

async function syncSeedReports() {
  const admin = requireAdminClient();
  const keepYears = new Set(seedReports.map((r) => r.year));
  const { data, error } = await admin
    .from("reports")
    .select("id, year")
    .order("year", { ascending: false });
  if (error) throw new Error(error.message);

  for (const report of seedReports) {
    const matches = (data || []).filter((r) => r.year === report.year);
    if (!matches.length) {
      await upsertReport({
        year: report.year,
        title: report.title,
        description: report.description,
        fileUrl: report.fileUrl,
        published: true,
      });
      continue;
    }
    const [keep, ...dupes] = matches;
    await upsertReport({
      id: String(keep.id),
      year: report.year,
      title: report.title,
      description: report.description,
      fileUrl: report.fileUrl,
      published: true,
    });
    if (dupes.length) {
      const { error: delErr } = await admin
        .from("reports")
        .delete()
        .in(
          "id",
          dupes.map((d) => String(d.id)),
        );
      if (delErr) throw new Error(delErr.message);
    }
  }

  const extraIds = (data || [])
    .filter((r) => !keepYears.has(r.year as number))
    .map((r) => String(r.id));
  if (extraIds.length) {
    const { error: updErr } = await admin
      .from("reports")
      .update({ published: false })
      .in("id", extraIds);
    if (updErr) throw new Error(updErr.message);
  }
}

export async function seedAllContent() {
  for (const post of seedPosts) {
    await upsertPost({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      coverImage: post.coverImage,
      published: true,
      publishedAt: `${post.publishedAt}T12:00:00.000Z`,
    });
  }

  for (const event of seedEvents) {
    await upsertEvent({
      slug: event.slug,
      title: event.title,
      summary: event.summary,
      body: event.body,
      location: event.location,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      coverImage: event.coverImage,
      registrationOpen: event.registrationOpen,
      published: true,
    });
  }

  for (const program of seedPrograms) {
    await upsertProgram({
      slug: program.slug,
      name: program.name,
      summary: program.summary,
      detail: program.detail,
      body: program.body,
      coverImage: program.coverImage,
      sortOrder: program.sortOrder,
      published: true,
    });
  }

  for (const story of seedImpact) {
    await upsertImpactStory({
      slug: story.slug,
      title: story.title,
      location: story.location,
      lat: story.lat,
      lng: story.lng,
      metricLabel: story.metricLabel,
      metricValue: story.metricValue,
      summary: story.summary,
      body: story.body,
      coverImage: story.coverImage,
      sortOrder: story.sortOrder,
      published: true,
    });
  }

  await syncSeedReports();

  const unpublished = {
    posts: await unpublishSlugsNotIn(
      "posts",
      new Set(seedPosts.map((p) => p.slug)),
    ),
    events: await unpublishSlugsNotIn(
      "events",
      new Set(seedEvents.map((e) => e.slug)),
    ),
    programs: await unpublishSlugsNotIn(
      "programs",
      new Set(seedPrograms.map((p) => p.slug)),
    ),
    impact_stories: await unpublishSlugsNotIn(
      "impact_stories",
      new Set(seedImpact.map((s) => s.slug)),
    ),
  };

  return {
    posts: seedPosts.length,
    events: seedEvents.length,
    programs: seedPrograms.length,
    impact_stories: seedImpact.length,
    reports: seedReports.length,
    unpublished,
  };
}
