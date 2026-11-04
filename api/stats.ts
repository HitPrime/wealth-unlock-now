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
    reviewsClicks, reviewsViews, reviewsCountries,
    reviewsVideoPlays, reviewsCodeCopies, reviewsPlaysByVideo,
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
    // Organic /breakout-prop-reviews page (counter key "breakout-reviews")
    getHash("clicks:breakout-reviews"),
    getHash("views:breakout-reviews"),
    getHash("countries:breakout-reviews"),
    // On-page events from api/event.ts
    getHash("events:breakout-reviews:video_play"),
    getHash("events:breakout-reviews:code_copy"),
    getHash("videoplays:breakout-reviews"),
  ]);

  return new Response(
    JSON.stringify({
      clicks: { breakout: breakoutClicks, klein: kleinClicks, kast: kastClicks, breakoutReviews: reviewsClicks },
      views: { breakout: breakoutViews, klein: kleinViews, kast: kastViews, breakoutReviews: reviewsViews },
      countries: { breakout: breakoutCountries, klein: kleinCountries, kast: kastCountries, breakoutReviews: reviewsCountries },
      events: {
        breakoutReviews: {
          videoPlays: reviewsVideoPlays,
          codeCopies: reviewsCodeCopies,
          playsByVideo: reviewsPlaysByVideo,
        },
      },
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
