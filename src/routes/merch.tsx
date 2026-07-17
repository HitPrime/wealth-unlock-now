import { createFileRoute } from "@tanstack/react-router";
import { InterestForm } from "@/components/InterestForm";

export const Route = createFileRoute("/merch")({
  component: Merch,
});

// Placeholder catalog. Swap in real products, images, and prices when they're ready.
const PRODUCTS = [
  { name: "Trader's Commandments Poster", price: "$29" },
  { name: "Cassius Cuvée Tee", price: "$34" },
  { name: "Swell Point Cap", price: "$28" },
  { name: "Blueprint Mug", price: "$18" },
];

function Merch() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-12 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-3">
            The Shop
          </p>
          <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
            Wear the mindset.
          </h1>
          <p className="mt-4 text-[color:var(--color-muted-foreground)] leading-relaxed">
            Physical gear for the Cassius Cuvée community. Checkout opens soon.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="group border border-[color:var(--color-border)] bg-[oklch(0.12_0.05_300/0.6)] overflow-hidden transition hover:border-[color:var(--color-purple-400)]/60"
            >
              <div className="aspect-square w-full bg-[oklch(0.08_0.03_300)] flex items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
                  Photo soon
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-display text-sm uppercase tracking-tight">{p.name}</h2>
                <p className="mt-1 text-sm text-[color:var(--color-purple-200)]">{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.10_0.04_300)] p-6 sm:p-8 text-center">
          <p className="font-display text-lg uppercase tracking-tight mb-1">First dibs on the drop.</p>
          <p className="text-sm text-[color:var(--color-muted-foreground)] mb-4">
            Get notified the moment the shop opens.
          </p>
          <div className="mx-auto max-w-md">
            <InterestForm interest="merch" cta="Notify me" />
          </div>
        </div>
      </div>
    </div>
  );
}
