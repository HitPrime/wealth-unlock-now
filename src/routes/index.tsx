import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { resetOnce, trackOnce, trackPageView } from "@/lib/track";
import { Hero } from "@/components/landing/Hero";
import { PressBar } from "@/components/landing/PressBar";
import { PainPoints } from "@/components/landing/PainPoints";
import { Pillars } from "@/components/landing/Pillars";
import { MeetCassius } from "@/components/landing/MeetCassius";
import { Testimonials } from "@/components/landing/Testimonials";
import { Accolades } from "@/components/landing/Accolades";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { CASSIUS_SAME_AS, CASSIUS_SCHEMA_IMAGE } from "@/content/landing";

const SITE = "https://www.cassiuscuvee.com";

// Structured data for search and AI engines: who Cassius is and what this site is.
// Not visible on the page. Wording comes from the "Meet Cassius" section; photo picked by Cassius.
// sameAs lists only his official profiles (sent by Cassius).
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#cassius`,
      name: "Cassius Cuvée",
      url: `${SITE}/`,
      jobTitle: "Trading educator",
      description:
        "Cassius Cuvée is a trading educator, YouTuber, and musical artist who explains trading in plain English for beginners.",
      image: CASSIUS_SCHEMA_IMAGE,
      sameAs: CASSIUS_SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Cassius Cuvée",
      url: `${SITE}/`,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#cassius` },
    },
  ],
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ property: "og:url", content: `${SITE}/` }],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(homeJsonLd) }],
  }),
});

const SCROLL_MARKS = [25, 50, 75, 100] as const;

// Homepage visit + how far down people scroll (each mark counted once per visit).
function useHomeTracking() {
  useEffect(() => {
    resetOnce("home");
    trackPageView("home");

    let ticking = false;
    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      // +2px so "100%" still counts when the browser stops a pixel short of the bottom
      const pct = ((window.scrollY + 2) / scrollable) * 100;
      for (const mark of SCROLL_MARKS) {
        if (pct >= mark) trackOnce("home", "scroll", { depth: String(mark) });
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function Index() {
  useHomeTracking();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <PressBar />
        <PainPoints />
        <Pillars />
        <MeetCassius />
        <Testimonials />
        <Accolades />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
