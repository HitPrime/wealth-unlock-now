import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./WhoFor";
import { SectionCta } from "./Cta";
import { TESTIMONIALS } from "@/content/landing";

// Only show real testimonials (first 2 for now)
const VISIBLE = TESTIMONIALS.slice(0, 2);

function TestimonialCard({
  name,
  text,
  index,
}: {
  name: string;
  text: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const initial = { opacity: 0, y: 24 };
  const animate = inView ? { opacity: 1, y: 0 } : initial;

  return (
    <motion.figure
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[oklch(0.13_0.06_300/0.8)] p-6 sm:p-7 transition duration-500 hover:-translate-y-1 hover:border-[color:var(--color-purple-400)]/70 hover:shadow-glow"
    >
      {/* Soft corner glow that brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full bg-[oklch(0.60_0.24_290/0.18)] blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
      />
      {/* Gold accent line across the top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/60 to-transparent"
      />

      {/* Large quote mark */}
      <span
        aria-hidden
        className="relative font-display text-5xl leading-[0.6] text-[color:var(--color-gold)]/90 select-none"
      >
        &ldquo;
      </span>

      {/* Quote */}
      <blockquote className="relative mt-4 flex-1 text-[15px] leading-relaxed text-foreground/85">
        {text}
      </blockquote>

      {/* Name */}
      <figcaption className="relative mt-6 flex items-center gap-3 border-t border-[color:var(--color-border)] pt-5">
        <div
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-gradient font-display text-sm font-bold text-white ring-1 ring-[color:var(--color-gold)]/50 ring-offset-2 ring-offset-[oklch(0.13_0.06_300)]"
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-purple-200)]">
            Community member
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden py-24 bg-[oklch(0.08_0.04_300)]">
      {/* Background glow behind the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[640px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.42_0.24_290/0.22)] blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="What Members Say"
          title="In their own words."
          sub="Straight from people learning with Cassius."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
          {VISIBLE.map((t, i) => (
            <TestimonialCard key={t.name} name={t.name} text={t.text} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted-foreground)]">
          Individual experiences. Not a guarantee of any outcome.
        </p>

        <SectionCta note="Join them. Free." />
      </div>
    </section>
  );
}
