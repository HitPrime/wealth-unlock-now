import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart2, ShieldCheck, Layers } from "lucide-react";
import logo from "@/assets/CassiusLogo.png";
import kleinLogo from "@/assets/klein.jpg";

export const Route = createFileRoute("/klein")({
  component: KleinPage,
  head: () => ({
    meta: [
      { title: "Get 30% Off Klein Funding | Cassius Cuvée" },
      {
        name: "description",
        content:
          "Use code CASSIUS to get up to 30% off Klein Funding. Trade 750+ assets with transparent rules and flexible funding options. Informational page by Cassius Cuvée.",
      },
      { name: "keywords", content: "Klein Funding, prop trading, 30% off, CASSIUS code, 750 assets, transparent rules, funding options, Cassius Cuvée" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Get 30% Off Klein Funding | Cassius Cuvée" },
      { property: "og:description", content: "Use code CASSIUS to get up to 30% off Klein Funding. Trade 750+ assets with transparent rules and flexible funding options." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cassiuscuvee.com/klein" },
      { property: "og:site_name", content: "Cassius Cuvée" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Get 30% Off Klein Funding | Cassius Cuvée" },
      { name: "twitter:description", content: "Use code CASSIUS to get up to 30% off Klein Funding. Trade 750+ assets with transparent rules and flexible funding options." },
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
    <div style={{
      minHeight: "100vh", width: "100%", backgroundColor: "#07070c",
      color: "#f1f5f9", display: "flex", flexDirection: "column",
      justifyContent: "space-between", position: "relative", overflow: "hidden"
    }}>

      {/* Background glows */}
      <div style={{
        pointerEvents: "none", position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)", width: "800px", height: "500px", zIndex: 0,
        background: "radial-gradient(circle at 50% -10%, rgba(139,92,246,0.28) 0%, rgba(88,28,135,0.13) 35%, rgba(7,7,12,0) 70%)"
      }} aria-hidden="true" />
      <div style={{
        pointerEvents: "none", position: "absolute", top: "-96px", left: "50%",
        transform: "translateX(-50%)", width: "600px", height: "300px",
        background: "rgba(139,92,246,0.1)", filter: "blur(120px)", borderRadius: "9999px", zIndex: 0
      }} aria-hidden="true" />

      {/* Header */}
      <header style={{
        position: "relative", zIndex: 10, width: "100%", backgroundColor: "#0b0a14",
        borderBottom: "1px solid rgba(88,28,135,0.2)", padding: "10px 40px",
        display: "flex", alignItems: "center", flexShrink: 0
      }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <img src={logo} alt="Cassius Cuvée Logo" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
        </motion.div>
      </header>

      {/* Main */}
      <main style={{
        position: "relative", zIndex: 10, flex: 1, width: "100%",
        maxWidth: "900px", margin: "0 auto", display: "flex",
        flexDirection: "column", alignItems: "center", textAlign: "center",
        padding: "32px 16px", gap: "20px"
      }}>



        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ maxWidth: "672px" }}>
          <h1 style={{
            fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 800, color: "#ffffff",
            textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "10px"
          }}>
            Learn About Klein Funding
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(0.8rem, 2vw, 0.95rem)", lineHeight: 1.6 }}>
            An overview of the platform's markets, evaluation process, and funding options.
          </p>
        </motion.div>

        {/* Klein Logo as clickable button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <p
            onClick={handleLearnMore}
            style={{
              color: "#4ade80", fontWeight: 700, fontSize: "14px",
              letterSpacing: "0.05em", cursor: "pointer",
              animation: "pulse 2s infinite"
            }}
          >
            🎁 Get up to 30% off using code CASSIUS
          </p>
          <button
            onClick={handleLearnMore}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 0, transition: "transform 0.3s"
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            aria-label="View Klein Funding details"
          >
            <div style={{
              borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 20px 40px rgba(139,92,246,0.3)",
              border: "2px solid rgba(139,92,246,0.25)",
              width: "220px", position: "relative"
            }}>
              <img
                src={kleinLogo}
                alt="Klein Funding"
                style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
              />
              {/* Center overlay button */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span style={{
                  backgroundColor: "rgba(124,58,237,0.9)",
                  color: "#ffffff", fontWeight: 700, fontSize: "13px",
                  padding: "8px 20px", borderRadius: "9999px",
                  boxShadow: "0 4px 12px rgba(139,92,246,0.4)"
                }}>
                  Claim 30% off →
                </span>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Feature Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px", width: "100%"
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                style={{
                  background: "rgba(14,12,24,0.8)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(88,28,135,0.3)", borderRadius: "12px",
                  padding: "16px", textAlign: "left", display: "flex",
                  flexDirection: "column", gap: "8px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    padding: "8px", borderRadius: "10px",
                    background: "rgba(59,7,100,0.6)", border: "1px solid rgba(88,28,135,0.2)",
                    color: "#c084fc", display: "inline-flex"
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 700, color: "rgba(192,132,252,0.25)" }}>
                    {feature.number}
                  </span>
                </div>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.75rem", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer style={{
        position: "relative", zIndex: 10, width: "100%", backgroundColor: "#0b0a14",
        borderTop: "1px solid rgba(88,28,135,0.2)", padding: "12px 40px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", flexShrink: 0
      }}>
        <img src={logo} alt="Cassius Cuvée Logo" style={{ height: "36px", width: "auto", objectFit: "contain", opacity: 0.8 }} />
        <p style={{ fontSize: "11px", color: "#64748b", textAlign: "center", maxWidth: "480px", marginTop: "2px", lineHeight: 1.6 }}>
          This page is for informational purposes only. Trading involves risk. Terms and eligibility apply per the platform's official terms.
        </p>
        <p style={{ fontSize: "11px", color: "#475569", fontWeight: 500 }}>© 2026 Cassius Cuvée</p>
      </footer>

    </div>
  );
}
