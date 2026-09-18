export const config = { runtime: "edge" };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function getHash(key: string): Promise<Record<string, number>> {
  try {
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
  } catch {
    return {};
  }
}

export default async function handler() {
  const [
    breakoutClicks, kleinClicks, kastClicks,
    breakoutViews, kleinViews, kastViews,
    breakoutCountries, kleinCountries, kastCountries,
  ] = await Promise.all([
    getHash("clicks:breakout"),
    getHash("clicks:klein"),
    getHash("clicks:kast"),
    getHash("views:breakout"),
    getHash("views:klein"),
    getHash("views:kast"),
    getHash("countries:breakout"),
    getHash("countries:klein"),
    getHash("countries:kast"),
  ]);

  return new Response(
    JSON.stringify({
      clicks: { breakout: breakoutClicks, klein: kleinClicks, kast: kastClicks },
      views: { breakout: breakoutViews, klein: kleinViews, kast: kastViews },
      countries: { breakout: breakoutCountries, klein: kleinCountries, kast: kastCountries },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
