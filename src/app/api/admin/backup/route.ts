import { jsonError } from "@/lib/api";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { buildWebsiteBackup } from "@/lib/admin-backup";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  try {
    const backup = await buildWebsiteBackup();
    const stamp = backup.exportedAt.slice(0, 10);
    const body = JSON.stringify(backup, null, 2);

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="svitech-backup-${stamp}.json"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Backup failed",
      500,
    );
  }
}
