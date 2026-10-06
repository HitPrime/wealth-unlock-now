import { DISCLAIMER, NAV_LINKS } from "@/content/landing";
import cassiusLogo from "@/assets/CassiusLogo.png";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[oklch(0.08_0.04_300)] pt-12 pb-16">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-8">
        <div>
          <img src={cassiusLogo} alt="Cassius Cuvée" className="h-8 w-auto" style={{ mixBlendMode: "lighten" }} />
          <p className="mt-4 text-sm text-[color:var(--color-muted-foreground)] max-w-xs">
            Mentorship and community for traders who want to build a real,
            durable skill.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 md:justify-center text-sm text-[color:var(--color-muted-foreground)]">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-sm text-[color:var(--color-muted-foreground)] md:text-right">
          © {new Date().getFullYear()} Cassius Cuvée. All rights reserved.
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
            <a href="/privacy" className="hover:text-foreground transition text-xs">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition text-xs">Terms and Conditions</a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-10 pt-6 border-t border-[color:var(--color-border)]">
        <p className="text-xs text-[color:var(--color-muted-foreground)] leading-relaxed">
          <strong className="text-foreground/80">Disclaimer.</strong> {DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}