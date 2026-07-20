import { jsonError, jsonOk } from "@/lib/api";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePublicSite } from "@/lib/site-settings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);
  try {
    revalidatePublicSite();
    return jsonOk({ ok: true, purgedAt: new Date().toISOString() });
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Cache purge failed",
      500,
    );
  }
}
