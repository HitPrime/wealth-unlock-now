export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="inline-block h-7 w-7 rounded-full bg-purple-gradient shadow-glow ring-1 ring-[color:var(--color-gold)]/40"
      />
      <span className="font-display text-lg font-bold tracking-tight text-foreground uppercase">
        Cassius <span className="text-gradient-purple">Cuvée</span>
      </span>
    </div>
  );
}