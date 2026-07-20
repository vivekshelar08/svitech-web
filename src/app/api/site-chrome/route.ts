import { NextResponse } from "next/server";
import { getPrograms } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

/** Public chrome payload so the header can refresh after hydration. */
export async function GET() {
  const [settings, programs] = await Promise.all([getSiteSettings(), getPrograms()]);
  return NextResponse.json(
    {
      general: {
        logoUrl: settings.general.logoUrl,
        logoAlt: settings.general.logoAlt,
        logoAriaLabel: settings.general.logoAriaLabel,
        siteName: settings.general.siteName,
      },
      navigation: settings.navigation,
      programs: programs.map((p) => ({
        slug: p.slug,
        name: p.name,
        summary: p.summary,
      })),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
