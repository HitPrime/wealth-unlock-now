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
  const url = new URL(req.url);
  const link = url.searchParams.get("link") ?? "unknown";

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Increment total clicks
  await redisCommand("HINCRBY", `clicks:${link}`, "total", "1");
  // Increment daily clicks
  await redisCommand("HINCRBY", `clicks:${link}`, today, "1");

  // Redirect to actual link
  const destinations: Record<string, string> = {
    breakout: "https://www.breakoutprop.com/join/ggrf7w",
    klein: "https://kleinfunding.com/ref/13054",
  };

  const dest = destinations[link] ?? "/";

  return new Response(null, {
    status: 302,
    headers: { Location: dest },
  });
}
