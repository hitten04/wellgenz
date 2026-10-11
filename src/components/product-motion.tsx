"use client";
import { useReducedMotion } from "./use-reduced-motion";

import { motion, useScroll, useSpring } from "motion/react";
import type { ReactNode } from "react";

export function ProductSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      data-product-motion
      initial={false}
      whileInView={reduced ? { opacity: 1, y: 0 } : { y: [24, 0] }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function ProductCard({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`product-motion-card ${className}`}
      initial={false}
      whileInView={reduced ? { opacity: 1, y: 0, scale: 1 } : { y: [20, 0], scale: [0.985, 1] }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -25px 0px" }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduced
          ? undefined
          : { y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }
      }
      whileTap={reduced ? undefined : { scale: 0.985 }}
    >
      {children}
    </motion.div>
  );
}

export function ProductProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="product-reading-progress"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
}
