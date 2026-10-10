"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [12, 0] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, ease: "easeOut" }}>{children}</motion.div>;
}
