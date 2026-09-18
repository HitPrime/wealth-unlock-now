import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ClickStats } from "@/components/ClickStats";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

type AuthState = "checking" | "authed" | "login";

function Admin() {
  const [auth, setAuth] = useState<AuthState>("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Verify cookie on mount
  useEffect(() => {
    fetch("/api/admin-verify", { credentials: "include" })
      .then((r) => setAuth(r.ok ? "authed" : "login"))
      .catch(() => setAuth("login"));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuth("authed");
        setPassword("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Incorrect password");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleLock = async () => {
    // Expire cookie by setting Max-Age=0
    await fetch("/api/admin-login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logout: true }),
    }).catch(() => {});
    setAuth("login");
  };

  // ── Checking cookie ──
  if (auth === "checking") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div style={{
          display: "flex", alignItems: "center", gap: "10px", color: "#94a3b8"
        }}>
          <div style={{
            width: "16px", height: "16px", borderRadius: "50%",
            border: "2px solid rgba(139,92,246,0.6)", borderTopColor: "transparent",
            animation: "spin 0.8s linear infinite",
          }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Verifying…
          </span>
        </div>
      </div>
    );
  }

  // ── Login form ──
  if (auth === "login") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div style={{
          background: "rgba(14,12,24,0.9)",
          border: "1px solid rgba(88,28,135,0.3)",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "360px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}>
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-2">
              Admin Access
            </p>
            <h1 className="font-display text-2xl uppercase tracking-tight">Enter Password</h1>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Password"
              autoFocus
              disabled={busy}
              style={{
                background: "rgba(88,28,135,0.1)",
                border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(88,28,135,0.3)"}`,
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                width: "100%",
                opacity: busy ? 0.6 : 1,
              }}
            />
            {error && (
              <p style={{ color: "rgba(239,68,68,0.8)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="bg-purple-gradient"
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                cursor: busy ? "not-allowed" : "pointer",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                opacity: busy ? 0.7 : 1,
              }}
            >
              {busy ? "Checking…" : "Unlock →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-2">
              Analytics
            </p>
            <h1 className="font-display text-3xl uppercase tracking-tight">Link Click Stats</h1>
            <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
              Real-time visitors and clicks on Breakout, Klein, and Kast pages.
            </p>
          </div>
          <button
            onClick={handleLock}
            style={{
              background: "none",
              border: "1px solid rgba(88,28,135,0.3)",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "rgba(148,163,184,0.7)",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            Lock
          </button>
        </header>
        <ClickStats />
      </div>
    </div>
  );
}
