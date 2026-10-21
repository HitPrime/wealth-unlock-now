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

export const Route = createFileRoute("/")({
  component: Index,
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
