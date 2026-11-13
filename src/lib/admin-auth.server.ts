// Server-only check that the request comes from someone logged in to /admin.
// The login (api/admin-login.ts) sets an HttpOnly "admin_token" cookie of the form
// "admin:<timestamp>.<hex HMAC-SHA256 of 'admin:<timestamp>'>", signed with ADMIN_SECRET
// (or ADMIN_PASSWORD when no separate secret is set). Same rules as api/admin-verify.ts.
import { getCookie } from "@tanstack/react-start/server";

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function hmacHex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function sameString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function isAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) return false; // not configured: never trust a token
  const token = getCookie("admin_token") ?? "";
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const [label, ts] = payload.split(":");
  const timestamp = Number(ts);
  if (label !== "admin" || !Number.isFinite(timestamp)) return false;
  if (Date.now() - timestamp > MAX_AGE_MS) return false;
  return sameString(await hmacHex(secret, payload), token.slice(lastDot + 1));
}

// Throws unless the caller is logged in to /admin.
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Not authorized. Please log in to /admin again.");
}
