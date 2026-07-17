import { FOR_YOU, NOT_FOR_YOU } from "@/content/landing";
import { Check, X } from "lucide-react";

export function WhoFor() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Who this is for"
          title="Honest about who this helps."
          sub="The kit is free. What it asks is that you actually want to learn. Not just feel like you're doing something."
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Column
            title="This is for you if…"
            items={FOR_YOU}
            icon={<Check className="h-4 w-4" />}
            positive
          />
          <Column
            title="This isn't for you if…"
            items={NOT_FOR_YOU}
            icon={<X className="h-4 w-4" />}
            positive={false}
          />
        </div>
      </div>
    </section>
  );
}

function Column({
  title,
  items,
  icon,
  positive,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  positive: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[oklch(0.14_0.06_300/0.6)] backdrop-blur p-8">
      <h3 className="font-display text-xl font-bold uppercase mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3">
            <span
              className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${
                positive
                  ? "bg-[oklch(0.72_0.19_145/0.15)] text-[color:var(--color-bull)]"
                  : "bg-[oklch(0.65_0.24_25/0.15)] text-[color:var(--color-bear)]"
              }`}
            >
              {icon}
            </span>
            <span className="text-[color:var(--color-muted-foreground)] leading-relaxed">
              {t}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <p className="font-mono text-xs tracking-[0.2em] text-[color:var(--color-purple-200)] uppercase mb-4">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-[1.05] tracking-tight">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-lg text-[color:var(--color-muted-foreground)]">
          {sub}
        </p>
      )}
    </div>
  );
}