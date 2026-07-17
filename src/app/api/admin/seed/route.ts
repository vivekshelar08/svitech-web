import { jsonError, jsonOk } from "@/lib/api";
import { seedAllContent } from "@/lib/admin-content";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST() {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  try {
    const counts = await seedAllContent();
    return jsonOk({ ok: true, counts });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Seed failed", 500);
  }
}
