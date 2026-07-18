"use client";

import { useRef, useState } from "react";
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
    } catch {
      setError("Upload failed — check connection and try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const isImage =
    kind === "image" ||
    /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(value) ||
    value.includes("/storage/v1/object/public/");

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <label className="block flex-1 text-sm font-medium text-ink">
          {label}
          {hint && <span className="mt-0.5 block text-xs font-normal text-ink-muted">{hint}</span>}
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://… or /uploads/…"
            className={adminInputClass}
          />
        </label>
        <AdminButton
          type="button"
          variant="secondary"
          size="sm"
          disabled={uploading}
          className="shrink-0"
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Upload"}
        </AdminButton>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={kind === "image" ? "image/*" : "image/*,.pdf,.doc,.docx"}
          onChange={(e) => void onFile(e.target.files?.[0])}
        />
      </div>

      {error && <p className="text-xs text-accent">{error}</p>}

      {value && (
        <div className="flex items-center gap-3 rounded-xl border border-line/70 bg-surface/50 p-3">
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="h-16 w-24 rounded-lg object-cover ring-1 ring-line"
            />
          ) : (
            <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
              FILE
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[11px] text-ink-muted">{value}</p>
            <button
              type="button"
              className="mt-1 text-xs font-semibold text-accent"
              onClick={() => onChange("")}
            >
              Clear
            </button>
          </div>
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
