import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import cassiusHeadshot from "@/assets/cassius-headshot.png";
import { SectionHeader } from "./WhoFor";
import { SectionCta } from "./Cta";

export function MeetCassius() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 bg-[oklch(0.08_0.04_300)]">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center"
      >
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[oklch(0.10_0.04_300)]">
            <img
              src={cassiusHeadshot}
              alt="Cassius Cuvée"
              className="h-full w-full object-cover object-top grayscale-hover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.04_300)] via-transparent to-transparent" />
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <SectionHeader
            eyebrow="The Guy Behind It"
            title="The guy who makes trading make sense."
            center={false}
          />
          <p className="mt-6 text-lg text-[color:var(--color-muted-foreground)] leading-relaxed">
            Cassius Cuvée is a trading educator, YouTuber, and musical artist
            who built his audience by doing one thing differently: explaining
            trading like a friend who remembers being completely lost.
          </p>
          <p className="mt-4 text-lg text-[color:var(--color-muted-foreground)] leading-relaxed">
            He started exactly where you are, confused and self-taught, and he's
            clear that this is education, not a shortcut. He takes the stuff that
            took him years to figure out and breaks it down in plain English.
            Especially if you're starting from zero.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["600+ beginners started here", "As seen on national media", "YouTuber · Educator · Artist"].map(
              (s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.20_0.10_290/0.5)] px-4 py-1.5 text-sm text-[color:var(--color-purple-200)]"
                >
                  {s}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionCta note="Learn it the way Cassius teaches it." />
      </div>
    </section>
  );
}