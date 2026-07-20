import { promises as fs } from "fs";
import path from "path";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import {
  defaultSiteSettings,
  mergeSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings-defaults";
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

export async function getSiteSettings(): Promise<SiteSettings> {
  // Always read live settings so header/nav never flash an old cached bar.
  noStore();

  const anon = getAnonClient();
  if (anon) {
    const { data, error } = await anon
      .from("site_settings")
      .select("value")
      .eq("id", "default")
      .maybeSingle();
    if (!error && data?.value) {
      return mergeSiteSettings(data.value);
    }
  }

  const local = await readLocal();
  if (local) return local;
  return defaultSiteSettings;
}

function revalidatePublicSite() {
  // Bust layout + every public route so Hostinger/CDN don't keep an old nav shell.
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
