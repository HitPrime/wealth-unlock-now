import { createFileRoute } from "@tanstack/react-router";
import { InterestForm } from "@/components/InterestForm";

export const Route = createFileRoute("/vip")({
  component: Vip,
});

const PERKS = [
  {
    title: "Live trade setups",
    body: "Watch real setups as they form, with the reasoning spelled out so you learn the why, not just the what.",
  },
  {
    title: "Prediction market picks",
    body: "Ideas and reads on Polymarket and Kalshi, shared as they come up.",
  },
  {
    title: "Q&A access",
    body: "Bring your questions and get them answered instead of guessing alone.",
  },
  {
    title: "Direct access to Cassius",
    body: "The closest thing to trading next to someone who has been where you are.",
  },
];

function Vip() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-12 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-3">
            VIP Zone · $49/mo
          </p>
          <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
            Stay close to the work.
          </h1>
          <p className="mt-4 text-[color:var(--color-muted-foreground)] leading-relaxed">
            The inner circle for members who want live setups, direct access, and to keep learning
            in real time. It's mentorship and education, not signals to blindly copy.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {PERKS.map((p) => (
            <div
              key={p.title}
              className="border border-[color:var(--color-border)] bg-[oklch(0.12_0.05_300/0.6)] p-6"
            >
              <h2 className="font-display text-lg uppercase tracking-tight">{p.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)] leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.10_0.04_300)] p-6 sm:p-8">
          <p className="font-display text-lg uppercase tracking-tight mb-1">
            Doors are opening soon.
          </p>
          <p className="text-sm text-[color:var(--color-muted-foreground)] mb-4">
            Drop your email and you'll be first to know when VIP membership opens.
          </p>
          <InterestForm interest="vip" cta="Notify me" />
        </div>

        <p className="mt-8 text-center text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          Education only · Not financial advice
        </p>
      </div>
    </div>
  );
}
