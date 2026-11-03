// Content for the organic-only Breakout reviews page (/breakout-prop-reviews).
// Everything Cassius will hand over lives here: copy, affiliate info and the video list.
// To add a video, append an entry to BREAKOUT_REVIEW_VIDEOS. The page, the VideoObject
// structured data and /video-sitemap.xml all read from this one array.

export const SITE_URL = "https://www.cassiuscuvee.com";

// Changing the URL later: rename src/routes/breakout-prop-reviews.tsx to the new slug,
// update this constant, and add a redirect from the old slug in vercel.json.
export const BREAKOUT_REVIEWS_SLUG = "/breakout-prop-reviews";
export const BREAKOUT_REVIEWS_URL = `${SITE_URL}${BREAKOUT_REVIEWS_SLUG}`;

// Key used by the existing Upstash counters (api/pageview.ts, api/track.ts).
// Kept separate from "breakout" so organic numbers don't mix with the ad landing page.
export const BREAKOUT_REVIEWS_TRACK_KEY = "breakout-reviews";

export const BREAKOUT_REVIEWS_SEO = {
  title: "Breakout Prop Reviews: Video Walkthroughs by Cassius Cuvée",
  description:
    "Breakout prop firm reviews in video form. Cassius Cuvée walks through Breakout's rules, evaluation paths and platform, with a short summary under every video.",
  h1: "Breakout Prop Reviews",
  ogImage: `${SITE_URL}/og/og-breakout.jpg`,
  ogImageAlt: "Breakout prop firm reviews by Cassius Cuvée",
};

export const BREAKOUT_REVIEWS_COPY = {
  // DRAFT intro written for Cassius to approve or replace with his own words.
  intro: [
    "I trade on Breakout Prop and record what I do on the platform. These are my Breakout Prop review videos, in the order I'd suggest watching them: platform and app walkthroughs, how evaluations and withdrawals work, and real trades placed on Breakout Prop.",
    "Each video has a short summary underneath, so you know what it covers before you press play.",
  ],
  // Same disclaimer as /breakout, /klein and /K10US, plus "Not financial advice." (Cassius's request).
  riskDisclaimer:
    "This page is for informational purposes only. Trading involves risk, including possible loss of capital, and results are not guaranteed. Terms and eligibility apply per the platform's official terms. Not financial advice.",
  // Cassius's exact wording.
  disclosure:
    "I’m a Breakout affiliate, and I may earn a commission when you use my code at checkout to get a discount.",
};

export const BREAKOUT_AFFILIATE = {
  code: "GGRF7W",
  // Goes through the existing click counter, which 302s to the affiliate link defined
  // in api/track.ts (https://www.breakoutprop.com/join/ggrf7w). Do not hardcode it here.
  href: `/api/track?link=${BREAKOUT_REVIEWS_TRACK_KEY}`,
  ctaLabel: "Visit Breakout (my affiliate link)",
  // Shown once, above the top code box (Cassius's wording). Non-breaking spaces before
  // "code" and "GGRF7W" keep the code from wrapping onto its own line on phones.
  lead: "Use my Breakout Prop affiliate link or discount code GGRF7W.",
  bottomHeading: "Breakout Prop discount code and affiliate link: GGRF7W",
};

// Full YouTube playlist, linked once near the bottom of the page. Update the count if it changes.
export const BREAKOUT_PLAYLIST = {
  href: "https://www.youtube.com/playlist?list=PLsNXkh2NWgmpd_vPTRqrAykEYGmJ3Y79z",
  label:
    "Watch the full Breakout Prop 2026 Rules & Strategy Breakdown playlist on YouTube (34 videos)",
};

export type ReviewVideo = {
  /** YouTube video ID (the part after watch?v=). Empty = not provided yet. */
  youtubeId: string;
  title: string;
  /** 2–4 sentence summary shown under the video and used as the schema description. */
  summary: string;
  /** Publish time from YouTube (ISO 8601 with timezone), e.g. "2026-08-14T08:16:08-07:00". */
  uploadDate: string;
  /** ISO 8601 duration, e.g. "PT12M34S" for 12:34. */
  duration: string;
};

