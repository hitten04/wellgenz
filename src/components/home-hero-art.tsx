"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { createHeroMotionRenderer, type HeroMotionRenderer } from "@/lib/hero-motion-renderer";
import { createHeroFrameRenderer } from "@/lib/hero-frame-renderer";

export function HomeHeroArt() {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<HeroMotionRenderer | null>(null);
  const frameCanvas = useRef<HTMLCanvasElement>(null);
  const [forceFrames, setForceFrames] = useState(false);
  const [rendererType, setRendererType] = useState<"webgl" | "frames">("webgl");
  const inView = useInView(figure, { amount: .15 });
  const reduced = useReducedMotion();
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
    if (reduced || !canvas.current || !frameCanvas.current) return;
    setReady(false);
    const element = canvas.current;
    const contextLost = (event: Event) => { event.preventDefault(); renderer.current?.stop(); setForceFrames(true); };
    element.addEventListener("webglcontextlost", contextLost);
    let cancelled = false;
    let instance: HeroMotionRenderer | null = null;
    const mobileCanvas = frameCanvas.current;
    const initialize = async () => {
      const mobile = window.matchMedia("(max-width: 759px), (pointer: coarse)").matches;
      if (forceFrames || mobile) {
        return { engine: await createHeroFrameRenderer(mobileCanvas), type: "frames" as const };
      }
      try {
        return { engine: await createHeroMotionRenderer(element), type: "webgl" as const };
      } catch {
        // A WebGL canvas cannot become a 2D canvas, so use a separate surface.
        return { engine: await createHeroFrameRenderer(mobileCanvas), type: "frames" as const };
      }
    };
    initialize().then(({ engine, type }) => {
      if (cancelled) { engine.dispose(); return; }
      instance = engine;
      renderer.current = engine;
      setRendererType(type);
      setFailed(false);
      setReady(true);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => {
      cancelled = true;
      element.removeEventListener("webglcontextlost", contextLost);
      instance?.dispose();
      renderer.current = null;
    };
  }, [reduced, forceFrames]);

  useEffect(() => {
    if (ready && inView && !hidden && !reduced && !failed) renderer.current?.start();
    else renderer.current?.stop();
  }, [ready, inView, hidden, reduced, failed]);

  const animated = ready && !reduced && !failed;
  return <figure ref={figure} className="hero-simple-art" aria-label="Animated illustration of a hiring team reviewing candidates">
    <div className="hero-simple-picture hero-motion-picture" data-animated={animated} data-renderer={rendererType}>
      <Image src="/images/home-hiring-ink-panorama.webp"
        alt="Four hiring colleagues reviewing resumes and discussing candidates around a flowing paper table"
        width={2048} height={682} className="hero-motion-fallback"
        sizes="(max-width: 759px) calc(100vw - 56px), (max-width: 1168px) calc(100vw - 80px), 1088px"
        priority draggable={false}/>
      <canvas ref={canvas} className="hero-motion-canvas" aria-hidden="true"/>
      <canvas ref={frameCanvas} className="hero-frame-canvas" aria-hidden="true"/>
    </div>
  </figure>;
}
