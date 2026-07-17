import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FAQS } from "@/content/landing";
import { SectionHeader } from "./WhoFor";
import { SectionCta } from "./Cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FaqItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <AccordionItem
        value={`item-${index}`}
        className="border-[color:var(--color-border)]"
      >
        <AccordionTrigger className="text-left font-display text-lg font-bold uppercase hover:text-[color:var(--color-purple-200)]">
          {q}
        </AccordionTrigger>
        <AccordionContent className="text-[color:var(--color-muted-foreground)] leading-relaxed text-base">
          {a}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

export function Faq() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader eyebrow="FAQ" title="Common questions." />
        </motion.div>
        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} index={i} />
          ))}
        </Accordion>
        <SectionCta note="Still have a question? Just start here." />
      </div>
    </section>
  );
}