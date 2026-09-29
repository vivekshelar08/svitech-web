"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useAdminConfirm } from "@/components/admin/AdminDialog";
import {
  AdminButton,
  AdminCard,
  AdminEmpty,
  AdminField,
  AdminStatus,
  adminInputClass,
  adminSelectClass,
  adminTextareaClass,
  cn,
} from "@/components/admin/admin-ui";
import { MediaField } from "@/components/admin/MediaField";
import { slugify, type ContentTabType } from "@/components/admin/admin-types";
import { adminJson } from "@/lib/admin-fetch";
import { GALLERY_CATEGORIES } from "@/content/gallery";
import { PROGRAM_CATEGORY_OPTIONS } from "@/lib/program-categories";

type ContentType = ContentTabType;

type ContentItem = Record<string, unknown>;

const emptyForms: Record<ContentType, Record<string, string | boolean>> = {
  posts: {
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    coverImage: "",
    published: true,
    publishedAt: "",
  },
  events: {
    slug: "",
    title: "",
    summary: "",
    body: "",
    location: "",
    startsAt: "",
    endsAt: "",
    coverImage: "",
    registrationOpen: true,
    published: true,
  },
  programs: {
    slug: "",
    name: "",
    summary: "",
    detail: "",
    body: "",
    coverImage: "",
    category: "digital",
    sortOrder: "0",
    published: true,
  },
  impact_stories: {
    slug: "",
    title: "",
    location: "",
    lat: "",
    lng: "",
    metricLabel: "",
    metricValue: "",
    summary: "",
    body: "",
    coverImage: "",
    sortOrder: "0",
    published: true,
  },
  reports: {
    id: "",
    year: String(new Date().getFullYear()),
    title: "",
    description: "",
    fileUrl: "",
    published: true,
  },
  gallery_items: {
    slug: "",
    title: "",
    category: "Digital Literacy",
    summary: "",
    image: "",
    sortOrder: "0",
    published: true,
  },
};

