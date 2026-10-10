"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={`reveal ${className}`} initial={false} whileInView={reduced ? undefined : { y: [28, 0], scale: [0.985, 1] }} viewport={{ once: true, amount: 0.15 }} onViewportEnter={entry => entry?.target.classList.add("is-revealed")} transition={{ duration: 0.7, ease: "easeOut" }}>{children}</motion.div>;
}
