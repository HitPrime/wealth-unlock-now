import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/landing/Footer";
import cassiusLogo from "@/assets/CassiusLogo.png";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | CassiusCuvée" },
      {
        name: "description",
        content:
          "Read the CassiusCuvée Privacy Policy to learn how we collect, use, protect, and manage personal information when you use our website, products, courses, community, and services.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Privacy Policy | CassiusCuvée" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cassiuscuvee.com/privacy" },
      { property: "og:site_name", content: "Cassius Cuvée" },
    ],
    links: [
      { rel: "canonical", href: "https://cassiuscuvee.com/privacy" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
});

const TOC = [
  { id: "section-1", label: "1. Who We Are" },
  { id: "section-2", label: "2. Information We Collect" },
  { id: "section-3", label: "3. How We Use Your Information" },
  { id: "section-4", label: "4. Who We Share With" },
  { id: "section-5", label: "5. Cookies and Tracking" },
  { id: "section-6", label: "6. How Long We Keep Your Data" },
  { id: "section-7", label: "7. Your Privacy Rights" },
  { id: "section-8", label: "8. Do Not Sell or Share" },
  { id: "section-9", label: "9. Global Privacy Control" },
  { id: "section-10", label: "10. Do Not Track" },
  { id: "section-11", label: "11. Children's Privacy" },
  { id: "section-12", label: "12. Data Security" },
  { id: "section-13", label: "13. International Users" },
  { id: "section-14", label: "14. Changes to This Policy" },
  { id: "section-15", label: "15. Contact Us" },
];

const tableBase = "w-full text-[15px] text-foreground/75 border-collapse";
const thBase = "text-left py-2.5 px-3 font-semibold text-foreground/90 bg-[oklch(0.14_0.06_300/0.6)] border border-[color:var(--color-border)] text-sm";
const tdBase = "py-2.5 px-3 border border-[color:var(--color-border)] align-top leading-relaxed";

function TocSidebar() {
  return (
    <nav aria-label="Table of contents" className="hidden lg:block sticky top-24 self-start w-56 shrink-0 text-sm">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-purple-200)] uppercase mb-3">On this page</p>
      <ul className="space-y-1">
        {TOC.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block py-1 text-[color:var(--color-muted-foreground)] hover:text-foreground transition-colors leading-snug"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-[color:var(--color-border)]">
        <a href="#top" className="text-xs text-[color:var(--color-purple-400)] hover:text-foreground transition-colors">
          ↑ Back to top
        </a>
      </div>
    </nav>
  );
}

