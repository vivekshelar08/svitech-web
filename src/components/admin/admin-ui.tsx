import type { AdminTab } from "@/components/admin/admin-types";

export const adminInputClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/15";

export const adminTextareaClass = `${adminInputClass} min-h-[88px] resize-y`;

export const adminSelectClass =
  "rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function AdminCard({
  title,
  description,
  action,
  children,
  className,
  padding = "md",
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}) {
  const pad =
    padding === "sm" ? "p-4" : padding === "lg" ? "p-6 md:p-8" : "p-5 md:p-6";

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-line/80 bg-white shadow-[0_1px_2px_rgba(12,46,47,0.04),0_12px_40px_rgba(12,46,47,0.06)]",
        className,
      )}
    >
      {(title || action) && (
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b border-line/70",
            pad,
            "pb-4",
          )}
        >
          <div>
            {title && (
              <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={title || action ? cn(pad, "pt-4") : pad}>{children}</div>
    </section>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent";
  size?: "sm" | "md";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 disabled:pointer-events-none disabled:opacity-50";
  const sizes = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm";
  const variants = {
    primary: "bg-brand text-white shadow-sm hover:brightness-110",
    accent: "bg-accent text-ink shadow-sm hover:brightness-110",
    secondary:
      "border border-line bg-white text-ink shadow-sm hover:border-brand/30 hover:bg-surface",
    ghost: "text-brand hover:bg-brand/5",
    danger: "border border-accent/30 bg-accent-soft text-accent hover:bg-accent/10",
  };

  return (
    <button
      type="button"
      className={cn(base, sizes, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "accent" | "success" | "warning";
}) {
  const tones = {
    neutral: "bg-ink/5 text-ink-muted",
    brand: "bg-brand/10 text-brand",
    accent: "bg-accent/10 text-accent",
    success: "bg-emerald-500/10 text-emerald-700",
    warning: "bg-amber-500/10 text-amber-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function AdminAlert({
  title,
  children,
  tone = "warning",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "warning" | "info" | "error";
}) {
  const styles =
    tone === "warning"
      ? "border-amber-200/80 bg-amber-50 text-amber-950"
      : tone === "error"
        ? "border-red-200 bg-red-50 text-red-950"
        : "border-brand/20 bg-brand/5 text-ink";

  return (
    <div className={cn("rounded-xl border px-4 py-3.5 text-sm", styles)}>
      <p className="font-semibold">{title}</p>
      <div className="mt-1.5 leading-relaxed opacity-90">{children}</div>
    </div>
  );
}

export function AdminEmpty({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface/50 px-6 py-12 text-center">
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
          {description}
        </p>
      )}
    </div>
  );
}

export function NavIcon({ tab }: { tab: AdminTab }) {
  const common = "h-4 w-4 shrink-0 opacity-90";

  switch (tab) {
    case "dashboard":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M3 4a1 1 0 011-1h3a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm9-1a1 1 0 00-1 1v9a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm9-3a1 1 0 00-1 1v6a1 1 0 001 1h3a1 1 0 001-1v-6a1 1 0 00-1-1h-3z" />
        </svg>
      );
    case "inbox":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M2.5 6A2.5 2.5 0 015 3.5h10A2.5 2.5 0 0117.5 6v8a2.5 2.5 0 01-2.5 2.5H5A2.5 2.5 0 012.5 14V6zM5 5a1 1 0 00-1 1v.217l5.5 3.438a1 1 0 001 0L16 6.217V6a1 1 0 00-1-1H5z" />
        </svg>
      );
    case "posts":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.555.832L10 14.202l-6.445 4.63A1 1 0 012 18V4z" />
        </svg>
      );
    case "events":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM2 9v7a2 2 0 002 2h12a2 2 0 002-2V9H2zm4 2a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm4 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" />
        </svg>
      );
    case "programs":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 4h6a1 1 0 110 2H7a1 1 0 110-2zm0 4h4a1 1 0 110 2H7a1 1 0 110-2z" />
        </svg>
      );
    case "impact_stories":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      );
    case "reports":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414a2 2 0 00-.586-1.414l-4-4A2 2 0 0010.586 2H6zm4 3a1 1 0 00-1 1v4.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V6a1 1 0 00-1-1z" />
        </svg>
      );
    case "home":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 10.707V17a1 1 0 001 1h4a1 1 0 001-1v-3h2v3a1 1 0 001 1h4a1 1 0 001-1v-6.293a1 1 0 00.293-.707l-7-7z" />
        </svg>
      );
    case "popup":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M4 3a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2V5a2 2 0 00-2-2H4zm2 4h8a1 1 0 110 2H6a1 1 0 110-2zm0 3h5a1 1 0 110 2H6a1 1 0 110-2z" />
        </svg>
      );
    case "cache":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "site":
    case "theme":
    case "navigation":
    case "pages":
    case "listings":
    case "board":
    case "detail":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M11.49 3.17a.75.75 0 011.02.102l3.75 4.5a.75.75 0 01-.13 1.09l-2.5 2a.75.75 0 01-.94 0l-1.08-.9-2.24 2.24a1 1 0 01-1.414 0l-.88-.88a1 1 0 010-1.414l2.24-2.24-.9-1.08a.75.75 0 010-.94l2-2.5a.75.75 0 011.09-.13zM4 14.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
      );
    case "account":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
}
