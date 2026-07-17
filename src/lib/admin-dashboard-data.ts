import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type ActivityItem,
  type ActivityKind,
  type ContentCounts,
  emptyContentCounts,
} from "@/lib/admin-dashboard";

function weekAgoIso() {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
}

async function countPublished(
  admin: SupabaseClient,
  table: "posts" | "events" | "programs" | "impact_stories" | "reports",
): Promise<ContentCounts> {
  const [totalRes, publishedRes] = await Promise.all([
    admin.from(table).select("id", { count: "exact", head: true }),
    admin.from(table).select("id", { count: "exact", head: true }).eq("published", true),
  ]);
  const total = totalRes.count || 0;
  const published = publishedRes.count || 0;
  return { total, published, drafts: Math.max(0, total - published) };
}

function rowTime(row: Record<string, unknown>) {
  const value = row.created_at || row.createdAt;
  return value ? String(value) : new Date().toISOString();
}

function buildActivity(rows: {
  contact: Array<Record<string, unknown>>;
  volunteers: Array<Record<string, unknown>>;
  newsletter: Array<Record<string, unknown>>;
  donations: Array<Record<string, unknown>>;
  eventRegistrations: Array<Record<string, unknown>>;
}): ActivityItem[] {
  const items: ActivityItem[] = [];

  for (const row of rows.contact.slice(0, 8)) {
    items.push({
      id: String(row.id),
      kind: "contact",
      title: String(row.name || row.email || "Contact message"),
      subtitle: String(row.topic || ""),
      meta: String(row.message || "").slice(0, 120),
      createdAt: rowTime(row),
    });
  }

  for (const row of rows.volunteers.slice(0, 8)) {
    items.push({
      id: String(row.id),
      kind: "volunteer",
      title: String(row.name || row.email || "Volunteer"),
      subtitle: String(row.skills || "").slice(0, 80),
      meta: String(row.motivation || "").slice(0, 120),
      createdAt: rowTime(row),
    });
  }

  for (const row of rows.newsletter.slice(0, 5)) {
    items.push({
      id: String(row.id),
      kind: "newsletter",
      title: String(row.email || "Subscriber"),
      subtitle: String(row.source || "website"),
      createdAt: rowTime(row),
    });
  }

  for (const row of rows.donations.slice(0, 8)) {
    const paise = Number(row.amount_paise || 0);
    items.push({
      id: String(row.id),
      kind: "donation",
      title: String(row.name || row.email || "Donor"),
      subtitle: `₹${Math.round(paise / 100).toLocaleString("en-IN")} · ${String(row.status || "created")}`,
      meta: String(row.frequency || ""),
      createdAt: rowTime(row),
    });
  }

  for (const row of rows.eventRegistrations.slice(0, 8)) {
    items.push({
      id: String(row.id),
      kind: "event_registration",
      title: String(row.name || row.email || "Registration"),
      subtitle: String(row.event_slug || ""),
      meta: String(row.notes || "").slice(0, 100),
      createdAt: rowTime(row),
    });
  }

  return items
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);
}

function countSince(rows: Array<Record<string, unknown>>, sinceIso: string) {
  const since = new Date(sinceIso).getTime();
  return rows.filter((row) => new Date(rowTime(row)).getTime() >= since).length;
}

export async function fetchAdminDashboard(admin: SupabaseClient) {
  const since = weekAgoIso();
  const nowIso = new Date().toISOString();

  const [
    contact,
    volunteers,
    newsletter,
    donations,
    eventRegistrations,
    upcomingEvents,
    postsCounts,
    eventsCounts,
    programsCounts,
    impactCounts,
    reportsCounts,
  ] = await Promise.all([
    admin.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(50),
    admin.from("volunteer_applications").select("*").order("created_at", { ascending: false }).limit(50),
    admin.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(100),
    admin.from("donations").select("*").order("created_at", { ascending: false }).limit(50),
    admin.from("event_registrations").select("*").order("created_at", { ascending: false }).limit(50),
    admin
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("published", true)
      .gte("starts_at", nowIso),
    countPublished(admin, "posts"),
    countPublished(admin, "events"),
    countPublished(admin, "programs"),
    countPublished(admin, "impact_stories"),
    countPublished(admin, "reports"),
  ]);

  const contactRows = contact.data || [];
  const volunteerRows = volunteers.data || [];
  const newsletterRows = newsletter.data || [];
  const donationRows = donations.data || [];
  const eventRegRows = eventRegistrations.data || [];

  const paidDonations = donationRows.filter((d) => d.status === "paid");
  const donationsInr = paidDonations.reduce(
    (sum, d) => sum + Math.round(Number(d.amount_paise || 0) / 100),
    0,
  );

  const inboxTotal =
    contactRows.length +
    volunteerRows.length +
    eventRegRows.length +
    donationRows.filter((d) => d.status !== "paid" && d.status !== "failed").length;

  return {
    mode: "supabase" as const,
    fetchedAt: new Date().toISOString(),
    stats: {
      contact: contactRows.length,
      volunteers: volunteerRows.length,
      newsletter: newsletterRows.length,
      donations: donationRows.length,
      eventRegistrations: eventRegRows.length,
      posts: postsCounts.total,
      events: eventsCounts.total,
      programs: programsCounts.total,
      impactStories: impactCounts.total,
      reports: reportsCounts.total,
      donationsInr,
      donationsPaid: paidDonations.length,
      upcomingEvents: upcomingEvents.count || 0,
      inboxTotal,
      weekContact: countSince(contactRows, since),
      weekVolunteers: countSince(volunteerRows, since),
      weekDonations: countSince(
        donationRows.filter((d) => d.status === "paid"),
        since,
      ),
      content: {
        posts: postsCounts,
        events: eventsCounts,
        programs: programsCounts,
        impactStories: impactCounts,
        reports: reportsCounts,
      },
    },
    activity: buildActivity({
      contact: contactRows,
      volunteers: volunteerRows,
      newsletter: newsletterRows,
      donations: donationRows,
      eventRegistrations: eventRegRows,
    }),
    contact: contactRows,
    volunteers: volunteerRows,
    newsletter: newsletterRows,
    donations: donationRows,
    eventRegistrations: eventRegRows,
  };
}

export function emptyAdminDashboard(message: string) {
  const empty = emptyContentCounts();
  return {
    mode: "file" as const,
    message,
    fetchedAt: new Date().toISOString(),
    stats: null,
    activity: [] as ActivityItem[],
    contact: [] as Array<Record<string, unknown>>,
    volunteers: [] as Array<Record<string, unknown>>,
    newsletter: [] as Array<Record<string, unknown>>,
    donations: [] as Array<Record<string, unknown>>,
    eventRegistrations: [] as Array<Record<string, unknown>>,
    contentPlaceholder: {
      posts: empty,
      events: empty,
      programs: empty,
      impactStories: empty,
      reports: empty,
    },
  };
}
