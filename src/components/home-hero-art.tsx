"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { CalendarDays, Check, FileText, Globe2, ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export function HomeHeroArt() {
  const reduced = useReducedMotion();
  const spring = { stiffness: 130, damping: 24, mass: .8 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(40);
  const lightOpacity = useSpring(0, spring);
  const light = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,.8), transparent 65%)`;

  function followPointer(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    rotateX.set((.5 - y) * 12);
    rotateY.set((x - .5) * 16);
    lightX.set(x * 100);
    lightY.set(y * 100);
    lightOpacity.set(1);
  }
  function resetPointer() {
    rotateX.set(0);
    rotateY.set(0);
    lightOpacity.set(0);
  }

  return <figure className="hero-depth-scene" aria-label="An illustrated hiring team with connected resume, interview and career page updates" onPointerMove={followPointer} onPointerLeave={resetPointer} onPointerCancel={resetPointer}>
    <div className="hero-depth-halo" aria-hidden="true"/>
    <motion.div className="hero-depth-world" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}>
      <div className="hero-depth-backing hero-depth-backing-far" aria-hidden="true"/>
      <div className="hero-depth-backing hero-depth-backing-near" aria-hidden="true"/>
      <div className="hero-depth-surface" aria-hidden="true"/>
      <motion.div className="hero-depth-light" style={{ background: light, opacity: reduced ? 0 : lightOpacity }} aria-hidden="true"/>
      <div className="hero-depth-label"><span className="hero-depth-mark" aria-hidden="true">w.</span><span>Your hiring day,<br/><strong>beautifully connected.</strong></span><span className="hero-depth-live" aria-hidden="true"/></div>
      <div className="hero-depth-portrait"><Image src="/images/hiring-team-cutout.webp" alt="Two hiring teammates reviewing a candidate together at their desk" width={1536} height={1024} sizes="(max-width: 759px) 94vw, (max-width: 1100px) 52vw, 660px" priority/></div>
      <div className="hero-depth-update hero-depth-resume"><span className="hero-depth-icon"><FileText size={18} strokeWidth={1.5} aria-hidden="true"/></span><span><small>THE FIRST HELLO</small><strong>Resume received</strong></span><Check size={14} aria-hidden="true"/></div>
      <div className="hero-depth-update hero-depth-interview"><span className="hero-depth-icon"><CalendarDays size={18} strokeWidth={1.5} aria-hidden="true"/></span><span><small>THE NEXT CONVERSATION</small><strong>Interview scheduled</strong></span></div>
      <div className="hero-depth-careers"><Globe2 size={18} strokeWidth={1.5} aria-hidden="true"/><span>Career page updated</span><ArrowUpRight size={15} aria-hidden="true"/></div>
      <span className="hero-depth-caption">AI-powered. Human-led.</span>
    </motion.div>
    <figcaption className="hero-depth-footnote"><span aria-hidden="true"/>A little technology. A lot more human connection.</figcaption>
  </figure>;
}
