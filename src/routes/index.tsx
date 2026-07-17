import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { PressBar } from "@/components/landing/PressBar";
import { PainPoints } from "@/components/landing/PainPoints";
import { Pillars } from "@/components/landing/Pillars";
import { MeetCassius } from "@/components/landing/MeetCassius";
import { SocialProof } from "@/components/landing/SocialProof";
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
        <SocialProof />
        <MeetCassius />
        <Accolades />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
