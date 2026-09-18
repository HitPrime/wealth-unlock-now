export const config = { runtime: "edge" };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

const COUNTRY_NAMES: Record<string, string> = {
  US: "🇺🇸 USA", GB: "🇬🇧 UK", PK: "🇵🇰 Pakistan", CA: "🇨🇦 Canada",
  AU: "🇦🇺 Australia", AE: "🇦🇪 UAE", IN: "🇮🇳 India", DE: "🇩🇪 Germany",
  FR: "🇫🇷 France", NL: "🇳🇱 Netherlands", SG: "🇸🇬 Singapore",
  NG: "🇳🇬 Nigeria", ZA: "🇿🇦 South Africa", BR: "🇧🇷 Brazil",
  MX: "🇲🇽 Mexico", JP: "🇯🇵 Japan", KR: "🇰🇷 South Korea",
  SA: "🇸🇦 Saudi Arabia", QA: "🇶🇦 Qatar", TR: "🇹🇷 Turkey",
};

async function redisIncrView(page: string, country: string) {
  const today = new Date().toISOString().split("T")[0];
  await Promise.all([
    fetch(`${UPSTASH_URL}/hincrby/views:${page}/total/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
    fetch(`${UPSTASH_URL}/hincrby/views:${page}/${today}/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
    // store country count
    fetch(`${UPSTASH_URL}/hincrby/countries:${page}/${country}/1`, {
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

  // Vercel provides country code in this header
  const countryCode = (req.headers.get("x-vercel-ip-country") ?? "XX").toUpperCase();
  const countryLabel = COUNTRY_NAMES[countryCode] ?? `🌍 ${countryCode}`;

  redisIncrView(page, countryLabel).catch(() => {});

  return new Response(JSON.stringify({ ok: true, country: countryLabel }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
