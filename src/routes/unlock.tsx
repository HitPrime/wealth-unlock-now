import { createFileRoute } from "@tanstack/react-router";
import { LeadMagnetForm } from "@/components/lead-magnet/LeadMagnetForm";

export const Route = createFileRoute("/unlock")({
  component: Unlock,
});

function Unlock() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-3">
            Free · No card required
          </p>
          <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
            Unlock your free Trading Starter Kit.
          </h1>
          <p className="mt-4 text-[color:var(--color-muted-foreground)] leading-relaxed">
            Tell us where to send it and we'll email you the whole kit: the Blueprint, the
            Commandments and Glossary, and the First Trade Walkthrough. Then take 60 seconds so we
            can point you to the right first step.
          </p>
        </header>

        <div className="border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.10_0.04_300)] p-6 sm:p-8">
          <LeadMagnetForm />
        </div>

        <p className="mt-6 text-center text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          Education only · Not financial advice · We never sell your info
        </p>
      </div>
    </div>
  );
}
