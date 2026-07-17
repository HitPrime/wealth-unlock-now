import { createFileRoute } from "@tanstack/react-router";
import { SwellPointForm } from "@/components/SwellPointForm";

// Built as a route for now. It's designed to be lifted onto its own domain later, since other
// affiliates will drive traffic to it. Keep it self-contained (no shared landing chrome).
export const Route = createFileRoute("/swell-point")({
  component: SwellPoint,
});

const FEATURES = [
  "A proprietary professional indicator, live on your TradingView charts",
  "Built to make the read clearer, not to promise an outcome",
  "Works alongside the tools taught in the course",
];

function SwellPoint() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-3">
            Swell Point Indicator · $199
          </p>
          <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
            See the market with more structure.
          </h1>
          <p className="mt-4 text-[color:var(--color-muted-foreground)] leading-relaxed">
            Cassius's proprietary indicator for TradingView. Add it to your charts and read price
            action with a clearer framework. It's a tool for your own analysis, not financial
            advice or a signal to follow blindly.
          </p>
        </header>

        <ul className="mb-8 space-y-2">
          {FEATURES.map((f) => (
            <li key={f} className="flex gap-2 text-sm text-foreground/90">
              <span className="text-[color:var(--color-purple-300)]">→</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mb-8 border border-[color:var(--color-purple-400)]/30 bg-[oklch(0.12_0.05_300/0.6)] p-5">
          <p className="font-display text-sm uppercase tracking-tight mb-2">Referral rewards</p>
          <p className="text-sm text-[color:var(--color-muted-foreground)] leading-relaxed">
            Share your code and earn <span className="text-foreground">10% cash back</span> when
            someone buys with it. They get <span className="text-foreground">5% off</span> at
            checkout. Your code is issued after purchase.
          </p>
        </div>

        <div className="border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.10_0.04_300)] p-6 sm:p-8">
          <p className="font-display text-lg uppercase tracking-tight mb-1">Reserve your access</p>
          <p className="text-sm text-[color:var(--color-muted-foreground)] mb-4">
            Drop your email and TradingView username. We'll get you set up the moment checkout
            opens.
          </p>
          <SwellPointForm />
        </div>

        <p className="mt-8 text-center text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          Education only · Not financial advice
        </p>
      </div>
    </div>
  );
}
