function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function hasSupabase() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  );
}

export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
}

export function hasRazorpay() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export function getRazorpayConfig() {
  return {
    keyId: required("RAZORPAY_KEY_ID", process.env.RAZORPAY_KEY_ID),
    keySecret: required("RAZORPAY_KEY_SECRET", process.env.RAZORPAY_KEY_SECRET),
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET ?? null,
  };
}

export function getPublicRazorpayKey() {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || null;
}

export function hasResend() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY ?? null,
    from: process.env.EMAIL_FROM || "SVITECH Foundation <onboarding@resend.dev>",
    notifyTo: process.env.NOTIFY_EMAIL || "hello@svitech.org",
  };
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? null;
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || "info@svitech.in";
}

export function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_URL?.replace(/^/, "https://") ||
    "http://localhost:3000"
  );
}
