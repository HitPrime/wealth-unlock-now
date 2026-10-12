export const config = { runtime: "edge" };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function upstashLpush(key: string, value: string) {
  // Correct Upstash REST API: POST /<command>/<key> with body ["value"]
  const res = await fetch(`${UPSTASH_URL}/lpush/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([value]),
  });
  return res.json();
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // CORS for GHL embed
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

  // Determine key based on form type
  const redisKey = isVideo ? "testimonials:video" : "testimonials:text";

  const record = {
    type: isVideo ? "video" : "text",
    name: body.name,
    email: body.email,
    ...(body.testimonial ? { testimonial: body.testimonial } : {}),
    ...(body.rating ? { rating: body.rating } : {}),
    ...(body.fileName ? { fileName: body.fileName } : {}),
    ...(body.fileType ? { fileType: body.fileType } : {}),
    ...(body.fileSize ? { fileSize: body.fileSize } : {}),
    consentText: body.consentText,
    termsVersion: body.termsVersion ?? "October 12, 2026",
    consentedAt: body.consentedAt ?? new Date().toISOString(),
  };

  try {
    await upstashLpush(redisKey, JSON.stringify(record));
  } catch {
    // non-blocking — don't fail the user
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
