/**
 * Sync programmes / impact / posts / events / reports + site settings to Supabase.
 * Upserts current seeds, unpublishes stale slugs, dedupes reports.
 * Run: npx --yes tsx scripts/sync-activities.ts
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import { programs } from "../src/content/programs";
import { impactStories } from "../src/content/impact";
import { posts } from "../src/content/posts";
import { events } from "../src/content/events";
import { reports } from "../src/content/governance";
import {
  defaultSiteSettings,
  mergeSiteSettings,
} from "../src/lib/site-settings-defaults";

function loadEnv() {
  const path = resolve(process.cwd(), ".env.local");
  const raw = readFileSync(path, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const KEEP_PROGRAM_SLUGS = new Set(programs.map((p) => p.slug));
const KEEP_IMPACT_SLUGS = new Set(impactStories.map((s) => s.slug));
const KEEP_POST_SLUGS = new Set(posts.map((p) => p.slug));
const KEEP_EVENT_SLUGS = new Set(events.map((e) => e.slug));
const KEEP_REPORT_YEARS = new Set(reports.map((r) => r.year));

async function unpublishStale(
  table: string,
  keep: Set<string>,
  key: "slug" = "slug",
) {
  const { data, error } = await admin.from(table).select(`id, ${key}`);
  if (error) throw new Error(`list ${table}: ${error.message}`);
  const stale = (data ?? []).filter((row) => !keep.has(String(row[key])));
  if (!stale.length) return [];
  const ids = stale.map((r) => r.id as string);
  const { error: updErr } = await admin
    .from(table)
    .update({ published: false })
    .in("id", ids);
  if (updErr) throw new Error(`unpublish ${table}: ${updErr.message}`);
  return stale.map((r) => String(r[key]));
}

async function main() {
  for (const program of programs) {
    const { error } = await admin.from("programs").upsert(
      {
        slug: program.slug,
        name: program.name,
        summary: program.summary,
        detail: program.detail,
        body: program.body,
        cover_image: program.coverImage || null,
        sort_order: program.sortOrder,
        published: true,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`program ${program.slug}: ${error.message}`);
  }
  console.log(`Upserted ${programs.length} programmes`);
  const stalePrograms = await unpublishStale("programs", KEEP_PROGRAM_SLUGS);
  if (stalePrograms.length) {
    console.log(`Unpublished stale programmes: ${stalePrograms.join(", ")}`);
  }

  for (const story of impactStories) {
    const { error } = await admin.from("impact_stories").upsert(
      {
        slug: story.slug,
        title: story.title,
        location: story.location,
        lat: story.lat,
        lng: story.lng,
        metric_label: story.metricLabel,
        metric_value: story.metricValue,
        summary: story.summary,
        body: story.body,
        cover_image: story.coverImage || null,
        sort_order: story.sortOrder,
        published: true,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`impact ${story.slug}: ${error.message}`);
  }
  console.log(`Upserted ${impactStories.length} impact stories`);
  const staleImpact = await unpublishStale("impact_stories", KEEP_IMPACT_SLUGS);
  if (staleImpact.length) {
    console.log(`Unpublished stale impact: ${staleImpact.join(", ")}`);
  }

  for (const post of posts) {
    const { error } = await admin.from("posts").upsert(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        cover_image: post.coverImage,
        published: true,
        published_at: `${post.publishedAt}T12:00:00.000Z`,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`post ${post.slug}: ${error.message}`);
  }
  console.log(`Upserted ${posts.length} posts`);
  const stalePosts = await unpublishStale("posts", KEEP_POST_SLUGS);
  if (stalePosts.length) {
    console.log(`Unpublished stale posts: ${stalePosts.join(", ")}`);
  }

  for (const event of events) {
    const { error } = await admin.from("events").upsert(
      {
        slug: event.slug,
        title: event.title,
        summary: event.summary,
        body: event.body,
        location: event.location,
        starts_at: event.startsAt,
        ends_at: event.endsAt || null,
        cover_image: event.coverImage,
        registration_open: event.registrationOpen,
        published: true,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`event ${event.slug}: ${error.message}`);
  }
  console.log(`Upserted ${events.length} events`);
  const staleEvents = await unpublishStale("events", KEEP_EVENT_SLUGS);
  if (staleEvents.length) {
    console.log(`Unpublished stale events: ${staleEvents.join(", ")}`);
  }

  // Reports: upsert one published row per seed year; unpublish extras / other years
  const { data: existingReports, error: listReportsErr } = await admin
    .from("reports")
    .select("id, year, title, published")
    .order("year", { ascending: false });
  if (listReportsErr) throw new Error(`list reports: ${listReportsErr.message}`);

  for (const report of reports) {
    const matches = (existingReports ?? []).filter((r) => r.year === report.year);
    if (matches.length === 0) {
      const { error } = await admin.from("reports").insert({
        year: report.year,
        title: report.title,
        description: report.description,
        file_url: report.fileUrl,
        published: true,
      });
      if (error) throw new Error(`insert report ${report.year}: ${error.message}`);
    } else {
      const [keep, ...dupes] = matches;
      const { error } = await admin
        .from("reports")
        .update({
          title: report.title,
          description: report.description,
          file_url: report.fileUrl,
          published: true,
        })
        .eq("id", keep.id);
      if (error) throw new Error(`update report ${report.year}: ${error.message}`);
      if (dupes.length) {
        const { error: delErr } = await admin
          .from("reports")
          .delete()
          .in(
            "id",
            dupes.map((d) => d.id),
          );
        if (delErr) throw new Error(`dedupe report ${report.year}: ${delErr.message}`);
        console.log(`Removed ${dupes.length} duplicate report(s) for ${report.year}`);
      }
    }
  }

  const extraReportIds = (existingReports ?? [])
    .filter((r) => !KEEP_REPORT_YEARS.has(r.year as number))
    .map((r) => r.id as string);
  if (extraReportIds.length) {
    const { error } = await admin
      .from("reports")
      .update({ published: false })
      .in("id", extraReportIds);
    if (error) throw new Error(`unpublish extra reports: ${error.message}`);
    console.log(`Unpublished ${extraReportIds.length} report(s) outside seed years`);
  }
  console.log(`Synced ${reports.length} reports`);

  const { data: existing, error: settingsReadError } = await admin
    .from("site_settings")
    .select("value")
    .eq("id", "default")
    .maybeSingle();
  if (settingsReadError) {
    throw new Error(`read settings: ${settingsReadError.message}`);
  }

  const merged = mergeSiteSettings({
    ...(existing?.value && typeof existing.value === "object"
      ? existing.value
      : {}),
    general: defaultSiteSettings.general,
    home: defaultSiteSettings.home,
    about: defaultSiteSettings.about,
    getInvolved: defaultSiteSettings.getInvolved,
    contact: defaultSiteSettings.contact,
    donate: defaultSiteSettings.donate,
    donateThanks: defaultSiteSettings.donateThanks,
    volunteer: defaultSiteSettings.volunteer,
    programs: defaultSiteSettings.programs,
    events: defaultSiteSettings.events,
    news: defaultSiteSettings.news,
    impact: defaultSiteSettings.impact,
    reports: defaultSiteSettings.reports,
    detailPages: defaultSiteSettings.detailPages,
    board: defaultSiteSettings.board,
    navigation: {
      ...defaultSiteSettings.navigation,
      ...(existing?.value &&
      typeof existing.value === "object" &&
      "navigation" in (existing.value as object)
        ? (existing.value as { navigation?: object }).navigation
        : {}),
      stickyDonate: defaultSiteSettings.navigation.stickyDonate,
    },
  });

  const { error: settingsWriteError } = await admin.from("site_settings").upsert(
    {
      id: "default",
      value: merged,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  if (settingsWriteError) {
    throw new Error(`write settings: ${settingsWriteError.message}`);
  }
  console.log("Updated site_settings");

  const counts = await Promise.all(
    (["programs", "impact_stories", "posts", "events", "reports"] as const).map(
      async (table) => {
        const { count } = await admin
          .from(table)
          .select("id", { count: "exact", head: true })
          .eq("published", true);
        return [table, count] as const;
      },
    ),
  );
  console.log("Published counts:", Object.fromEntries(counts));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
