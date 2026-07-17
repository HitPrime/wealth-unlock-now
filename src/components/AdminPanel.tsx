import { useState } from "react";
import { adminAddContact, adminBulkAddContacts } from "@/lib/claim";

const inputClass =
  "w-full rounded-none border border-[color:var(--color-border)] bg-transparent px-4 py-3 text-base text-foreground placeholder:text-[color:var(--color-muted-foreground)] focus:outline-none focus:border-[color:var(--color-purple-400)]";
const btnClass =
  "rounded-none bg-purple-gradient px-8 py-4 text-base font-semibold uppercase tracking-[0.15em] text-white shadow-glow hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed";

function SingleAdd() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tags, setTags] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || busy) return;
    setBusy(true);
    setMsg(null);
    try {
      await adminAddContact({ data: { email, firstName, lastName, tags } });
      setMsg(`Added ${email}.`);
      setEmail("");
      setFirstName("");
      setLastName("");
      setTags("");
    } catch {
      setMsg("Failed. Check the email and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className={inputClass}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email (required)"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          className={inputClass}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
        />
        <input
          className={inputClass}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
        />
      </div>
      <input
        className={inputClass}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="tags, comma, separated (optional)"
      />
      <button type="submit" disabled={busy} className={btnClass}>
        {busy ? "Adding..." : "Add to GHL"}
      </button>
      {msg && <p className="text-xs text-[color:var(--color-purple-200)]">{msg}</p>}
    </form>
  );
}

function BulkAdd() {
  const [emails, setEmails] = useState("");
  const [tag, setTag] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emails.trim() || busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await adminBulkAddContacts({ data: { emails, tag } });
      setMsg(`Pushed ${res.added} of ${res.total} (failed ${res.failed}). Max 100 per run.`);
      if (res.failed === 0) setEmails("");
    } catch {
      setMsg("Bulk push failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <textarea
        className={`${inputClass} min-h-[140px] resize-y`}
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="Paste emails, one per line or comma-separated (max 100 per run)"
      />
      <input
        className={inputClass}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="tag to apply to all (optional, e.g. existing-client)"
      />
      <button type="submit" disabled={busy} className={btnClass}>
        {busy ? "Pushing..." : "Push all to GHL"}
      </button>
      {msg && <p className="text-xs text-[color:var(--color-purple-200)]">{msg}</p>}
    </form>
  );
}

export function AdminPanel() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section>
        <h2 className="font-display text-lg uppercase tracking-tight mb-3">Add one contact</h2>
        <SingleAdd />
      </section>
      <section>
        <h2 className="font-display text-lg uppercase tracking-tight mb-3">Bulk import</h2>
        <BulkAdd />
      </section>
    </div>
  );
}
