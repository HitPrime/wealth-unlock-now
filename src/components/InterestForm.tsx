import { useState } from "react";
import { captureInterest } from "@/lib/claim";

// Reusable waitlist capture for offers that aren't purchasable yet (no Stripe).
// Adds the email to GHL with a fixed interest tag.
export function InterestForm({
  interest,
  cta,
}: {
  interest: "vip" | "merch" | "swellpoint";
  cta: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await captureInterest({ data: { email, interest } });
      setDone(true);
    } catch {
      setError("Something went wrong. Try again in a moment.");
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-purple-200)]">
        You're on the list. We'll email you the moment it opens.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          className="flex-1 rounded-none border border-[color:var(--color-border)] bg-transparent px-4 py-3 text-base text-foreground placeholder:text-[color:var(--color-muted-foreground)] focus:outline-none focus:border-[color:var(--color-purple-400)]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-none bg-purple-gradient px-8 py-4 text-base font-semibold uppercase tracking-[0.15em] text-white shadow-glow hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Adding..." : cta}
        </button>
      </div>
      {error && (
        <p role="alert" className="text-xs text-[oklch(0.72_0.17_25)]">
          {error}
        </p>
      )}
    </form>
  );
}
