"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { BriefcaseBusiness, CalendarDays, FileCheck2, GitBranch, Mail, Pause, Play, Sparkles, Box, Scan } from "lucide-react";

const nodes = [
  { label: "Publish", detail: "Your career page", icon: BriefcaseBusiness, x: 110, y: 105, color: "violet" },
  { label: "Receive", detail: "Portal + email", icon: Mail, x: 430, y: 105, color: "coral" },
  { label: "Match", detail: "AI + your criteria", icon: Sparkles, x: 485, y: 290, color: "blue" },
  { label: "Meet", detail: "Google Meet + Zoom", icon: CalendarDays, x: 430, y: 475, color: "coral" },
  { label: "Track", detail: "Every hiring stage", icon: GitBranch, x: 110, y: 475, color: "blue" },
  { label: "Offer", detail: "Automated emails", icon: FileCheck2, x: 55, y: 290, color: "violet" },
];

export function HeroDiagram() {
  const [paused, setPaused] = useState(false);
  const [angled, setAngled] = useState(false);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 95, damping: 19 });
  const rotateY = useSpring(y, { stiffness: 95, damping: 19 });
  const reset = () => { x.set(0); y.set(0); };
  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (paused || reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 32);
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 38);
  };
  return <figure className={`hero-diagram diagram-v2 ${paused ? "diagram-paused" : ""} ${angled ? "diagram-angled" : ""}`}>
    <div className="diagram-topline"><span><span className="tiny-dot" />ONE CONNECTED HIRING ENGINE</span><div className="diagram-controls">
      <button className="diagram-view" aria-label="Explore angled 3D view" aria-pressed={angled} onClick={() => { reset(); setAngled(!angled); }}>{angled ? <Scan size={14} /> : <Box size={14} />}<span>{angled ? "Top view" : "3D view"}</span></button>
      <button aria-label={paused ? "Play diagram animation" : "Pause diagram animation"} aria-pressed={paused} onClick={() => { reset(); setPaused(!paused); }}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
    </div></div>
    <div className="diagram-scene" onPointerMove={follow} onPointerLeave={reset} role="img" aria-label="Interactive dimensional hiring engine: publish a career page, receive applications, match candidates, schedule interviews, track hiring stages, and automate offer emails.">
      <div className="diagram-glow" aria-hidden="true" /><div className="diagram-shadow" aria-hidden="true" />
      <motion.div className="diagram-tilt" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }} aria-hidden="true">
        <div className="diagram-plane">
          <div className="engine-platform" /><div className="diagram-grid" />
          <div className="engine-orbit orbit-outer" /><div className="engine-orbit orbit-inner" />
          <svg className="diagram-connections" viewBox="0 0 540 580" fill="none">
            <defs><linearGradient id="flow-line"><stop stopColor="#a48afa"/><stop offset="1" stopColor="#e9a486"/></linearGradient></defs>
            {nodes.map((node, i) => <g key={node.label}>
              <path className="connection-track" d={`M270 290 L${node.x} ${node.y}`} stroke="url(#flow-line)" strokeWidth="1.5" />
              <path className="connection-packet" pathLength="100" d={`M${node.x} ${node.y} L270 290`} stroke={node.color === "coral" ? "#e7946d" : "#9261e5"} strokeWidth="3" strokeLinecap="round" style={{ animationDelay: `${i * -.6}s` }} />
            </g>)}
          </svg>
          {nodes.map((node, i) => <div key={node.label} className={`diagram-tile tile-${node.color}`} style={{ left: node.x - 57, top: node.y - 49, "--float-delay": `${i * -.8}s` } as CSSProperties}>
            <div className="tile-slab" /><div className="tile-top"><span className="tile-number">0{i + 1}</span><span className="tile-symbol"><node.icon size={23} strokeWidth={1.7} /></span><strong>{node.label}</strong><span>{node.detail}</span></div>
          </div>)}
          <div className="diagram-engine"><div className="engine-floor engine-floor-back" /><div className="engine-floor engine-floor-mid" /><div className="engine-top"><div className="engine-emblem"><Sparkles size={32} strokeWidth={1.2} /></div><span>wellgenz<span>.</span></span><small>THE HUMAN SIDE OF HIRING</small><div className="engine-lights"><i /><i /><i /><i /><i /></div></div><div className="engine-edge" /></div>
        </div>
      </motion.div>
    </div>
    <figcaption><span className="diagram-caption-dot" />From first hello to your next great hire.<small>Illustrative workflow <span className="cursor-hint">· Move your cursor to feel the depth</span></small></figcaption>
  </figure>;
}