export function ContentTab({ type }: { type: ContentType }) {
  const { confirm, dialog: confirmDialog } = useAdminConfirm();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [form, setForm] = useState(emptyForms[type]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState<"live" | "draft" | "all">("live");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setForm(emptyForms[type]);
    setQuery("");
    setVisibility("live");
    setEditingId(null);
    void loadItems();
  }, [type]);

  async function loadItems() {
    setLoading(true);
    const result = await adminJson<{ items?: ContentItem[]; error?: string }>(
      `/api/admin/content?type=${type}`,
      undefined,
      { retries: 1 },
    );
    setLoading(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setItems(result.data.items || []);
    setStatus("");
  }

  function resetForm() {
    setForm(emptyForms[type]);
    setEditingId(null);
  }

  function duplicateItem(item: ContentItem) {
    editItem(item);
    const base =
      type === "programs"
        ? String(item.name || item.slug || "item")
        : String(item.title || item.slug || "item");
    const nextSlug = `${slugify(base)}-copy`;
    setEditingId(null);
    setForm((prev) => ({
      ...prev,
      id: "",
      slug: nextSlug,
      published: false,
      title: type === "programs" ? prev.title : `${String(prev.title || base)} (copy)`,
      name: type === "programs" ? `${String(prev.name || base)} (copy)` : prev.name,
    }));
    setStatus("Duplicated as a draft — change the slug and save.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editItem(item: ContentItem) {
    setEditingId(String(item.id));
    if (type === "posts") {
      setForm({
        slug: String(item.slug || ""),
        title: String(item.title || ""),
        excerpt: String(item.excerpt || ""),
        body: String(item.body || ""),
        coverImage: String(item.cover_image || ""),
        published: Boolean(item.published),
        publishedAt: item.published_at ? String(item.published_at).slice(0, 16) : "",
      });
    } else if (type === "events") {
      setForm({
        slug: String(item.slug || ""),
        title: String(item.title || ""),
        summary: String(item.summary || ""),
        body: String(item.body || ""),
        location: String(item.location || ""),
        startsAt: item.starts_at ? String(item.starts_at).slice(0, 16) : "",
        endsAt: item.ends_at ? String(item.ends_at).slice(0, 16) : "",
        coverImage: String(item.cover_image || ""),
        registrationOpen: Boolean(item.registration_open),
        published: Boolean(item.published),
      });
    } else if (type === "programs") {
      setForm({
        slug: String(item.slug || ""),
        name: String(item.name || ""),
        summary: String(item.summary || ""),
        detail: String(item.detail || ""),
        body: String(item.body || ""),
        coverImage: String(item.cover_image || ""),
        category: String(item.category || "community"),
        sortOrder: String(item.sort_order ?? 0),
        published: Boolean(item.published),
      });
    } else if (type === "impact_stories") {
      setForm({
        slug: String(item.slug || ""),
        title: String(item.title || ""),
        location: String(item.location || ""),
        lat: item.lat != null ? String(item.lat) : "",
        lng: item.lng != null ? String(item.lng) : "",
        metricLabel: String(item.metric_label || ""),
        metricValue: String(item.metric_value || ""),
        summary: String(item.summary || ""),
        body: String(item.body || ""),
        coverImage: String(item.cover_image || ""),
        sortOrder: String(item.sort_order ?? 0),
        published: Boolean(item.published),
      });
    } else if (type === "gallery_items") {
      setForm({
        slug: String(item.slug || ""),
        title: String(item.title || ""),
        category: String(item.category || "Digital Literacy"),
        summary: String(item.summary || ""),
        image: String(item.image || ""),
        sortOrder: String(item.sort_order ?? 0),
        published: Boolean(item.published),
      });
    } else {
      setForm({
        id: String(item.id || ""),
        year: String(item.year || new Date().getFullYear()),
        title: String(item.title || ""),
        description: String(item.description || ""),
        fileUrl: String(item.file_url || ""),
        published: Boolean(item.published),
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveItem(e: FormEvent) {
    e.preventDefault();
    setStatus("Saving…");

    const payload = buildPayload(type, form);
    const result = await adminJson<{ ok?: boolean; error?: string }>(
      "/api/admin/content",
      {
        method: "POST",
        body: JSON.stringify({ type, data: payload }),
      },
      { retries: 2 },
    );
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setStatus("Saved — live site updated.");
    resetForm();
    await loadItems();
  }

  async function removeItem(id: string) {
    const ok = await confirm({
      title: "Delete this item?",
      description: "This permanently removes it from the live site and cannot be undone.",
      confirmLabel: "Delete permanently",
      cancelLabel: "Keep item",
      tone: "danger",
    });
    if (!ok) return;
    const result = await adminJson(
      `/api/admin/content?type=${type}&id=${id}`,
      { method: "DELETE" },
      { retries: 1 },
    );
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setStatus("Deleted.");
    if (editingId === id) resetForm();
    await loadItems();
  }

  const liveCount = items.filter((item) => item.published !== false).length;
  const draftCount = items.length - liveCount;

  const filtered = items
    .filter((item) => {
      if (visibility === "live" && item.published === false) return false;
      if (visibility === "draft" && item.published !== false) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return Object.values(item).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(q),
      );
    })
    .slice()
    .sort((a, b) => {
      if (visibility !== "all") return 0;
      const aLive = a.published !== false ? 0 : 1;
      const bLive = b.published !== false ? 0 : 1;
      return aLive - bLive;
    });

  const previewHref = previewPath(type, form);

  const editingItem = items.find((item) => String(item.id) === editingId) || null;
  const editorTitle = editingId ? "Edit item" : "New item";

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
      {confirmDialog}
      <AdminCard
        title="Items"
        description={`${filtered.length} shown`}
        action={
          <AdminButton variant="ghost" size="sm" onClick={() => void loadItems()}>
            Refresh
          </AdminButton>
        }
      >
        <div className="mb-4 grid gap-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-end">
          <AdminField label="Show" htmlFor="content-visibility">
            <select
              id="content-visibility"
              className={adminSelectClass}
              value={visibility}
              onChange={(event) =>
                setVisibility(event.target.value as "live" | "draft" | "all")
              }
            >
              <option value="live">Live ({liveCount})</option>
              <option value="draft">Drafts ({draftCount})</option>
              <option value="all">All ({items.length})</option>
            </select>
          </AdminField>
          <AdminField label="Search" htmlFor="content-search">
            <input
              id="content-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title or slug"
              className={cn(adminInputClass, "mt-1.5")}
            />
          </AdminField>
        </div>
        {loading ? (
          <p className="text-sm text-ink-muted" role="status">
            Loading…
          </p>
        ) : filtered.length === 0 ? (
          <AdminEmpty
            title={visibility === "live" ? "No live items" : "No items yet"}
            description={
              visibility === "live"
                ? "Switch to Drafts, or create a new entry on the right."
                : "Use the form on the right to create the first entry."
            }
          />
        ) : (
          <ul className="divide-y divide-line/70" aria-label="Content items">
            {filtered.map((item) => {
              const active = editingId === String(item.id);
              const draft = item.published === false;
              return (
                <li key={String(item.id)}>
                  <button
                    type="button"
                    onClick={() => editItem(item)}
                    aria-pressed={active}
                    className={cn(
                      "flex min-h-16 w-full flex-col justify-center px-1 py-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
                      active ? "bg-brand/6" : "hover:bg-surface/70",
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate font-semibold text-ink">
                        {String(item.title || item.name || item.slug)}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-xs font-semibold",
                          draft ? "text-amber-800" : "text-ink-muted",
                        )}
                      >
                        {draft ? "Draft" : "Live"}
                      </span>
                    </span>
                    <span className="mt-1 truncate text-sm text-ink-muted">
                      {itemMeta(type, item)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </AdminCard>

      <AdminCard
        title={editorTitle}
        description="Uncheck Published to keep a draft off the public site."
        action={
          <div className="flex items-center gap-2">
            {previewHref ? (
              <AdminButton
                variant="ghost"
                size="sm"
                onClick={() => window.open(previewHref, "_blank")}
              >
                Preview
              </AdminButton>
            ) : null}
            <AdminButton variant="ghost" size="sm" onClick={resetForm}>
              New
            </AdminButton>
          </div>
        }
      >
        <form onSubmit={saveItem} className="space-y-4">
          <ContentFields type={type} form={form} setForm={setForm} />
          <div className="flex flex-wrap items-center gap-3 border-t border-line/70 pt-4">
            <AdminButton type="submit" variant="primary">
              Save
            </AdminButton>
            {editingItem ? (
              <>
                <AdminButton
                  type="button"
                  variant="secondary"
                  onClick={() => duplicateItem(editingItem)}
                >
                  Duplicate
                </AdminButton>
                <AdminButton
                  type="button"
                  variant="danger"
                  onClick={() => void removeItem(String(editingItem.id))}
                >
                  Delete
                </AdminButton>
              </>
            ) : null}
            <AdminStatus
              tone={
                status.includes("failed") || status.includes("Failed")
                  ? "error"
                  : status.includes("Deleted") || status.includes("Saved") || status.includes("Published")
                    ? "success"
                    : "info"
              }
            >
              {status}
            </AdminStatus>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}

function ContentFields({
  type,
  form,
  setForm,
}: {
  type: ContentType;
  form: Record<string, string | boolean>;
  setForm: (next: Record<string, string | boolean>) => void;
}) {
  function set(key: string, value: string | boolean) {
    setForm({ ...form, [key]: value });
  }

  function autoSlugFromTitle(titleKey: string) {
    const title = String(form[titleKey] || "");
    if (!form.slug && title) set("slug", slugify(title));
  }

  const field = (
    key: string,
    label: string,
    opts?: { type?: string; required?: boolean; rows?: number; onBlur?: () => void },
  ) => (
    <label key={key} className="block text-sm font-medium text-ink">
      {label}
      {opts?.rows ? (
        <textarea
          value={String(form[key] || "")}
          required={opts.required}
          rows={opts.rows}
          onChange={(e) => set(key, e.target.value)}
          onBlur={opts.onBlur}
          className={adminTextareaClass}
        />
      ) : (
        <input
          type={opts?.type || "text"}
          value={String(form[key] || "")}
          required={opts?.required}
          onChange={(e) =>
            set(key, opts?.type === "checkbox" ? e.target.checked : e.target.value)
          }
          onBlur={opts?.onBlur}
          className={adminInputClass}
        />
      )}
    </label>
  );

  const published = (
    <label className="flex items-center gap-2.5 rounded-lg border border-line/70 bg-surface/50 px-3 py-2.5 text-sm text-ink">
      <input
        type="checkbox"
        checked={Boolean(form.published)}
        onChange={(e) => set("published", e.target.checked)}
        className="h-4 w-4 rounded border-line text-brand"
      />
      Published on site
    </label>
  );

  if (type === "posts") {
    return (
      <>
        {field("title", "Title", { required: true, onBlur: () => autoSlugFromTitle("title") })}
        {field("slug", "Slug", { required: true })}
        {field("excerpt", "Excerpt", { required: true, rows: 2 })}
        {field("body", "Body", { required: true, rows: 8 })}
        <MediaField
          label="Cover image"
          value={String(form.coverImage || "")}
          onChange={(v) => set("coverImage", v)}
          folder="posts"
        />
        {field("publishedAt", "Published at", { type: "datetime-local" })}
        {published}
      </>
    );
  }

  if (type === "events") {
    return (
      <>
        {field("title", "Title", { required: true, onBlur: () => autoSlugFromTitle("title") })}
        {field("slug", "Slug", { required: true })}
        {field("summary", "Summary", { required: true, rows: 2 })}
        {field("body", "Body", { required: true, rows: 6 })}
        {field("location", "Location", { required: true })}
        {field("startsAt", "Starts at", { type: "datetime-local", required: true })}
        {field("endsAt", "Ends at", { type: "datetime-local" })}
        <MediaField
          label="Cover image"
          value={String(form.coverImage || "")}
          onChange={(v) => set("coverImage", v)}
          folder="events"
        />
        <label className="flex items-center gap-2.5 rounded-lg border border-line/70 bg-surface/50 px-3 py-2.5 text-sm text-ink">
          <input
            type="checkbox"
            checked={Boolean(form.registrationOpen)}
            onChange={(e) => set("registrationOpen", e.target.checked)}
            className="h-4 w-4 rounded border-line text-brand"
          />
          Registration open
        </label>
        {published}
      </>
    );
  }

  if (type === "programs") {
    return (
      <>
        {field("name", "Name", { required: true, onBlur: () => autoSlugFromTitle("name") })}
        {field("slug", "Slug", { required: true })}
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Category</span>
          <select
            className={adminInputClass}
            value={String(form.category || "community")}
            onChange={(e) => set("category", e.target.value)}
          >
            {PROGRAM_CATEGORY_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {field("detail", "Detail line", { required: true })}
        {field("summary", "Summary", { required: true, rows: 3 })}
        {field("body", "Body", { required: true, rows: 6 })}
        <MediaField
          label="Cover image"
          value={String(form.coverImage || "")}
          onChange={(v) => set("coverImage", v)}
          folder="programs"
        />
        {field("sortOrder", "Sort order", { type: "number" })}
        {published}
      </>
    );
  }

  if (type === "impact_stories") {
    return (
      <>
        {field("title", "Title", { required: true, onBlur: () => autoSlugFromTitle("title") })}
        {field("slug", "Slug", { required: true })}
        {field("location", "Location", { required: true })}
        {field("metricLabel", "Metric label", { required: true })}
        {field("metricValue", "Metric value", { required: true })}
        {field("summary", "Summary", { required: true, rows: 2 })}
        {field("body", "Body", { required: true, rows: 6 })}
        {field("lat", "Latitude", { type: "number" })}
        {field("lng", "Longitude", { type: "number" })}
        <MediaField
          label="Cover image"
          value={String(form.coverImage || "")}
          onChange={(v) => set("coverImage", v)}
          folder="impact"
        />
        {field("sortOrder", "Sort order", { type: "number" })}
        {published}
      </>
    );
  }

  if (type === "gallery_items") {
    return (
      <>
        {field("title", "Title", { required: true, onBlur: () => autoSlugFromTitle("title") })}
        {field("slug", "Slug", { required: true })}
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Category</span>
          <select
            className={adminInputClass}
            value={String(form.category || "Digital Literacy")}
            onChange={(e) => set("category", e.target.value)}
          >
            {GALLERY_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        {field("summary", "Summary", { required: true, rows: 3 })}
        <MediaField
          label="Photo"
          value={String(form.image || "")}
          onChange={(v) => set("image", v)}
          folder="gallery"
        />
        {field("sortOrder", "Sort order", { type: "number" })}
        {published}
      </>
    );
  }

  return (
    <>
      {field("year", "Year", { type: "number", required: true })}
      {field("title", "Title", { required: true })}
      {field("description", "Description", { required: true, rows: 3 })}
      <MediaField
        label="PDF / file"
        value={String(form.fileUrl || "")}
        onChange={(v) => set("fileUrl", v)}
        kind="file"
        folder="reports"
        hint="Upload a PDF or paste a URL"
      />
      {published}
    </>
  );
}

function previewPath(
  type: ContentType,
  form: Record<string, string | boolean>,
): string | null {
  const slug = String(form.slug || "").trim();
  if (!slug && type !== "reports" && type !== "gallery_items") return null;
  if (type === "posts") return `/news/${slug}`;
  if (type === "events") return `/events/${slug}`;
  if (type === "programs") return `/programs/${slug}`;
  if (type === "impact_stories") return `/impact`;
  if (type === "gallery_items") return `/gallery`;
  if (type === "reports") return `/reports`;
  return null;
}

function itemMeta(type: ContentType, item: ContentItem) {
  const parts: string[] = [];
  if (type === "reports") {
    parts.push(String(item.year || ""));
  } else if (item.slug) {
    parts.push(String(item.slug));
  }
  if (type === "programs" || type === "impact_stories" || type === "gallery_items") {
    parts.push(`Order ${item.sort_order ?? 0}`);
  }
  if (type === "programs" && item.category) {
    parts.push(String(item.category));
  }
  if (type === "gallery_items" && item.category) {
    parts.push(String(item.category));
  }
  if (type === "impact_stories" && item.location) {
    parts.push(String(item.location));
  }
  if (type === "events" && item.starts_at) {
    parts.push(new Date(String(item.starts_at)).toLocaleString("en-IN"));
  }
  if (type === "posts" && item.published_at) {
    parts.push(new Date(String(item.published_at)).toLocaleDateString("en-IN"));
  }
  if (type === "impact_stories" && item.metric_value) {
    parts.push(`${item.metric_label || "Metric"}: ${item.metric_value}`);
  }
  return parts.filter(Boolean).join(" · ");
}

function buildPayload(type: ContentType, form: Record<string, string | boolean>) {
  if (type === "posts") {
    return {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      body: form.body,
      coverImage: form.coverImage || undefined,
      published: form.published,
      publishedAt: form.publishedAt
        ? new Date(String(form.publishedAt)).toISOString()
        : undefined,
    };
  }
  if (type === "events") {
    return {
      slug: form.slug,
      title: form.title,
      summary: form.summary,
      body: form.body,
      location: form.location,
      startsAt: new Date(String(form.startsAt)).toISOString(),
      endsAt: form.endsAt ? new Date(String(form.endsAt)).toISOString() : undefined,
      coverImage: form.coverImage || undefined,
      registrationOpen: form.registrationOpen,
      published: form.published,
    };
  }
  if (type === "programs") {
    return {
      slug: form.slug,
      name: form.name,
      summary: form.summary,
      detail: form.detail,
      body: form.body,
      coverImage: form.coverImage || undefined,
      category: form.category || "community",
      sortOrder: Number(form.sortOrder || 0),
      published: form.published,
    };
  }
  if (type === "impact_stories") {
    return {
      slug: form.slug,
      title: form.title,
      location: form.location,
      lat: form.lat ? Number(form.lat) : undefined,
      lng: form.lng ? Number(form.lng) : undefined,
      metricLabel: form.metricLabel,
      metricValue: form.metricValue,
      summary: form.summary,
      body: form.body,
      coverImage: form.coverImage || undefined,
      sortOrder: Number(form.sortOrder || 0),
      published: form.published,
    };
  }
  if (type === "gallery_items") {
    return {
      slug: form.slug,
      title: form.title,
      category: form.category || "Digital Literacy",
      summary: form.summary,
      image: form.image,
      sortOrder: Number(form.sortOrder || 0),
      published: form.published,
    };
  }
  return {
    id: form.id || undefined,
    year: Number(form.year),
    title: form.title,
    description: form.description,
    fileUrl: form.fileUrl,
    published: form.published,
  };
}
