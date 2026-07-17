"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DISMISS_KEY = "svitech-sticky-donate-dismissed";

export function StickyDonateBar({
  enabled,
  message,
  ctaLabel,
  ctaHref,
}: {
  enabled: boolean;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    if (!enabled || dismissed) return;

    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, dismissed]);

  if (!enabled || dismissed) return null;
  if (pathname.startsWith("/donate") || pathname.startsWith("/admin")) return null;
  if (!visible) return null;

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bg-deep/95 px-4 py-3 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
      role="region"
      aria-label="Donate prompt"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-snug text-white/85 sm:max-w-xl">{message}</p>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={ctaHref}
            className="bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="px-3 py-2.5 text-sm text-white/60 transition hover:text-white"
            aria-label="Dismiss donate prompt"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
