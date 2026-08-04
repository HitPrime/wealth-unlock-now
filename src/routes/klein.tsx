import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart2, ShieldCheck, Zap } from "lucide-react";
import logo from "@/assets/CassiusLogo.png";

export const Route = createFileRoute("/klein")({
  component: KleinPage,
  head: () => ({
    meta: [
      { title: "Trade 750+ Assets with Klein Funding | Cassius Cuvée" },
      {
        name: "description",
        content:
          "Trade 750+ assets with Klein Funding. Get up to 30% off using code CASSIUS. Fair rules, instant funding option — powered by Cassius Cuvée.",
      },
      { name: "keywords", content: "Klein Funding, prop trading, 750 assets, Cassius Cuvée, discount, CASSIUS code, instant funding" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Trade 750+ Assets with Klein Funding | Cassius Cuvée" },
      { property: "og:description", content: "Get up to 30% off Klein Funding using code CASSIUS. Fair rules, 750+ assets, instant funding." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cassiuscuvee.com/klein" },
      { property: "og:site_name", content: "Cassius Cuvée" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Trade 750+ Assets with Klein Funding | Cassius Cuvée" },
      { name: "twitter:description", content: "Get up to 30% off Klein Funding using code CASSIUS." },
    ],
    links: [
      { rel: "canonical", href: "https://cassiuscuvee.com/klein" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
});

function KleinPage() {
  const features = [
    {
      number: "01",
      title: "750+ Assets",
      description: "Trade across a wide range of markets and instruments",
      icon: BarChart2,
    },
    {
      number: "02",
      title: "Fair Rules",
      description: "Transparent evaluation rules with no hidden restrictions",
      icon: ShieldCheck,
    },
    {
      number: "03",
      title: "Instant Funding Option",
      description: "Get funded quickly without long evaluation delays",
      icon: Zap,
    },
  ];

  const handleGetStarted = () => {
    window.open("https://kleinfunding.com/ref/13054", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen w-full bg-[#07070c] text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-purple-900 selection:text-purple-100">

      {/* Background glows */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] z-0"
        style={{ background: "radial-gradient(circle at 50% -10%, rgba(139,92,246,0.28) 0%, rgba(88,28,135,0.13) 35%, rgba(7,7,12,0) 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full z-0"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="relative z-10 w-full bg-[#0b0a14] border-b border-purple-900/20 px-6 md:px-10 py-2.5 flex items-center justify-center flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-0.5"
        >
          <img src={logo} alt="Cassius Cuvée Logo" className="h-9 md:h-11 w-auto object-contain" />
        </motion.div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-4 py-10 md:py-14 gap-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/25 text-purple-200 text-xs font-medium tracking-wide shadow-inner backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Prop Trading Partner
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3 max-w-2xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
            Trade 750+ Assets with Klein Funding
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-normal flex-wrap">
            <span>750+ Assets</span>
            <span className="text-purple-700">|</span>
            <span>Fair Rules</span>
            <span className="text-purple-700">|</span>
            <span>Instant Funding Option</span>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-[#0e0c18]/80 backdrop-blur-md border border-purple-900/30 rounded-2xl p-6 text-left flex flex-col gap-3 shadow-lg shadow-purple-950/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/20 text-purple-300 inline-flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xl font-bold text-purple-400/25 tracking-wider">
                    {feature.number}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Discount + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-purple-400 text-sm font-medium tracking-wide">
            Get up to 30% off using code{" "}
            <span className="text-purple-300 font-bold tracking-widest">CASSIUS</span>
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold tracking-wider text-sm sm:text-base py-4 px-10 rounded-full shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          >
            GET STARTED WITH KLEIN FUNDING
          </button>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-[#0b0a14] border-t border-purple-900/20 px-6 py-4 flex flex-col items-center justify-center gap-1 flex-shrink-0">
        <img src={logo} alt="Cassius Cuvée Logo" className="h-8 md:h-9 w-auto object-contain opacity-70" />
        <p className="text-xs text-slate-500 leading-relaxed font-normal text-center max-w-md mt-1">
          Trading involves risk. Terms and eligibility apply per Klein Funding's official terms.
        </p>
        <p className="text-xs text-slate-600 font-medium">© 2026 Cassius Cuvée</p>
      </footer>

    </div>
  );
}
