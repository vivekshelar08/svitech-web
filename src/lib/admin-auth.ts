import { cookies } from "next/headers";
import crypto from "crypto";
import { getAdminPassword } from "@/lib/env";

const COOKIE = "svitech_admin";

function sign(value: string) {
  const secret = getAdminPassword();
  if (!secret) return null;
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export async function isAdminAuthenticated() {
  const password = getAdminPassword();
  if (!password) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const expected = sign("ok");
  return Boolean(expected && token === expected);
}

export async function setAdminSession() {
  const token = sign("ok");
  if (!token) throw new Error("ADMIN_PASSWORD is not set");
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function checkAdminPassword(input: string) {
  const password = getAdminPassword();
  if (!password) return false;
  return input === password;
}