function TocMobile() {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="Table of contents" className="lg:hidden mb-8 border border-[color:var(--color-border)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground bg-[oklch(0.14_0.06_300/0.6)] hover:bg-[oklch(0.16_0.06_300/0.6)] transition"
        aria-expanded={open}
      >
        <span>On this page</span>
        <span aria-hidden>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="px-4 py-3 space-y-1.5 bg-[oklch(0.10_0.04_300)]">
          {TOC.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block py-0.5 text-sm text-[color:var(--color-muted-foreground)] hover:text-foreground transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-[color:var(--color-border)]">
            <a href="#top" className="text-xs text-[color:var(--color-purple-400)] hover:text-foreground transition-colors">
              ↑ Back to top
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-sans text-xl font-bold tracking-tight text-foreground mt-12 mb-4 pb-2 border-b border-[color:var(--color-border)] scroll-mt-24">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-base font-semibold text-foreground/90 mt-6 mb-3">
      {children}
    </h3>
  );
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-foreground/75 leading-[1.75] mb-4 ${className}`}>{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-outside ml-5 space-y-2 text-foreground/75 leading-[1.75] mb-4">{children}</ul>;
}

function PrivacyPage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:rounded focus:text-foreground focus:border focus:border-[color:var(--color-purple-400)] focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[oklch(0.10_0.04_300/0.6)] border-b border-[oklch(0.30_0.10_290/0.4)]">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center">
          <a href="/" aria-label="Cassius Cuvée — Home">
            <img src={cassiusLogo} alt="Cassius Cuvée" className="h-9 w-auto" style={{ mixBlendMode: "lighten" }} />
          </a>
        </div>
      </header>

      {/* Layout */}
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-24 flex gap-12 items-start">

        <TocSidebar />

        <main id="main-content" className="flex-1 min-w-0 max-w-3xl">

          {/* Page header */}
          <header className="mb-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--color-purple-200)] uppercase mb-3">
              Legal · cassiuscuvee.com
            </p>
            <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-foreground/60">
              <strong className="text-foreground/75">Effective Date:</strong> October 6, 2026
              {" · "}
              <strong className="text-foreground/75">Last Updated:</strong> October 6, 2026
            </p>
            <p className="text-sm text-foreground/55 mt-1">
              Operated by Bottle Poppin Productions LLC · Brands: Cassius Cuvée and Swell Point
            </p>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-[color:var(--color-purple-400)]/40 via-[color:var(--color-purple-400)]/15 to-transparent" />
          </header>

          <TocMobile />

          {/* Intro */}
          <P>
            This Privacy Policy explains what personal information we collect when you visit our websites, join our email list, buy our products, or use our member areas; how we use it; who we share it with; and the choices and rights you have. Please read it carefully. If you do not agree with this Policy, please do not use our Sites.
          </P>

          {/* ── Section 1 ── */}
          <H2 id="section-1">1. Who We Are</H2>
          <P>
            This Privacy Policy applies to the websites, landing pages, forms, courses, community areas, emails and text messages operated by <strong>Bottle Poppin Productions LLC</strong> ("Company," "we," "us," or "our") under the brand names <strong>Cassius Cuvée</strong> and <strong>Swell Point</strong>.
          </P>
          <P>It covers the following websites and domains (together, the "Sites"): cassiuscuvee.com and its subdomains.</P>
          <P>
            For privacy questions or requests, contact us at{" "}
            <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
              Cassiuscuvee@gmail.com
            </a>.
          </P>

          {/* ── Section 2 ── */}
          <H2 id="section-2">2. Information We Collect</H2>

          <H3>A. Information you give us directly</H3>
          <UL>
            <li><strong>Full name</strong> and <strong>email address</strong> – when you submit our opt-in form (for example, to receive the Free Starter Kit).</li>
            <li><strong>Phone number</strong> – if you opt in to receive text (SMS) messages.</li>
            <li><strong>Age range</strong> – if you select it during the opt-in process, so we can confirm you are 18 or older.</li>
            <li><strong>Payment information</strong> – when you purchase a product, your card or payment details are entered with our payment processors, such as Stripe or Whop. We do not store your full card number on our own servers.</li>
            <li><strong>Billing name and billing address</strong> – collected at checkout.</li>
            <li><strong>Messages you send us</strong> – including anything you submit through our contact form.</li>
          </UL>

          <H3>B. Information collected automatically</H3>
          <UL>
            <li><strong>IP address</strong>, which is also recorded in our hosting provider's server logs.</li>
            <li><strong>Browser type and version</strong> and <strong>device type</strong> (for example, mobile or desktop).</li>
            <li><strong>Pages visited and time spent</strong> on each page.</li>
            <li><strong>Referring website</strong> – how you found our Sites.</li>
            <li><strong>Cookies and similar technologies</strong> set by us and by third parties such as YouTube, analytics tools and advertising pixels (see Section 5).</li>
            <li><strong>Course progress and activity</strong> inside our member area.</li>
          </UL>

          {/* ── Section 3 ── */}
          <H2 id="section-3">3. Why We Collect Your Information and How We Use It</H2>
          <div className="overflow-x-auto mb-4">
            <table className={tableBase}>
              <thead>
                <tr>
                  <th scope="col" className={thBase}>Information</th>
                  <th scope="col" className={thBase}>How we use it</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Name and email address", "To send you the Free Starter Kit you requested, to deliver products and courses, to send transactional messages, and to send you marketing emails (you can unsubscribe at any time)."],
                  ["Phone number", "To send SMS marketing messages, only if you have opted in to receive them."],
                  ["IP address", "For security, fraud prevention, and to detect your general location."],
                  ["Analytics data", "To understand how our Sites are used so we can improve them."],
                  ["Advertising pixel data", "To measure the performance of our advertising campaigns and to show our ads to relevant audiences."],
                  ["Payment and billing data", "To process your purchases and subscriptions. Payments are handled by our payment processor(s)."],
                  ["Age range", "To confirm that users are 18 years of age or older."],
                  ["Messages, course and member activity", "To respond to you, provide support, and run our courses and community."],
                ].map(([info, use]) => (
                  <tr key={info} className="even:bg-[oklch(0.12_0.04_300/0.3)]">
                    <td className={`${tdBase} font-medium text-foreground/85 w-1/3`}>{info}</td>
                    <td className={tdBase}>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>We may also use your information to comply with legal obligations, enforce our terms, and protect our rights, our users and the public.</P>

          <H3>Email and SMS communications</H3>
          <UL>
            <li>Every marketing email includes an unsubscribe link. Once you unsubscribe, we will not send you further marketing emails. We may still send transactional messages about your purchases or account.</li>
            <li>If you opt in to SMS, we send text messages only with your separate, express consent. Consent is not a condition of any purchase. Message and data rates may apply. Reply STOP at any time to opt out. We keep a record of your consent.</li>
          </UL>

          {/* ── Section 4 ── */}
          <H2 id="section-4">4. Who We Share Your Information With</H2>
          <P>We share personal information only with service providers and partners, and only as needed for the purposes described in this Policy. We may use the services listed below. Each company has its own privacy policy that explains how it handles your data.</P>
          <div className="overflow-x-auto mb-4">
            <table className={tableBase}>
              <thead>
                <tr>
                  <th scope="col" className={thBase}>Service</th>
                  <th scope="col" className={thBase}>What they do with your data</th>
                  <th scope="col" className={thBase}>Their privacy policy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["GoHighLevel (GHL)", "CRM, email and SMS marketing, opt-in forms, course delivery and community platform.", "gohighlevel.com/privacy-policy"],
                  ["Stripe", "Payment processing for purchases and subscription billing.", "stripe.com/privacy"],
                  ["Whop", "Digital product delivery and payment processing.", "whop.com/privacy"],
                  ["Meta (Facebook)", "Meta Pixel – advertising targeting and conversion tracking.", "facebook.com/privacy/policy"],
                  ["Google", "Google Analytics (GA4) for website analytics; Google Ads for conversion tracking.", "policies.google.com/privacy"],
                  ["TikTok", "TikTok Pixel – advertising and conversion tracking.", "tiktok.com/legal/privacy-policy"],
                  ["Pinterest", "Pinterest Tag – advertising.", "policy.pinterest.com/privacy-policy"],
                  ["Reddit", "Reddit Pixel – advertising.", "reddit.com/policies/privacy-policy"],
                  ["YouTube (Google)", "Video player embedded on our homepage; it may set cookies and collect usage data when the page loads.", "policies.google.com/privacy"],
                  ["Vercel", "Website hosting; has access to server logs, including IP addresses.", "vercel.com/legal/privacy-policy"],
                  ["Cloudflare", "Content delivery and file storage (CDN / R2) for website assets.", "cloudflare.com/privacypolicy"],
                  ["Discord", "Community platform, if you join our Discord server.", "discord.com/privacy"],
                ].map(([service, role, url]) => (
                  <tr key={service} className="even:bg-[oklch(0.12_0.04_300/0.3)]">
                    <td className={`${tdBase} font-medium text-foreground/85 whitespace-nowrap`}>{service}</td>
                    <td className={tdBase}>{role}</td>
                    <td className={tdBase}>
                      <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors break-all text-sm">
                        {url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>We may also disclose information (a) if required by law, court order or government request; (b) to protect our rights, safety or property, or that of others; and (c) in connection with a merger, sale or transfer of all or part of our business, in which case your information may be transferred to the new owner.</P>

          {/* ── Section 5 ── */}
          <H2 id="section-5">5. Cookies and Tracking Technologies</H2>
          <P>Cookies are small files stored on your device. We and our partners use cookies, pixels and similar technologies in the following categories:</P>
          <div className="overflow-x-auto mb-4">
            <table className={tableBase}>
              <thead>
                <tr>
                  <th scope="col" className={thBase}>Category</th>
                  <th scope="col" className={thBase}>Purpose and who sets them</th>
                  <th scope="col" className={thBase}>Examples</th>
                  <th scope="col" className={thBase}>How long</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Essential", "Needed for the Sites to work, such as security, forms and checkout. Set by us and our hosting and platform providers.", "GoHighLevel, Vercel, Cloudflare", "Session to 24 months"],
                  ["Analytics", "Help us understand how visitors use the Sites.", "Google Analytics", "Session to 24 months"],
                  ["Advertising", "Measure ad performance and show relevant ads on other platforms.", "Meta, Google Ads, TikTok, Pinterest, Reddit", "Session to 24 months"],
                  ["Functional", "Remember your preferences and enable embedded content such as videos.", "YouTube", "Session to 24 months"],
                ].map(([cat, purpose, examples, duration]) => (
                  <tr key={cat} className="even:bg-[oklch(0.12_0.04_300/0.3)]">
                    <td className={`${tdBase} font-medium text-foreground/85 whitespace-nowrap`}>{cat}</td>
                    <td className={tdBase}>{purpose}</td>
                    <td className={tdBase}>{examples}</td>
                    <td className={`${tdBase} whitespace-nowrap`}>{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H3>How to manage cookies</H3>
          <UL>
            <li>Use the cookie banner or cookie preferences link on our Sites to accept, reject or customize non-essential cookies.</li>
            <li>Change your browser settings to block or delete cookies. Blocking essential cookies may affect how the Sites work.</li>
            <li>Use your browser's Global Privacy Control signal (see Section 9).</li>
            <li>
              Opt out of interest-based advertising at{" "}
              <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
                optout.aboutads.info
              </a>
              {" "}or{" "}
              <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
                optout.networkadvertising.org
              </a>.
            </li>
          </UL>
          <P className="text-sm italic text-foreground/55">This section also serves as our Cookie Policy.</P>

          {/* ── Section 6 ── */}
          <H2 id="section-6">6. How Long We Keep Your Data</H2>
          <P>We keep personal information only as long as needed for the purposes in this Policy and to meet legal, tax and accounting obligations. Our standard retention periods are:</P>
          <div className="overflow-x-auto mb-4">
            <table className={tableBase}>
              <thead>
                <tr>
                  <th scope="col" className={thBase}>Type of data</th>
                  <th scope="col" className={thBase}>Retention period</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Email marketing contacts", "Until you unsubscribe, plus 3 years"],
                  ["SMS consent records", "At least 4 years, to document your consent"],
                  ["Purchase records", "7 years, for tax and accounting purposes"],
                  ["Contact form messages", "2 years"],
                  ["Server and IP logs", "90 days"],
                ].map(([type, period]) => (
                  <tr key={type} className="even:bg-[oklch(0.12_0.04_300/0.3)]">
                    <td className={`${tdBase} font-medium text-foreground/85`}>{type}</td>
                    <td className={tdBase}>{period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Section 7 ── */}
          <H2 id="section-7">7. Your Privacy Rights</H2>
          <P>Depending on where you live, including if you are a California resident, you have the right to:</P>
          <UL>
            <li><strong>Access</strong> – ask what personal information we hold about you and receive a copy.</li>
            <li><strong>Correct</strong> – ask us to fix inaccurate personal information.</li>
            <li><strong>Delete</strong> – ask us to delete your personal information, subject to legal exceptions (for example, purchase records we must keep for tax purposes).</li>
            <li><strong>Opt out</strong> – ask us to stop sharing your personal information with advertisers (see Section 8).</li>
            <li><strong>Not be treated unfairly</strong> – we will not discriminate against you for exercising your rights.</li>
          </UL>

          <H3>How to make a request</H3>
          <P>
            Email us at{" "}
            <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
              Cassiuscuvee@gmail.com
            </a>{" "}
            with the subject line "Privacy Request" and tell us which right you want to use. We may need to verify your identity before acting on a request, for example by matching details to the email address on file. You may use an authorized agent to submit a request for you; we may ask for proof of authorization.
          </P>
          <P>We will respond within <strong>45 days</strong> of receiving your request. If we need more time, we will tell you why.</P>

          {/* ── Section 8 ── */}
          <H2 id="section-8">8. Do Not Sell or Share My Personal Information</H2>
          <P>We do not sell your personal information for money. However, we use advertising and analytics tools, such as the Meta Pixel, Google Ads, TikTok Pixel, that collect information about your visit and may make it available to those companies for advertising. Under California law, this may be considered "sharing" personal information for cross-context behavioral advertising.</P>
          <P>You can opt out at any time by:</P>
          <UL>
            <li>clicking the <strong>"Your Privacy Choices"</strong> link in the footer of our Sites;</li>
            <li>turning off advertising cookies in our cookie preferences; or</li>
            <li>
              emailing{" "}
              <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
                Cassiuscuvee@gmail.com
              </a>.
            </li>
          </UL>

          {/* ── Section 9 ── */}
          <H2 id="section-9">9. Global Privacy Control (GPC)</H2>
          <P>
            Our Sites recognize the Global Privacy Control (GPC) browser signal. When we detect GPC, we treat it as a request to opt out of the sharing of your personal information for advertising. Some browsers, such as Brave, have GPC built in; for others you can enable it using a browser extension or privacy setting. More information is available at{" "}
            <a href="https://globalprivacycontrol.org" target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
              globalprivacycontrol.org
            </a>.
          </P>

          {/* ── Section 10 ── */}
          <H2 id="section-10">10. Do Not Track (DNT)</H2>
          <P>Some browsers offer a "Do Not Track" setting. Because there is no common industry standard for DNT signals, our Sites do not currently respond to them. We do, however, honor the Global Privacy Control signal described above.</P>

          {/* ── Section 11 ── */}
          <H2 id="section-11">11. Children's Privacy</H2>
          <UL>
            <li>Our Sites and products are not directed to children under 13.</li>
            <li>You must be <strong>18 years of age or older</strong> to use our products.</li>
            <li>We do not knowingly collect personal information from children under 13.</li>
            <li>If we learn that we have collected information from a child under 13, we will delete it immediately.</li>
            <li>
              If you are a parent or guardian and believe your child has given us information, contact us at{" "}
              <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
                Cassiuscuvee@gmail.com
              </a>{" "}
              and we will delete it.
            </li>
          </UL>

          {/* ── Section 12 ── */}
          <H2 id="section-12">12. Data Security</H2>
          <P>We take reasonable steps to protect your personal information, including:</P>
          <UL>
            <li>serving our Sites over HTTPS (an encrypted connection);</li>
            <li>hosting our Sites with Vercel, which applies industry-standard security controls; and</li>
            <li>using PCI-DSS compliant payment processors, so your full card details are handled by them and are not stored on our servers.</li>
          </UL>
          <P>No method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee absolute security, but we work to protect your information.</P>

          {/* ── Section 13 ── */}
          <H2 id="section-13">13. International Users</H2>
          <P>Our Sites are operated from the United States, and your information will be processed in the United States.</P>
          <P>If you are in the European Economic Area or the United Kingdom, we process your personal information under the GDPR / UK GDPR. Our legal bases are your <strong>consent</strong> (for marketing communications and non-essential cookies) and <strong>contract</strong> (to fulfil your purchases). You may withdraw consent at any time, and you have the right to lodge a complaint with your local data protection authority.</P>

          {/* ── Section 14 ── */}
          <H2 id="section-14">14. Changes to This Policy</H2>
          <P>We may update this Privacy Policy from time to time. The effective date of the current version is shown at the top of this page. If we make material changes, we will notify you, for example by email or by a notice on our Sites. By continuing to use our Sites after changes take effect, you accept the updated Policy.</P>

          {/* ── Section 15 ── */}
          <H2 id="section-15">15. Contact Us</H2>
          <P>For any privacy question or request, please contact:</P>
          <p className="text-foreground/75 leading-[1.75] mb-1"><strong>Bottle Poppin Productions LLC</strong></p>
          <P>
            Email:{" "}
            <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">
              Cassiuscuvee@gmail.com
            </a>
          </P>
          <P>We respond to all data rights requests within 45 days.</P>

          <div className="mt-10 pt-6 border-t border-[color:var(--color-border)]">
            <a href="#top" className="text-sm text-[color:var(--color-purple-400)] hover:text-foreground transition-colors">
              ↑ Back to top
            </a>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

