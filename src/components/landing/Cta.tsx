import { forwardRef } from "react";
import { StarterKitDialog } from "./StarterKitDialog";

type CtaButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

/**
 * Shared primary CTA button. Modern hover: lifts, glows, brightens its gold
 * border, sweeps a light shine across, and slides the arrow. forwardRef so it
 * can be used directly as a Radix DialogTrigger `asChild` element.
 */
export const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ label = "Get Your Free Starter Kit", className = "", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-none bg-purple-gradient px-6 py-3.5 text-sm md:px-12 md:py-5 md:text-base font-medium uppercase tracking-[0.16em] text-white border border-[color:var(--color-gold)]/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[color:var(--color-gold)]/70 hover:shadow-glow active:translate-y-0 ${className}`}
      {...props}
    >
      {/* light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
      />
      <span className="relative">{label}</span>
      <span
        aria-hidden
        className="relative text-[color:var(--color-gold)] transition-transform duration-300 ease-out group-hover:translate-x-1.5"
      >
        →
      </span>
    </button>
  ),
);
CtaButton.displayName = "CtaButton";

/**
 * Centered CTA block to close out a section. Opens the Starter Kit dialog.
 */
export function SectionCta({
  label,
  note = "Free · No card required",
}: {
  label?: string;
  note?: string;
}) {
  return (
    <div className="mt-16 flex flex-col items-center gap-3">
      <StarterKitDialog trigger={<CtaButton label={label} />} />
      {note ? (
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted-foreground)]">
          {note}
        </p>
      ) : null}
    </div>
  );
}
