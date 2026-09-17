export const config = { runtime: "edge" };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redisIncr(page: string) {
  const today = new Date().toISOString().split("T")[0];
  await Promise.all([
    fetch(`${UPSTASH_URL}/hincrby/views:${page}/total/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
    fetch(`${UPSTASH_URL}/hincrby/views:${page}/${today}/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
  ]);
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ?? "";

  const allowed = ["breakout", "klein", "kast"];
  if (!allowed.includes(page)) {
    return new Response("Bad request", { status: 400 });
  }

  redisIncr(page).catch(() => {});

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
