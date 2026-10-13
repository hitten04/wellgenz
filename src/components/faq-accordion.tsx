"use client";

import { useId, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FaqItem {
  question: string;
  answer: string;
}

function FaqRow({ faq, defaultOpen = false }: { faq: FaqItem; defaultOpen?: boolean }) {
  const reduced = useReducedMotion();
  const id = useId();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="faq-motion-item">
      <button
        type="button"
        className="faq-motion-trigger"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span>{faq.question}</span>
        <motion.span
          className="faq-icon-wrap"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            className="faq-motion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion({
  items,
  defaultFirstOpen = false,
}: {
  items: FaqItem[];
  defaultFirstOpen?: boolean;
}) {
  return (
    <div className="faq-motion-list">
      {items.map((faq, index) => (
        <FaqRow key={faq.question} faq={faq} defaultOpen={defaultFirstOpen && index === 0} />
      ))}
    </div>
  );
}
