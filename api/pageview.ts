export const config = { runtime: "edge" };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

// PDT = UTC-7 — day resets at 12 AM PDT (= 07:00 UTC)
function getPDTDate(): string {
  const now = new Date();
  const pdt = new Date(now.getTime() - 7 * 60 * 60 * 1000);
  return pdt.toISOString().split("T")[0];
}
  US: "USA", GB: "UK", PK: "Pakistan", CA: "Canada",
  AU: "Australia", AE: "UAE", IN: "India", DE: "Germany",
  FR: "France", NL: "Netherlands", SG: "Singapore",
  NG: "Nigeria", ZA: "South Africa", BR: "Brazil",
  MX: "Mexico", JP: "Japan", KR: "South Korea",
  SA: "Saudi Arabia", QA: "Qatar", TR: "Turkey",
  IT: "Italy", ES: "Spain", PT: "Portugal", SE: "Sweden",
  NO: "Norway", DK: "Denmark", FI: "Finland", CH: "Switzerland",
  PL: "Poland", RU: "Russia", CN: "China", HK: "Hong Kong",
  MY: "Malaysia", ID: "Indonesia", TH: "Thailand", PH: "Philippines",
};

async function redisIncrView(page: string, countryKey: string) {
  const today = getPDTDate();
  // encodeURIComponent ensures emoji/spaces don't break the URL path
  const encodedCountry = encodeURIComponent(countryKey);
  await Promise.all([
    fetch(`${UPSTASH_URL}/hincrby/views:${page}/total/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
    fetch(`${UPSTASH_URL}/hincrby/views:${page}/${today}/1`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    }),
    fetch(`${UPSTASH_URL}/hincrby/countries:${page}/${encodedCountry}/1`, {
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

  const countryCode = (req.headers.get("x-vercel-ip-country") ?? "XX").toUpperCase();
  const countryName = COUNTRY_NAMES[countryCode] ?? countryCode;
  // Store as "US|USA" so we can decode both code (for flag) and name
  const countryKey = `${countryCode}|${countryName}`;

  redisIncrView(page, countryKey).catch(() => {});

  return new Response(JSON.stringify({ ok: true, country: countryName }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
