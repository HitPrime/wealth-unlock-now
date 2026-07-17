import { motion } from "framer-motion";
import heroImage from "@/assets/cassius-hero.png";
import { Particles } from "./Particles";
import { StarterKitDialog } from "./StarterKitDialog";
import { CtaButton } from "./Cta";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden min-h-screen flex items-center"
    >
      {/* Full-bleed hero image */}
      <motion.img
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        src={heroImage}
        alt="Silhouette of a trader in front of a rising chart"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        loading="eager"
      />
      {/* Gradient overlays for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.10_0.04_300/0.92)_0%,oklch(0.10_0.04_300/0.75)_35%,oklch(0.10_0.04_300/0.25)_65%,oklch(0.10_0.04_300/0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.10_0.04_300/0.4)_0%,transparent_35%,transparent_65%,oklch(0.10_0.04_300/0.95)_100%)]"
      />
      {/* Animated particle field */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-70">
        <Particles />
      </div>
      {/* Subtle animated grid sheen */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] bg-[linear-gradient(oklch(0.85_0.15_300)_1px,transparent_1px),linear-gradient(90deg,oklch(0.85_0.15_300)_1px,transparent_1px)] bg-[size:64px_64px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 w-full pt-28 pb-20 lg:pt-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs tracking-[0.2em] text-[color:var(--color-purple-200)] uppercase mb-5"
          >
            Free Starter Kit · 600+ Beginners Started Here
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-foreground uppercase drop-shadow-[0_4px_30px_oklch(0.10_0.04_300/0.9)]"
          >
            Trade with <span className="text-gradient-purple">structure.</span>
            <br />
            Finally <span className="text-gradient-purple">understand it.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-xl text-lg text-[color:var(--color-muted-foreground)] leading-relaxed"
          >
            Get the free Starter Kit that walks you through trading from step
            one, in plain English. If you've watched fifty videos and still feel
            lost, that's not on you. Nobody is born knowing this stuff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            <StarterKitDialog trigger={<CtaButton />} />
            <p className="mt-3 text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted-foreground)]">
              Free Trading Starter Kit · No card required
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest uppercase text-[color:var(--color-muted-foreground)]"
          >
            <span className="text-[color:var(--color-purple-200)]">As seen on</span>
            <span>WSJ</span>
            <span className="opacity-40">/</span>
            <span>CNBC</span>
            <span className="opacity-40">/</span>
            <span>Squawk on the Street</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

