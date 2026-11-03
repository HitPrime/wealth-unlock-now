import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Clock, Copy, ExternalLink } from "lucide-react";
import logo from "@/assets/CassiusLogo.webp";
import { YouTubeFacade } from "@/components/reviews/YouTubeFacade";
import {
  BREAKOUT_AFFILIATE,
  BREAKOUT_PLAYLIST,
  BREAKOUT_REVIEWS_COPY,
  BREAKOUT_REVIEWS_SEO,
  BREAKOUT_REVIEWS_TRACK_KEY,
  BREAKOUT_REVIEWS_URL,
  BREAKOUT_REVIEW_VIDEOS,
  formatDuration,
  isVideoComplete,
  youtubeEmbed,
  youtubeThumb,
  youtubeWatch,
} from "@/content/breakoutReviews";

// Organic-only SEO page. Intentionally not linked from the nav, footer, homepage or any
// ad landing page; it is reached by direct URL and /sitemap.xml.

const SEO = BREAKOUT_REVIEWS_SEO;

function videoJsonLd() {
  const videos = BREAKOUT_REVIEW_VIDEOS.filter(isVideoComplete);
  if (videos.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@graph": videos.map((v) => ({
      "@type": "VideoObject",
      name: v.title,
      description: v.summary,
      thumbnailUrl: [youtubeThumb(v.youtubeId)],
      uploadDate: v.uploadDate,
      duration: v.duration,
      embedUrl: youtubeEmbed(v.youtubeId),
      contentUrl: youtubeWatch(v.youtubeId),
    })),
  };
}

export const Route = createFileRoute("/breakout-prop-reviews")({
  component: BreakoutReviewsPage,
  head: () => {
    const ld = videoJsonLd();
    return {
      meta: [
        { title: SEO.title },
        { name: "description", content: SEO.description },
        { name: "robots", content: "index, follow, max-image-preview:large, max-video-preview:-1" },
        { property: "og:title", content: SEO.title },
        { property: "og:description", content: SEO.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: BREAKOUT_REVIEWS_URL },
        { property: "og:site_name", content: "Cassius Cuvée" },
        { property: "og:image", content: SEO.ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: SEO.ogImageAlt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SEO.title },
        { name: "twitter:description", content: SEO.description },
        { name: "twitter:image", content: SEO.ogImage },
      ],
      links: [
        { rel: "canonical", href: BREAKOUT_REVIEWS_URL },
        // Thumbnails come from YouTube's image CDN; open the connection early.
        { rel: "preconnect", href: "https://i.ytimg.com" },
      ],
      // "<" is escaped so a title can never close the script tag early.
      scripts: ld
        ? [{ type: "application/ld+json", children: JSON.stringify(ld).replace(/</g, "\\u003c") }]
        : [],
    };
  },
});

function BreakoutReviewsPage() {
  const [copied, setCopied] = useState(false);

  // Page visit: existing Upstash counter, once per day per browser (same as /breakout).
  // Affiliate clicks are counted by /api/track when the CTA link is followed.
  useEffect(() => {
    const key = "visited_breakout_reviews";
    const today = new Date().toISOString().split("T")[0];
    try {
      if (localStorage.getItem(key) === today) return;
      localStorage.setItem(key, today);
    } catch {
      // storage blocked: still count the visit
    }
    fetch(`/api/pageview?page=${BREAKOUT_REVIEWS_TRACK_KEY}`).catch(() => {});
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(BREAKOUT_AFFILIATE.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable: the code is still visible on screen
    }
  };

  const affiliateBox = (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-[color:var(--color-gold)]/30 bg-white/[0.03] p-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-gold)]">
          Referral code
        </p>
        <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
          <span className="font-display text-3xl font-bold tracking-wider text-white">
            {BREAKOUT_AFFILIATE.code}
          </span>
          <button
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-white/30 hover:text-white"
            aria-label={`Copy referral code ${BREAKOUT_AFFILIATE.code}`}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <a
        href={BREAKOUT_AFFILIATE.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]"
      >
        {BREAKOUT_AFFILIATE.ctaLabel}
        <span className="sr-only"> (opens in a new tab)</span>
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07070c] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] max-w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_-10%,rgba(139,92,246,0.28)_0%,rgba(88,28,135,0.13)_35%,rgba(7,7,12,0)_70%)]"
      />

      <header className="relative z-10 border-b border-purple-900/20 bg-[#0b0a14] px-4 py-2.5 sm:px-10">
        <a href="/" aria-label="Cassius Cuvée home" className="inline-block">
          <img
            src={logo}
            alt="Cassius Cuvée logo"
            width={304}
            height={144}
            className="h-9 w-auto object-contain"
          />
        </a>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        {/* Introduction */}
        <section aria-labelledby="page-title" className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold)]">
            Video reviews by Cassius Cuvée
          </p>
          <h1
            id="page-title"
            className="mt-3 font-display text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl md:text-6xl"
          >
            {SEO.h1}
          </h1>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {BREAKOUT_REVIEWS_COPY.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Affiliate disclosure (directly below the introduction) */}
        <aside
          aria-label="Affiliate disclosure"
          className="mx-auto mt-6 max-w-3xl rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-xs leading-relaxed text-slate-400 sm:text-sm"
        >
          <strong className="font-semibold text-slate-300">Affiliate disclosure: </strong>
          {BREAKOUT_REVIEWS_COPY.disclosure}
        </aside>

        <div className="mx-auto mt-8 max-w-3xl">{affiliateBox}</div>

        {/* Videos */}
        <section aria-labelledby="videos-title" className="mt-14">
          <h2
            id="videos-title"
            className="text-center font-display text-3xl font-bold uppercase text-white sm:text-4xl"
          >
            Breakout review videos
          </h2>
          <ul className="mt-8 grid gap-10 md:grid-cols-2 md:gap-8">
            {BREAKOUT_REVIEW_VIDEOS.map((v, i) => {
              const length = formatDuration(v.duration);
              return (
                <li key={v.youtubeId || `placeholder-${i}`}>
                  <article className="flex h-full flex-col">
                    <YouTubeFacade id={v.youtubeId} title={v.title} priority={i < 2} />
                    <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                      {v.title}
                    </h3>
                    {length && (
                      <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-purple-200">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          <span className="sr-only">Video length: </span>
                          {length}
                        </span>
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.summary}</p>
                  </article>
                </li>
              );
            })}
          </ul>
          <p className="mt-12 text-center">
            <a
              href={BREAKOUT_PLAYLIST.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 sm:rounded-full text-sm font-medium text-slate-200 transition hover:border-[color:var(--color-gold)]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]"
            >
              {BREAKOUT_PLAYLIST.label}
              <span className="sr-only"> (opens in a new tab)</span>
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </p>
        </section>

        <section aria-labelledby="code-title" className="mx-auto mt-16 max-w-3xl">
          <h2
            id="code-title"
            className="mb-4 text-center font-display text-2xl font-bold uppercase text-white sm:text-3xl"
          >
            Use code {BREAKOUT_AFFILIATE.code}
          </h2>
          {affiliateBox}
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-4 py-6 text-center text-xs text-slate-400">
        <p>Educational content only. Not financial advice.</p>
        <p className="mt-2">
          © {new Date().getFullYear()} Cassius Cuvée ·{" "}
          <a href="/privacy" className="hover:text-slate-300">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/terms" className="hover:text-slate-300">
            Terms and Conditions
          </a>
        </p>
      </footer>
    </div>
  );
}
