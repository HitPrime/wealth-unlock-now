export const config = { runtime: "edge" };

// Small on-page event counter, shown in /admin. Same Upstash store and Pacific-date keys
// as api/track.ts. Counts only: no names, emails or form answers are ever sent here.
//   breakout-reviews: video plays, discount-code copies (organic reviews page)
//   home:             Starter Kit button clicks, form started, sound on, video finished, scroll depth
//   unlock:           /unlock form Step 1 / Step 2 done, and which questions got answered
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

// Only these pages, event names and labels are counted, so random requests can't create keys.
// A Map, not an object: a request like ?page=constructor must not find Object's own
// properties.
const EVENTS = new Map<string, Set<string>>([
  ["breakout-reviews", new Set(["video_play", "code_copy"])],
  ["home", new Set(["cta_click", "form_start", "sound_on", "video_complete", "scroll"])],
  ["unlock", new Set(["step1_done", "step2_done", "answered"])],
]);
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
// Starter Kit button placements on the homepage (StarterKitDialog `where` prop).
const CTA_PLACES = new Set([
  "hero",
  "nav",
  "pain",
  "pillars",
  "meet",
  "testimonials",
  "accolades",
  "faq",
  "final",
  "other",
]);
const SCROLL_DEPTHS = new Set(["25", "50", "75", "100"]);
// /unlock trader-profile question ids (src/content/leadMagnet.ts).
const QUESTIONS = new Set(["experience", "goal", "age", "markets", "setup", "hours", "timeline"]);

function getPacificDate(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
}

const incr = (key: string, field: string) =>
  fetch(`${UPSTASH_URL}/hincrby/${key}/${encodeURIComponent(field)}/1`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });

const notFound = () => new Response("Not found", { status: 404 });

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ?? "";
  const name = url.searchParams.get("name") ?? "";

  if (!EVENTS.get(page)?.has(name)) return notFound();

  const writes: Promise<Response>[] = [];

  if (page === "home" && name === "scroll") {
    // One hash per depth: scroll:home -> { "25": n, "50": n, ... }
    const depth = url.searchParams.get("depth") ?? "";
    if (!SCROLL_DEPTHS.has(depth)) return notFound();
    writes.push(incr("scroll:home", depth));
  } else if (page === "unlock" && name === "answered") {
    // Which question, never the answer: answered:unlock -> { "experience": n, ... }
    const q = url.searchParams.get("q") ?? "";
    if (!QUESTIONS.has(q)) return notFound();
    writes.push(incr("answered:unlock", q));
  } else {
    const key = `events:${page}:${name}`;
    writes.push(incr(key, "total"), incr(key, getPacificDate()));

    // Per-video play counts, so /admin can show which videos get watched.
    const video = url.searchParams.get("video") ?? "";
    if (page === "breakout-reviews" && name === "video_play" && YOUTUBE_ID.test(video)) {
      writes.push(incr(`videoplays:${page}`, video));
    }
    // Which Starter Kit button was clicked.
    const where = url.searchParams.get("where") ?? "";
    if (page === "home" && name === "cta_click" && CTA_PLACES.has(where)) {
      writes.push(incr("ctaclicks:home", where));
    }
  }

  // await before responding: guarantees the Redis write completes on Vercel Edge
  await Promise.all(writes).catch(() => {});

  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
