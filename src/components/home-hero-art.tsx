"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { createHeroMotionRenderer, type HeroMotionRenderer } from "@/lib/hero-motion-renderer";

export function HomeHeroArt() {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<HeroMotionRenderer | null>(null);
  const inView = useInView(figure, { amount: .15 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reduced || !canvas.current) return;
    setReady(false);
    const element = canvas.current;
    const contextLost = (event: Event) => { event.preventDefault(); renderer.current?.stop(); setFailed(true); };
    element.addEventListener("webglcontextlost", contextLost);
    let cancelled = false;
    let instance: HeroMotionRenderer | null = null;
    createHeroMotionRenderer(canvas.current).then((result) => {
      if (cancelled) { result.dispose(); return; }
      instance = result;
      renderer.current = result;
      setFailed(false);
      setReady(true);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => {
      cancelled = true;
      element.removeEventListener("webglcontextlost", contextLost);
      instance?.dispose();
      renderer.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (ready && inView && !paused && !hidden && !reduced && !failed) renderer.current?.start();
    else renderer.current?.stop();
  }, [ready, inView, paused, hidden, reduced, failed]);

  const animated = ready && !reduced && !failed;
  return <figure ref={figure} className="hero-simple-art" aria-label="Animated illustration of a hiring team reviewing candidates">
    <div className="hero-simple-picture hero-motion-picture" data-animated={animated}>
      <Image src="/images/home-hiring-ink-panorama.webp"
        alt="Four hiring colleagues reviewing resumes and discussing candidates around a flowing paper table"
        width={2048} height={682} className="hero-motion-fallback"
        sizes="(max-width: 759px) calc(100vw - 56px), (max-width: 1168px) calc(100vw - 80px), 1088px"
        priority draggable={false}/>
      <canvas ref={canvas} className="hero-motion-canvas" aria-hidden="true"/>
    </div>
    {animated && <button type="button" className="hero-animation-control"
      aria-label={paused ? "Play hero animation" : "Pause hero animation"}
      onClick={() => setPaused((current) => !current)}>
      {paused ? <Play size={16} aria-hidden="true"/> : <Pause size={16} aria-hidden="true"/>}
    </button>}
  </figure>;
}
