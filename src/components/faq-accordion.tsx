"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FaqItem {
  question: string;
  answer: string;
}

function FaqRow({ faq, defaultOpen = false }: { faq: FaqItem; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="faq-motion-item">
      <motion.button
        type="button"
        className="faq-motion-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <span>{faq.question}</span>
        <motion.span
          className="faq-icon-wrap"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-motion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
