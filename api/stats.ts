export const config = { runtime: "edge" };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redisCommand(...args: string[]) {
  const res = await fetch(`${UPSTASH_URL}/${args.join("/")}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  return res.json();
}

export default async function handler(req: Request) {
  const links = ["breakout", "klein"];
  const stats: Record<string, Record<string, number>> = {};

  for (const link of links) {
    const data = await redisCommand("HGETALL", `clicks:${link}`);
    const entries: Record<string, number> = {};
    if (Array.isArray(data.result)) {
      for (let i = 0; i < data.result.length; i += 2) {
        entries[data.result[i]] = parseInt(data.result[i + 1], 10);
      }
    }
    stats[link] = entries;
  }

  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
