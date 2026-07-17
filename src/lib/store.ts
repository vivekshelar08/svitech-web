import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getAdminClient, getAnonClient } from "@/lib/supabase";
import { hasSupabase } from "@/lib/env";

const dataDir = path.join(process.cwd(), "data", "submissions");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function appendLocal(file: string, record: unknown) {
  await ensureDataDir();
  const target = path.join(dataDir, file);
  let existing: unknown[] = [];
  try {
    const raw = await fs.readFile(target, "utf8");
    existing = JSON.parse(raw) as unknown[];
  } catch {
    existing = [];
  }
  existing.push({ ...((record as object) || {}), createdAt: new Date().toISOString() });
  await fs.writeFile(target, JSON.stringify(existing, null, 2), "utf8");
}

export async function saveContact(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  if (hasSupabase()) {
    const client = getAnonClient();
    if (!client) throw new Error("Supabase client unavailable");
    const { error } = await client.from("contact_messages").insert(input);
    if (error) throw new Error(error.message);
    return;
  }
  await appendLocal("contact.json", input);
}

export async function saveVolunteer(input: {
  name: string;
  email: string;
  phone?: string | null;
  skills: string;
  availability: string;
  motivation: string;
}) {
  if (hasSupabase()) {
    const client = getAnonClient();
    if (!client) throw new Error("Supabase client unavailable");
    const { error } = await client.from("volunteer_applications").insert({
      ...input,
      phone: input.phone || null,
    });
    if (error) throw new Error(error.message);
    return;
  }
  await appendLocal("volunteers.json", input);
}

export async function saveNewsletter(input: { email: string; source?: string }) {
  if (hasSupabase()) {
    const client = getAnonClient();
    if (!client) throw new Error("Supabase client unavailable");
    const { error } = await client.from("newsletter_subscribers").insert({
      email: input.email,
      source: input.source || "website",
    });
    if (error) {
      if (error.code === "23505") return; // already subscribed
      throw new Error(error.message);
    }
    return;
  }
  await appendLocal("newsletter.json", input);
}

export async function saveEventRegistration(input: {
  event_slug: string;
  name: string;
  email: string;
  phone?: string | null;
  notes?: string | null;
}) {
  if (hasSupabase()) {
    const client = getAnonClient();
    if (!client) throw new Error("Supabase client unavailable");
    const { error } = await client.from("event_registrations").insert({
      ...input,
      phone: input.phone || null,
      notes: input.notes || null,
    });
    if (error) throw new Error(error.message);
    return;
  }
  await appendLocal("event-registrations.json", input);
}

export async function createDonationRecord(input: {
  name: string;
  email: string;
  phone?: string | null;
  amount_paise: number;
  frequency: "one_time" | "monthly";
  status?: string;
  razorpay_order_id?: string | null;
  razorpay_subscription_id?: string | null;
  notes?: string | null;
}) {
  const admin = getAdminClient();
  if (admin) {
    const { data, error } = await admin
      .from("donations")
      .insert({
        ...input,
        phone: input.phone || null,
        status: input.status || "created",
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return data.id as string;
  }

  const id = randomUUID();
  await appendLocal("donations.json", { id, ...input });
  return id;
}

export async function updateDonation(
  id: string,
  patch: {
    status?: string;
    razorpay_payment_id?: string | null;
    razorpay_order_id?: string | null;
    razorpay_subscription_id?: string | null;
    receipt_sent?: boolean;
  },
) {
  const admin = getAdminClient();
  if (admin) {
    const { error } = await admin
      .from("donations")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  await appendLocal("donations-updates.json", { id, ...patch });
}

export async function getDonation(id: string) {
  const admin = getAdminClient();
  if (admin) {
    const { data, error } = await admin
      .from("donations")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  }

  try {
    const target = path.join(dataDir, "donations.json");
    const raw = await fs.readFile(target, "utf8");
    const rows = JSON.parse(raw) as Array<Record<string, unknown>>;
    return rows.find((row) => row.id === id) ?? null;
  } catch {
    return null;
  }
}
