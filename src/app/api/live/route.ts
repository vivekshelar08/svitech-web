import { NextResponse } from "next/server";
import {
  getAdminPassword,
  hasResend,
  hasSupabase,
  getSupabaseServiceKey,
} from "@/lib/env";

/** Liveness + safe backend config flags for production debugging. */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "svitech-web",
      ts: new Date().toISOString(),
      backend: {
        supabase: hasSupabase(),
        supabaseServiceRole: Boolean(getSupabaseServiceKey()),
        adminPassword: Boolean(getAdminPassword()),
        resend: hasResend(),
      },
    },
    { status: 200 },
  );
}
