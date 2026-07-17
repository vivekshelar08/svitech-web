import { jsonError, jsonOk, readJson } from "@/lib/api";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  const body = await readJson<{
    type: "post" | "event";
    slug: string;
    title: string;
    excerpt?: string;
    summary?: string;
    body: string;
    coverImage?: string;
    location?: string;
    startsAt?: string;
  }>(request);

  const admin = getAdminClient();
  if (!admin) {
    return jsonError(
      "SUPABASE_SERVICE_ROLE_KEY required to publish via admin CMS. Edit src/content/ as a fallback.",
      503,
    );
  }

  if (body.type === "post") {
    const { error } = await admin.from("posts").upsert(
      {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt || "",
        body: body.body,
        cover_image: body.coverImage || null,
        published: true,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
    if (error) return jsonError(error.message, 500);
    return jsonOk({ ok: true });
  }

  if (body.type === "event") {
    const { error } = await admin.from("events").upsert(
      {
        slug: body.slug,
        title: body.title,
        summary: body.summary || body.excerpt || "",
        body: body.body,
        location: body.location || "TBA",
        starts_at: body.startsAt || new Date().toISOString(),
        cover_image: body.coverImage || null,
        published: true,
        registration_open: true,
      },
      { onConflict: "slug" },
    );
    if (error) return jsonError(error.message, 500);
    return jsonOk({ ok: true });
  }

  return jsonError("Unknown content type", 400);
}
