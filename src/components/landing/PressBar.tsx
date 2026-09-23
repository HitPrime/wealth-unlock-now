import wsj from "@/assets/press/wsj.png";
import cnbc from "@/assets/press/cnbc.svg";

const LOGOS = [
  { name: "The Wall Street Journal", src: wsj, invert: true, h: "h-16 md:h-20" },
  { name: "CNBC", src: cnbc, invert: true, h: "h-8 md:h-10" },
];

export function PressBar() {
  // One "half" must be wider than the container so the strip never shows a gap;
  // the track holds two identical halves and slides by exactly one half.
  const half = Array.from({ length: 5 }, () => LOGOS).flat();
  const items = [...half, ...half];
  return (
    <section
      id="press"
      className="relative border-y border-[color:var(--color-gold)]/25 bg-[oklch(0.08_0.04_300)] py-4 -mt-[15px] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-gold)] uppercase mb-4">
          As Featured In
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center animate-[marquee_60s_linear_infinite] whitespace-nowrap w-max">
            {items.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={i < half.length ? logo.name : ""}
                aria-hidden={i >= half.length}
                className={`${logo.h} w-auto mr-14 object-contain opacity-80 hover:opacity-100 transition ${logo.invert ? "[filter:brightness(0)_invert(1)]" : ""}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0)} to { transform: translateX(-50%)} }`}</style>
    </section>
  );
}