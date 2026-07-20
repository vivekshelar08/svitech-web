/** Shared fetch helpers for admin UI — clearer errors and retries. */

export async function adminJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  options?: { retries?: number },
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: string }> {
  const retries = options?.retries ?? 1;
  let lastError = "Request failed";
  let lastStatus = 0;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(input, {
        ...init,
        headers: {
          ...(init?.body ? { "Content-Type": "application/json" } : {}),
          ...init?.headers,
        },
        cache: "no-store",
      });
      lastStatus = res.status;
      const json = (await res.json().catch(() => ({}))) as T & { error?: string };
      if (res.status === 401) {
        return {
          ok: false,
          status: 401,
          error: "Session expired — sign in again, then retry.",
        };
      }
      if (!res.ok) {
        lastError = json.error || `Request failed (${res.status})`;
        if (attempt < retries && res.status >= 500) {
          await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
          continue;
        }
        return { ok: false, status: res.status, error: lastError };
      }
      return { ok: true, data: json };
    } catch {
      lastError = "Network error — check your connection and try again.";
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
        continue;
      }
    }
  }

  return { ok: false, status: lastStatus, error: lastError };
}
