import { createServerFileRoute } from "@tanstack/react-start/server";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function getHash(key: string) {
  const res = await fetch(`${UPSTASH_URL}/hgetall/${key}`, {
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
    const [
      breakoutClicks, kleinClicks,
      breakoutViews, kleinViews, kastViews,
    ] = await Promise.all([
      getHash("clicks:breakout"),
      getHash("clicks:klein"),
      getHash("views:breakout"),
      getHash("views:klein"),
      getHash("views:kast"),
    ]);

    return new Response(
      JSON.stringify({
        clicks: { breakout: breakoutClicks, klein: kleinClicks },
        views: { breakout: breakoutViews, klein: kleinViews, kast: kastViews },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  },
});
