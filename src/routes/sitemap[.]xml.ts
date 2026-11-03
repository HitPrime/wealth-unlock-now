import { createFileRoute } from "@tanstack/react-router";
import { BREAKOUT_REVIEWS_SLUG, SITE_URL } from "@/content/breakoutReviews";

// Main XML sitemap. Only pages meant for organic search go here; ad landing pages
// are left out on purpose.
const PAGES = ["/", "/blog", BREAKOUT_REVIEWS_SLUG];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = PAGES.map(
          (p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc></url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
          },
        });
      },
    },
  },
});
