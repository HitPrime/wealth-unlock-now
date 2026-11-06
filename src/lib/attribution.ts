// Where a visitor came from (UTMs, referrer, landing page), saved in the browser on the
// first page they land on so it can be attached to a GHL contact when they fill a form
// later, even on another page or another day. Browser-only; every storage call is
// wrapped because storage can be blocked (private mode, strict settings).

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  referrer?: string;
  landing_page?: string;
};

const STORAGE_KEY = "cc_attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const MAX_LEN = 150;

const clean = (v: string | null | undefined) => (v ?? "").trim().slice(0, MAX_LEN);

// Respect the cookie banner: a visitor who pressed Decline (or has Global Privacy
// Control on, which the banner records as declined) gets nothing saved, and anything
// saved before is removed. Key and shape come from CookieBanner.tsx.
function consentDeclined(): boolean {
  try {
    const raw = localStorage.getItem("cc_cookie_consent");
    return !!raw && JSON.parse(raw)?.value === "declined";
  } catch {
    return false;
  }
}

function forget(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function read(): (Attribution & { saved_at?: number }) | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    if (typeof data.saved_at !== "number" || Date.now() - data.saved_at > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// Referrer only when it is another site (not our own pages).
function externalReferrer(): string {
  try {
    if (!document.referrer) return "";
    const ref = new URL(document.referrer);
    if (ref.hostname === window.location.hostname) return "";
    return clean(ref.hostname + ref.pathname.replace(/\/$/, ""));
  } catch {
    return "";
  }
}

// Call once when the site loads. A visit with UTMs always replaces what is saved (the
// latest ad click wins). A visit without UTMs only saves when nothing is saved yet, so
// coming back directly later does not wipe out the ad that first brought them in.
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (consentDeclined()) return forget();
  try {
    const params = new URLSearchParams(window.location.search);
    const utms: Attribution = {};
    for (const key of UTM_KEYS) {
      const v = clean(params.get(key));
      if (v) utms[key] = v;
    }
    const hasUtms = Object.keys(utms).length > 0;
    if (!hasUtms && read()) return;

    const data: Attribution & { saved_at: number } = { ...utms, saved_at: Date.now() };
    const referrer = externalReferrer();
    if (referrer) data.referrer = referrer;
    data.landing_page = clean(window.location.pathname) || "/";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage blocked: forms still work, just without attribution
  }
}

// What to send with a form. Empty object when nothing is saved.
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  if (consentDeclined()) {
    forget();
    return {};
  }
  const data = read();
  if (!data) return {};
  const out: Attribution = {};
  for (const key of [...UTM_KEYS, "referrer", "landing_page"] as const) {
    const v = clean(data[key]);
    if (v) out[key] = v;
  }
  return out;
}

// Server side: the attribution arrives from the visitor's browser, so keep only known
// keys, short plain strings, no control characters or the "|" used as a separator in the
// GHL source text. Never throws: a bad value is dropped and the form still goes through.
export function sanitizeAttribution(raw: unknown): Attribution | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const out: Attribution = {};
  for (const key of [...UTM_KEYS, "referrer", "landing_page"] as const) {
    const v = (raw as Record<string, unknown>)[key];
    if (typeof v !== "string") continue;
    const cleaned = v
      .replace(/[\u0000-\u001f\u007f|]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_LEN);
    if (cleaned) out[key] = cleaned;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

// Our other sites (GHL pages). Browser storage doesn't carry over to another domain or
// subdomain, so links to these get the saved UTMs added at click time.
function isOurOtherSite(hostname: string): boolean {
  if (hostname === window.location.hostname) return false;
  return (
    hostname.endsWith(".cassiuscuvee.com") ||
    hostname === "getswellpoint.com" ||
    hostname.endsWith(".getswellpoint.com")
  );
}

// Call once (root layout). Any click on a link to clientclub. / learn. / getswellpoint.com
// etc. gets the visitor's UTMs added to that link just before the browser follows it.
// Covers normal, middle and right-click (open in new tab, copy link). Links that already
// carry their own UTMs keep them. Returns a cleanup function.
export function carryUtmsOnOutboundLinks(): () => void {
  if (typeof window === "undefined") return () => {};
  const onPointer = (e: Event) => {
    try {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !isOurOtherSite(a.hostname)) return;
      const next = withUtms(a.href);
      if (next !== a.href) a.href = next;
    } catch {
      // never block a click
    }
  };
  const events = ["click", "auxclick", "contextmenu"] as const;
  for (const ev of events) document.addEventListener(ev, onPointer, true);
  return () => {
    for (const ev of events) document.removeEventListener(ev, onPointer, true);
  };
}

// Adds the saved UTMs to a URL (used for the GHL form iframe so its hidden fields fill).
export function withUtms(url: string): string {
  const attr = getAttribution();
  try {
    const u = new URL(url);
    // A link that already has its own UTMs (e.g. an email campaign link) is left as is,
    // so two different campaigns never get mixed in one link.
    if (UTM_KEYS.some((key) => u.searchParams.has(key))) return url;
    for (const key of UTM_KEYS) {
      const v = attr[key];
      if (v) u.searchParams.set(key, v);
    }
    return u.toString();
  } catch {
    return url;
  }
}
