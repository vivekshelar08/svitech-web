import { unstable_noStore as noStore } from "next/cache";
import { getSiteSettings } from "@/lib/site-settings";
import type { SiteSettings } from "@/lib/site-settings-defaults";

/** Fresh settings for public routes — avoids stale ISR page shells during maintenance. */
export async function getPublicSiteSettings(): Promise<SiteSettings> {
  noStore();
  return getSiteSettings();
}

export async function isMaintenanceActive(): Promise<boolean> {
  const settings = await getPublicSiteSettings();
  return Boolean(settings.maintenance?.enabled);
}
