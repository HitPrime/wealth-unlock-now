import { createFileRoute } from "@tanstack/react-router";
import {
  BREAKOUT_REVIEWS_URL,
  BREAKOUT_REVIEW_VIDEOS,
  isVideoComplete,
  isoDurationToSeconds,
  youtubeEmbed,
  youtubeThumb,
} from "@/content/breakoutReviews";

// Video sitemap built from the same video list the page renders.
// Only fully filled-in videos are listed.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/video-sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const videos = BREAKOUT_REVIEW_VIDEOS.filter(isVideoComplete)
          .map((v) => {
            const secs = isoDurationToSeconds(v.duration);
            return `    <video:video>
      <video:thumbnail_loc>${youtubeThumb(v.youtubeId)}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(v.summary)}</video:description>
      <video:player_loc>${youtubeEmbed(v.youtubeId)}</video:player_loc>${secs ? `\n      <video:duration>${secs}</video:duration>` : ""}
      <video:publication_date>${v.uploadDate}</video:publication_date>
    </video:video>`;
          })
          .join("\n");
        const body = videos
          ? `  <url>\n    <loc>${BREAKOUT_REVIEWS_URL}</loc>\n${videos}\n  </url>\n`
          : "";
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${body}</urlset>
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
