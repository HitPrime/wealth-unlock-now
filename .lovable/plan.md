# Cassius Cuvée — Landing Page Plan

A top-of-funnel landing page for Cassius Cuvée's trading mentorship. Dark, premium, purple-forward with red/green ticker accents. Every claim stays compliance-safe: no "trading made easy," no income promises, no financial guarantees, no returns talk. Language centers on **mindset, strategy, discipline, community, and lifestyle freedom**.

## Voice & compliance rules (applied everywhere)

- Never say: "make money," "guaranteed," "returns," "profits," "risk-free," "easy money," "trading made easy," or reference dollar amounts.
- Safe framing: "sharpen your edge," "build the trader mindset," "learn a repeatable strategy," "join a community of committed traders," "design a life on your terms," "trade with structure, not emotion."
- Add a persistent risk disclaimer in the footer: "Trading involves substantial risk. Educational content only. Not financial advice. Past performance does not indicate future results."

## Visual direction

- **Palette:** deep near-black background `#0A0612`, primary purple `#7C3AED`, gradient glow `#A855F7 → #6D28D9`, soft violet mist `#C4B5FD`, off-white text `#F5F3FF`, muted `#A79BC7`. Ticker accents only: bull green `#22C55E`, bear red `#EF4444`. Gold accent `#E8C46A` reserved for the coin/logo mark and press-badge outlines.
- **Typography:** Display — **Sora** (bold, geometric, confident). Body — **Inter Tight**. Numerals/tickers — **JetBrains Mono** for chart-style micro-labels.
- **Textures:** subtle grain overlay, faint candlestick silhouettes in section backgrounds at ~8% opacity, radial purple glows behind key elements.
- **Motion inspired by jsmfitness.net:** grayscale → color on hover for imagery, soft lift + glow on cards, magnetic CTA buttons, section reveals on scroll, marquee for press bar.

## Page structure (single scroll)

```text
[ Sticky nav ]
[ HERO — split, above the fold ]
[ Press bar — WSJ / CNBC / Squawk on the Street ]
[ Who this is for ]
[ The Mindset Shift — 3 pillars ]
[ Inside the Community — feature grid ]
[ Meet Cassius — bio + lifestyle collage ]
[ Social proof — member wall ]
[ Accolades — deep dive on 3 features ]
[ FAQ ]
[ Final CTA ]
[ Footer + risk disclaimer ]
```

### 1. Sticky nav
Left: Cassius Cuvée wordmark (placeholder until logo lands). Right: Community · Mentorship · Press · FAQ · **Join Free Training** (primary button, purple gradient with glow).

### 2. Hero (above the fold, split layout as requested)
- **Left column (55%):** silhouette image (uploaded purple figure) with animated purple radial glow behind him, faint candle chart bleeding off the left edge, subtle floating particles.
- **Right column (45%):**
  - Eyebrow: "TRADER MENTORSHIP · COMMUNITY OF 600+"
  - H1: **"Trade with structure. Live on your terms."**
  - Sub: "Cassius Cuvée helps everyday people build the mindset, discipline, and strategy of a serious trader — without the noise."
  - Primary CTA: **Join the Free Training** (purple gradient, glow, magnetic hover)
  - Secondary: **See Inside the Community** (ghost button)
  - Trust row under CTAs: "As seen on" mini logos (WSJ · CNBC · Squawk on the Street), 600+ members chip, 4.9★ chip.
- **Background:** animated candlestick line rising diagonally behind the split, red/green candles occasionally pulsing.

### 3. Press bar (immediately below hero)
Full-width dark band, gold hairline top/bottom, marquee of the 3 accolades as text logos (until real logos arrive): **THE WALL STREET JOURNAL · CNBC · SQUAWK ON THE STREET**.

### 4. Who this is for
Two-column: "This is for you if…" / "This isn't for you if…" — checklists frame it around commitment and mindset (never money).

### 5. The Mindset Shift — 3 pillars
Three cards, hover-lift with purple edge glow:
1. **Think Like a Trader** — mental frameworks, patience, emotional control.
2. **Build a Repeatable Process** — structured setups, journaling, review.
3. **Design Your Lifestyle** — freedom of schedule, working from anywhere, being present for family.

### 6. Inside the Community — feature grid (bento)
Mixed-size cards: Live sessions · Strategy breakdowns · Chart-of-the-day · Accountability check-ins · Member wins wall · Beginner-friendly onboarding. Each card has a small monospace label and a subtle chart glyph.

### 7. Meet Cassius
Left: portrait placeholder (B&W → color on hover, jsmfitness-style). Right: short bio positioning him as an educator focused on mindset and discipline, not predictions. Small stat chips: "600+ members," "Featured in national media," "Years mentoring traders."

### 8. Social proof — member wall
Masonry grid of ~9 testimonial cards (placeholder screenshots styled as chat/Discord cards). Each card: avatar, handle, timestamp, quote. Cards subtly tilt and lift on hover. Cycle testimonials with a soft fade.

### 9. Accolades — deep dive
Three large horizontal cards, each with a big serif quote-mark, outlet name, context, and a "Read more" link (placeholder):
- **The Wall Street Journal** — cover feature.
- **CNBC** — on-air interview.
- **Squawk on the Street** — discussed by Jim Cramer & David Faber.

### 10. FAQ
Accordion. Questions cover: experience level required, time commitment, what's inside, is this financial advice (clear "no — education only"), refund/cancellation, tech needed.

### 11. Final CTA
Full-bleed purple gradient panel, silhouette echo, headline: **"Ready to trade with intention?"** Sub: "Start with the free training. See if the community is right for you." Big primary CTA + micro-copy "No card required."

### 12. Footer
Wordmark, nav, social icons, and the full risk disclaimer in muted text. Copyright.

## Technical build

- **Stack:** existing TanStack Start + Tailwind v4. All content on `src/routes/index.tsx` composed from section components in `src/components/landing/`.
- **Design tokens** added to `src/styles.css` under `@theme`: purple scale, bg, gold accent, bull/bear, gradients (`--gradient-purple`, `--gradient-hero`), shadows (`--shadow-glow`, `--shadow-card`).
- **Fonts:** `bun add @fontsource/sora @fontsource/inter-tight @fontsource/jetbrains-mono`; import in `src/main.tsx`; register families in `@theme`.
- **Motion:** `framer-motion` for reveals, hover lifts, magnetic CTA, animated candlestick line. Respect `prefers-reduced-motion`.
- **Imagery:** upload the provided silhouette via lovable-assets; use tasteful placeholder images (dark lifestyle stock via `https://images.unsplash.com` w/ purple duotone treatment via CSS filters) for member/lifestyle shots until real assets arrive.
- **SEO/head:** route `head()` sets title "Cassius Cuvée — Trader Mentorship & Community," description focused on mindset/strategy/community, matching og:title/description, og:type website, twitter summary_large_image. No og:image until a real hero render exists.
- **Accessibility:** semantic landmarks, single H1, alt text on all imagery, focus-visible rings in purple, WCAG-AA contrast on body copy.
- **Placeholders clearly swappable:** logo wordmark component, `PRESS_LOGOS`, `TESTIMONIALS`, and `MEET_CASSIUS_BIO` exported from a single `src/content/landing.ts` so you can edit copy and swap assets in one place later.

## What I'll ask you for after v1 ships

Real logo file, member-testimonial screenshots, portrait of Cassius, and any approved copy blocks he wants verbatim.
