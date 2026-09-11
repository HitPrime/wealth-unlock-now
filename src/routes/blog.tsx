import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Footer } from "@/components/landing/Footer";
import cassiusLogo from "@/assets/cassius-cuvee-logo.png";
import cassiusNavLogo from "@/assets/CassiusLogo.png";
import cassiusHero from "@/assets/cassius-hero-blog.png";
import { NAV_LINKS } from "@/content/landing";
import { StarterKitDialog } from "@/components/landing/StarterKitDialog";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  image: string | null;
}

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog | Cassius Cuvée" },
      {
        name: "description",
        content:
          "Blog posts and trade breakdowns by Cassius Cuvée. Published on Substack.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Blog | Cassius Cuvée" },
      { property: "og:description", content: "Blog posts and trade breakdowns by Cassius Cuvée." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cassiuscuvee.com/blog" },
      { property: "og:site_name", content: "Cassius Cuvée" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: "https://cassiuscuvee.com/blog" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FEED_URL = "https://cassiuscuvee.substack.com/feed";
const IS_DEV = import.meta.env.DEV;
const CORS_PROXIES = [
  ...(IS_DEV ? ["/feed-proxy"] : []),
  "/api/feed", // Vercel serverless function — most reliable
  `https://api.allorigins.win/get?url=${encodeURIComponent(FEED_URL)}`,
  `https://api.allorigins.win/raw?url=${encodeURIComponent(FEED_URL)}`,
  `https://corsproxy.io/?${encodeURIComponent(FEED_URL)}`,
];

const CACHE_KEY = "blog_posts_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCached(): BlogPost[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { posts, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return posts;
  } catch {
    return null;
  }
}

function setCache(posts: BlogPost[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, ts: Date.now() }));
  } catch {
    // storage full or unavailable — ignore
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#\d+;/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function truncate(text: string, max = 200): string {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf(" ", max);
  return text.slice(0, cut > 0 ? cut : max) + "…";
}

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return raw;
  }
}

