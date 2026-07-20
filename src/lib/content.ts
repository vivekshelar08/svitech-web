import { events as seedEvents, type EventItem } from "@/content/events";
import { impactStories as seedImpact, type ImpactStory } from "@/content/impact";
import { reports as seedReports, type Report } from "@/content/governance";
import { posts as seedPosts, type Post } from "@/content/posts";
import { programs as seedPrograms, type Program } from "@/content/programs";
import { applyPublicDataCachePolicy } from "@/lib/cache-policy";
import { resolveProgramCategory } from "@/lib/program-categories";
import { getAnonClient } from "@/lib/supabase";

/**
 * When Supabase is configured, trust the DB result even if empty.
 * Do not fall back to seed content — that revived unpublished items on the public site.
 */
export async function getPrograms(): Promise<Program[]> {
  await applyPublicDataCachePolicy();
  const supabase = getAnonClient();
  if (!supabase) return seedPrograms;

  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    name: row.name,
    summary: row.summary,
    detail: row.detail,
    body: row.body,
    coverImage: row.cover_image ?? undefined,
    category: resolveProgramCategory(row.category, row.slug, row.name),
    sortOrder: row.sort_order,
  }));
}

export async function getProgram(slug: string) {
  const all = await getPrograms();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  await applyPublicDataCachePolicy();
  const supabase = getAnonClient();
  if (!supabase) return seedImpact;

  const { data, error } = await supabase
    .from("impact_stories")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    location: row.location,
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
    metricLabel: row.metric_label,
    metricValue: row.metric_value,
    summary: row.summary,
    body: row.body,
    coverImage: row.cover_image || "",
    sortOrder: row.sort_order,
  }));
}

export async function getImpactStory(slug: string) {
  const all = await getImpactStories();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getPosts(): Promise<Post[]> {
  await applyPublicDataCachePolicy();
  const supabase = getAnonClient();
  if (!supabase) {
    return [...seedPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    coverImage: row.cover_image || "",
    publishedAt: (row.published_at || "").slice(0, 10),
  }));
}

export async function getPost(slug: string) {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getEvents(): Promise<EventItem[]> {
  await applyPublicDataCachePolicy();
  const supabase = getAnonClient();
  if (!supabase) return seedEvents;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("starts_at", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    body: row.body,
    location: row.location,
    startsAt: row.starts_at,
    endsAt: row.ends_at ?? undefined,
    coverImage: row.cover_image || "",
    registrationOpen: row.registration_open,
  }));
}

export async function getEvent(slug: string) {
  const all = await getEvents();
  return all.find((e) => e.slug === slug) ?? null;
}

export async function getReports(): Promise<Report[]> {
  await applyPublicDataCachePolicy();
  const supabase = getAnonClient();
  if (!supabase) return seedReports;

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("published", true)
    .order("year", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    year: row.year,
    title: row.title,
    description: row.description,
    fileUrl: row.file_url,
  }));
}
