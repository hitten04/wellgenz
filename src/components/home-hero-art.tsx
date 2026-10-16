"use client";

import Image from "next/image";
import { motion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export function HomeHeroArt() {
  const reduced = useReducedMotion();
  const spring = { stiffness: 130, damping: 24, mass: .8 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function followPointer(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    rotateX.set((.5 - y) * 12);
    rotateY.set((x - .5) * 16);
  }
  function resetPointer() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return <figure className="hero-simple-art" aria-label="People and hiring workflows, connected" onPointerMove={followPointer} onPointerLeave={resetPointer} onPointerCancel={resetPointer}>
    <motion.div className="hero-simple-picture" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}><Image src="/images/hiring-team-cutout.webp" alt="Two hiring teammates reviewing a candidate together at their desk" width={1536} height={1024} sizes="(max-width: 759px) 100vw, (max-width: 1100px) 65vw, 860px" priority/></motion.div>
  </figure>;
}
