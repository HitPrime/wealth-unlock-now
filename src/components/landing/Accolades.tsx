import { PRESS } from "@/content/landing";
import { SectionHeader } from "./WhoFor";
import { SectionCta } from "./Cta";
import wsjImg from "@/assets/press/appearances/wsj.png";
import cnbcImg from "@/assets/press/appearances/cnbc.png";

const APPEARANCE_IMAGES: Record<string, string> = {
  WSJ: wsjImg,
  CNBC: cnbcImg,
};

export function Accolades() {
  return (
    <section className="relative py-24 bg-[oklch(0.08_0.04_300)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Recognition"
          title="Featured across national media."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRESS.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[oklch(0.14_0.06_300/0.7)] transition hover:border-[color:var(--color-gold)]/60"
            >
              {p.short === "Squawk on the Street" ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/dUv_GldZFns?start=29&end=38&autoplay=0&rel=0&modestbranding=1"
                    title="Squawk on the Street"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                    style={{ border: "none" }}
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={APPEARANCE_IMAGES[p.short]}
                    alt={`${p.name} appearance`}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[oklch(0.14_0.06_300)] to-transparent"
                  />
                </div>
              )}
              <div className="p-8">
                <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-gold)] uppercase">
                  {p.context}
                </p>
                <p className="font-display text-2xl font-bold tracking-tight">
                  {p.name}
                </p>
                <p className="mt-3 text-lg text-[color:var(--color-muted-foreground)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <SectionCta note="Get the free Starter Kit." />
      </div>
    </section>
  );
}
