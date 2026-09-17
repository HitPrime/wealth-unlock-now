import { createFileRoute } from "@tanstack/react-router";
import { ClickStats } from "@/components/ClickStats";

// NOTE: intentionally unauthenticated for now (per request). Keep this URL private.
export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-2">
            Analytics
          </p>
          <h1 className="font-display text-3xl uppercase tracking-tight">Link Click Stats</h1>
          <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
            Real-time visitors and clicks on Breakout, Klein, and Kast pages.
          </p>
        </header>
        <ClickStats />
      </div>
    </div>
  );
}
