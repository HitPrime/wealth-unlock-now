export const config = { runtime: "edge" };

const SUPABASE_URL   = "https://vzzmcsjimncrsmkyimgz.supabase.co";
const SUPABASE_KEY   = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6em1jc2ppbW5jcnNta3lpbWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTM2MTAsImV4cCI6MjEwNzQ2OTYxMH0.0KzTZjeNKfinEMTxBpBKInjlyQJICCu9YMNdN99DL6o";
const UPSTASH_URL    = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN  = process.env.UPSTASH_REDIS_REST_TOKEN!;
const LEGAL_VERSION_URL = "https://www.cassiuscuvee.com/api/legal-version";

// Fetch current legal version at time of submission
async function getCurrentLegalVersion() {
  try {
    const res = await fetch(LEGAL_VERSION_URL, { headers: { "Cache-Control": "no-store" } });
    if (res.ok) return await res.json();
  } catch {}
  // Fallback
  return {
    terms_version:       "October 12, 2026",
    terms_archive_url:   "https://www.cassiuscuvee.com/terms-v20261012",
    privacy_archive_url: "https://www.cassiuscuvee.com/privacy-v20261012",
  };
}

async function saveToSupabase(record: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error(await res.text());
}

async function saveToUpstash(key: string, value: string) {
  await fetch(`${UPSTASH_URL}/lpush/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify([value]),
  });
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req: Request) {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return new Response("Invalid body", { status: 400 }); }

  if (!body.name || !body.email || !body.consentText) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Fetch current legal version at time of submission
  const legalVersion = await getCurrentLegalVersion();

  const isVideo = !!(body.fileName || body.fileType);
  const redisKey = isVideo ? "testimonials:video" : "testimonials:text";

  const record = {
    type:                isVideo ? "video" : "text",
    name:                body.name,
    email:               body.email,
    testimonial:         body.testimonial         ?? null,
    rating:              body.rating              ?? null,
    file_name:           body.fileName            ?? null,
    file_type:           body.fileType            ?? null,
    file_size_mb:        body.fileSizeMB          ?? null,
    consent_text:        body.consentText,
    // Legal version at time of submission — fetched live from /api/legal-version
    terms_version:       legalVersion.terms_version,
    terms_archive_url:   legalVersion.terms_archive_url,
    privacy_archive_url: legalVersion.privacy_archive_url,
    consented_at:        body.consentedAt         ?? new Date().toISOString(),
  };

  // Save to Supabase
  try { await saveToSupabase(record); }
  catch (err) { console.error("Supabase save failed:", err); }

  // Save to Upstash (backup)
  try { await saveToUpstash(redisKey, JSON.stringify(record)); }
  catch {}

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
