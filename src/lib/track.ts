// Anonymous on-page counters (api/event.ts -> Upstash, shown in /admin). Only an event
// name and a whitelisted label are sent: no names, emails or form answers.
// Fire-and-forget: a failed count never blocks the page. keepalive lets it finish if the
// visitor leaves right after.

export type TrackPage = "home" | "unlock";

export function trackEvent(page: TrackPage, name: string, extra?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams({ page, name, ...extra });
    fetch(`/api/event?${params}`, { keepalive: true }).catch(() => {});
  } catch {
    // fetch unavailable: skip counting
  }
}

// Same, but at most once per visit to the page for this key (e.g. scroll depth, video
// finished). Pages call resetOnce() when they mount, so going to another page inside the
// site and coming back counts as a new visit.
const sent = new Set<string>();
export function resetOnce(page: TrackPage): void {
  for (const key of sent) if (key.startsWith(`${page}:`)) sent.delete(key);
}
export function trackOnce(page: TrackPage, name: string, extra?: Record<string, string>): void {
  const key = `${page}:${name}:${JSON.stringify(extra ?? {})}`;
  if (sent.has(key)) return;
  sent.add(key);
  trackEvent(page, name, extra);
}

// Page view counter (api/pageview.ts), same store as the other tracked pages.
export function trackPageView(page: TrackPage): void {
  if (typeof window === "undefined") return;
  try {
    fetch(`/api/pageview?page=${page}`, { keepalive: true }).catch(() => {});
  } catch {
    // skip
  }
}
