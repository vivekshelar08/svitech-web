import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/api";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase";

const KIND_TABLE: Record<string, string> = {
  contact: "contact_messages",
  volunteers: "volunteer_applications",
  newsletter: "newsletter_subscribers",
  donations: "donations",
  events: "event_registrations",
};

export async function DELETE(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  const kind = request.nextUrl.searchParams.get("kind") || "";
  const id = request.nextUrl.searchParams.get("id") || "";
  const table = KIND_TABLE[kind];

  if (!table || !id) {
    return jsonError("kind and id are required", 400);
  }

  const admin = getAdminClient();
  if (!admin) {
    return jsonError("Supabase service role is not configured", 503);
  }

  const { error } = await admin.from(table).delete().eq("id", id);
  if (error) return jsonError(error.message, 500);

  return jsonOk({ ok: true });
}
