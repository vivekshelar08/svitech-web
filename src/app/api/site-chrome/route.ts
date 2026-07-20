import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

/** Public chrome payload so the header can refresh after hydration. */
export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(
    {
      general: {
        logoUrl: settings.general.logoUrl,
        logoAlt: settings.general.logoAlt,
        logoAriaLabel: settings.general.logoAriaLabel,
        siteName: settings.general.siteName,
      },
      navigation: settings.navigation,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
