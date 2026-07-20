"use client";

import { useState, type FormEvent } from "react";
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  adminInputClass,
} from "@/components/admin/admin-ui";

export function AccountTab({
  email,
  hasCustomPassword,
  hasEnvPassword,
}: {
  email: string | null;
  hasCustomPassword: boolean;
  hasEnvPassword: boolean;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [backupStatus, setBackupStatus] = useState("");
  const [backupError, setBackupError] = useState("");
  const [backingUp, setBackingUp] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "change-password",
        currentPassword,
        newPassword,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setError(json.error || "Could not update password");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setStatus("Password updated. Use the new password next time you sign in.");
    window.location.reload();
  }

  async function downloadBackup() {
    setBackingUp(true);
    setBackupError("");
    setBackupStatus("Building full website backup…");
    try {
      const res = await fetch("/api/admin/backup", { cache: "no-store" });
      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(json?.error || "Backup failed");
      }
      const text = await res.text();
      const parsed = JSON.parse(text) as {
        meta?: { totalRecords?: number };
      };
      const stamp = new Date().toISOString().slice(0, 10);
      const filename =
        res.headers
          .get("Content-Disposition")
          ?.match(/filename="([^"]+)"/)?.[1] || `svitech-backup-${stamp}.json`;

      const blob = new Blob([text], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      const total = parsed.meta?.totalRecords ?? 0;
      setBackupStatus(
        `Downloaded ${filename} — ${total} records (settings, content, inbox, media URLs). Passwords are not included.`,
      );
    } catch (err) {
      setBackupStatus("");
      setBackupError(err instanceof Error ? err.message : "Backup failed");
    } finally {
      setBackingUp(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <AdminCard
          title="Change password"
          description={
            email
              ? `Signed in as ${email}`
              : "Update your staff console password"
          }
        >
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-ink">
              Current password
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={adminInputClass}
              />
            </label>
            <label className="block text-sm font-medium text-ink">
              New password
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={adminInputClass}
              />
            </label>
            <label className="block text-sm font-medium text-ink">
              Confirm new password
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={adminInputClass}
              />
            </label>
            <AdminButton type="submit" variant="primary" disabled={loading}>
              {loading ? "Updating…" : "Update password"}
            </AdminButton>
            {error && (
              <AdminAlert title="Could not update" tone="warning">
                {error}
              </AdminAlert>
            )}
            {status && (
              <p className="rounded-lg bg-brand/10 px-3 py-2 text-sm text-brand" role="status">
                {status}
              </p>
            )}
          </form>
        </AdminCard>

        <AdminCard
          title="Website data backup"
          description="Download a full JSON export of site settings, CMS content, and inbox submissions."
        >
          <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>Brand, theme, navigation, and all page copy</li>
            <li>News, events, programs, impact stories, reports</li>
            <li>Contact, volunteers, newsletter, donations, event signups</li>
            <li>Collected media URLs (image/PDF files stay in storage)</li>
          </ul>
          <AdminButton
            type="button"
            variant="accent"
            disabled={backingUp}
            onClick={() => void downloadBackup()}
          >
            {backingUp ? "Preparing backup…" : "Download full backup"}
          </AdminButton>
          {backupError && (
            <AdminAlert title="Backup failed" tone="warning">
              {backupError}
            </AdminAlert>
          )}
          {backupStatus && (
            <p className="mt-3 rounded-lg bg-brand/10 px-3 py-2 text-sm text-brand" role="status">
              {backupStatus}
            </p>
          )}
        </AdminCard>
      </div>

      <AdminCard title="Account notes" padding="sm">
        <ul className="space-y-3 text-sm leading-relaxed text-ink-muted">
          <li className="flex items-center justify-between rounded-lg bg-surface/60 px-3 py-2">
            <span>Bootstrap password (env)</span>
            <span className="font-semibold text-ink">
              {hasEnvPassword ? "Set" : "Missing"}
            </span>
          </li>
          <li className="flex items-center justify-between rounded-lg bg-surface/60 px-3 py-2">
            <span>Custom password override</span>
            <span className="font-semibold text-ink">
              {hasCustomPassword ? "Active" : "Not set"}
            </span>
          </li>
          <li>
            Forgot-password emails use Resend (<code>RESEND_API_KEY</code>) and go to{" "}
            <code className="text-ink">{email}</code>.
          </li>
          <li>
            After you set a custom password here, that password is used for login instead of{" "}
            <code className="text-ink">ADMIN_PASSWORD</code>.
          </li>
          <li>
            Backups never include admin passwords. Store the JSON file somewhere safe (Drive,
            encrypted disk, etc.).
          </li>
        </ul>
      </AdminCard>
    </div>
  );
}
