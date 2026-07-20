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
      setVisible(window.scrollY > 420);
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
      className="animate-slide-up pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-5"
      role="region"
      aria-label="Donate prompt"
    >
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-3 border border-white/10 bg-bg-deep/95 p-3 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-5 sm:p-4 sm:pl-5">
        <div
          className="hidden h-10 w-1 shrink-0 bg-gradient-to-b from-brand-bright to-accent sm:block"
          aria-hidden
        />
        <p className="line-clamp-2 flex-1 text-sm leading-snug text-white/85 sm:line-clamp-none">
          {message}
        </p>
        <div className="flex shrink-0 items-stretch gap-2 sm:items-center">
          <Link
            href={ctaHref}
            className="btn-primary !min-h-11 flex-1 !px-4 !py-2.5 sm:flex-none sm:!px-5"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-white/55 transition hover:border-white/30 hover:text-white"
            aria-label="Dismiss donate prompt"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
