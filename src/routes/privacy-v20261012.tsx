import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import cassiusLogo from "@/assets/CassiusLogo.webp";

export const Route = createFileRoute("/privacy-v20261012")({
  component: PrivacyPageV20261012,
  head: () => ({
    meta: [
      { title: "Privacy Policy (Archive Oct 12 2026) | CassiusCuvee" },
      { name: "description", content: "Archived version of CassiusCuvee Privacy Policy as of October 12, 2026." },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "canonical", href: "https://cassiuscuvee.com/privacy-v20261012" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
});

function PrivacyPageV20261012() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Archive banner */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-6 py-3 text-center">
        <p className="text-sm text-yellow-300/90">
          <strong>Archived Version</strong> — Privacy Policy as of <strong>October 12, 2026</strong>.{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-yellow-200">View current version &rarr;</a>
        </p>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[oklch(0.10_0.04_300/0.6)] border-b border-[oklch(0.30_0.10_290/0.4)]">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center">
          <a href="/" aria-label="Cassius Cuvee - Home">
            <img src={cassiusLogo} alt="Cassius Cuvee" className="h-9 w-auto" style={{ mixBlendMode: "lighten" }} />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <div className="mb-8">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--color-purple-200)] uppercase mb-3">
            Legal &middot; cassiuscuvee.com &middot; Archive
          </p>
          <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-foreground/60 mb-1">
            <strong className="text-foreground/75">Effective Date:</strong> October 6, 2026{" "}
            &middot;{" "}
            <strong className="text-foreground/75">Version Date:</strong> October 12, 2026
          </p>
          <p className="text-sm text-foreground/55 mt-1">
            Operated by Bottle Poppin Productions LLC &middot; Brands: Cassius Cuvee and Swell Point
          </p>
          <div className="mt-5 h-px w-full bg-gradient-to-r from-[color:var(--color-purple-400)]/40 via-[color:var(--color-purple-400)]/15 to-transparent" />
        </div>

        {/* Notice */}
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[oklch(0.14_0.06_300/0.4)] p-6 mb-8">
          <p className="text-foreground/75 leading-[1.75] mb-4">
            This is a permanent archived record of the Cassius Cuvee Privacy Policy that was in effect on <strong className="text-foreground/90">October 12, 2026</strong>. This version is preserved for legal and compliance purposes — specifically to document the privacy terms that were in effect when testimonial consent records were collected.
          </p>
          <p className="text-foreground/75 leading-[1.75]">
            To view the full Privacy Policy content that was in effect on this date, please visit the current Privacy Policy page. If content has changed since this date, the October 12, 2026 version governs consent records collected on or before this date.
          </p>
        </div>

        {/* Key consent-relevant sections for record keeping */}
        <div className="space-y-8">
          <div>
            <h2 className="font-sans text-lg font-bold text-foreground mb-3 pb-2 border-b border-[color:var(--color-border)]">
              Version Information
            </h2>
            <table className="w-full text-sm text-foreground/75 border-collapse">
              <tbody>
                {[
                  ["Document", "Privacy Policy"],
                  ["Operated by", "Bottle Poppin Productions LLC"],
                  ["Brands covered", "Cassius Cuvee, Swell Point"],
                  ["Effective date", "October 6, 2026"],
                  ["Version / archive date", "October 12, 2026"],
                  ["Privacy contact", "Cassiuscuvee@gmail.com"],
                  ["Archive URL", "https://cassiuscuvee.com/privacy-v20261012"],
                ].map(([key, val]) => (
                  <tr key={key} className="border-b border-[color:var(--color-border)]">
                    <td className="py-2.5 pr-4 font-medium text-foreground/85 w-1/3">{key}</td>
                    <td className="py-2.5 text-foreground/70">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-foreground mb-3 pb-2 border-b border-[color:var(--color-border)]">
              Testimonial Consent Data Collected (Section 2A)
            </h2>
            <p className="text-foreground/75 leading-[1.75] mb-3">
              Per the Privacy Policy in effect on October 12, 2026, the following testimonial-related data was collected:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 text-foreground/75 leading-[1.75]">
              <li>The statement written or recorded by the submitter</li>
              <li>The submitter's name</li>
              <li>Any photo, video or voice recording included</li>
              <li>A record of consent (including the date and time agreed)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-foreground mb-3 pb-2 border-b border-[color:var(--color-border)]">
              Testimonial Retention (Section 6)
            </h2>
            <p className="text-foreground/75 leading-[1.75]">
              Per the Privacy Policy in effect on October 12, 2026: Testimonial content is retained until the submitter withdraws consent. The record of consent is retained for 4 years.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-lg font-bold text-foreground mb-3 pb-2 border-b border-[color:var(--color-border)]">
              Right to Withdraw Consent (Section 7)
            </h2>
            <p className="text-foreground/75 leading-[1.75]">
              Per the Privacy Policy in effect on October 12, 2026: Submitters may withdraw permission for use of their testimonial, name, image or video at any time by emailing{" "}
              <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
                Cassiuscuvee@gmail.com
              </a>. Removal from websites and social media will occur within 30 days of receiving the request.
            </p>
          </div>

          <div className="pt-4 border-t border-[color:var(--color-border)]">
            <p className="text-sm text-foreground/50">
              For the complete Privacy Policy text in effect on October 12, 2026, contact us at{" "}
              <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
                Cassiuscuvee@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
