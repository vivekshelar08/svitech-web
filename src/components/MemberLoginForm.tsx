"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function MemberLoginForm({
  initialResetToken,
}: {
  initialResetToken?: string | null;
}) {
  const router = useRouter();
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

  const fieldClass =
    "mt-1.5 w-full border border-line bg-white px-3.5 py-3 text-base text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/15 sm:py-2.5 sm:text-sm";

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
      router.push("/admin");
      router.refresh();
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
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="border border-line/80 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(11,20,36,0.45)] sm:p-8">
      <p className="site-eyebrow !text-brand">Members</p>
      <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {mode === "forgot"
          ? "Reset password"
          : mode === "reset"
            ? "Choose a new password"
            : "Member login"}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {mode === "forgot"
          ? "We’ll email a reset link to the registered member address."
          : mode === "reset"
            ? "Enter the token from your email, then set a new password."
            : "Sign in to manage content, inbox, and site settings."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {(mode === "login" || mode === "forgot") && (
          <label className="block text-sm font-semibold text-ink" htmlFor="member-email">
            Email
            <input
              id="member-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.org"
              className={fieldClass}
            />
          </label>
        )}

        {mode === "login" && (
          <label className="block text-sm font-semibold text-ink" htmlFor="member-password">
            Password
            <input
              id="member-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </label>
        )}

        {mode === "reset" && (
          <>
            <label className="block text-sm font-semibold text-ink" htmlFor="member-token">
              Reset token
              <input
                id="member-token"
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className={`${fieldClass} font-mono text-xs`}
              />
            </label>
            <label className="block text-sm font-semibold text-ink" htmlFor="member-new-password">
              New password
              <input
                id="member-new-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block text-sm font-semibold text-ink" htmlFor="member-confirm-password">
              Confirm password
              <input
                id="member-confirm-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={fieldClass}
              />
            </label>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-2 w-full disabled:opacity-60"
        >
          {loading
            ? "Working…"
            : mode === "forgot"
              ? "Send reset link"
              : mode === "reset"
                ? "Update password"
                : "Sign in"}
        </button>

        {error ? (
          <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="border border-brand/20 bg-brand/5 px-3 py-2 text-sm text-brand" role="status">
            {message}
          </p>
        ) : null}
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/70 pt-5 text-sm">
        {mode !== "login" ? (
          <button
            type="button"
            className="font-semibold text-brand underline-offset-2 hover:underline"
            onClick={() => {
              setMode("login");
              setError("");
              setMessage("");
            }}
          >
            Back to sign in
          </button>
        ) : (
          <button
            type="button"
            className="font-semibold text-brand underline-offset-2 hover:underline"
            onClick={() => {
              setMode("forgot");
              setError("");
              setMessage("");
            }}
          >
            Forgot password?
          </button>
        )}
        <Link href="/donate" className="font-semibold text-ink-muted underline-offset-2 hover:text-ink hover:underline">
          Prefer to donate?
        </Link>
      </div>
    </div>
  );
}
