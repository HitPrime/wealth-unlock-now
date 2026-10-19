import { useEffect, useState } from "react";

const COOKIE_KEY = "cc_cookie_consent";
const EXPIRY_DAYS = 365;

type ConsentState = "accepted" | "declined" | null;

function getStoredConsent(): ConsentState {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    const { value, expires } = JSON.parse(raw);
    if (Date.now() > expires) { localStorage.removeItem(COOKIE_KEY); return null; }
    return value;
  } catch { return null; }
}

function storeConsent(value: "accepted" | "declined") {
  const expires = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(COOKIE_KEY, JSON.stringify({ value, expires }));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check GPC
    const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
    if (gpc === true) { storeConsent("declined"); return; }

    const stored = getStoredConsent();
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handle = (val: "accepted" | "declined") => {
    storeConsent(val);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ccSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cc-banner {
          animation: ccSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <div
        className="cc-banner"
        role="dialog"
        aria-label="Cookie preferences"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 9999,
          width: "calc(100% - 40px)",
          maxWidth: "420px",
          background: "oklch(0.12 0.05 300 / 0.97)",
          border: "1px solid rgba(139,92,246,0.4)",
          borderRadius: "18px",
          padding: "18px 20px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.12)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "oklch(0.86 0.08 290)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}>
            🍪 Cookie Notice
          </p>
          <button
            onClick={() => handle("declined")}
            aria-label="Close cookie banner"
            style={{
              background: "none",
              border: "none",
              color: "rgba(203,213,225,0.4)",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
              padding: "0 2px",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(203,213,225,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(203,213,225,0.4)")}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <p style={{
          fontSize: "12.5px",
          color: "rgba(241,245,249,0.65)",
          lineHeight: "1.6",
          marginBottom: "14px",
        }}>
          We use cookies for analytics, advertising, and to remember your preferences.{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(139,92,246,0.9)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            Privacy Policy
          </a>
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => handle("accepted")}
            style={{
              flex: 1,
              padding: "9px 16px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, oklch(0.60 0.24 290), oklch(0.42 0.24 290))",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 2px 10px rgba(124,58,237,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(124,58,237,0.35)";
            }}
          >
            Accept All
          </button>

          <button
            onClick={() => handle("declined")}
            style={{
              flex: 1,
              padding: "9px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.07)",
              color: "rgba(203,213,225,0.8)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)";
              e.currentTarget.style.background = "rgba(139,92,246,0.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
              e.currentTarget.style.background = "rgba(139,92,246,0.07)";
            }}
          >
            Decline
          </button>
        </div>

        {/* Privacy choices link */}
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <a
            href="/privacy#section-8"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              color: "rgba(139,92,246,0.6)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(139,92,246,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(139,92,246,0.6)")}
          >
            Your Privacy Choices →
          </a>
        </p>
      </div>
    </>
  );
}
