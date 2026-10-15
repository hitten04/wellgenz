"use client";

import Image from "next/image";
import { motion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export function HomeHeroArt() {
  const reduced = useReducedMotion();
  const spring = { stiffness: 110, damping: 24, mass: .7 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const objectX = useSpring(0, spring);
  const objectY = useSpring(0, spring);
  const shadowX = useSpring(0, spring);
  const shadowY = useSpring(0, spring);

  function followPointer(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)) - .5;
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)) - .5;
    rotateX.set(-y * 8);
    rotateY.set(x * 14);
    objectX.set(x * 16);
    objectY.set(y * 12);
    shadowX.set(-x * 10);
    shadowY.set(-y * 4);
  }
  function resetPointer() {
    [rotateX, rotateY, objectX, objectY, shadowX, shadowY].forEach(value => value.set(0));
  }

  return <figure className="hero-free-scene" aria-label="A three-dimensional illustration of two hiring teammates collaborating" onPointerMove={followPointer} onPointerLeave={resetPointer} onPointerCancel={resetPointer}>
    <motion.div className="hero-free-shadow" style={{ x: reduced ? 0 : shadowX, y: reduced ? 0 : shadowY }} aria-hidden="true"/>
    <motion.div className="hero-free-world" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}>
      <motion.div className="hero-free-object" style={{ x: reduced ? 0 : objectX, y: reduced ? 0 : objectY, z: reduced ? 0 : 65 }}>
        <div className="hero-free-float"><Image src="/images/hiring-team-3d-transparent.webp" alt="Two hiring teammates at a curved ivory desk reviewing a resume beside a lavender laptop" width={1536} height={1024} sizes="(max-width: 759px) 100vw, (max-width: 1100px) 55vw, 740px" priority/></div>
      </motion.div>
    </motion.div>
  </figure>;
}
