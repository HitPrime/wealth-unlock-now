import { useEffect, useState } from "react";

interface LinkStats {
  total: number;
  today: number;
  days: { date: string; count: number }[];
}

interface Stats {
  breakout: Record<string, number>;
  klein: Record<string, number>;
}

function processStats(raw: Record<string, number>): LinkStats {
  const today = new Date().toISOString().split("T")[0];
  const total = raw["total"] ?? 0;
  const todayCount = raw[today] ?? 0;

  // Last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({ date: dateStr, count: raw[dateStr] ?? 0 });
  }

  return { total, today: todayCount, days };
}

function StatCard({ name, stats, color }: { name: string; stats: LinkStats; color: string }) {
  const maxCount = Math.max(...stats.days.map((d) => d.count), 1);

  return (
    <div style={{
      background: "rgba(14,12,24,0.8)",
      border: "1px solid rgba(88,28,135,0.3)",
      borderRadius: "16px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>
          {name}
        </h3>
        <span style={{
          background: color, color: "#fff", fontSize: "11px",
          fontWeight: 700, padding: "3px 10px", borderRadius: "999px",
          fontFamily: "var(--font-mono)", letterSpacing: "0.1em"
        }}>
          LIVE
        </span>
      </div>

      {/* Numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{
          background: "rgba(88,28,135,0.15)", borderRadius: "12px",
          padding: "16px", textAlign: "center"
        }}>
          <p style={{ color: "#94a3b8", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>
            Total Clicks
          </p>
          <p style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>
            {stats.total}
          </p>
        </div>
        <div style={{
          background: "rgba(88,28,135,0.15)", borderRadius: "12px",
          padding: "16px", textAlign: "center"
        }}>
          <p style={{ color: "#94a3b8", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>
            Today
          </p>
          <p style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>
            {stats.today}
          </p>
        </div>
      </div>

      {/* 7-day bar chart */}
      <div>
        <p style={{ color: "#94a3b8", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>
          Last 7 Days
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
          {stats.days.map((d) => (
            <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                <div style={{
                  width: "100%",
                  height: `${Math.max((d.count / maxCount) * 100, 4)}%`,
                  background: d.count > 0 ? color : "rgba(88,28,135,0.2)",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s ease",
                }} title={`${d.date}: ${d.count} clicks`} />
              </div>
              <span style={{ color: "#64748b", fontSize: "9px", fontFamily: "var(--font-mono)" }}>
                {d.date.slice(5)} {/* MM-DD */}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClickStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  const load = () => {
    setStatus("loading");
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setStatus("ok"); })
      .catch(() => setStatus("error"));
  };

  useEffect(() => { load(); }, []);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "24px 0", color: "#94a3b8" }}>
        <div style={{
          width: "16px", height: "16px", borderRadius: "50%",
          border: "2px solid rgba(139,92,246,0.6)", borderTopColor: "transparent",
          animation: "spin 0.8s linear infinite"
        }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Loading stats…
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ padding: "24px 0" }}>
        <p style={{ color: "#94a3b8", marginBottom: "8px" }}>Couldn't load stats.</p>
        <button onClick={load} style={{
          background: "linear-gradient(135deg, oklch(0.60 0.24 290), oklch(0.42 0.24 290))",
          color: "#fff", border: "none", borderRadius: "999px",
          padding: "8px 20px", cursor: "pointer", fontSize: "13px", fontWeight: 600
        }}>
          Try again
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ color: "#94a3b8", fontSize: "13px" }}>
          Tracks button clicks on /breakout and /klein pages.
        </p>
        <button onClick={load} style={{
          background: "none", border: "1px solid rgba(139,92,246,0.4)",
          color: "#c084fc", borderRadius: "999px", padding: "6px 16px",
          cursor: "pointer", fontSize: "12px", fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em", textTransform: "uppercase"
        }}>
          Refresh
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        <StatCard
          name="Breakout"
          stats={processStats(stats.breakout)}
          color="rgba(59, 130, 246, 0.8)"
        />
        <StatCard
          name="Klein"
          stats={processStats(stats.klein)}
          color="rgba(139, 92, 246, 0.8)"
        />
      </div>
    </div>
  );
}
