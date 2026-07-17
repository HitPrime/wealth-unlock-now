# Build Plan

## Implementation Order

Phases run sequentially. Tasks within a phase can run in parallel unless noted.

## Phase 0 — Setup

### Goal

Project scaffolding wired up, Lovable prototype pulled in, brand assets and integrations in hand.

### Tasks

- [ ] Pull/reconcile code from github.com/theAIhomegirl/wealth-unlock-now into the Vite + React + TypeScript + Tailwind stack
- [ ] Get logo + TradingView screenshot assets from Cassius
- [ ] Connect GHL MCP + Stripe MCP + Supabase

### DONE WHEN

- Dev server runs clean
- Brand assets in repo
- MCPs connected and authenticated

## Phase 1 — Core feature

### Goal

The landing page itself, live and functional.

### Tasks

- [ ] Build on-brand landing page UI (purple gradient, TradingView aesthetic, refreshed logo)
- [ ] Build lead capture form (email + trader profile)
- [ ] Wire form submission to GoHighLevel
- [ ] Deliver the 3 free downloads post-opt-in (TA Decoded, Trading Commandments + Glossary, Voice Video)

### DONE WHEN

- Form submits successfully to GHL
- All 3 downloads are deliverable
- Responsive across mobile/desktop
- Passes a self-review against Meta ad policy language

## Phase 2 — Polish and ship

### Goal

Production-ready, deployed, and safe to send paid traffic to.

### Tasks

- [ ] Cross-browser/device QA
- [ ] Performance pass (load speed for paid ad traffic)
- [ ] Final compliance review
- [ ] Deploy to Vercel + connect domain

### DONE WHEN

- Live on Vercel at production domain
- Page load under ~2s
- Compliance review signed off

## Definition of Done (whole project)

- All `DONE WHEN` checkpoints met across every phase
- Tests and typecheck green
- README updated
- Deployed and verified live
