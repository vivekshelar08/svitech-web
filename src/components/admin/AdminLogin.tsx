"use client";

import { useState, type FormEvent } from "react";
import { adminInputClass, cn } from "@/components/admin/admin-ui";

export function AdminLogin({
  onSuccess,
  initialResetToken,
}: {
  onSuccess: () => void | Promise<void>;
  initialResetToken?: string | null;
}) {
  const [mode, setMode] = useState<"login" | "forgot" | "reset">(
    initialResetToken ? "reset" : "login",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(initialResetToken || "");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "forgot") {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request-reset", email }),
      });
      setLoading(false);
      const json = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(json.error || "Could not start reset");
        return;
      }
      setMessage(json.message || "Check your email for a reset link.");
      return;
    }

    if (mode === "reset") {
      if (newPassword !== confirmPassword) {
        setLoading(false);
        setError("Passwords do not match");
        return;
      }
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset-password",
          token,
          newPassword,
        }),
      });
      setLoading(false);
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        setError(json.error || "Reset failed");
        return;
      }
      await onSuccess();
      return;
    }

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }
    await onSuccess();
  }

  return (
    <div className="admin-app flex min-h-svh">
      <div className="hidden w-[42%] flex-col justify-between bg-[linear-gradient(160deg,#0b2f30_0%,#0e6b5c_55%,#14967f_100%)] p-10 text-white lg:flex">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold backdrop-blur">
            S
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold leading-tight">
            SVITECH
            <br />
            Admin Console
          </h1>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75">
            Manage content, review submissions, customize your site, and publish
            updates — all in one place.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-white/65">
          <li>✦ Publish news, events & programs</li>
          <li>✦ Edit site copy and brand colors</li>
          <li>✦ Track donations and form submissions</li>
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#e9f0ee] px-5 py-12">
        <div className="w-full max-w-md rounded-2xl border border-line/80 bg-white p-8 shadow-[0_20px_60px_rgba(12,46,47,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Staff access
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink">
            {mode === "forgot"
              ? "Reset password"
              : mode === "reset"
                ? "New password"
                : "Sign in"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {mode === "forgot"
              ? "We’ll email a reset link to the configured admin address."
              : mode === "reset"
                ? "Enter the token from your email."
                : "Use your staff credentials to continue."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {(mode === "login" || mode === "forgot") && (
              <label className="block text-sm font-medium text-ink">
                Email
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@svitech.in"
                  className={adminInputClass}
                />
              </label>
            )}

            {mode === "login" && (
              <label className="block text-sm font-medium text-ink">
                Password
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={adminInputClass}
                />
              </label>
            )}

            {mode === "reset" && (
              <>
                <label className="block text-sm font-medium text-ink">
                  Reset token
                  <input
                    id="reset-token"
                    type="text"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className={cn(adminInputClass, "font-mono text-xs")}
                  />
                </label>
                <label className="block text-sm font-medium text-ink">
                  New password
                  <input
                    id="new-password"
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={adminInputClass}
                  />
                </label>
                <label className="block text-sm font-medium text-ink">
                  Confirm password
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={adminInputClass}
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
            >
              {loading
                ? "Working…"
                : mode === "forgot"
                  ? "Send reset link"
                  : mode === "reset"
                    ? "Update password"
                    : "Sign in"}
            </button>

            {error && (
              <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="rounded-lg bg-brand/10 px-3 py-2 text-sm text-brand" role="status">
                {message}
              </p>
            )}
          </form>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {mode !== "login" && (
              <button
                type="button"
                className="font-semibold text-brand"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setMessage("");
                }}
              >
                Back to sign in
              </button>
            )}
            {mode === "login" && (
              <button
                type="button"
                className="font-semibold text-brand"
                onClick={() => {
                  setMode("forgot");
                  setError("");
                  setMessage("");
                }}
              >
                Forgot password?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
