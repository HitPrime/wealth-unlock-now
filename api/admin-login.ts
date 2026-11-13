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

const MAX_FAILS = 5;
const LOCK_SECONDS = 15 * 60;

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (fwd || req.headers.get("x-real-ip") || "unknown").slice(0, 64);
}

// One Upstash REST command, e.g. ["incr", "key"]. Returns the numeric result, or 0 when
// Redis isn't configured or the call fails (so a Redis outage never blocks the login).
async function redis(cmd: (string | number)[]): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return 0;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmd),
    });
    const data = await res.json();
    return Number(data?.result) || 0;
  } catch {
    return 0;
  }
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_SECRET = process.env.ADMIN_SECRET || ADMIN_PASSWORD || "";

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

  // Lockout: after MAX_FAILS wrong passwords from one IP, refuse logins from that IP for
  // LOCK_SECONDS (counted in Upstash Redis). If Redis is unreachable we don't lock anyone
  // out, the 500 ms delay below still slows guessing.
  const ip = clientIp(req);
  const failKey = `adminfail:${ip}`;
  if ((await redis(["get", failKey])) >= MAX_FAILS) {
    return new Response(
      JSON.stringify({ ok: false, error: "Too many attempts. Try again in 15 minutes." }),
      { status: 429, headers: { "Content-Type": "application/json", "Retry-After": String(LOCK_SECONDS) } },
    );
  }

  if (body.password !== ADMIN_PASSWORD) {
    // Count the failure; the window starts at the first failure and resets after LOCK_SECONDS.
    if ((await redis(["incr", failKey])) === 1) await redis(["expire", failKey, LOCK_SECONDS]);
    // Deliberate delay to slow brute force
    await new Promise(r => setTimeout(r, 500));
    return new Response(JSON.stringify({ ok: false, error: "Incorrect password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await redis(["del", failKey]);

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
