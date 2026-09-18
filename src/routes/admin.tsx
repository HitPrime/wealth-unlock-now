import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClickStats } from "@/components/ClickStats";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "admin";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_authed") === "1"
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "1");
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (!authed) {
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
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              style={{
                background: "rgba(88,28,135,0.1)",
                border: `1px solid ${error ? "rgba(239,68,68,0.6)" : "rgba(88,28,135,0.3)"}`,
                borderRadius: "8px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                width: "100%",
              }}
            />
            {error && (
              <p style={{ color: "rgba(239,68,68,0.8)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>
                Incorrect password
              </p>
            )}
            <button
              type="submit"
              className="bg-purple-gradient"
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}
            >
              Unlock →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10 flex items-start justify-between">
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
            onClick={() => { sessionStorage.removeItem("admin_authed"); setAuthed(false); }}
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