async function fetchPosts(): Promise<BlogPost[]> {
  let xml = "";
  let lastError: unknown;

  for (const proxy of CORS_PROXIES) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(proxy, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const text = await res.text();
        // allorigins /get returns JSON wrapper: { contents: "xml..." }
        let candidate = text;
        if (text.trimStart().startsWith("{")) {
          try {
            const json = JSON.parse(text);
            candidate = json.contents ?? text;
          } catch {
            candidate = text;
          }
        }
        if (candidate.includes("<item>")) {
          xml = candidate;
          break;
        }
      }
    } catch (e) {
      lastError = e;
    }
  }

  if (!xml || !xml.includes("<item>")) {
    throw lastError ?? new Error("All proxies failed");
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = Array.from(doc.querySelectorAll("item"));

  return items.map((item) => {
    // guid is the most reliable link in Substack RSS
    const guid = item.querySelector("guid")?.textContent?.trim();
    const linkNode = Array.from(item.childNodes).find(
      (n) => n.nodeName.toLowerCase() === "link"
    );
    const link =
      guid ||
      linkNode?.textContent?.trim() ||
      "https://cassiuscuvee.substack.com";

    return {
      title: item.querySelector("title")?.textContent?.trim() ?? "Untitled",
      link,
      pubDate: item.querySelector("pubDate")?.textContent?.trim() ?? "",
      excerpt: truncate(
        stripHtml(item.querySelector("description")?.textContent?.trim() ?? "")
      ),
      image: item.querySelector("enclosure")?.getAttribute("url") ?? null,
    };
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    // show cached posts instantly if available
    const cached = getCached();
    if (cached) {
      setPosts(cached);
      setStatus("ok");
      // still refresh in background silently
      fetchPosts().then((fresh) => {
        if (!cancelled) { setPosts(fresh); setCache(fresh); }
      }).catch(() => {/* keep showing cached */});
      return () => { cancelled = true; };
    }

    const attempt = async () => {
      try {
        const data = await fetchPosts();
        if (!cancelled) { setPosts(data); setStatus("ok"); setCache(data); }
      } catch {
        if (!cancelled) {
          if (retryCount < 3) {
            setTimeout(() => {
              if (!cancelled) setRetryCount((c) => c + 1);
            }, 800);
          } else {
            setStatus("error");
          }
        }
      }
    };

    attempt();
    return () => { cancelled = true; };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    setStatus("loading");
    setPosts([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Blog Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[oklch(0.10_0.04_300/0.6)] border-b border-[oklch(0.30_0.10_290/0.4)]">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="/">
            <img src={cassiusNavLogo} alt="Cassius Cuvée" className="h-9 w-auto" style={{ mixBlendMode: "lighten" }} />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[color:var(--color-muted-foreground)]">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <StarterKitDialog
            trigger={
              <button className="inline-flex items-center rounded-full bg-purple-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
                Get the Free Kit
              </button>
            }
          />
        </div>
      </header>

      {/* ── Page header ── */}
      <div className="pt-24 md:pt-28 pb-10 border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <img src={cassiusLogo} alt="Cassius Cuvée" className="h-8 md:h-10 w-auto mb-3 md:mb-4" />
          <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
            Blog
          </h1>
          <p className="mt-2 md:mt-3 text-[color:var(--color-muted-foreground)] text-sm md:text-base leading-relaxed">
            Blog posts and trade breakdowns. Full posts on{" "}
            <a
              href="https://cassiuscuvee.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-purple-400)] hover:text-foreground transition-colors"
            >
              Substack
            </a>
            .
          </p>
        </div>
      </div>

      {/* ── Post list ── */}
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">

        {/* Loading */}
        {status === "loading" && (
          <div className="flex items-center gap-3 py-16 text-[color:var(--color-muted-foreground)]">
            <div className="h-4 w-4 rounded-full border-2 border-[color:var(--color-purple-400)] border-t-transparent animate-spin shrink-0" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase">
              {retryCount > 0 ? `Retrying… (${retryCount}/3)` : "Loading posts…"}
            </span>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="py-16 flex flex-col gap-4">
            <p className="text-[color:var(--color-muted-foreground)]">
              Couldn't load the feed right now.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 rounded-full bg-purple-gradient px-5 py-2 text-sm font-medium text-white hover:brightness-110 transition"
              >
                Try again →
              </button>
              <a
                href="https://cassiuscuvee.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-purple-400)] hover:text-foreground transition-colors text-sm"
              >
                Read on Substack →
              </a>
            </div>
          </div>
        )}

        {/* Empty */}
        {status === "ok" && posts.length === 0 && (
          <div className="py-16">
            <p className="text-[color:var(--color-muted-foreground)]">
              No posts found.{" "}
              <a
                href="https://cassiuscuvee.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-purple-400)] hover:text-foreground transition-colors"
              >
                Visit Substack →
              </a>
            </p>
          </div>
        )}

        {/* Posts */}
        {status === "ok" && posts.length > 0 && (() => {
          const [featured, ...rest] = posts;
          return (
            <div className="flex flex-col gap-12">

              {/* ── Featured post (latest) ── */}
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid md:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden p-0 transition-all duration-300"
                style={{
                  background: "#230540",
                  border: "1px solid rgba(139,92,246,0.35)",
                  boxShadow: "0 0 0 1px rgba(139,92,246,0.1), 0 8px 32px rgba(88,28,135,0.3)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(139,92,246,0.5), 0 8px 40px rgba(88,28,135,0.55)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.7)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(139,92,246,0.1), 0 8px 32px rgba(88,28,135,0.3)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.35)";
                }}
              >
                {/* Left — image */}
                <div className="w-full overflow-hidden" style={{ aspectRatio: "4/3", background: "#1a0330" }}>
                  <img
                    src={cassiusHero}
                    alt="Cassius Cuvée"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Right — content */}
                <div className="flex flex-col gap-3 md:gap-4 p-5 md:p-8">
                  <div className="flex items-center gap-2">
                    <time className="font-mono uppercase" style={{ fontSize: "12px", letterSpacing: "0.12em", color: "rgba(203,213,225,0.5)" }}>
                      {formatDate(featured.pubDate)}
                    </time>
                    <span style={{ color: "rgba(167,139,250,0.6)", fontSize: "10px" }}>●</span>
                    <span className="font-mono uppercase" style={{ fontSize: "12px", letterSpacing: "0.12em", color: "rgba(167,139,250,0.8)" }}>Blog</span>
                  </div>

                  <h2
                    className="font-sans font-bold leading-tight tracking-tight"
                    style={{ fontSize: "clamp(1.2rem, 4vw, 2.2rem)", color: "#ffffff", lineHeight: 1.2 }}
                  >
                    {featured.title}
                  </h2>

                  <p style={{ color: "rgba(203,213,225,0.7)", fontSize: "15px", lineHeight: 1.7 }}>
                    {featured.excerpt}
                  </p>

                  <span
                    className="inline-flex items-center gap-2 self-start rounded-full font-medium transition-all duration-200 group-hover:brightness-110"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.60 0.24 290), oklch(0.42 0.24 290))",
                      color: "#fff",
                      fontSize: "13px",
                      padding: "10px 22px",
                      marginTop: "4px",
                    }}
                  >
                    Continue Reading →
                  </span>
                </div>
              </a>

              {/* ── Rest of posts — 3 column grid ── */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <a
                      key={post.link}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "#230540",
                        border: "1px solid rgba(139,92,246,0.35)",
                        boxShadow: "0 0 0 1px rgba(139,92,246,0.1), 0 8px 32px rgba(88,28,135,0.3)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(139,92,246,0.5), 0 8px 40px rgba(88,28,135,0.55)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.7)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(139,92,246,0.1), 0 8px 32px rgba(88,28,135,0.3)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.35)";
                      }}
                    >
                      {/* Image */}
                      <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9", background: "#1a0330" }}>
                        <img
                          src={cassiusHero}
                          alt="Cassius Cuvée"
                          className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-2 p-4 md:p-5">
                        <h2
                          className="font-sans font-bold leading-snug tracking-tight group-hover:text-purple-300 transition-colors"
                          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "#ffffff" }}
                        >
                          {post.title}
                        </h2>

                        <div className="flex items-center gap-2">
                          <time className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(203,213,225,0.45)" }}>
                            {formatDate(post.pubDate)}
                          </time>
                          <span style={{ color: "rgba(167,139,250,0.5)", fontSize: "8px" }}>●</span>
                          <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(167,139,250,0.7)" }}>Blog</span>
                        </div>

                        <span
                          className="md:hidden inline-flex items-center gap-2 self-start rounded-full font-medium mt-2 transition-all duration-200 group-hover:brightness-110"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.60 0.24 290), oklch(0.42 0.24 290))",
                            color: "#fff",
                            fontSize: "12px",
                            padding: "8px 16px",
                          }}
                        >
                          Continue Reading →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* Subscribe nudge */}
        {status === "ok" && posts.length > 0 && (
          <div className="mt-12 pt-10 border-t border-[color:var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-[color:var(--color-muted-foreground)]">
              Get new posts in your inbox.
            </p>
            <a
              href="https://cassiuscuvee.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-purple-400)] px-5 py-2 text-sm font-medium text-[color:var(--color-purple-400)] hover:bg-[color:var(--color-purple-400)] hover:text-white transition-all duration-200"
            >
              Subscribe on Substack →
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
