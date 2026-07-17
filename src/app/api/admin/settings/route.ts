import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/site-settings";
import { z } from "zod";

export async function GET() {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);
  return jsonOk({ settings: await getSiteSettings() });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);
  try {
    const body = z
      .object({ settings: z.unknown() })
      .parse(await readJson(request));
    const settings = await saveSiteSettings(body.settings);
    return jsonOk({ settings });
  } catch (error) {
    if (error instanceof z.ZodError) return fromZod(error);
    if (error instanceof Error) return jsonError(error.message, 400);
    return jsonError("Failed to save settings", 500);
  }
}
