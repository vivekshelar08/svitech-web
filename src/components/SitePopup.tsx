"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { SitePopupSettings } from "@/lib/site-settings-defaults";

const STORAGE_KEY = "svitech-site-popup";

function wasDismissed(frequency: SitePopupSettings["frequency"]): boolean {
  try {
    if (frequency === "session") {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    if (frequency === "once") return raw === "1" || raw.startsWith("day:");
    if (frequency === "daily") {
      const day = new Date().toISOString().slice(0, 10);
      return raw === `day:${day}`;
    }
  } catch {
    return false;
  }
  return false;
}

function markDismissed(frequency: SitePopupSettings["frequency"]) {
  try {
    if (frequency === "session") {
      sessionStorage.setItem(STORAGE_KEY, "1");
      return;
    }
    if (frequency === "daily") {
      localStorage.setItem(STORAGE_KEY, `day:${new Date().toISOString().slice(0, 10)}`);
      return;
    }
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function SitePopup({ popup }: { popup: SitePopupSettings }) {
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!popup.enabled) return;
    if (wasDismissed(popup.frequency)) return;
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, [popup.enabled, popup.frequency]);

  if (!popup.enabled || !open) return null;

  function dismiss() {
    markDismissed(popup.frequency);
    setOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-bg-deep/55 p-4 backdrop-blur-[2px] sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="animate-slide-up relative w-full max-w-lg overflow-hidden border border-white/15 bg-white shadow-[0_24px_60px_-20px_rgba(11,20,36,0.55)]">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-deep/70 text-white transition hover:bg-bg-deep"
          aria-label="Close"
        >
          ×
        </button>
        {popup.image ? (
          <div className="relative aspect-[16/9] bg-bg-deep">
            <Image
              src={popup.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 32rem"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 to-transparent" />
          </div>
        ) : null}
        <div className="p-6 sm:p-8">
          <p className="site-eyebrow">Announcement</p>
          <h2 id={titleId} className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            {popup.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{popup.body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {popup.ctaLabel && popup.ctaHref ? (
              <Link href={popup.ctaHref} className="btn-primary sm:w-auto" onClick={dismiss}>
                {popup.ctaLabel}
              </Link>
            ) : null}
            <button type="button" className="btn-secondary sm:w-auto" onClick={dismiss}>
              {popup.dismissLabel || "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
