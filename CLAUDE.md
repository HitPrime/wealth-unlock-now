# Trading Made Easy Funnel

## Project Snapshot

- App: Trading Made Easy Funnel
- Purpose: Top-of-funnel landing page for Cassius's "Trading Made Easy" course — converts paid-ad traffic into leads via a free lead magnet, then guides everyday people up a value ladder (Starter Kit → Swell Point Indicator → Training Course → VIP Membership → 1-on-1 Consulting).
- Stack: TanStack Start + TanStack Router + React 19 + TypeScript + Tailwind v4 (built via Lovable, synced to github.com/theAIhomegirl/wealth-unlock-now)
- Package manager: npm
- Deployment: Vercel

## Working Rules

- Read existing code before changing anything.
- Make small, focused changes — not big rewrites.
- This project is still connected to Lovable's live editor. Never force-push, rebase, amend, or squash pushed commits on `main` — it rewrites history on Lovable's side and can destroy project history there (see `AGENTS.md`). Commit normally and push straight to `main`.
- Run typecheck before saying done (`npm run check`). No test framework is installed yet — see Key Commands.
- Never add secrets to tracked files.
- Ask before adding new dependencies.

## Key Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`
- Format: `npm run format`
- Typecheck: `npm run check`
- Test: not yet wired — no test framework installed. Pick one (Vitest/Playwright) and ask before adding.

## Repository Map

- `src/routes/` TanStack Router routes (`index.tsx` is the landing page)
- `src/components/landing/` landing page section components (Hero, PressBar, WhoFor, Pillars, Community, MeetCassius, SocialProof, Accolades, Faq, FinalCta, Footer, Nav, StarterKitDialog)
- `src/components/ui/` shadcn/radix UI primitives
- `src/content/landing.ts` swappable copy/content (press logos, testimonials, bio)
- `src/assets/` image assets (logo, hero, press logos)
- `src/styles.css` design tokens (`@theme`: purple scale, gradients, shadows)
- `public/` static assets
- `spec/` plan and PRD live here
- `.lovable/` Lovable's own project plan and sync metadata — do not edit `project.json`

## Tech Stack Details

- Frontend: React 19 via TanStack Start + TanStack Router
- Styling: Tailwind v4 + shadcn/radix UI + Framer Motion for animation
- Backend: GoHighLevel (CRM, course hosting, HighLevel MCP + Stripe MCP integrations) + Supabase
- Database: Supabase

## Build Plan

For the current build plan, see `/spec/plan.md`.
Always check task completion status before starting new work.

For non-negotiable security rules, see `SECURITY.md`.
For local personal overrides, see `CLAUDE.local.md` (gitignored).

## Messaging & Copy Strategy

For pain points, desired outcomes, compliance rules for ad copy, and brand voice guidelines, see `spec/messaging.md`.

All copy on this page must:
- Frame pain around **education gaps** — never money lost or financial outcomes (ad compliance)
- Use no income claims, no lifestyle promises, no guaranteed results
- Sound like Cassius: calm, confident, plain English, never salesy
