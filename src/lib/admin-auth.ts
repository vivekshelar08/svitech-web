import { cookies } from "next/headers";
import crypto from "crypto";
import {
  getSessionSecret,
  verifyAdminPassword,
} from "@/lib/admin-credentials";
import { getAdminEmail } from "@/lib/env";

const COOKIE = "svitech_admin";

function sign(value: string) {
  const secret = getSessionSecret();
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const expected = sign("ok");
  return token === expected;
}

export async function setAdminSession() {
  const token = sign("ok");
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

export async function checkAdminLogin(input: {
  email?: string;
  password: string;
}) {
  const passwordOk = await verifyAdminPassword(input.password);
  if (!passwordOk) return false;

  const adminEmail = getAdminEmail();
  if (adminEmail) {
    if (!input.email) return false;
    return safeEqual(input.email.trim().toLowerCase(), adminEmail.toLowerCase());
  }

  return true;
}

export function getExpectedAdminEmail() {
  return getAdminEmail();
}
