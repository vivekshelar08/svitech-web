import { promises as fs } from "fs";
import path from "path";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import {
  defaultSiteSettings,
  mergeSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings-defaults";
import { hasSupabase } from "@/lib/env";
import { getAdminClient, getAnonClient } from "@/lib/supabase";

const localPath = path.join(process.cwd(), "data", "site-settings.json");

async function readLocal(): Promise<SiteSettings | null> {
  try {
    const raw = await fs.readFile(localPath, "utf8");
    return mergeSiteSettings(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeLocal(settings: SiteSettings) {
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, JSON.stringify(settings, null, 2), "utf8");
}

async function readFromSupabase(): Promise<SiteSettings | null> {
  const clients = [getAnonClient(), getAdminClient()].filter(Boolean);
  for (const client of clients) {
    if (!client) continue;
    const { data, error } = await client
      .from("site_settings")
      .select("value")
      .eq("id", "default")
      .maybeSingle();
    if (!error && data?.value) {
      return mergeSiteSettings(data.value);
    }
  }
  return null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  // Always read live settings so header/nav never flash an old cached bar.
  noStore();

  // When Supabase is configured, never fall back to a stale local JSON file —
  // that caused the public nav to show fewer links on first load.
  if (hasSupabase()) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const fromDb = await readFromSupabase();
      if (fromDb) return fromDb;
      if (attempt === 0) await new Promise((r) => setTimeout(r, 150));
    }
    console.warn("[site-settings] supabase read failed; using defaults (not local file)");
    return defaultSiteSettings;
  }

  const local = await readLocal();
  if (local) return local;
  return defaultSiteSettings;
}

function revalidatePublicSite() {
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  const paths = [
    "/",
    "/about",
    "/contact",
    "/get-involved",
    "/donate",
    "/donate/thanks",
    "/volunteer",
    "/programs",
    "/events",
    "/news",
    "/impact",
    "/reports",
  ];
  for (const p of paths) {
    revalidatePath(p, "page");
    revalidatePath(p, "layout");
  }
}

export async function saveSiteSettings(input: unknown): Promise<SiteSettings> {
  const settings = mergeSiteSettings(input);
  const admin = getAdminClient();
  if (admin) {
    const { error } = await admin.from("site_settings").upsert(
      {
        id: "default",
        value: settings,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (error) {
      console.warn("[site-settings] supabase upsert failed:", error.message);
      await writeLocal(settings);
      revalidatePublicSite();
      return settings;
    }
    await writeLocal(settings);
    revalidatePublicSite();
    return settings;
  }

  await writeLocal(settings);
  revalidatePublicSite();
  return settings;
}

export type { SiteSettings };
