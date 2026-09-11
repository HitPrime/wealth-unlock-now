import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch("https://cassiuscuvee.substack.com/feed", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CassiusCuvee/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Feed fetch failed" });
    }

    const xml = await response.text();

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).send(xml);
  } catch (err) {
    return res.status(500).json({ error: "Internal error" });
  }
}
