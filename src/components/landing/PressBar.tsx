import wsj from "@/assets/press/wsj.png";
import cnbc from "@/assets/press/cnbc.svg";
import phemex from "@/assets/press/phemex.png";
import breakout from "@/assets/press/breakout.png";

const LOGOS = [
  { name: "The Wall Street Journal", src: wsj, invert: true, h: "h-16 md:h-20" },
  { name: "CNBC", src: cnbc, invert: true, h: "h-8 md:h-10" },
  { name: "Phemex", src: phemex, invert: false, h: "h-6 md:h-8" },
  { name: "Breakout", src: breakout, invert: true, h: "h-6 md:h-8" },
];

export function PressBar() {
  const items = [...LOGOS, ...LOGOS, ...LOGOS];
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
          <div className="flex items-center gap-14 animate-[marquee_35s_linear_infinite] whitespace-nowrap w-max">
            {items.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.name}
                className={`${logo.h} w-auto object-contain opacity-80 hover:opacity-100 transition ${logo.invert ? "[filter:brightness(0)_invert(1)]" : ""}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0)} to { transform: translateX(-33.333%)} }`}</style>
    </section>
  );
}