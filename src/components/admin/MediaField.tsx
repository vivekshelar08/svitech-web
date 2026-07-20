"use client";

import { useEffect, useRef, useState } from "react";
import {
  AdminButton,
  adminInputClass,
  cn,
} from "@/components/admin/admin-ui";

type MediaKind = "image" | "file";

export function MediaField({
  label,
  value,
  onChange,
  hint,
  kind = "image",
  folder = "images",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  kind?: MediaKind;
  folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [editingUrl, setEditingUrl] = useState(!value.trim());

  useEffect(() => {
    if (!value.trim()) setEditingUrl(true);
  }, [value]);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setError(json.error || "Upload failed");
        return;
      }
      onChange(json.url);
      setEditingUrl(false);
    } catch {
      setError("Upload failed — check connection and try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function clearMedia() {
    onChange("");
    setEditingUrl(true);
    setError("");
  }

  const hasValue = Boolean(value.trim());
  const isImage =
    kind === "image" ||
    /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(value) ||
    value.includes("/storage/v1/object/public/");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>
          {hint && (
            <p className="mt-0.5 text-xs font-normal text-ink-muted">{hint}</p>
          )}
        </div>
        {!hasValue && (
          <AdminButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={uploading}
            className="shrink-0"
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? "Uploading…" : kind === "image" ? "Add image" : "Add file"}
          </AdminButton>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={kind === "image" ? "image/*" : "image/*,.pdf,.doc,.docx"}
        onChange={(e) => void onFile(e.target.files?.[0])}
      />

      {error && <p className="text-xs text-accent">{error}</p>}

      {hasValue ? (
        <div className="rounded-xl border border-line/70 bg-surface/50 p-3">
          <div className="flex items-start gap-3">
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt=""
                className="h-20 w-28 shrink-0 rounded-lg object-cover ring-1 ring-line"
              />
            ) : (
              <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
                FILE
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[11px] text-ink-muted">{value}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <AdminButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={uploading}
                  onClick={() => inputRef.current?.click()}
                >
                  {uploading ? "Uploading…" : "Replace"}
                </AdminButton>
                <AdminButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingUrl((v) => !v)}
                >
                  {editingUrl ? "Hide URL" : "Edit URL"}
                </AdminButton>
                <AdminButton
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={clearMedia}
                >
                  {kind === "image" ? "Remove image" : "Remove file"}
                </AdminButton>
              </div>
            </div>
          </div>

          {editingUrl && (
            <label className="mt-3 block text-xs font-medium text-ink-muted">
              Image / file URL
              <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://… or /uploads/…"
                className={adminInputClass}
              />
            </label>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line/80 bg-surface/30 p-4">
          <p className="text-sm text-ink-muted">
            No {kind === "image" ? "image" : "file"} yet. Upload one or paste a URL.
          </p>
          {(editingUrl || !hasValue) && (
            <label className="mt-3 block text-xs font-medium text-ink-muted">
              Or paste URL
              <input
                type="url"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  if (e.target.value.trim()) setEditingUrl(false);
                }}
                placeholder="https://… or /uploads/…"
                className={adminInputClass}
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
}

export function ReorderButtons({
  index,
  total,
  onMove,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
}) {
  return (
    <div className="flex gap-1">
      <AdminButton
        type="button"
        variant="ghost"
        size="sm"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        aria-label="Move up"
      >
        ↑
      </AdminButton>
      <AdminButton
        type="button"
        variant="ghost"
        size="sm"
        disabled={index >= total - 1}
        onClick={() => onMove(index, index + 1)}
        aria-label="Move down"
      >
        ↓
      </AdminButton>
    </div>
  );
}

export function SeoHint({ value, softLimit }: { value: string; softLimit: number }) {
  const len = value.trim().length;
  const over = len > softLimit;
  return (
    <p className={cn("mt-1 text-[11px]", over ? "text-accent" : "text-ink-muted")}>
      {len}/{softLimit} characters {over ? "(a bit long for SEO)" : ""}
    </p>
  );
}

export function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
