import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import {
  checkAdminLogin,
  clearAdminSession,
  getExpectedAdminEmail,
  isAdminAuthenticated,
  setAdminSession,
} from "@/lib/admin-auth";
import {
  createPasswordResetToken,
  hasCustomPassword,
  resetPasswordWithToken,
  setAdminPassword,
  verifyAdminPassword,
} from "@/lib/admin-credentials";
import { sendEmail } from "@/lib/email";
import { getAdminEmail, getAppUrl, getAdminPassword, getSupabaseServiceKey, hasSupabase } from "@/lib/env";
import { getAdminClient } from "@/lib/supabase";
import { emptyAdminDashboard, fetchAdminDashboard } from "@/lib/admin-dashboard-data";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email().optional().or(z.literal("")),
  password: z.string().min(1).optional(),
  action: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  token: z.string().optional(),
});

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return jsonOk({
    authenticated,
    email: authenticated ? getExpectedAdminEmail() : null,
    hasEnvPassword: Boolean(getAdminPassword()),
    hasCustomPassword: await hasCustomPassword(),
    backend: {
      supabase: hasSupabase(),
      supabaseServiceRole: Boolean(getSupabaseServiceKey()),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await readJson(request));
    const action = body.action || "login";

    if (action === "logout") {
      await clearAdminSession();
      return jsonOk({ ok: true });
    }

    if (action === "request-reset") {
      const email = (body.email || "").trim().toLowerCase();
      const adminEmail = getAdminEmail().toLowerCase();
      // Always return ok to avoid email enumeration.
      if (email && email === adminEmail) {
        const token = await createPasswordResetToken();
        const resetUrl = `${getAppUrl().replace(/\/$/, "")}/admin?reset=${token}`;
        await sendEmail({
          to: adminEmail,
          subject: "Reset your SVITECH admin password",
          html: `
            <div style="font-family: Georgia, serif; color: #0c2e2f; line-height: 1.5;">
              <h1 style="font-size: 20px;">Password reset</h1>
              <p>Use this link to choose a new admin password. It expires in 1 hour.</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>
              <p>If you did not request this, you can ignore this email.</p>
            </div>
          `,
        });
      }
      return jsonOk({
        ok: true,
        message:
          "If that email matches the admin account, a reset link has been sent.",
      });
    }

    if (action === "reset-password") {
      if (!body.token || !body.newPassword) {
        return jsonError("Reset token and new password are required", 400);
      }
      await resetPasswordWithToken(body.token, body.newPassword);
      await setAdminSession();
      return jsonOk({ ok: true });
    }

    if (action === "change-password") {
      if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);
      if (!body.currentPassword || !body.newPassword) {
        return jsonError("Current and new password are required", 400);
      }
      const ok = await verifyAdminPassword(body.currentPassword);
      if (!ok) return jsonError("Current password is incorrect", 401);
      await setAdminPassword(body.newPassword);
      await setAdminSession();
      return jsonOk({ ok: true });
    }

    if (!body.password) return jsonError("Password is required", 400);
    if (!(await checkAdminLogin({ email: body.email, password: body.password }))) {
      return jsonError("Invalid email or password", 401);
    }
    await setAdminSession();
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) return fromZod(error);
    if (error instanceof Error) return jsonError(error.message, 400);
    return jsonError("Login failed", 500);
  }
}

export async function PUT() {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);
  const admin = getAdminClient();
  if (!admin) {
    return jsonOk(
      emptyAdminDashboard(
        "Supabase service role not configured. Set SUPABASE_SERVICE_ROLE_KEY for inbox and CMS. Site settings still save locally.",
      ),
    );
  }

  try {
    return jsonOk(await fetchAdminDashboard(admin));
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Failed to load dashboard",
      500,
    );
  }
}
