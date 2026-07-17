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

export function StarterKitDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load GHL form embed script once
    if (document.getElementById("ghl-form-script")) return;
    const script = document.createElement("script");
    script.id = "ghl-form-script";
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md border border-[color:var(--color-purple-400)]/40 bg-[oklch(0.10_0.04_300)] rounded-none">
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
            src="https://api.leadconnectorhq.com/widget/form/2efo3PHbySqemxHI4h2x"
            style={{ width: "100%", height: "400px", border: "none", borderRadius: "8px" }}
            id="inline-2efo3PHbySqemxHI4h2x"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Form 0"
            data-height="400"
            data-layout-iframe-id="inline-2efo3PHbySqemxHI4h2x"
            data-form-id="2efo3PHbySqemxHI4h2x"
            title="Form 0"
          />
        </div>

        <p className="text-[10px] font-mono uppercase tracking-widest text-[color:var(--color-muted-foreground)]">
          For educational purposes only · Not financial advice
        </p>
      </DialogContent>
    </Dialog>
  );
}
