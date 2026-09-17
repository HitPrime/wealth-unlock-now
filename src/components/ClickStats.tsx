import { useEffect, useState } from "react";

interface StatData {
  total: number;
  today: number;
  days: { date: string; count: number }[];
}

interface Stats {
  clicks: {
    breakout: Record<string, number>;
    klein: Record<string, number>;
  };
  views: {
    breakout: Record<string, number>;
    klein: Record<string, number>;
    kast: Record<string, number>;
  };
}

function process(raw: Record<string, number>): StatData {
  const today = new Date().toISOString().split("T")[0];
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split("T")[0];
    days.push({ date: ds, count: raw[ds] ?? 0 });
  }
  return { total: raw["total"] ?? 0, today: raw[today] ?? 0, days };
}

function MiniBar({ days, color }: { days: { date: string; count: number }[]; color: string }) {
  const max = Math.max(...days.map((d) => d.count), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "40px" }}>
      {days.map((d) => (
        <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div
              title={`${d.date}: ${d.count}`}
              style={{
                width: "100%",
                height: `${Math.max((d.count / max) * 100, 5)}%`,
                background: d.count > 0 ? color : "rgba(88,28,135,0.15)",
                borderRadius: "3px 3px 0 0",
              }}
            />
          </div>
          <span style={{ color: "#475569", fontSize: "8px", fontFamily: "var(--font-mono)" }}>
            {d.date.slice(5)}
          </span>
        </div>
      ))}
    </div>
  );
}

function PageCard({
  name, views, clicks, viewColor, clickColor,
}: {
  name: string;
  views: StatData;
  clicks?: StatData;
  viewColor: string;
  clickColor?: string;
}) {
  return (
    <div style={{
      background: "rgba(14,12,24,0.9)",
      border: "1px solid rgba(88,28,135,0.3)",
      borderRadius: "16px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}>
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1rem",
          fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em"
        }}>
          {name}
        </h3>
        <span style={{
          background: viewColor, color: "#fff", fontSize: "10px",
          fontWeight: 700, padding: "2px 10px", borderRadius: "999px",
          fontFamily: "var(--font-mono)", letterSpacing: "0.1em"
        }}>
          LIVE
        </span>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: clicks ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: "8px" }}>
        {/* Views */}
        <div style={{ background: "rgba(88,28,135,0.12)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>Visitors</p>
          <p style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>{views.total}</p>
        </div>
        <div style={{ background: "rgba(88,28,135,0.12)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>Today</p>
          <p style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>{views.today}</p>
        </div>

        {/* Clicks (if available) */}
        {clicks && (
          <>
            <div style={{ background: "rgba(59,130,246,0.1)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>Clicks</p>
              <p style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>{clicks.total}</p>
            </div>
            <div style={{ background: "rgba(59,130,246,0.1)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>Click Today</p>
              <p style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>{clicks.today}</p>
            </div>
          </>
        )}
      </div>

      {/* Bar charts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>
            Visitors — Last 7 Days
          </p>
          <MiniBar days={views.days} color={viewColor} />
        </div>
        {clicks && (
          <div>
            <p style={{ color: "#64748b", fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>
              Clicks — Last 7 Days
            </p>
            <MiniBar days={clicks.days} color={clickColor ?? viewColor} />
          </div>
        )}
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
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data && typeof data === "object") {
          setStats(data);
          setStatus("ok");
        } else {
          setStatus("error");
        }
      })
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

  if (status === "ok" && !stats) return null;

  const safeStats = stats ?? {
    clicks: { breakout: {}, klein: {} },
    views: { breakout: {}, klein: {}, kast: {} },
  };

  const safeClicks = safeStats.clicks ?? { breakout: {}, klein: {} };
  const safeViews = safeStats.views ?? { breakout: {}, klein: {}, kast: {} };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
        <p style={{ color: "#64748b", fontSize: "13px" }}>
          Visitors = page views. Clicks = referral button clicks.
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
        <PageCard
          name="Breakout"
          views={process(safeViews.breakout ?? {})}
          clicks={process(safeClicks.breakout ?? {})}
          viewColor="rgba(139,92,246,0.8)"
          clickColor="rgba(59,130,246,0.8)"
        />
        <PageCard
          name="Klein"
          views={process(safeViews.klein ?? {})}
          clicks={process(safeClicks.klein ?? {})}
          viewColor="rgba(139,92,246,0.8)"
          clickColor="rgba(59,130,246,0.8)"
        />
        <PageCard
          name="Kast"
          views={process(safeViews.kast ?? {})}
          viewColor="rgba(139,92,246,0.8)"
        />
      </div>
    </div>
  );
}
