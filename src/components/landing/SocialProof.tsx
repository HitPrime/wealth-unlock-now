import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./WhoFor";
import { SectionCta } from "./Cta";

import t1 from "@/assets/testimonials/t1.png";
import t2 from "@/assets/testimonials/t2.png";
import t3 from "@/assets/testimonials/t3.png";
import t4 from "@/assets/testimonials/t4.png";
import t5 from "@/assets/testimonials/t5.jpg";
import t6 from "@/assets/testimonials/t6.png";

const SCREENSHOTS = [t1, t2, t3, t4, t5, t6];

function Screenshot({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group mb-4 break-inside-avoid"
    >
      {/* Uniform frame so tall and square screenshots read as one set */}
      <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[oklch(0.10_0.04_300)] p-2 shadow-[0_4px_24px_oklch(0_0_0/0.4)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[color:var(--color-purple-400)] group-hover:shadow-glow">
        <img
          src={src}
          alt="Member testimonial"
          className="w-full h-auto block rounded-lg"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export function SocialProof() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="What Members Say"
          title="What members actually say."
          sub="Screenshots from real beginners on what the kit taught them. Experiences vary and are not typical."
        />
        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-4">
          {SCREENSHOTS.map((src, i) => (
            <Screenshot key={i} src={src} index={i} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted-foreground)]">
          Individual experiences. Not a guarantee of any outcome.
        </p>

        <SectionCta note="Start where they started." />
      </div>
    </section>
  );
}
