import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "@/components/AdminPanel";
import { ClickStats } from "@/components/ClickStats";

// NOTE: intentionally unauthenticated for now (per request). Anyone with this URL can push
// contacts to GHL. Add a gate (e.g. Supabase auth) before this matters.
export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-16">

        {/* Click Stats */}
        <section>
          <header className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-2">
              Analytics
            </p>
            <h1 className="font-display text-3xl uppercase tracking-tight">Link Click Stats</h1>
            <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
              Real-time clicks on Breakout and Klein referral buttons.
            </p>
          </header>
          <ClickStats />
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[color:var(--color-purple-400)]/30 to-transparent" />

        {/* GHL Contacts */}
        <section>
          <header className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-2">
              Internal · Backend
            </p>
            <h1 className="font-display text-3xl uppercase tracking-tight">Add contacts to GHL</h1>
            <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
              Push existing client emails and profiles straight into GoHighLevel. No login yet, so
              keep this URL private.
            </p>
          </header>
          <AdminPanel />
        </section>

      </div>
    </div>
  );
}
