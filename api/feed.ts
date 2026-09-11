export default async function handler(req: Request, res: Response) {
  try {
    const response = await fetch("https://cassiuscuvee.substack.com/feed", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CassiusCuvee/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Feed fetch failed" }), { status: 502 });
    }

    const xml = await response.text();

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
  }
}

export const config = { runtime: "edge" };
