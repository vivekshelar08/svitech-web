"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminEmpty,
  adminInputClass,
  adminTextareaClass,
  cn,
} from "@/components/admin/admin-ui";
import { MediaField } from "@/components/admin/MediaField";
import { slugify, type ContentTabType } from "@/components/admin/admin-types";

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
};

export function ContentTab({ type }: { type: ContentType }) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [form, setForm] = useState(emptyForms[type]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setForm(emptyForms[type]);
    setQuery("");
    void loadItems();
  }, [type]);

  async function loadItems() {
    setLoading(true);
    const res = await fetch(`/api/admin/content?type=${type}`);
    setLoading(false);
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setStatus(json.error || "Failed to load content");
      return;
    }
    const json = (await res.json()) as { items?: ContentItem[] };
    setItems(json.items || []);
    setStatus("");
  }

  function resetForm() {
    setForm(emptyForms[type]);
  }

  function duplicateItem(item: ContentItem) {
    editItem(item);
    const base =
      type === "programs"
        ? String(item.name || item.slug || "item")
        : String(item.title || item.slug || "item");
    const nextSlug = `${slugify(base)}-copy`;
    setForm((prev) => ({
      ...prev,
      id: "",
      slug: nextSlug,
      published: false,
      title: type === "programs" ? prev.title : `${String(prev.title || base)} (copy)`,
      name: type === "programs" ? `${String(prev.name || base)} (copy)` : prev.name,
    }));
    setStatus("Duplicated into the editor as a draft — change the slug and save.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editItem(item: ContentItem) {
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
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data: payload }),
    });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      setStatus(json.error || "Save failed");
      return;
    }
    setStatus("Saved — live site updated.");
    resetForm();
    await loadItems();
  }

  async function toggleItem(id: string, published: boolean, slug?: string) {
    setStatus("");
    const res = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, published, slug }),
    });
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setStatus(json.error || "Publish update failed");
      return;
    }
    setStatus(published ? "Published on live site." : "Unpublished.");
    await loadItems();
  }

  async function removeItem(id: string) {
    if (!confirm("Delete this item permanently?")) return;
    const res = await fetch(`/api/admin/content?type=${type}&id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) await loadItems();
  }

  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return Object.values(item).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(q),
    );
  });

  const previewHref = previewPath(type, form);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.15fr]">
      <AdminCard
        title="Existing items"
        description={`${filtered.length} of ${items.length} shown`}
        action={
          <AdminButton variant="ghost" size="sm" onClick={() => void loadItems()}>
            Refresh
          </AdminButton>
        }
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, slug, location…"
          className={cn(adminInputClass, "mt-0 mb-4")}
        />
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : filtered.length === 0 ? (
          <AdminEmpty
            title="No items yet"
            description="Use the form on the right to create your first entry."
          />
        ) : (
          <ul className="divide-y divide-line/70">
            {filtered.map((item) => (
              <li key={String(item.id)} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">
                      {String(item.title || item.name || item.slug)}
                    </p>
                    <p className="mt-1 truncate text-xs text-ink-muted">
                      {String(item.slug || item.year || item.id)}
                    </p>
                    <div className="mt-2">
                      {item.published === false ? (
                        <AdminBadge tone="warning">Draft</AdminBadge>
                      ) : (
                        <AdminBadge tone="success">Live</AdminBadge>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 flex-wrap justify-end gap-1.5 sm:w-auto">
                    <AdminButton variant="secondary" size="sm" onClick={() => editItem(item)}>
                      Edit
                    </AdminButton>
                    <AdminButton
                      variant="secondary"
                      size="sm"
                      onClick={() => duplicateItem(item)}
                    >
                      Duplicate
                    </AdminButton>
                    <AdminButton
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        void toggleItem(
                          String(item.id),
                          item.published !== true,
                          String(item.slug || ""),
                        )
                      }
                    >
                      {item.published ? "Unpublish" : "Publish"}
                    </AdminButton>
                    <AdminButton
                      variant="danger"
                      size="sm"
                      onClick={() => void removeItem(String(item.id))}
                    >
                      Delete
                    </AdminButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>

      <AdminCard
        title={form.slug || form.id ? "Edit item" : "Create item"}
        description="Upload a cover image or paste a URL. Drafts stay off the public site."
        action={
          <div className="flex items-center gap-2">
            {previewHref && (
              <AdminButton
                variant="ghost"
                size="sm"
                onClick={() => window.open(previewHref, "_blank")}
              >
                Preview
              </AdminButton>
            )}
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
            {status && (
              <p
                className={cn(
                  "text-sm",
                  status.includes("failed") || status.includes("Failed")
                    ? "text-accent"
                    : "text-ink-muted",
                )}
              >
                {status}
              </p>
            )}
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
  if (!slug && type !== "reports") return null;
  if (type === "posts") return `/news/${slug}`;
  if (type === "events") return `/events/${slug}`;
  if (type === "programs") return `/programs/${slug}`;
  if (type === "impact_stories") return `/impact`;
  if (type === "reports") return `/reports`;
  return null;
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
  return {
    id: form.id || undefined,
    year: Number(form.year),
    title: form.title,
    description: form.description,
    fileUrl: form.fileUrl,
    published: form.published,
  };
}
