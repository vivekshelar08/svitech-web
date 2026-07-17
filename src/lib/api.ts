import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { status: 200, ...init });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function fromZod(error: ZodError) {
  return jsonError(error.issues.map((i) => i.message).join("; "), 400);
}

export async function readJson<T>(request: Request): Promise<T> {
  return (await request.json()) as T;
}
