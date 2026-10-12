import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/landing/Footer";
import cassiusLogo from "@/assets/CassiusLogo.png";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms and Conditions | CassiusCuvee" },
      {
        name: "description",
        content:
          "Read the CassiusCuvee Terms and Conditions governing your use of our website, products, courses, community, and services.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Terms and Conditions | CassiusCuvee" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cassiuscuvee.com/terms" },
      { property: "og:site_name", content: "Cassius Cuvee" },
    ],
    links: [
      { rel: "canonical", href: "https://cassiuscuvee.com/terms" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
});

const TOC = [
  { id: "section-1",  label: "1. Acceptance of These Terms" },
  { id: "section-2",  label: "2. Our Services" },
  { id: "section-3",  label: "3. Eligibility" },
  { id: "section-4",  label: "4. Your Account and Member Access" },
  { id: "section-5",  label: "5. Purchases, Pricing and Payment" },
  { id: "section-6",  label: "6. Subscriptions and Recurring Billing" },
  { id: "section-7",  label: "7. Refunds" },
  { id: "section-8",  label: "8. Free Resources, Email and SMS" },
  { id: "section-9",  label: "9. Intellectual Property and License" },
  { id: "section-10", label: "10. Community Guidelines" },
  { id: "section-11", label: "11. Content You Submit" },
  { id: "section-12", label: "12. Educational Purpose; No Guarantees" },
  { id: "section-13", label: "13. Third-Party Services and Links" },
  { id: "section-14", label: "14. Disclaimer of Warranties" },
  { id: "section-15", label: "15. Limitation of Liability" },
  { id: "section-16", label: "16. Indemnification" },
  { id: "section-17", label: "17. Suspension and Termination" },
  { id: "section-18", label: "18. Governing Law and Disputes" },
  { id: "section-19", label: "19. Privacy" },
  { id: "section-20", label: "20. Changes to These Terms" },
  { id: "section-21", label: "21. General" },
  { id: "section-22", label: "22. Contact Us" },
];

const thBase = "text-left py-2.5 px-3 font-semibold text-foreground/90 bg-[oklch(0.14_0.06_300/0.6)] border border-[color:var(--color-border)] text-sm";
const tdBase = "py-2.5 px-3 border border-[color:var(--color-border)] align-top leading-relaxed";

