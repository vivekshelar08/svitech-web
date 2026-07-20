/**
 * One-off sync: push programmes / impact / posts + site settings to Supabase.
 * Run: npx --yes tsx scripts/sync-activities.ts
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import { programs } from "../src/content/programs";
import { impactStories } from "../src/content/impact";
import { posts } from "../src/content/posts";
import { events } from "../src/content/events";
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

  const { data: allPrograms, error: listProgErr } = await admin
    .from("programs")
    .select("slug");
  if (listProgErr) throw new Error(listProgErr.message);
  const stalePrograms = (allPrograms ?? [])
    .map((r) => r.slug as string)
    .filter((slug) => !KEEP_PROGRAM_SLUGS.has(slug));
  if (stalePrograms.length) {
    const { error } = await admin
      .from("programs")
      .update({ published: false })
      .in("slug", stalePrograms);
    if (error) throw new Error(`unpublish programs: ${error.message}`);
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

  const { data: allImpact, error: listImpactErr } = await admin
    .from("impact_stories")
    .select("slug");
  if (listImpactErr) throw new Error(listImpactErr.message);
  const staleImpact = (allImpact ?? [])
    .map((r) => r.slug as string)
    .filter((slug) => !KEEP_IMPACT_SLUGS.has(slug));
  if (staleImpact.length) {
    const { error } = await admin
      .from("impact_stories")
      .update({ published: false })
      .in("slug", staleImpact);
    if (error) throw new Error(`unpublish impact: ${error.message}`);
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

  const KEEP_EVENT_SLUGS = new Set(events.map((e) => e.slug));
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

  const { data: allEvents, error: listEventsErr } = await admin
    .from("events")
    .select("slug");
  if (listEventsErr) throw new Error(listEventsErr.message);
  const staleEvents = (allEvents ?? [])
    .map((r) => r.slug as string)
    .filter((slug) => !KEEP_EVENT_SLUGS.has(slug));
  if (staleEvents.length) {
    const { error } = await admin
      .from("events")
      .update({ published: false })
      .in("slug", staleEvents);
    if (error) throw new Error(`unpublish events: ${error.message}`);
    console.log(`Unpublished stale events: ${staleEvents.join(", ")}`);
  }

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
  console.log("Updated site_settings (about/home/programs/impact narrative)");

  const [p, i, n] = await Promise.all([
    admin.from("programs").select("slug", { count: "exact" }).eq("published", true),
    admin
      .from("impact_stories")
      .select("slug", { count: "exact" })
      .eq("published", true),
    admin.from("posts").select("slug", { count: "exact" }).eq("published", true),
  ]);
  console.log("Published counts:", {
    programs: p.count,
    impact: i.count,
    posts: n.count,
  });
  console.log(
    "Impact locations:",
    impactStories.map((s) => `${s.location} (${s.lat}, ${s.lng})`).join(" | "),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
