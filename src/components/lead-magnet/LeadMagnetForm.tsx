import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { captureLead, saveTraderProfile } from "@/lib/claim";
import { COUNTRIES } from "@/content/countries";
import { TRADER_PROFILE, collectProfileTags } from "@/content/leadMagnet";

const inputClass =
  "w-full rounded-none border border-[color:var(--color-border)] bg-transparent px-4 py-3 text-base text-foreground placeholder:text-[color:var(--color-muted-foreground)] focus:outline-none focus:border-[color:var(--color-purple-400)]";

const primaryBtn =
  "w-full rounded-none bg-purple-gradient px-8 py-5 text-base font-semibold uppercase tracking-[0.15em] text-white shadow-glow hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed";

type Answers = Record<string, string | string[]>;

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full rounded-none border px-5 py-4 text-base text-left transition ${
        selected
          ? "border-[color:var(--color-purple-400)] bg-[color:var(--color-purple-400)]/15 text-foreground shadow-glow"
          : "border-[color:var(--color-border)] bg-transparent text-[color:var(--color-muted-foreground)] hover:border-[color:var(--color-purple-400)]/60 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function LeadMagnetForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [contactId, setContactId] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [answers, setAnswers] = useState<Answers>({});

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step1Valid = Boolean(firstName && lastName && email && country);

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!step1Valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const { contactId: id } = await captureLead({
        data: { firstName, lastName, email, country },
      });
      setContactId(id);
      setStep(2);
    } catch {
      setError("Something went wrong. Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSingle = (questionId: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

  const toggleMulti = (questionId: string, value: string) =>
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [questionId]: next };
    });

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      // The contact + kit were already captured in Step 1. Enrich with segment tags,
      // but never block the kit on this call: land on the thank-you page regardless.
      if (contactId) {
        await saveTraderProfile({ data: { contactId, tags: collectProfileTags(answers) } });
      }
      await navigate({ to: "/thank-you" });
    } catch {
      await navigate({ to: "/thank-you" });
    }
  };

  if (step === 1) {
    return (
      <form onSubmit={handleStep1} className="space-y-4">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)]">
          Step 1 of 2 · Required to unlock
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            className={inputClass}
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            autoComplete="given-name"
          />
          <input
            className={inputClass}
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            autoComplete="family-name"
          />
        </div>
        <input
          className={inputClass}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
        />
        <select
          className={`${inputClass} appearance-none`}
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="" disabled>
            Country
          </option>
          {COUNTRIES.map((c) =>
            c === "---" ? (
              <option key={c} disabled>
                ──────────
              </option>
            ) : (
              <option key={c} value={c}>
                {c}
              </option>
            ),
          )}
        </select>
        {error && (
          <p role="alert" className="text-xs text-[oklch(0.72_0.17_25)]">
            {error}
          </p>
        )}
        <button type="submit" disabled={!step1Valid || submitting} className={primaryBtn}>
          {submitting ? "Unlocking..." : "Continue →"}
        </button>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          For educational purposes only · Not financial advice
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleStep2} className="space-y-8">
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)]">
          Step 2 of 2 · Your trader profile
        </p>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Helps us point you to the right first step. Takes 60 seconds, all taps, no typing.
        </p>
      </div>

      {TRADER_PROFILE.map((question) => {
        const answer = answers[question.id];
        return (
          <fieldset key={question.id} className="space-y-2">
            <legend className="font-display text-sm uppercase tracking-wide text-foreground">
              {question.label}
              {question.hint && (
                <span className="ml-2 font-mono text-[10px] normal-case tracking-normal text-[color:var(--color-muted-foreground)]">
                  {question.hint}
                </span>
              )}
            </legend>
            <div className="grid grid-cols-1 gap-2">
              {question.options.map((option) => {
                const selected =
                  question.type === "single"
                    ? answer === option.value
                    : Array.isArray(answer) && answer.includes(option.value);
                return (
                  <OptionButton
                    key={option.value}
                    selected={selected}
                    onClick={() =>
                      question.type === "single"
                        ? toggleSingle(question.id, option.value)
                        : toggleMulti(question.id, option.value)
                    }
                  >
                    {option.label}
                  </OptionButton>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {error && (
        <p role="alert" className="text-xs text-[oklch(0.72_0.17_25)]">
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting} className={primaryBtn}>
        {submitting ? "Sending your kit..." : "Get My Free Kit →"}
      </button>
    </form>
  );
}
