"use client";
import { motion, useScroll, useSpring } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";
const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => { const media = window.matchMedia(motionQuery); media.addEventListener("change", callback); return () => media.removeEventListener("change", callback); };
const snapshot = () => window.matchMedia(motionQuery).matches;
function useReducedMotion() { return useSyncExternalStore(subscribe, snapshot, () => true); }

export function ProductSection({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const reduced = useReducedMotion();
  return <motion.section id={id} className={className} data-product-motion initial={false} whileInView={reduced ? {} : { y: [24, 0] }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>{children}</motion.section>;
}
export function ProductCard({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className="product-motion-card" initial={false} whileInView={reduced ? {} : { y: [20, 0] }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55, delay: (index % 3) * .09 }} whileHover={reduced ? {} : { y: -5 }} >{children}</motion.div>;
}
export function ProductProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const reduced = useReducedMotion();
  return reduced ? null : <motion.div aria-hidden="true" className="product-reading-progress" style={{ scaleX }}/ >;
}
