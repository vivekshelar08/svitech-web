import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getAdminClient } from "@/lib/supabase";
import { getAdminPassword } from "@/lib/env";

type CredentialRecord = {
  passwordHash: string | null;
  passwordSalt: string | null;
  resetTokenHash: string | null;
  resetExpiresAt: string | null;
};

const localPath = path.join(process.cwd(), "data", "admin-credentials.json");

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

async function readLocal(): Promise<CredentialRecord> {
  try {
    const raw = await fs.readFile(localPath, "utf8");
    const json = JSON.parse(raw) as Partial<CredentialRecord>;
    return {
      passwordHash: json.passwordHash ?? null,
      passwordSalt: json.passwordSalt ?? null,
      resetTokenHash: json.resetTokenHash ?? null,
      resetExpiresAt: json.resetExpiresAt ?? null,
    };
  } catch {
    return {
      passwordHash: null,
      passwordSalt: null,
      resetTokenHash: null,
      resetExpiresAt: null,
    };
  }
}

async function writeLocal(record: CredentialRecord) {
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, JSON.stringify(record, null, 2), "utf8");
}

async function loadCredentials(): Promise<CredentialRecord> {
  const admin = getAdminClient();
  if (admin) {
    const { data, error } = await admin
      .from("admin_credentials")
      .select("password_hash, password_salt, reset_token_hash, reset_expires_at")
      .eq("id", "default")
      .maybeSingle();
    if (!error && data) {
      return {
        passwordHash: data.password_hash ?? null,
        passwordSalt: data.password_salt ?? null,
        resetTokenHash: data.reset_token_hash ?? null,
        resetExpiresAt: data.reset_expires_at ?? null,
      };
    }
  }
  return readLocal();
}

async function saveCredentials(record: CredentialRecord) {
  await writeLocal(record);
  const admin = getAdminClient();
  if (admin) {
    const { error } = await admin.from("admin_credentials").upsert(
      {
        id: "default",
        password_hash: record.passwordHash,
        password_salt: record.passwordSalt,
        reset_token_hash: record.resetTokenHash,
        reset_expires_at: record.resetExpiresAt,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (error) {
      console.warn("[admin-credentials] supabase upsert failed:", error.message);
    }
  }
}

export function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "svitech-admin-dev-secret"
  );
}

export async function hasCustomPassword() {
  const creds = await loadCredentials();
  return Boolean(creds.passwordHash && creds.passwordSalt);
}

export async function verifyAdminPassword(password: string) {
  const creds = await loadCredentials();
  if (creds.passwordHash && creds.passwordSalt) {
    const hashed = hashPassword(password, creds.passwordSalt);
    return safeEqual(hashed, creds.passwordHash);
  }

  const envPassword = getAdminPassword();
  if (!envPassword) return false;
  return safeEqual(password, envPassword);
}

export async function setAdminPassword(password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);
  const existing = await loadCredentials();
  await saveCredentials({
    ...existing,
    passwordHash,
    passwordSalt: salt,
    resetTokenHash: null,
    resetExpiresAt: null,
  });
}

export async function createPasswordResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const existing = await loadCredentials();
  await saveCredentials({
    ...existing,
    resetTokenHash: hashToken(token),
    resetExpiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
  return token;
}

export async function resetPasswordWithToken(token: string, password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const creds = await loadCredentials();
  if (!creds.resetTokenHash || !creds.resetExpiresAt) {
    throw new Error("Reset link is invalid or expired");
  }
  if (new Date(creds.resetExpiresAt).getTime() < Date.now()) {
    throw new Error("Reset link is invalid or expired");
  }
  if (!safeEqual(hashToken(token), creds.resetTokenHash)) {
    throw new Error("Reset link is invalid or expired");
  }
  await setAdminPassword(password);
}
