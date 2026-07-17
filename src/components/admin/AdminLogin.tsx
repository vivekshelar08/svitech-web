"use client";

import { useState, type FormEvent } from "react";

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
    <div className="flex min-h-svh items-center justify-center bg-[radial-gradient(ellipse_at_top,_#e8f3f0,_#f7f4ef_55%,_#efe8df)] px-5 py-16">
      <div className="w-full max-w-md border border-line bg-surface/95 p-8 shadow-[0_24px_80px_rgba(12,46,47,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Staff access
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">
          {mode === "forgot"
            ? "Reset password"
            : mode === "reset"
              ? "Choose a new password"
              : "SVITECH Admin"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {mode === "forgot"
            ? "We’ll email a reset link to the configured admin address."
            : mode === "reset"
              ? "Enter the token from your email and set a new password."
              : "Manage site copy, CMS content, inbox, and account security."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {(mode === "login" || mode === "forgot") && (
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@svitech.in"
                className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
              />
            </div>
          )}

          {mode === "login" && (
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-ink"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
              />
            </div>
          )}

          {mode === "reset" && (
            <>
              <div>
                <label htmlFor="reset-token" className="block text-sm font-medium text-ink">
                  Reset token
                </label>
                <input
                  id="reset-token"
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-xs outline-none focus:border-brand"
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-ink"
                >
                  New password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-ink"
                >
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
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
            <p className="text-sm text-accent" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-brand" role="status">
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
  );
}
