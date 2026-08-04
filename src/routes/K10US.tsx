import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { UserPlus, Tag, ShieldCheck } from "lucide-react";
import logo from "@/assets/CassiusLogo.png";
import card from "@/assets/KastCard.png";

export const Route = createFileRoute("/K10US")({
  component: KastPage,
  head: () => ({
    meta: [
      { title: "Get 10 USD Welcome Bonus on Kast Visa Card | Cassius Cuvée" },
      {
        name: "description",
        content:
          "Sign up on Kast using Cassius referral code and get a 10 USD welcome bonus on your Kast Visa Platinum card. Follow 3 simple steps to get started.",
      },
      { name: "keywords", content: "Kast, Kast Visa Card, 10 USD bonus, Cassius Cuvée, referral, crypto card, welcome bonus" },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:title", content: "Get 10 USD Welcome Bonus on Kast Visa Card" },
      {
        property: "og:description",
        content: "Sign up on Kast using Cassius referral code and get a 10 USD welcome bonus. 3 simple steps.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cassiuscuvee.com/K10US" },
      { property: "og:site_name", content: "Cassius Cuvée" },
      // Twitter
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Get 10 USD Welcome Bonus on Kast Visa Card | Cassius Cuvée" },
      {
        name: "twitter:description",
        content: "Sign up on Kast using Cassius referral code and get a 10 USD welcome bonus.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://cassiuscuvee.com/K10US" },
    ],
  }),
});

function KastPage() {
  const steps = [
    {
      number: "01",
      title: "Create an Account",
      description: "Sign up using the Cassius referral link",
      icon: UserPlus,
    },
    {
      number: "02",
      title: "Enter Referral Code",
      description: "Add code CASSIUS during sign-up",
      icon: Tag,
    },
    {
      number: "03",
      title: "Verify Your Account",
      description: "Complete the standard verification (KYC) step",
      icon: ShieldCheck,
    },
  ];

  const handleGetStarted = () => {
    window.open("https://app.kast.xyz/referral/CASSIUS", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-screen w-full bg-[#07070c] text-slate-100 relative overflow-hidden flex flex-col selection:bg-purple-900 selection:text-purple-100">
      {/* Background glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-80 z-0"
        style={{ background: "radial-gradient(circle at 50% -10%, rgba(139,92,246,0.25) 0%, rgba(88,28,135,0.12) 35%, rgba(7,7,12,0) 70%)" }}
        aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full z-0"
        aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 w-full bg-[#0b0a14] border-b border-purple-900/20 px-6 md:px-10 py-2.5 flex items-center flex-shrink-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <img src={logo} alt="Cassius Cuvée Logo" className="h-9 md:h-11 w-auto object-contain" />
        </motion.div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 py-2 gap-2.5">

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-1 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-snug">
            Learn How to Get 10 USD Welcome Bonus on Kast Visa Card
          </h1>
          <p className="text-slate-400 text-xs font-normal leading-relaxed max-w-xl mx-auto">
            A simple 3-step overview for setting up your account through the Cassius referral link.
          </p>
        </motion.div>

        {/* Card CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex flex-col items-center gap-1.5">
          <p onClick={handleGetStarted}
            className="text-green-400 font-bold text-sm tracking-wide animate-pulse cursor-pointer hover:text-green-300 transition-colors duration-200">
            🎁 Get 10 USD Welcome Bonus
          </p>
          <button onClick={handleGetStarted}
            className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95"
            aria-label="Get 10 USD Welcome Bonus on Kast">
            <div className="relative rounded-xl overflow-hidden shadow-xl shadow-purple-950/40 ring-2 ring-purple-500/20 group-hover:ring-purple-400/50 transition-all duration-300 w-[200px]">
              <img src={card} alt="Kast Visa Platinum Card" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-purple-600/90 group-hover:bg-purple-500 text-white font-bold text-xs px-5 py-2 rounded-full shadow-lg transition-colors duration-300">
                  Claim 10 USD →
                </span>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-[#0e0c18]/80 backdrop-blur-md border border-purple-900/30 rounded-xl p-4 text-left flex flex-col gap-2 shadow-lg hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800/20 text-purple-300 inline-flex">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-lg font-bold text-purple-400/25">{step.number}</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-[#0b0a14] border-t border-purple-900/20 px-6 py-3 flex flex-col items-center justify-center gap-1 flex-shrink-0">
        <img src={logo} alt="Cassius Cuvée Logo" className="h-8 md:h-9 w-auto object-contain opacity-80" />
        <p className="text-xs text-slate-600 font-medium">© 2026 Cassius Cuvée</p>
      </footer>
    </div>
  );
}
