"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AdminButton, cn } from "@/components/admin/admin-ui";

type ConfirmTone = "danger" | "default";

type ConfirmRequest = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
  resolve: (ok: boolean) => void;
};

export function AdminDialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  initialFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusTarget =
      initialFocusRef?.current ||
      panelRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
      );
    window.setTimeout(() => focusTarget?.focus(), 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose, initialFocusRef]);

  if (!open) return null;

  const maxW =
    size === "sm" ? "max-w-md" : size === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <div className="admin-dialog-root fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg-deep)_55%,transparent)] backdrop-blur-[3px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={cn(
          "admin-dialog-panel relative z-10 flex max-h-[min(90svh,40rem)] w-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-white shadow-[0_24px_60px_-18px_rgba(11,20,36,0.45)]",
          maxW,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line/70 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
            >
              {title}
            </h2>
            {description ? (
              <p id={descId} className="mt-1 text-sm leading-relaxed text-ink-muted">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink-muted transition hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
            aria-label="Close"
          >
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>
        {children ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
            {children}
          </div>
        ) : null}
        {footer ? (
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line/70 bg-surface/60 px-5 py-3.5 sm:px-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AdminConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  return (
    <AdminDialog
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      size="sm"
      initialFocusRef={confirmRef}
      footer={
        <>
          <AdminButton variant="secondary" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </AdminButton>
          <AdminButton
            ref={confirmRef}
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Working…" : confirmLabel}
          </AdminButton>
        </>
      }
    />
  );
}

export function useAdminConfirm() {
  const [request, setRequest] = useState<ConfirmRequest | null>(null);

  const confirm = useCallback(
    (opts: Omit<ConfirmRequest, "resolve">) =>
      new Promise<boolean>((resolve) => {
        setRequest({ ...opts, resolve });
      }),
    [],
  );

  const dialog = (
    <AdminConfirmDialog
      open={Boolean(request)}
      title={request?.title || ""}
      description={request?.description}
      confirmLabel={request?.confirmLabel}
      cancelLabel={request?.cancelLabel}
      tone={request?.tone}
      onCancel={() => {
        request?.resolve(false);
        setRequest(null);
      }}
      onConfirm={() => {
        request?.resolve(true);
        setRequest(null);
      }}
    />
  );

  return { confirm, dialog };
}
