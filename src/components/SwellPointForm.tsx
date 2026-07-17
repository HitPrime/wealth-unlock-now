import { useState } from "react";
import { reserveSwellPoint } from "@/lib/claim";

const inputClass =
  "w-full rounded-none border border-[color:var(--color-border)] bg-transparent px-4 py-3 text-base text-foreground placeholder:text-[color:var(--color-muted-foreground)] focus:outline-none focus:border-[color:var(--color-purple-400)]";

export function SwellPointForm() {
  const [email, setEmail] = useState("");
  const [tvUsername, setTvUsername] = useState("");
  const [referral, setReferral] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !tvUsername || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await reserveSwellPoint({
        data: { email, tradingViewUsername: tvUsername, referralCode: referral },
      });
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again in a moment.");
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.10_0.04_300)] p-6 text-center">
        <p className="font-display text-lg uppercase tracking-tight">You're reserved.</p>
        <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
          We'll email you the moment checkout opens, with the steps to get Swell Point onto your
          TradingView charts.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className={inputClass}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        autoComplete="email"
      />
      <input
        className={inputClass}
        type="text"
        required
        value={tvUsername}
        onChange={(e) => setTvUsername(e.target.value)}
        placeholder="Your TradingView username"
      />
      <input
        className={inputClass}
        type="text"
        value={referral}
        onChange={(e) => setReferral(e.target.value)}
        placeholder="Referral code (optional — 5% off)"
      />
      {error && (
        <p role="alert" className="text-xs text-[oklch(0.72_0.17_25)]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-none bg-purple-gradient px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Reserving..." : "Reserve my access →"}
      </button>
      <p className="text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
        Checkout opens soon · You won't be charged today
      </p>
    </form>
  );
}
