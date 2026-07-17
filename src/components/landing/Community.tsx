import { COMMUNITY_FEATURES } from "@/content/landing";
import { SectionHeader } from "./WhoFor";

export function Community() {
  return (
    <section id="community" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Inside the Community"
          title="A room where beginners are actually welcome."
          sub="No gatekeeping. No guru energy. Just traders at every level helping each other figure this out."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {COMMUNITY_FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[oklch(0.14_0.06_300/0.7)] p-7 transition hover:border-[color:var(--color-purple-400)] hover:-translate-y-1 ${f.span}`}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-purple-200)] uppercase">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase">{f.title}</h3>
              <p className="mt-2 text-[color:var(--color-muted-foreground)]">{f.body}</p>
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-purple-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}