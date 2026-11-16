// Microsoft Clarity (heatmaps + session recordings). Non-essential: it only loads after the
// visitor presses "Accept All" on the cookie banner, never after Decline / Global Privacy
// Control, and never on /admin. Form inputs stay masked: Clarity masks typed input by
// default, and every <form> on the site also carries data-clarity-mask="true" so answers
// and typed text are hidden in recordings too.

const CLARITY_PROJECT_ID = "zdpfo2tlwi"; // public site ID (not a secret)
const CONSENT_KEY = "cc_cookie_consent"; // written by CookieBanner.tsx
export const CONSENT_EVENT = "cc-consent-change";

let loaded = false;

export function hasAnalyticsConsent(): boolean {
  try {
    // Global Privacy Control always wins, even over an earlier "Accept".
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true)
      return false;
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const { value, expires } = JSON.parse(raw);
    return value === "accepted" && (typeof expires !== "number" || Date.now() < expires);
  } catch {
    return false;
  }
}

function loadClarity(): void {
  if (loaded || typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;
  loaded = true;
  type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
  const w = window as Window & { clarity?: ClarityFn };
  if (!w.clarity) {
    const queue: ClarityFn = (...args: unknown[]) => {
      (queue.q = queue.q || []).push(args);
    };
    w.clarity = queue;
  }
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(s);
  w.clarity("consent"); // the visitor has granted consent via our banner
}

// Call once from the root layout. Loads Clarity now if consent was already given, or as
// soon as the visitor accepts on the banner. Returns a cleanup function.
export function startClarityWhenConsented(): () => void {
  if (typeof window === "undefined") return () => {};
  if (hasAnalyticsConsent()) loadClarity();
  const onChange = () => {
    if (hasAnalyticsConsent()) loadClarity();
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}
