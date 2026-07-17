"use client";

import { useEffect, useState, type FormEvent } from "react";
import { contentTabs, slugify, type ContentTabType } from "@/components/admin/admin-types";

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

  useEffect(() => {
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
    setStatus("Saved.");
    resetForm();
    await loadItems();
  }

  async function toggleItem(id: string, published: boolean) {
    const res = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, published }),
    });
    if (res.ok) await loadItems();
  }

  async function removeItem(id: string) {
    if (!confirm("Delete this item permanently?")) return;
    const res = await fetch(`/api/admin/content?type=${type}&id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) await loadItems();
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_1.1fr]">
      <section className="border border-line bg-surface p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-ink">Existing items</h2>
          <button
            type="button"
            onClick={() => void loadItems()}
            className="text-sm font-semibold text-brand"
          >
            Refresh
          </button>
        </div>
        {loading ? (
          <p className="mt-4 text-sm text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm text-ink-muted">No items yet. Create one on the right.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {items.map((item) => (
              <li key={String(item.id)} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">
                      {String(item.title || item.name || item.slug)}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {String(item.slug || item.year || item.id)}
                      {item.published === false ? " · draft" : " · live"}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => editItem(item)}
                      className="border border-line px-2 py-1 text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void toggleItem(String(item.id), item.published !== true)
                      }
                      className="border border-line px-2 py-1 text-xs font-semibold"
                    >
                      {item.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void removeItem(String(item.id))}
                      className="border border-line px-2 py-1 text-xs font-semibold text-accent"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border border-line bg-surface p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-ink">
            {form.slug || form.id ? "Edit item" : "Create item"}
          </h2>
          <button
            type="button"
            onClick={resetForm}
            className="text-sm font-semibold text-brand"
          >
            New
          </button>
        </div>
        <form onSubmit={saveItem} className="mt-6 space-y-4">
          <ContentFields
            type={type}
            form={form}
            setForm={setForm}
          />
          <button
            type="submit"
            className="bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            Save
          </button>
          {status && <p className="text-sm text-ink-muted">{status}</p>}
        </form>
      </section>
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
    <div key={key}>
      <label className="block text-sm font-medium text-ink">{label}</label>
      {opts?.rows ? (
        <textarea
          value={String(form[key] || "")}
          required={opts.required}
          rows={opts.rows}
          onChange={(e) => set(key, e.target.value)}
          onBlur={opts.onBlur}
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
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
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      )}
    </div>
  );

  const published = (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input
        type="checkbox"
        checked={Boolean(form.published)}
        onChange={(e) => set("published", e.target.checked)}
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
        {field("coverImage", "Cover image URL")}
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
        {field("coverImage", "Cover image URL")}
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={Boolean(form.registrationOpen)}
            onChange={(e) => set("registrationOpen", e.target.checked)}
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
        {field("coverImage", "Cover image URL")}
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
        {field("coverImage", "Cover image URL")}
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
      {field("fileUrl", "PDF URL", { required: true })}
      {published}
    </>
  );
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
