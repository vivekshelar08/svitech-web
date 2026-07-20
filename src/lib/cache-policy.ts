import { unstable_noStore as noStore } from "next/cache";
import { readSiteSettings } from "@/lib/site-settings";
import type { SiteCacheSettings } from "@/lib/site-settings-defaults";

/** Opt public CMS fetches into dynamic rendering when cache mode is live. */
export async function applyPublicDataCachePolicy(): Promise<SiteCacheSettings> {
  const { cache } = await readSiteSettings();
  if (cache.mode === "live") {
    noStore();
  }
  return cache;
}
