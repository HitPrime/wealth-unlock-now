# Messaging Strategy — Trading Made Easy

## Target Customer

**Beginner Trader** — signed up for a platform, watched hours of videos, still feels lost. Doesn't understand terminology. Scared to place a real trade.

**Inconsistent Trader** — has traded before but jumps between strategies, lacks confidence, wants structure.

---

## Pain Points (Compliance-Friendly)

Framed around **education gaps and confusion** — NOT around money lost or financial outcomes. Safe for paid ads.

1. They signed up for a trading platform and have no idea what a stop loss or take profit is.
2. They watch trading videos and hear words like "leverage," "liquidity," and "risk management" and feel completely lost.
3. They want to start trading but are scared of clicking the wrong button.
4. They jump between YouTube channels trying to find someone who explains things simply.
5. They feel overwhelmed and think trading is only for people with huge amounts of money or years of experience.

---

## Desired Outcomes

What the customer wants to feel/be able to do after engaging with Cassius's content:

1. Understand trading in plain English.
2. Feel confident placing their first trade.
3. Learn how leverage works and how to manage risk responsibly.
4. Have a simple step-by-step process instead of guessing.
5. Finally feel like they know what they're doing when they open a chart.

---

## Compliance Rules for Ad Copy

- Frame pain points around **confusion and education gaps** — never money lost, bad trades, or financial regret
- **No income claims** — "understand," "learn," "feel confident" ✓ / "earn," "profit," "returns" ✗
- **No lifestyle promises** — "quit your job," "trade from the beach," "replace your income" are all off-limits
- No guaranteed results of any kind
- Every ad and landing page must carry the disclaimer from `src/content/landing.ts → DISCLAIMER`

---

## Brand Voice Quick Reference

| Sounds like | Never sounds like |
|---|---|
| "I know this looks confusing, but let me break it down." | "Get rich quick." |
| "Nobody is born knowing this stuff." | "I made $100,000 this week." |
| "Let's simplify it." | "Quit your job." |
| Calm, confident, conversational | Fake guru hype |

Full brand profile: see project memory `cassius-brand.md`.

---

## Content in Code

Live in `src/content/landing.ts`:
- `PAIN_POINTS` — the 5 pain points above, ready to render
- `OUTCOMES` — the 5 desired outcomes above, ready to render

These should be the source of truth for any pain point section, ad creative brief, or email copy.
