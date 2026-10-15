export const config = { runtime: "edge" };

const SUPABASE_URL = "https://vzzmcsjimncrssmkyimgz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6em1jc2ppbW5jcnNta3lpbWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTM2MTAsImV4cCI6MjEwNzQ2OTYxMH0.0KzTZjeNKfinEMTxBpBKInjlyQJICCu9YMNdN99DL6o";
const BUCKET = "testimonial-videos";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export default async function handler(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return json({ error: "No file provided" }, 400);
    }

    // Validate video type
    if (!file.type.startsWith("video/")) {
      return json({ error: "Only video files allowed" }, 400);
    }

    // Validate size (50MB)
    const MAX = 50 * 1024 * 1024;
    if (file.size > MAX) {
      return json({ error: "File too large. Max 50MB." }, 400);
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${timestamp}_${safeName}`;

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();

    const uploadRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
      {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": file.type,
          "Content-Length": String(file.size),
          "x-upsert": "true",
        },
        body: fileBuffer,
      }
    );

    const uploadText = await uploadRes.text();

    if (!uploadRes.ok) {
      return json({ error: `Supabase upload failed: ${uploadText}` }, 500);
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
    return json({ ok: true, url });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return json({ error: `Server error: ${msg}` }, 500);
  }
}
