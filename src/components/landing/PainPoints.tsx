import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PAIN_POINTS } from "@/content/landing";
import { StarterKitDialog } from "./StarterKitDialog";
import { CtaButton } from "./Cta";
import { SectionHeader } from "./WhoFor";

function PainRow({
  headline,
  detail,
  index,
}: {
  headline: string;
  detail: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Zig-zag: even rows hug the left and fly in from the left, odd rows hug the
  // right and fly in from the right. Accent bar sits on the leading edge.
  const fromRight = index % 2 === 1;
  const accent = fromRight ? "#7c5cbf" : "var(--color-gold)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromRight ? 120 : -120 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }}
      className={`flex items-stretch gap-5 w-full md:w-[76%] ${
        fromRight ? "ml-auto flex-row-reverse text-right" : "mr-auto"
      }`}
    >
      <span
        aria-hidden
        className="w-[3px] shrink-0 self-stretch rounded-full"
        style={{ backgroundColor: accent }}
      />
      <div className="py-1">
        <h3 className="font-sans text-lg md:text-xl font-semibold uppercase tracking-[0.08em] text-white leading-snug">
          {headline}
        </h3>
        <p className="mt-3 text-[color:var(--color-muted-foreground)] leading-relaxed">
          {detail}
        </p>
      </div>
    </motion.div>
  );
}

export function PainPoints() {
  return (
    <section className="relative py-24 bg-[oklch(0.08_0.04_300)]">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="Sound Familiar?"
          title="If any of this hits, keep reading."
        />
        <div className="mt-14 space-y-14">
          {PAIN_POINTS.map((point, i) => (
            <PainRow
              key={point.headline}
              headline={point.headline}
              detail={point.detail}
              index={i}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-[color:var(--color-gold)] leading-tight">
            That's not a you problem. That's a foundation problem.
          </p>

          {/* Welcome video */}
          <div className="mt-10 mx-auto max-w-2xl relative">
            <video
              id="cc-welcome-video"
              src="https://assets.cdn.filesafe.space/5HWy6bgOsEC3bfBTO15d/media/6ab3d8ce8d8128ee4ca80bbf.mp4"
              autoPlay
              muted
              controls
              playsInline
              className="w-full block"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 20px 40px rgba(88,28,135,0.3)",
                background: "#000",
              }}
            />
            <button
              onClick={() => {
                const v = document.getElementById("cc-welcome-video") as HTMLVideoElement;
                const btn = document.getElementById("cc-unmute-btn") as HTMLElement;
                if (v && btn) {
                  v.muted = !v.muted;
                  btn.innerText = v.muted ? "🔇 Tap for sound" : "🔊 Sound on";
                }
              }}
              id="cc-unmute-btn"
              style={{
                position: "absolute", bottom: "14px", left: "14px",
                background: "rgba(0,0,0,0.7)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px",
                padding: "5px 14px", fontSize: "12px", cursor: "pointer",
                fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
                backdropFilter: "blur(8px)",
              }}
            >
              🔇 Tap for sound
            </button>
          </div>

          <div className="mt-8 flex justify-center">
            <StarterKitDialog trigger={<CtaButton />} />
          </div>
        </div>
      </div>
    </section>
  );
}
