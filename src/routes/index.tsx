import { createFileRoute } from "@tanstack/react-router";
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

function Index() {
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
