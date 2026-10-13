import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  duration?: number;
}

// Keep the existing DOM and layout; the shared controller owns scroll motion.
export function Reveal({ children, className = "", delay = 0, y = 24, duration = .65 }: RevealProps) {
  return <div className={`reveal ${className}`} data-scroll-reveal data-reveal-delay={delay} data-reveal-y={y} data-reveal-duration={duration}>{children}</div>;
}
