import { contentTypes, listContent, requireAdminClient } from "@/lib/admin-content";
import { getSiteSettings } from "@/lib/site-settings";

const inboxTables = [
  "contact_messages",
  "volunteer_applications",
  "newsletter_subscribers",
  "donations",
  "event_registrations",
] as const;

export type WebsiteBackup = {
  version: 1;
  kind: "svitech-website-backup";
  exportedAt: string;
  settings: unknown;
  content: Record<string, unknown[]>;
  inbox: Record<string, unknown[]>;
  media: {
    note: string;
    urls: string[];
  };
  meta: {
    counts: Record<string, number>;
    totalRecords: number;
  };
};

async function listAllRows(table: string) {
  const admin = requireAdminClient();
  const { data, error } = await admin
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    // Some tables may not have created_at — retry unordered
    const fallback = await admin.from(table).select("*");
    if (fallback.error) throw new Error(`${table}: ${fallback.error.message}`);
    return fallback.data || [];
  }
  return data || [];
}

function collectMediaUrls(value: unknown, out: Set<string>) {
  if (typeof value === "string") {
    if (
      value.startsWith("http") ||
      value.startsWith("/uploads/") ||
      value.includes("/storage/v1/object/public/")
    ) {
      out.add(value);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectMediaUrls(item, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const nested of Object.values(value as Record<string, unknown>)) {
      collectMediaUrls(nested, out);
    }
  }
}

export async function buildWebsiteBackup(): Promise<WebsiteBackup> {
  const settings = await getSiteSettings();
  const content: Record<string, unknown[]> = {};
  const inbox: Record<string, unknown[]> = {};
  const counts: Record<string, number> = {};

  for (const type of contentTypes) {
    const rows = await listContent(type);
    content[type] = rows;
    counts[type] = rows.length;
  }

  for (const table of inboxTables) {
    const rows = await listAllRows(table);
    inbox[table] = rows;
    counts[table] = rows.length;
  }

  counts.settings = 1;

  const mediaUrls = new Set<string>();
  collectMediaUrls(settings, mediaUrls);
  collectMediaUrls(content, mediaUrls);

  const totalRecords =
    Object.values(counts).reduce((sum, n) => sum + n, 0);

  return {
    version: 1,
    kind: "svitech-website-backup",
    exportedAt: new Date().toISOString(),
    settings,
    content,
    inbox,
    media: {
      note: "Media files are referenced by URL. Download each URL separately if you need the binary files.",
      urls: [...mediaUrls].sort(),
    },
    meta: {
      counts,
      totalRecords,
    },
  };
}
