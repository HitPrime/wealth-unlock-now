export const config = { runtime: "edge" };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

const DESTINATIONS: Record<string, string> = {
  breakout: "https://www.breakoutprop.com/join/ggrf7w",
  klein: "https://kleinfunding.com/ref/13054",
  kast: "https://app.kast.xyz/referral/CASSIUS",
};

// Pacific Time — automatically handles PDT (UTC-7, summer) and PST (UTC-8, winter)
function getPacificDate(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
}

async function redisIncr(link: string) {
  const today = getPacificDate();
  await Promise.all([
    fetch(`${UPSTASH_URL}/hincrby/clicks:${link}/total/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
    fetch(`${UPSTASH_URL}/hincrby/clicks:${link}/${today}/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
  ]);
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const link = url.searchParams.get("link") ?? "";
  const dest = DESTINATIONS[link];

  if (!dest) {
    return new Response("Not found", { status: 404 });
  }

  // await before responding — guarantees Redis write completes on Vercel Edge
  await redisIncr(link).catch(() => {});

  return new Response(null, {
    status: 302,
    headers: { Location: dest },
  });
}
