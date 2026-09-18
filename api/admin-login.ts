export const config = { runtime: "edge" };

// Simple signed token — HMAC-SHA256 of "admin:<timestamp>" using ADMIN_SECRET
async function signToken(secret: string): Promise<string> {
  const timestamp = Date.now().toString();
  const payload = `admin:${timestamp}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${payload}.${hex}`;
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_SECRET = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "fallback";

  if (!ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: "Not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { password?: string; logout?: boolean };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Logout — expire the cookie
  if (body.logout) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "admin_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
      },
    });
  }

  if (body.password !== ADMIN_PASSWORD) {
    // Deliberate delay to slow brute force
    await new Promise(r => setTimeout(r, 500));
    return new Response(JSON.stringify({ ok: false, error: "Incorrect password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = await signToken(ADMIN_SECRET);
  const maxAge = 60 * 60 * 24; // 24 hours

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`,
    },
  });
}
