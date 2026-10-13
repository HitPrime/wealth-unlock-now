export const config = { runtime: "edge" };

const SUPABASE_URL = "https://vzzmcsjimncrssmkyimgz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6em1jc2ppbW5jcnNta3lpbWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTM2MTAsImV4cCI6MjEwNzQ2OTYxMH0.0KzTZjeNKfinEMTxBpBKInjlyQJICCu9YMNdN99DL6o";

// Also keep Upstash as backup
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function saveToSupabase(record: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(record),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error: ${err}`);
  }
}

async function saveToUpstash(key: string, value: string) {
  await fetch(`${UPSTASH_URL}/lpush/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([value]),
  });
}

export default async function handler(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid body", { status: 400 });
  }

  if (!body.name || !body.email || !body.consentText) {
    return new Response("Missing required fields", { status: 400 });
  }

  const isVideo = !!(body.fileName || body.fileType);
  const redisKey = isVideo ? "testimonials:video" : "testimonials:text";

  const record = {
    type: isVideo ? "video" : "text",
    name: body.name,
    email: body.email,
    testimonial: body.testimonial ?? null,
    rating: body.rating ?? null,
    file_name: body.fileName ?? null,
    file_type: body.fileType ?? null,
    file_size_mb: body.fileSizeMB ?? null,
    consent_text: body.consentText,
    terms_version: body.termsVersion ?? "October 12, 2026",
    consented_at: body.consentedAt ?? new Date().toISOString(),
  };

  // Save to Supabase (primary)
  try {
    await saveToSupabase(record);
  } catch (err) {
    console.error("Supabase save failed:", err);
  }

  // Save to Upstash (backup)
  try {
    await saveToUpstash(redisKey, JSON.stringify(record));
  } catch {
    // non-blocking
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
