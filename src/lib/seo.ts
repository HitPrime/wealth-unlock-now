// Per-page SEO tags for simple routes. Child route tags override the homepage defaults
// set in __root.tsx, so each page gets its own title, description and canonical URL.
const SITE = "https://www.cassiuscuvee.com";

export function pageHead({
  path,
  title,
  description,
  noindex = false,
}: {
  path: string;
  title: string;
  description: string;
  /** For pages that should never show in search results (thank-you, admin, placeholders). */
  noindex?: boolean;
}) {
  const url = `${SITE}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
