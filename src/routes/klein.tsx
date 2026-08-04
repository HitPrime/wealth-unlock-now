import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart2, ShieldCheck, Layers } from "lucide-react";
import logo from "@/assets/CassiusLogo.png";

export const Route = createFileRoute("/klein")({
  component: KleinPage,
  head: () => ({
    meta: [
      { title: "Learn About Klein Funding | Cassius Cuvée" },
      {
        name: "description",
        content:
          "An overview of Klein Funding's markets, evaluation process, and funding options. Informational page by Cassius Cuvée.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Learn About Klein Funding | Cassius Cuvée" },
      { property: "og:description", content: "An overview of Klein Funding's markets, evaluation process, and funding options." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cassiuscuvee.com/klein" },
    ],
    links: [
      { rel: "canonical", href: "https://cassiuscuvee.com/klein" },
    ],
  }),
});

function KleinPage() {
  const features = [
    {
      number: "01",
      title: "Wide Market Access",
      description: "Trade across 750+ assets and instruments",
      icon: BarChart2,
    },
    {
      number: "02",
      title: "Transparent Rules",
      description: "Clear evaluation guidelines with no hidden terms",
      icon: ShieldCheck,
    },
    {
      number: "03",
      title: "Funding Options",
      description: "Learn about the available funding paths",
      icon: Layers,
    },
  ];

  const handleLearnMore = () => {
    window.open("https://kleinfunding.com/ref/13054", "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#07070c", color: "#f1f5f9", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>

      {/* Background glow */}
      <div style={{
        pointerEvents: "none", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "500px", zIndex: 0,
        background: "radial-gradient(circle at 50% -10%, rgba(139,92,246,0.28) 0%, rgba(88,28,135,0.13) 35%, rgba(7,7,12,0) 70%)"
      }} aria-hidden="true" />
      <div style={{
        pointerEvents: "none", position: "absolute", top: "-96px", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "300px", background: "rgba(139,92,246,0.1)", filter: "blur(120px)", borderRadius: "9999px", zIndex: 0
      }} aria-hidden="true" />

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, width: "100%", backgroundColor: "#0b0a14", borderBottom: "1px solid rgba(88,28,135,0.2)", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <img src={logo} alt="Cassius Cuvée Logo" style={{ height: "44px", width: "auto", objectFit: "contain" }} />
        </motion.div>
      </header>

      {/* Main */}
      <main style={{ position: "relative", zIndex: 10, flex: 1, width: "100%", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 16px", gap: "24px" }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "9999px",
            background: "rgba(59,7,100,0.4)", border: "1px solid rgba(139,92,246,0.25)",
            color: "#e9d5ff", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: "rgba(192,132,252,0.6)", display: "inline-block" }} />
            Trading Partner Overview
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ maxWidth: "672px" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 800, color: "#ffffff", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "12px" }}>
            Learn About Klein Funding
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.6 }}>
            An overview of the platform's markets, evaluation process, and funding options.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", width: "100%" }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                style={{
                  background: "rgba(14,12,24,0.8)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(88,28,135,0.3)", borderRadius: "16px",
                  padding: "24px", textAlign: "left", display: "flex", flexDirection: "column", gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ padding: "10px", borderRadius: "12px", background: "rgba(59,7,100,0.6)", border: "1px solid rgba(88,28,135,0.2)", color: "#c084fc", display: "inline-flex" }}>
                    <Icon size={20} />
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "20px", fontWeight: 700, color: "rgba(192,132,252,0.25)" }}>
                    {feature.number}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.8125rem", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <button
            onClick={handleLearnMore}
            style={{
              backgroundColor: "#7c3aed", color: "#ffffff", fontWeight: 700,
              letterSpacing: "0.1em", fontSize: "0.9375rem",
              padding: "16px 40px", borderRadius: "9999px", border: "none", cursor: "pointer",
              boxShadow: "0 0 24px rgba(139,92,246,0.35)", transition: "all 0.3s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#6d28d9")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#7c3aed")}
          >
            VIEW DETAILS
          </button>
        </motion.div>

      </main>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 10, width: "100%", backgroundColor: "#0b0a14", borderTop: "1px solid rgba(88,28,135,0.2)", padding: "16px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <img src={logo} alt="Cassius Cuvée Logo" style={{ height: "36px", width: "auto", objectFit: "contain", opacity: 0.7 }} />
        <p style={{ fontSize: "11px", color: "#64748b", textAlign: "center", maxWidth: "480px", marginTop: "4px", lineHeight: 1.6 }}>
          This page is for informational purposes only. Trading involves risk. Terms and eligibility apply per the platform's official terms.
        </p>
        <p style={{ fontSize: "11px", color: "#475569", fontWeight: 500 }}>© 2026 Cassius Cuvée</p>
      </footer>

    </div>
  );
}
