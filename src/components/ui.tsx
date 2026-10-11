"use client";

import { useReducedMotion } from "./use-reduced-motion";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Wordmark({ light = false }: { light?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={`wordmark ${light ? "wordmark-light" : ""}`}
      whileHover={reduced ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
    >
      wellgenz<span className="wordmark-dot" aria-hidden="true">.</span>
    </motion.span>
  );
}

export function AppLink({
  children = "Access Dashboard",
  light = false,
  className = "",
}: {
  children?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={site.appUrl}
      className={`button ${light ? "button-light" : "button-dark"} ${className}`}
      whileHover={reduced ? undefined : { scale: 1.025, y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </motion.a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "heading-light" : ""}`}>
      <p className="eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}
