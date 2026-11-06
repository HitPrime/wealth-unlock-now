import { useState, type ReactNode, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import bundle from "@/assets/kit/bundle.png";
import { withUtms } from "@/lib/attribution";
import { trackEvent } from "@/lib/track";

const FORM_ID = "2efo3PHbySqemxHI4h2x";
const FORM_URL = `https://api.leadconnectorhq.com/widget/form/${FORM_ID}`;

// Counts only on the homepage (the ad landing page); other pages that reuse the dialog
// (e.g. /blog) are not part of the funnel stats.
const onHomepage = () => typeof window !== "undefined" && window.location.pathname === "/";

/**
 * `where` names the button that opened it (hero, final, ...) so /admin can show which
 * Starter Kit button gets clicked. Must be one of the names allowed in api/event.ts.
 */
export function StarterKitDialog({ trigger, where }: { trigger: ReactNode; where?: string }) {
  const [open, setOpen] = useState(false);
  // Built on open (browser only) so the GHL form gets the visitor's UTMs and can save
  // them into its hidden fields.
  const [formSrc, setFormSrc] = useState(FORM_URL);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GHL form embed script once
    if (document.getElementById("ghl-form-script")) return;
    const script = document.createElement("script");
    script.id = "ghl-form-script";
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // "Form started": the GHL form is a cross-site iframe, so we can't see its fields. When
  // the visitor clicks into it, focus moves into the iframe and our window blurs; that is
  // the signal. Counted once per opening.
  useEffect(() => {
    if (!open || !onHomepage()) return;
    let counted = false;
    const onBlur = () => {
      // activeElement updates right after blur, so check on the next tick
      setTimeout(() => {
        if (!counted && iframeRef.current && document.activeElement === iframeRef.current) {
          counted = true;
          trackEvent("home", "form_start");
        }
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) {
          setFormSrc(withUtms(FORM_URL));
          if (onHomepage()) trackEvent("home", "cta_click", { where: where ?? "other" });
        }
        setOpen(o);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        ref={contentRef}
        // By default the dialog moves focus to its first focusable element, which is the
        // GHL form iframe. That would count "form started" for everyone who only opened
        // it, so keep focus on the dialog itself; the visitor clicks into the form.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          contentRef.current?.focus({ preventScroll: true });
        }}
        className="outline-none sm:max-w-md border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.10_0.04_300)] rounded-none max-h-[90vh] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Bundle image, bled to the top edges */}
        <div className="-mx-6 -mt-6 mb-1 overflow-hidden bg-[oklch(0.06_0.03_300)]">
          <img
            src={bundle}
            alt="The Trading Starter Kit: the Trader's Blueprint, the Trading Commandments and Glossary, and the First Trade Walkthrough"
            className="w-full object-contain"
            loading="eager"
          />
        </div>
        <DialogHeader>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-purple-200)] mb-1">
            Free · Complete Starter Kit
          </p>
          <DialogTitle className="font-display text-2xl uppercase tracking-tight leading-tight">
            The Trading Starter Kit
          </DialogTitle>
          <DialogDescription className="text-[color:var(--color-muted-foreground)]">
            Tell us where to send it and we'll email you the whole kit: the Blueprint, the
            Commandments and Glossary, and the First Trade Walkthrough. No card required.
          </DialogDescription>
        </DialogHeader>

        {/* GHL Embedded Form — replaces the old name/email fields */}
        {/* Injected style targets GHL form rendered by form_embed.js if same-origin */}
        <style>{`
          #inline-2efo3PHbySqemxHI4h2x {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
        `}</style>
        <div className="mt-1 mb-1">
          <iframe
            ref={iframeRef}
            src={formSrc}
            style={{ width: "100%", height: "400px", border: "none", borderRadius: "8px" }}
            id="inline-2efo3PHbySqemxHI4h2x"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Website Form"
            data-height="400"
            data-layout-iframe-id="inline-2efo3PHbySqemxHI4h2x"
            data-form-id="2efo3PHbySqemxHI4h2x"
            title="Website Form"
          />
        </div>

        <p className="text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          For educational purposes only · Not financial advice
        </p>
      </DialogContent>
    </Dialog>
  );
}
