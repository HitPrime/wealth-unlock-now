import { createServerFileRoute } from "@tanstack/react-start/server";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

const DESTINATIONS: Record<string, string> = {
  breakout: "https://www.breakoutprop.com/join/ggrf7w",
  klein: "https://kleinfunding.com/ref/13054",
};

async function redisIncr(link: string) {
  const today = new Date().toISOString().split("T")[0];
  await Promise.all([
    fetch(`${UPSTASH_URL}/hincrby/clicks:${link}/total/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
    fetch(`${UPSTASH_URL}/hincrby/clicks:${link}/${today}/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
  ]);
}

export const ServerRoute = createServerFileRoute("/api/track").methods({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const link = url.searchParams.get("link") ?? "";
    const dest = DESTINATIONS[link];

    if (!dest) {
      return new Response("Not found", { status: 404 });
    }

    // track in background — don't block redirect
    redisIncr(link).catch(() => {});

    return new Response(null, {
      status: 302,
      headers: { Location: dest },
    });
  },
});
