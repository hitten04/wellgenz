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
  return (
    <section id={id} className={className} data-product-motion>
      {children}
    </section>
  );
}

export function ProductCard({
  children,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <div className={`product-motion-card ${className}`}>
      {children}
    </div>
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
