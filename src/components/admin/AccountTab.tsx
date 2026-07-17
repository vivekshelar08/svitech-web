"use client";

import { useState, type FormEvent } from "react";

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

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="space-y-4 border border-line bg-surface p-6">
        <h2 className="font-display text-xl font-bold text-ink">Change password</h2>
        <p className="text-sm text-ink-muted">
          Signed in as <span className="font-medium text-ink">{email || "admin"}</span>
        </p>
        <label className="block">
          <span className="text-sm font-medium text-ink">Current password</span>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">New password</span>
          <input
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Confirm new password</span>
          <input
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-brand px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Updating…" : "Update password"}
        </button>
        {error && (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        )}
        {status && (
          <p className="text-sm text-brand" role="status">
            {status}
          </p>
        )}
      </form>

      <aside className="space-y-4 border border-line bg-white/70 p-6 text-sm leading-relaxed text-ink-muted">
        <h3 className="font-display text-lg font-bold text-ink">Account notes</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Bootstrap password from env:{" "}
            <strong className="text-ink">{hasEnvPassword ? "set" : "missing"}</strong>
          </li>
          <li>
            Custom password override:{" "}
            <strong className="text-ink">
              {hasCustomPassword ? "active" : "not set yet"}
            </strong>
          </li>
          <li>
            Forgot-password emails use Resend (`RESEND_API_KEY`) and go to{" "}
            <code className="text-ink">{email}</code>.
          </li>
          <li>
            After you set a custom password here, that password is used for login
            instead of <code className="text-ink">ADMIN_PASSWORD</code>.
          </li>
        </ul>
      </aside>
    </div>
  );
}
