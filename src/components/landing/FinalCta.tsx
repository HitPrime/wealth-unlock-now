import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StarterKitDialog } from "./StarterKitDialog";
import { CtaButton } from "./Cta";

export function FinalCta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ scale: 0.97, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-none border border-[color:var(--color-purple-400)]/40 bg-hero-radial p-12 md:p-16 text-center shadow-glow"
        >
          <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_center,oklch(0.55_0.26_290/0.7),transparent_60%)]" />
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-5">
            Your starting point is one click away
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
            Let's make this <span className="text-gradient-purple">make sense.</span>
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-muted-foreground)] max-w-xl mx-auto">
            You get the Blueprint PDF, the Commandments poster, the Glossary, and the First Trade Walkthrough. It's free, and you don't need a card. Just enter your email and it's yours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <StarterKitDialog trigger={<CtaButton />} />
            <span className="text-xs text-[color:var(--color-muted-foreground)]">
              No card required.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}