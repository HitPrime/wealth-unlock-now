import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you")({
  component: ThankYou,
});

function ThankYou() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg text-center">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-4">
          You're in
        </p>
        <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
          Your Starter Kit is on its way.
        </h1>
        <p className="mt-5 text-[color:var(--color-muted-foreground)] leading-relaxed">
          Check your email for the download links: the Trader's Blueprint, the Trading Commandments
          and Glossary, and the First Trade Walkthrough. If it's not there in a couple of minutes,
          look in your promotions or spam folder.
        </p>

        {/* Conversion pixel (e.g. Meta "Lead") should fire here once a pixel ID is provided. */}

        <a
          href="https://mail.google.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center rounded-none bg-purple-gradient px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow hover:brightness-110 transition"
        >
          Open my email →
        </a>
        <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          Using another provider? Just open your inbox.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block text-sm text-[color:var(--color-purple-200)] underline underline-offset-4 hover:text-foreground transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