function TocSidebar() {
  return (
    <nav aria-label="Table of contents" className="hidden lg:block sticky top-24 self-start w-56 shrink-0 text-sm">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-purple-200)] uppercase mb-3">On this page</p>
      <ul className="space-y-1">
        {TOC.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} className="block py-1 text-[color:var(--color-muted-foreground)] hover:text-foreground transition-colors leading-snug">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-[color:var(--color-border)]">
        <a href="#top" className="text-xs text-[color:var(--color-purple-400)] hover:text-foreground transition-colors">
          Back to top
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
        <span aria-hidden>{open ? "(hide)" : "(show)"}</span>
      </button>
      {open && (
        <ul className="px-4 py-3 space-y-1.5 bg-[oklch(0.10_0.04_300)]">
          {TOC.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-0.5 text-sm text-[color:var(--color-muted-foreground)] hover:text-foreground transition-colors">
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-[color:var(--color-border)]">
            <a href="#top" className="text-xs text-[color:var(--color-purple-400)] hover:text-foreground transition-colors">
              Back to top
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

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-foreground/75 leading-[1.75] mb-4 ${className}`}>{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-outside ml-5 space-y-2 text-foreground/75 leading-[1.75] mb-4">{children}</ul>;
}

function TermsPage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:rounded focus:text-foreground focus:border focus:border-[color:var(--color-purple-400)] focus:outline-none">
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[oklch(0.10_0.04_300/0.6)] border-b border-[oklch(0.30_0.10_290/0.4)]">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center">
          <a href="/" aria-label="Cassius Cuvee - Home">
            <img src={cassiusLogo} alt="Cassius Cuvee" className="h-9 w-auto" style={{ mixBlendMode: "lighten" }} />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pt-28 pb-24 flex gap-12 items-start">
        <TocSidebar />

        <main id="main-content" className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--color-purple-200)] uppercase mb-3">
              Legal &middot; cassiuscuvee.com
            </p>
            <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Terms and Conditions
            </h1>
            <p className="text-sm text-foreground/60">
              <strong className="text-foreground/75">Effective Date:</strong> October 6, 2026
              {" \u00b7 "}
              <strong className="text-foreground/75">Last Updated:</strong> October 6, 2026
            </p>
            <p className="text-sm text-foreground/55 mt-1">
              Operated by Bottle Poppin Productions LLC &middot; Brands: Cassius Cuvee and Swell Point
            </p>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-[color:var(--color-purple-400)]/40 via-[color:var(--color-purple-400)]/15 to-transparent" />
          </header>

          <TocMobile />

          <P>
            These Terms and Conditions ("Terms") are a legal agreement between you and <strong>Bottle Poppin Productions LLC</strong> ("Company," "we," "us," or "our"), which operates the <strong>Cassius Cuvee</strong> and <strong>Swell Point</strong> brands. They govern your use of cassiuscuvee.com and its subdomains, and of our forms, emails, text messages, courses, digital products and community areas (together, the "Services"). Please read them carefully.
          </P>

          <H2 id="section-1">1. Acceptance of These Terms</H2>
          <P>By accessing or using the Services, signing up for our email list, making a purchase, or joining our community, you agree to be bound by these Terms and by our Privacy Policy. If you do not agree, please do not use the Services.</P>

          <H2 id="section-2">2. Our Services</H2>
          <P>Through the Services we may offer:</P>
          <UL>
            <li>a free Starter Kit and other free resources in exchange for your name and email address;</li>
            <li>paid digital products, courses, memberships and subscriptions;</li>
            <li>member areas and community spaces, including on GoHighLevel and Discord; and</li>
            <li>email and, if you opt in, text message (SMS) communications.</li>
          </UL>
          <P>We may add, change, suspend or discontinue any part of the Services at any time.</P>

          <H2 id="section-3">3. Eligibility</H2>
          <P>You must be <strong>18 years of age or older</strong> to use the Services or buy any product. By using the Services you confirm that you are at least 18 and have the legal capacity to enter into these Terms. The Services are not directed to children under 13, and we do not knowingly collect their information.</P>

          <H2 id="section-4">4. Your Account and Member Access</H2>
          <UL>
            <li>Provide accurate and current information when you sign up or buy.</li>
            <li>Keep your login details confidential. Your access is personal to you and may not be shared, sold or transferred.</li>
            <li>You are responsible for all activity under your account. Tell us promptly if you suspect unauthorized use.</li>
          </UL>

          <H2 id="section-5">5. Purchases, Pricing and Payment</H2>
          <P>
            Prices are shown at checkout and may change at any time; a price change will not affect an order you have already completed. Payments are processed by third-party payment processors, such as Stripe or Whop, and are subject to their terms. By submitting an order you authorize us and our processor to charge your chosen payment method for the total amount, including any applicable taxes. We do not store your full card number on our servers. We may refuse or cancel an order, for example because of suspected fraud, a pricing error or unavailability.
          </P>

          <H2 id="section-6">6. Subscriptions and Recurring Billing</H2>
          <P>Some products are sold as subscriptions. If you choose one:</P>
          <UL>
            <li>you authorize us to charge your payment method automatically at the interval and price shown at checkout, until you cancel;</li>
            <li>your subscription renews automatically at the end of each billing period;</li>
            <li>you may cancel at any time before your next renewal date through your account or by emailing <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">Cassiuscuvee@gmail.com</a>, and you will keep access until the end of the paid period; and</li>
            <li>we will not refund charges for a billing period that has already started, except as stated in Section 7.</li>
          </UL>

          <H2 id="section-7">7. Refunds</H2>
          <P>
            Because our products are digital and delivered immediately, all sales are final unless a different refund policy is stated on the product page or at checkout. Nothing in these Terms limits any refund right you have under applicable law. To ask about a refund, contact us at <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">Cassiuscuvee@gmail.com</a> with your order details.
          </P>

          <H2 id="section-8">8. Free Resources, Email and SMS Communications</H2>
          <UL>
            <li><strong>Free Starter Kit.</strong> When you request a free resource, you agree to give us accurate contact details. The resource is provided for your personal use only.</li>
            <li><strong>Email.</strong> By signing up you agree to receive emails from us, including marketing emails. Every marketing email contains an unsubscribe link, and we honor opt-outs promptly. We may still send transactional messages about your orders or account.</li>
            <li><strong>SMS.</strong> We send text messages only if you give separate, express consent. Consent is not a condition of any purchase. Message and data rates may apply, and message frequency may vary. Reply STOP at any time to opt out, or HELP for assistance.</li>
          </UL>
          <P>See our <a href="/privacy" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">Privacy Policy</a> for how we collect and use your information for these purposes.</P>

          <H2 id="section-9">9. Intellectual Property and License</H2>
          <P>All content in the Services, including courses, videos, text, templates, graphics, logos, trademarks and the Cassius Cuvee and Swell Point names, is owned by the Company or its licensors and is protected by intellectual property laws.</P>
          <P>When you buy a product or access a member area, we give you a limited, personal, non-exclusive, non-transferable, revocable license to view and use that content for your own non-commercial purposes. You may <strong>not</strong>:</P>
          <UL>
            <li>copy, record, reproduce, distribute, resell, rent, sublicense or publicly display our content;</li>
            <li>share your login or product access with anyone else;</li>
            <li>modify, reverse engineer or create derivative works from our content; or</li>
            <li>use our names, logos or trademarks without our written permission.</li>
          </UL>

          <H2 id="section-10">10. Community Guidelines and Acceptable Use</H2>
          <P>When you use our community spaces or any part of the Services, you agree not to:</P>
          <UL>
            <li>harass, threaten, abuse or discriminate against others;</li>
            <li>post unlawful, defamatory, obscene or infringing content;</li>
            <li>send spam, run unauthorized promotions, or solicit our members;</li>
            <li>attempt to hack, disrupt, scrape or gain unauthorized access to the Services; or</li>
            <li>use the Services for any unlawful purpose or in violation of these Terms.</li>
          </UL>
          <P>We may remove content and suspend or end access for anyone who breaks these rules. Third-party platforms we use, such as Discord, also have their own rules that you must follow.</P>

          <H2 id="section-11">11. Content You Submit</H2>
          <P>You keep ownership of messages, comments and other content you submit. By submitting it, you give us a non-exclusive, worldwide, royalty-free license to use, display and reproduce it as needed to operate and promote the Services. You confirm that you have the right to submit it and that it does not violate any law or anyone else's rights.</P>

          <H2 id="section-12">12. Educational Purpose; No Guarantees</H2>
          <P>Our content is provided for educational and informational purposes only. It is not professional, legal, financial, medical or other advice. Any examples or results we share are not typical and are not a promise or guarantee of your outcome. Your results depend on many factors, including your effort, circumstances and decisions, and you are solely responsible for how you use what you learn.</P>

          <H2 id="section-13">13. Third-Party Services and Links</H2>
          <P>The Services rely on and may link to third-party services, including GoHighLevel, Stripe, Whop, YouTube, Discord and others. We do not control and are not responsible for third-party services, websites or content. Your use of them is at your own risk and subject to their terms and privacy policies.</P>

          <H2 id="section-14">14. Disclaimer of Warranties</H2>
          <P className="uppercase text-sm tracking-wide">
            THE SERVICES AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE OR SECURE.
          </P>

          <H2 id="section-15">15. Limitation of Liability</H2>
          <P className="uppercase text-sm tracking-wide">
            TO THE FULLEST EXTENT PERMITTED BY LAW, THE COMPANY AND ITS OWNERS, MEMBERS, EMPLOYEES AND PARTNERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, DATA OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICES. OUR TOTAL LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM AROSE. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS, SO THESE MAY NOT FULLY APPLY TO YOU.
          </P>

          <H2 id="section-16">16. Indemnification</H2>
          <P>You agree to defend and hold harmless the Company and its owners, members, employees and partners from any claims, damages, losses and expenses (including reasonable legal fees) arising from your breach of these Terms, your misuse of the Services, or your violation of any law or third-party right.</P>

          <H2 id="section-17">17. Suspension and Termination</H2>
          <P>We may suspend or terminate your access at any time, with or without notice, if we believe you have violated these Terms or misused the Services. You may stop using the Services at any time. Sections that by their nature should survive termination, including Sections 9, 12 and 14 to 18, will continue to apply.</P>

          <H2 id="section-18">18. Governing Law and Disputes</H2>
          <P>
            These Terms are governed by the laws of the State of California, without regard to its conflict-of-law rules. Before filing a claim, you agree to contact us at <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">Cassiuscuvee@gmail.com</a> and try in good faith to resolve the dispute informally for at least 30 days. Any dispute that is not resolved will be brought exclusively in the state or federal courts located in California, and you consent to their jurisdiction.
          </P>

          <H2 id="section-19">19. Privacy</H2>
          <P>Your use of the Services is also governed by our <a href="/privacy" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">Privacy Policy</a>, which explains what personal information we collect, how we use it, and your privacy choices. It is available at cassiuscuvee.com/privacy.</P>

          <H2 id="section-20">20. Changes to These Terms</H2>
          <P>We may update these Terms from time to time. The effective date of the current version is shown at the top of this page. If we make material changes, we will notify you, for example by email or by a notice on the Services. By continuing to use the Services after the changes take effect, you accept the updated Terms.</P>

          <H2 id="section-21">21. General</H2>
          <UL>
            <li><strong>Entire agreement.</strong> These Terms and the Privacy Policy are the entire agreement between you and us about the Services.</li>
            <li><strong>Severability.</strong> If any part of these Terms is found unenforceable, the rest remains in effect.</li>
            <li><strong>No waiver.</strong> Our failure to enforce a right is not a waiver of that right.</li>
            <li><strong>Assignment.</strong> You may not transfer your rights under these Terms. We may assign ours, for example in a sale of our business.</li>
          </UL>

          <H2 id="section-22">22. Contact Us</H2>
          <P>If you have questions about these Terms, please contact:</P>
          <p className="text-foreground/75 leading-[1.75] mb-1"><strong>Bottle Poppin Productions LLC</strong></p>
          <P>Email: <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">Cassiuscuvee@gmail.com</a></P>
          <P>For privacy requests: <a href="mailto:Cassiuscuvee@gmail.com" className="text-[color:var(--color-purple-400)] hover:text-foreground underline underline-offset-2 transition-colors">Cassiuscuvee@gmail.com</a></P>

          <div className="mt-10 pt-6 border-t border-[color:var(--color-border)]">
            <a href="#top" className="text-sm text-[color:var(--color-purple-400)] hover:text-foreground transition-colors">
              Back to top
            </a>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
