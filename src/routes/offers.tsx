import { createFileRoute } from "@tanstack/react-router";
import { VALUE_LADDER } from "@/content/valueLadder";

export const Route = createFileRoute("/offers")({
  component: Offers,
});

function Offers() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-14 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-3">
            The Path
          </p>
          <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
            From zero to serious, one step at a time.
          </h1>
          <p className="mt-4 text-[color:var(--color-muted-foreground)] leading-relaxed">
            Everything Cassius teaches, in order. Start free and go as far as you want. It's
            education and tools, never a promise of results.
          </p>
        </header>

        <div className="space-y-5">
          {VALUE_LADDER.map((s) => (
            <article
              key={s.step}
              className="border border-[color:var(--color-border)] bg-[oklch(0.12_0.05_300/0.6)] p-6 sm:p-8 transition hover:border-[color:var(--color-purple-400)]/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)]">
                    Step {s.step}
                  </p>
                  <h2 className="font-display text-2xl uppercase tracking-tight mt-1">{s.name}</h2>
                </div>
                <span className="shrink-0 font-display text-xl text-[color:var(--color-purple-200)]">
                  {s.price}
                </span>
              </div>
              <p className="mt-2 text-[color:var(--color-muted-foreground)]">{s.tagline}</p>
              <ul className="mt-4 space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-foreground/90">
                    <span className="text-[color:var(--color-purple-300)]">→</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {s.cta.soon ? (
                  <span className="inline-block rounded-none border border-[color:var(--color-border)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--color-muted-foreground)]">
                    {s.cta.label}
                  </span>
                ) : (
                  <a
                    href={s.cta.href}
                    className="inline-block rounded-none bg-purple-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-glow hover:brightness-110 transition"
                  >
                    {s.cta.label} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          Education only · Not financial advice
        </p>
      </div>
    </div>
  );
}
