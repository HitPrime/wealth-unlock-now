export const config = { runtime: "edge" };

async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    const lastDot = token.lastIndexOf(".");
    if (lastDot === -1) return false;

    const payload = token.slice(0, lastDot);
    const hex = token.slice(lastDot + 1);

    // Check token is not older than 24 hours
    const parts = payload.split(":");
    const timestamp = parseInt(parts[1] ?? "0", 10);
    const age = Date.now() - timestamp;
    if (age > 1000 * 60 * 60 * 24) return false;

    // Verify HMAC signature
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
    const expected = Array.from(new Uint8Array(sig))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    return expected === hex;
  } catch {
    return false;
  }
}

export default async function handler(req: Request) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "fallback";

  // Read cookie from request
  const cookieHeader = req.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map(c => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );

  const token = cookies["admin_token"] ?? "";
  const valid = token ? await verifyToken(token, ADMIN_SECRET) : false;

  return new Response(JSON.stringify({ ok: valid }), {
    status: valid ? 200 : 401,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