// Titles, summaries and durations are Cassius's wording. Upload dates come from YouTube.
// Entries with missing data still render on the page as a labelled placeholder, but are
// left out of structured data and the video sitemap until every field is filled in,
// so Google never sees incomplete VideoObjects.
export const BREAKOUT_REVIEW_VIDEOS: ReviewVideo[] = [
  {
    youtubeId: "7SLBq4tPwwE",
    title: "How to Trade Nasdaq 100 on Breakout Prop: 2026 Updated Walkthrough",
    summary:
      "This 18 minute 33 second walkthrough shows how to trade the Nasdaq 100 on Breakout Prop, updated for 2026. It covers the platform side of trading the index on a Breakout Prop account, including the 24/7 market access shown in the video. A good starting point for anyone comparing prop firms that offer Nasdaq 100 access.",
    uploadDate: "2026-08-14T08:16:08-07:00",
    duration: "PT18M33S",
  },
  {
    youtubeId: "UWys7mH9fk0",
    title: "I Entered a $500,000 Nasdaq 100 Trade on Breakout Prop: Every Step",
    summary:
      "A live, step-by-step look at entering a $500,000 Nasdaq 100 position on Breakout Prop, 19 minutes 43 seconds long. The video follows the full process of placing the trade on the Breakout platform, with 24/7 trading access shown on screen. Shows how a large index position gets opened on a prop firm account.",
    uploadDate: "2026-08-03T08:00:21-07:00",
    duration: "PT19M43S",
  },
  {
    youtubeId: "q64gg8f9sPU",
    title: "Breakout Prop Mobile App Walkthrough: How to Navigate the Platform",
    summary:
      "A 2 minute 24 second walkthrough of the Breakout mobile app, showing how to navigate the platform from your phone. The video shows the app's main screens, including the balance, P&L and equity views. A fast look at managing a Breakout account from your phone.",
    uploadDate: "2026-06-30T19:00:12-07:00",
    duration: "PT2M24S",
  },
  {
    youtubeId: "RecjaAlqGtw",
    title: "Breakout Prop Review 2026: Watch This Before You Sign Up",
    summary:
      "An 8 minute 48 second Breakout Prop review for 2026, made for anyone deciding whether to sign up. The video walks through the Breakout platform and what to know before starting an evaluation. A good place to start if you're comparing Breakout Prop with other prop firms.",
    uploadDate: "2026-05-30T12:30:24-07:00",
    duration: "PT8M48S",
  },
  {
    youtubeId: "Rz4OVHsp_bM",
    title: "Breakout Prop Terminal: 6 Swing Trades for New Traders",
    summary:
      "A 1 minute 21 second look at 6 swing trades marked on the chart in the Breakout terminal, made for new traders. The video shows where each trade sits on the Breakout Prop chart. A quick example of swing trading in the Breakout terminal.",
    uploadDate: "2026-10-31T21:31:53-07:00",
    duration: "PT1M21S",
  },
  {
    youtubeId: "y-IUr9L6VRE",
    title: "How to Use the Breakout Trading Terminal in 2026: Walkthrough",
    summary:
      "An 11 minute 4 second walkthrough of the new Breakout trading terminal, updated for 2026. The video shows how the terminal is laid out and how to use it on a Breakout Prop account. Helpful if you want to see the trading terminal before you sign up.",
    uploadDate: "2026-05-18T18:34:40-07:00",
    duration: "PT11M4S",
  },
  {
    youtubeId: "AHGUUjIczbU",
    title: "Withdrawing Profits from Breakout Prop: A Real Withdrawal Step by Step",
    summary:
      "A 2 minute 3 second video showing a real withdrawal of profits from Breakout Prop and how the process works. Shows how profit withdrawals and payouts are handled.",
    uploadDate: "2026-04-08T20:12:53-07:00",
    duration: "PT2M3S",
  },
  {
    youtubeId: "nVZu_NinACA",
    title: "How I Passed a $100K Breakout Prop Evaluation in One Trade",
    summary:
      "An 8 minute 50 second breakdown of how I passed a $100K evaluation on Breakout Prop with a single trade, including the short entry marked on the chart. Results vary by trader, and this is one example of the trade. One example of what passing a prop firm evaluation can look like.",
    uploadDate: "2026-03-20T08:00:00-07:00",
    duration: "PT8M50S",
  },
  {
    youtubeId: "ivsUiVB4oSM",
    title: "Proof I Got Paid From Breakout Prop: $100K Evaluation Payout (Part 2)",
    summary:
      "A 5 minute 52 second video showing my Breakout Prop payout certificate from a $100K evaluation account, a $58.56 payout. This is Part 2 of the payout series and shows the proof of payment. Proof of a Breakout Prop payout for anyone weighing whether to start an evaluation.",
    uploadDate: "2026-03-22T10:15:39-07:00",
    duration: "PT5M52S",
  },
  {
    youtubeId: "LF8z1I4EIW4",
    title: "How I Opened a $1,000,000 Position on Breakout Prop (Live Proof)",
    summary:
      "A 6 minute 56 second live look at opening a $1,000,000 position on Breakout Prop, with the entry and profit levels marked on the chart. The video shows the position being opened in real time on the Breakout platform. Shows how very large positions work on a prop firm account.",
    uploadDate: "2026-02-18T07:30:00-08:00",
    duration: "PT6M56S",
  },
  {
    youtubeId: "PE8VoKCYDts",
    title: "Breakout Prop: Understanding the Built-In Multiplier Effect",
    summary:
      "A 6 minute 18 second explanation of the built-in leverage on Breakout Prop and how it works on the platform. The video breaks down what the multiplier means for your trades. Explains how built-in leverage works before you start an evaluation.",
    uploadDate: "2025-10-14T20:04:42-07:00",
    duration: "PT6M18S",
  },
];

export function isVideoComplete(v: ReviewVideo) {
  return Boolean(
    v.youtubeId &&
    v.uploadDate &&
    v.duration &&
    !v.title.startsWith("[") &&
    !v.summary.startsWith("["),
  );
}

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const youtubeEmbed = (id: string) => `https://www.youtube.com/embed/${id}`;
export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

// "PT1H2M3S" -> 3723
export function isoDurationToSeconds(iso: string) {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return null;
  return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

// "PT18M33S" -> "18:33", "PT1H2M3S" -> "1:02:03"
export function formatDuration(iso: string) {
  const total = isoDurationToSeconds(iso);
  if (!total) return null;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}
