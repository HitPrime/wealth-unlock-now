import wsj from "@/assets/press/wsj.webp";
import cnbc from "@/assets/press/cnbc.svg";
import kitcoNews from "@/assets/press/kitco-news.webp";
import kitcoCrypto from "@/assets/press/kitco-crypto.svg";

// Logo files are trimmed to their artwork (no padding). Heights are set so every logo
// has roughly the same visual weight: long wordmarks get less height, the stacked
// CNBC mark gets more.
const LOGOS = [
  { name: "The Wall Street Journal", src: wsj, width: 640, height: 55, invert: true, h: "h-[15px] md:h-[18px]" },
  { name: "Kitco News", src: kitcoNews, width: 481, height: 87, invert: true, h: "h-[22px] md:h-[27px]" },
  { name: "CNBC", src: cnbc, width: 744, height: 568, invert: true, h: "h-[38px] md:h-[46px]" },
  { name: "Kitco Crypto", src: kitcoCrypto, width: 1512, height: 223, invert: true, h: "h-[20px] md:h-[24px]" },
];

export function PressBar() {
  // One "half" must be wider than the container so the strip never shows a gap;
  // the track holds two identical halves and slides by exactly one half.
  const half = Array.from({ length: 3 }, () => LOGOS).flat();
  const items = [...half, ...half];
  return (
    <section
      id="press"
      className="relative border-y border-[color:var(--color-gold)]/25 bg-[oklch(0.08_0.04_300)] pt-4 pb-8 -mt-[15px] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-gold)] uppercase mb-4">
          As Featured In
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center animate-[marquee_72s_linear_infinite] whitespace-nowrap w-max">
            {items.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                width={logo.width}
                height={logo.height}
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