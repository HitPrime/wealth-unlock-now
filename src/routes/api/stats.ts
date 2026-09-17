import { createServerFileRoute } from "@tanstack/react-start/server";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function getStats(link: string) {
  const res = await fetch(`${UPSTASH_URL}/hgetall/clicks:${link}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  const data = await res.json();
  const entries: Record<string, number> = {};
  if (Array.isArray(data.result)) {
    for (let i = 0; i < data.result.length; i += 2) {
      entries[data.result[i]] = parseInt(data.result[i + 1], 10);
    }
  }
  return entries;
}

export const ServerRoute = createServerFileRoute("/api/stats").methods({
  GET: async () => {
    const [breakout, klein] = await Promise.all([
      getStats("breakout"),
      getStats("klein"),
    ]);

    return new Response(JSON.stringify({ breakout, klein }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  },
});
