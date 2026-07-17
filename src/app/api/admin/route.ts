import { jsonError, jsonOk, readJson } from "@/lib/api";
import {
  checkAdminPassword,
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
} from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase";

export async function GET() {
  return jsonOk({ authenticated: await isAdminAuthenticated() });
}

export async function POST(request: Request) {
  const body = await readJson<{ password?: string; action?: string }>(request);
  if (body.action === "logout") {
    await clearAdminSession();
    return jsonOk({ ok: true });
  }
  if (!body.password || !checkAdminPassword(body.password)) {
    return jsonError("Invalid password", 401);
  }
  await setAdminSession();
  return jsonOk({ ok: true });
}

export async function PUT() {
  if (!(await isAdminAuthenticated())) return jsonError("Unauthorized", 401);
  const admin = getAdminClient();
  if (!admin) {
    return jsonOk({
      mode: "file",
      message:
        "Supabase service role not configured. Content is served from src/content/. Submissions may be in /data/submissions.",
      contact: [],
      volunteers: [],
      newsletter: [],
      donations: [],
      eventRegistrations: [],
    });
  }

  const [contact, volunteers, newsletter, donations, eventRegistrations] =
    await Promise.all([
      admin.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(50),
      admin.from("volunteer_applications").select("*").order("created_at", { ascending: false }).limit(50),
      admin.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(100),
      admin.from("donations").select("*").order("created_at", { ascending: false }).limit(50),
      admin.from("event_registrations").select("*").order("created_at", { ascending: false }).limit(50),
    ]);

  return jsonOk({
    mode: "supabase",
    contact: contact.data || [],
    volunteers: volunteers.data || [],
    newsletter: newsletter.data || [],
    donations: donations.data || [],
    eventRegistrations: eventRegistrations.data || [],
  });
}
