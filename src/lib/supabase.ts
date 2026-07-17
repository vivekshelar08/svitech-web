import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabasePublicConfig,
  getSupabaseServiceKey,
  hasSupabase,
} from "@/lib/env";

let anonClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

export function getAnonClient() {
  if (!hasSupabase()) return null;
  if (anonClient) return anonClient;
  const config = getSupabasePublicConfig();
  if (!config) return null;
  anonClient = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return anonClient;
}

export function getAdminClient() {
  if (!hasSupabase()) return null;
  const serviceKey = getSupabaseServiceKey();
  const config = getSupabasePublicConfig();
  if (!serviceKey || !config) return null;
  if (adminClient) return adminClient;
  adminClient = createClient(config.url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}
