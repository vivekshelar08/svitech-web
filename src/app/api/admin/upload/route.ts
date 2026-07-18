import { promises as fs } from "fs";
import path from "path";
import { jsonError, jsonOk } from "@/lib/api";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const BUCKET = "media";
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "application/pdf",
]);

function safeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function ensureMediaBucket() {
  const admin = getAdminClient();
  if (!admin) return null;

  const { data: buckets } = await admin.storage.listBuckets();
  const exists = buckets?.some((b) => b.id === BUCKET || b.name === BUCKET);
  if (!exists) {
    const { error } = await admin.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
      allowedMimeTypes: [...ALLOWED],
    });
    if (error && !/already exists|duplicate/i.test(error.message)) {
      throw new Error(error.message);
    }
  }
  return admin;
}

async function saveLocal(file: File, folder: string) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const stamp = Date.now();
  const name = `${stamp}-${safeName(file.name) || "upload"}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);
  return `/uploads/${folder}/${name}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);

  try {
    const form = await request.formData();
    const file = form.get("file");
    const folderRaw = String(form.get("folder") || "images");
    const folder = folderRaw.replace(/[^a-z0-9_-]/gi, "") || "images";

    if (!(file instanceof File)) return jsonError("No file provided");
    if (file.size <= 0) return jsonError("Empty file");
    if (file.size > MAX_BYTES) return jsonError("File too large (max 8MB)");
    if (file.type && !ALLOWED.has(file.type)) {
      return jsonError(`Unsupported file type: ${file.type || "unknown"}`);
    }

    const stamp = Date.now();
    const objectPath = `${folder}/${stamp}-${safeName(file.name) || "upload"}`;

    try {
      const admin = await ensureMediaBucket();
      if (admin) {
        const bytes = Buffer.from(await file.arrayBuffer());
        const { error } = await admin.storage.from(BUCKET).upload(objectPath, bytes, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });
        if (error) throw new Error(error.message);
        const { data } = admin.storage.from(BUCKET).getPublicUrl(objectPath);
        return jsonOk({ url: data.publicUrl, storage: "supabase" });
      }
    } catch (err) {
      console.warn(
        "[upload] supabase failed, falling back to local:",
        err instanceof Error ? err.message : err,
      );
    }

    const url = await saveLocal(file, folder);
    return jsonOk({ url, storage: "local" });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Upload failed", 500);
  }
}
