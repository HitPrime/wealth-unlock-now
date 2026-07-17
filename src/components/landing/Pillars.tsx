import { PILLARS } from "@/content/landing";
import { SectionHeader } from "./WhoFor";
import { SectionCta } from "./Cta";
import blueprint from "@/assets/kit/blueprint.png";
import commandments from "@/assets/kit/commandments.png";
import trainingTape from "@/assets/kit/training-tape.png";

// Order matches PILLARS: Blueprint, First Trade Walkthrough (laptop, middle), Commandments.
const PILLAR_IMAGES = [blueprint, trainingTape, commandments];

export function Pillars() {
  return (
    <section id="mindset" className="relative py-24 bg-[oklch(0.08_0.04_300)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="What's Inside"
          title="Three pieces. One complete starting point."
          sub="The foundation, a real walkthrough, and the rules to trade by. No experience needed, and nothing to buy to use any of it."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => {
            // The Trader's Blueprint (index 0) artwork fills its canvas more than
            // the others, so render it 13% smaller in both rest and hover states.
            const isBlueprint = i === 0;
            const restScale = isBlueprint ? "scale-[0.87]" : "";
            const restShift = isBlueprint ? "-translate-y-[30px]" : "";
            const hoverScale = isBlueprint
              ? "group-hover:scale-[0.99]"
              : "group-hover:scale-[1.14]";
            return (
            <article
              key={p.title}
              className="group relative rounded-2xl border border-[color:var(--color-border)] bg-[oklch(0.14_0.06_300/0.7)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:-translate-y-1 hover:border-[color:var(--color-purple-400)] hover:shadow-glow"
            >
              {/* Mockups sit toward the top and rise out of the frame on hover, glowing along the transparent outline */}
              <div className="relative aspect-square w-full">
                <img
                  src={PILLAR_IMAGES[i]}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full origin-bottom object-contain object-top ${restScale} ${restShift} [filter:drop-shadow(0_0_0_oklch(0.60_0.24_290/0))] transition-[transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-8 ${hoverScale} group-hover:[filter:drop-shadow(0_0_28px_oklch(0.60_0.24_290/0.9))]`}
                />
              </div>
              <div className="px-8 pb-8 -mt-6">
                <p className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-purple-200)] uppercase mb-6">
                  {p.tag}
                </p>
                <h3 className="font-display text-2xl font-bold uppercase mb-3">{p.title}</h3>
                <p className="text-[color:var(--color-muted-foreground)] leading-relaxed">
                  {p.body}
                </p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--color-purple-400)]/40 to-transparent" />
              </div>
            </article>
            );
          })}
        </div>

        <SectionCta note="All three pieces. Free." />
      </div>
    </section>
  );
}
