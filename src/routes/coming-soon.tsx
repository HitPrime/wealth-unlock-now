import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coming-soon")({
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#07070c] flex flex-col items-center justify-center text-center px-4">
      {/* Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg">
        {/* Logo placeholder */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-serif text-xs font-semibold tracking-[0.35em] text-purple-300/80 uppercase">CC</span>
          <span className="font-serif text-base font-medium tracking-[0.3em] text-slate-200 uppercase">Cassius Cuvée</span>
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/25 text-purple-200 text-xs font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          Something Big Is Coming
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Coming Soon
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We're working on something amazing. Stay tuned for the launch.
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-purple-500/30" />

        <p className="text-xs text-slate-600">© 2026 Cassius Cuvée</p>
      </div>
    </div>
  );
}
