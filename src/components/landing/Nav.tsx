import { NAV_LINKS, BRAND } from "@/content/landing";
import { Wordmark } from "./Wordmark";
import { StarterKitDialog } from "./StarterKitDialog";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[oklch(0.10_0.04_300/0.6)] border-b border-[oklch(0.30_0.10_290/0.4)]">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" aria-label={BRAND.name}>
          <Wordmark />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[color:var(--color-muted-foreground)]">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <StarterKitDialog
          trigger={
            <button className="inline-flex items-center rounded-full bg-purple-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
              Get the Free Kit
            </button>
          }
        />
      </div>
    </header>
  );
}
