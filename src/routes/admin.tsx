import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "@/components/AdminPanel";

// NOTE: intentionally unauthenticated for now (per request). Anyone with this URL can push
// contacts to GHL. Add a gate (e.g. Supabase auth) before this matters.
export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10">
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
      </div>
    </div>
  );
}
