# Product Requirements Document

## Problem

New and inconsistent traders don't have an accessible, trustworthy entry point into trading education — most trading content feels intimidating, sketchy, or "get rich quick." Cassius needs a polished top-of-funnel landing page that converts cold paid-ad traffic into leads (email + trader profile) via a free lead magnet, then moves them up a value ladder toward paid offers. It must read as legitimate and trustworthy (not hypey) and stay compliant with Facebook/Meta ad policy — no exaggerated income claims or flagged language, since this is where paid ad traffic lands first.

## Audience

Everyday people — not necessarily experienced or "smart" traders — who are new to or inconsistent in trading and want financial freedom: supporting their family, traveling, not answering to an alarm clock or a job. They're drawn to the lifestyle/wealth feeling more than technical sophistication. The funnel should feel accessible: "you don't have to be smart, you have to be strategic, and this unlocks the strategy." Landing here cold from paid ads, so first impression = trust and legitimacy.

## Goals

3–5 outcomes this product must deliver, phrased as observable results, not features. These are industry-benchmark starting estimates — tune with real data post-launch.

- ≥25% opt-in rate on the lead magnet page for paid-ad traffic
- ≥3% of new leads purchase the $17 Starter Kit bump offer within 24 hours of opting in
- Zero Meta/Facebook ad policy rejections on first submission
- ≥2% of the email list converts to the $199 Swell Point Indicator within 90 days
- Page reads as trustworthy/legitimate in pre-launch gut-check testing with outside testers

## Non-Goals

What this product is explicitly NOT trying to do. All 6 value-ladder steps are in scope, but not at the cost of quality or security.

- Not shipping any step (payment flow, course content, indicator delivery) in a partially-working or insecure state just to hit a launch date
- Not building custom backend infrastructure for CRM, course hosting, or payments — using GoHighLevel + Stripe (via their MCPs) and Supabase rather than reinventing those systems
- Not making unverifiable income/lifestyle claims or before/after promises that risk Meta ad account restrictions

## User Stories

- As a new visitor arriving from a paid ad, I want to quickly understand the offer and feel it's trustworthy, so that I'm comfortable giving my email and trader profile for the free downloads.
- As a lead who just opted in, I want to see a clear, low-risk next step ($17 Starter Kit), so that I can get hands-on guidance without a big commitment.
- As someone who finished the Starter Kit, I want an easy way to enter my TradingView username and pay for the Swell Point Indicator, so that I can start using it without friction.
- As a Swell Point Indicator customer, I want a shareable referral code, so that I earn cash-back rewards when others use it.
- As a trader ready to go deeper, I want to enroll in the full Training Course or join VIP Membership, so that I get ongoing education, live setups, and direct access to Cassius.

## Success Metrics

- Cost per lead (CPL) low enough that Starter Kit + Indicator revenue covers ad spend within a 30-day payback window
- Average revenue per lead (ARPL) across the full value ladder, tracked at 90 days
- Zero Meta ad account policy strikes or restrictions
- Cold-visitor-to-paid-purchase conversion tracked monthly to catch drop-off points in the funnel

## Scope (V1)

V1 is the landing page only — the design here informs the rest of the funnel, so it ships first and solid.

- Fully designed, on-brand landing page (purple gradient / TradingView-inspired aesthetic, refreshed logo) for the free lead magnet
- Delivers the 3 free downloads: TA Decoded, Trading Commandments + Glossary, Voice Video
- Lead capture form (email + trader profile) wired into GoHighLevel
- Meta/Facebook ad policy compliance pass on copy and design
- Mobile-responsive, fast-loading, trustworthy visual design
- Deployed to Vercel, ready to receive paid ad traffic

**Roadmapped for later (documented, not built in V1):** $17 Starter Kit bump offer, $199 Swell Point Indicator (with referral system), $999 Training Course, $49/mo VIP Membership, $500/hr 1-on-1 Consulting.

## Risks and Open Questions

- Meta ad policy compliance — copy/design must avoid flagged language or unverifiable income claims
- Brand assets pending — logo (needs refinement) and TradingView screenshot (purple gradient reference) not yet delivered
- Lovable prototype reconciliation — existing Lovable build needs to be exported/synced and reconciled with the Vite + React + TS + Tailwind stack
- GHL + Stripe MCP integration complexity — connecting HighLevel and Stripe MCPs to this project is untested

## References

- Lovable prototype: https://wealth-unlock-now.lovable.app
