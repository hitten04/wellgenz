"use client";
import { useReducedMotion } from "./use-reduced-motion";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  duration?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  scale = 0.985,
  duration = 0.65,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`reveal ${className}`}
      initial={false}
      whileInView={reduced ? { opacity: 1, y: 0, scale: 1 } : { y: [y, 0], scale: [scale, 1] }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -30px 0px" }}
      onViewportEnter={entry => entry?.target.classList.add("is-revealed")}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
