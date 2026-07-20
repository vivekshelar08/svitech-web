import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import {
  contentTypes,
  deleteContent,
  listContent,
  togglePublished,
  upsertEvent,
  upsertImpactStory,
  upsertPost,
  upsertProgram,
  upsertReport,
  type ContentType,
} from "@/lib/admin-content";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePublicContent } from "@/lib/revalidate-content";
import { z } from "zod";

const typeSchema = z.enum(contentTypes);

const postSchema = z.object({
  slug: z.string().trim().min(2).max(120),
  title: z.string().trim().min(2).max(200),
  excerpt: z.string().trim().min(2).max(500),
  body: z.string().trim().min(2),
  coverImage: z.string().trim().optional().or(z.literal("")),
  published: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

const eventSchema = z.object({
  slug: z.string().trim().min(2).max(120),
  title: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(2).max(500),
  body: z.string().trim().min(2),
  location: z.string().trim().min(2).max(200),
  startsAt: z.string().min(1),
  endsAt: z.string().optional().or(z.literal("")),
  coverImage: z.string().trim().optional().or(z.literal("")),
  registrationOpen: z.boolean().optional(),
  published: z.boolean().optional(),
});

const programSchema = z.object({
  slug: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(2).max(500),
  detail: z.string().trim().min(2).max(300),
  body: z.string().trim().min(2),
  coverImage: z.string().trim().optional().or(z.literal("")),
  category: z
    .enum(["digital", "education", "health", "community", "women", "csr"])
    .optional(),
  sortOrder: z.coerce.number().int().optional(),
  published: z.boolean().optional(),
});

const impactSchema = z.object({
  slug: z.string().trim().min(2).max(120),
  title: z.string().trim().min(2).max(200),
  location: z.string().trim().min(2).max(200),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  metricLabel: z.string().trim().min(2).max(120),
  metricValue: z.string().trim().min(1).max(80),
  summary: z.string().trim().min(2).max(500),
  body: z.string().trim().min(2),
  coverImage: z.string().trim().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().optional(),
  published: z.boolean().optional(),
});

const reportSchema = z.object({
  id: z.string().uuid().optional(),
  year: z.coerce.number().int().min(2000).max(2100),
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().min(2).max(500),
  fileUrl: z.string().trim().min(2).max(500),
  published: z.boolean().optional(),
});

function slugFromPayload(type: ContentType, data: unknown) {
  if (!data || typeof data !== "object") return undefined;
  const row = data as Record<string, unknown>;
  return typeof row.slug === "string" ? row.slug : undefined;
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);
  const typeParam = new URL(request.url).searchParams.get("type");
  const parsed = typeSchema.safeParse(typeParam);
  if (!parsed.success) return jsonError("Invalid content type", 400);

  try {
    const items = await listContent(parsed.data);
    return jsonOk({ type: parsed.data, items });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load", 500);
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  try {
    const body = await readJson<{ type?: ContentType; data?: unknown }>(request);
    const type = typeSchema.parse(body.type);
    let slug: string | undefined;

    if (type === "posts") {
      const data = postSchema.parse(body.data);
      slug = data.slug;
      await upsertPost({
        ...data,
        coverImage: data.coverImage || undefined,
      });
    } else if (type === "events") {
      const data = eventSchema.parse(body.data);
      slug = data.slug;
      await upsertEvent({
        ...data,
        endsAt: data.endsAt || undefined,
        coverImage: data.coverImage || undefined,
      });
    } else if (type === "programs") {
      const data = programSchema.parse(body.data);
      slug = data.slug;
      await upsertProgram({
        ...data,
        coverImage: data.coverImage || undefined,
      });
    } else if (type === "impact_stories") {
      const data = impactSchema.parse(body.data);
      slug = data.slug;
      await upsertImpactStory({
        ...data,
        coverImage: data.coverImage || undefined,
      });
    } else if (type === "reports") {
      const data = reportSchema.parse(body.data);
      await upsertReport(data);
    }

    revalidatePublicContent(type, slug ?? slugFromPayload(type, body.data));
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) return fromZod(error);
    return jsonError(error instanceof Error ? error.message : "Save failed", 500);
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  try {
    const body = await readJson<{
      type?: ContentType;
      id?: string;
      published?: boolean;
      slug?: string;
    }>(request);
    const type = typeSchema.parse(body.type);
    const id = z.string().uuid().parse(body.id);
    const published = z.boolean().parse(body.published);
    await togglePublished(type, id, published);
    revalidatePublicContent(type, body.slug);
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) return fromZod(error);
    return jsonError(error instanceof Error ? error.message : "Update failed", 500);
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  const params = new URL(request.url).searchParams;
  try {
    const type = typeSchema.parse(params.get("type"));
    const id = z.string().uuid().parse(params.get("id"));
    await deleteContent(type, id);
    revalidatePublicContent(type);
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) return fromZod(error);
    return jsonError(error instanceof Error ? error.message : "Delete failed", 500);
  }
}
