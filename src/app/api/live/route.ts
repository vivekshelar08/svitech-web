import { NextResponse } from "next/server";

/** Liveness check for Hostinger / uptime monitors — always 200. */
export async function GET() {
  return NextResponse.json(
    { ok: true, service: "svitech-web", ts: new Date().toISOString() },
    { status: 200 }
  );
}
