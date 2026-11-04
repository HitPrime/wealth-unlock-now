export const config = { runtime: "edge" };

// Small on-page event counter (video plays, discount-code copies) for the organic
// Breakout reviews page. Same Upstash store and Pacific-date keys as api/track.ts.
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

// Only these pages and event names are counted, so random requests can't create keys.
const PAGES = new Set(["breakout-reviews"]);
const EVENTS = new Set(["video_play", "code_copy"]);
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

function getPacificDate(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
}

const incr = (key: string, field: string) =>
  fetch(`${UPSTASH_URL}/hincrby/${key}/${encodeURIComponent(field)}/1`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ?? "";
  const name = url.searchParams.get("name") ?? "";
  const video = url.searchParams.get("video") ?? "";

  if (!PAGES.has(page) || !EVENTS.has(name)) {
    return new Response("Not found", { status: 404 });
  }

  const key = `events:${page}:${name}`;
  const writes = [incr(key, "total"), incr(key, getPacificDate())];
  // Per-video play counts, so /admin can show which videos get watched.
  if (name === "video_play" && YOUTUBE_ID.test(video)) {
    writes.push(incr(`videoplays:${page}`, video));
  }

  // await before responding: guarantees the Redis write completes on Vercel Edge
  await Promise.all(writes).catch(() => {});

  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
