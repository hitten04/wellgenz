"use client";
import { useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { BriefcaseBusiness, CalendarDays, Check, FileCheck2, GitBranch, Mail, Pause, Play, Sparkles } from "lucide-react";
const nodes = [
  { label: "Career page", detail: "One-click publishing", icon: BriefcaseBusiness, className: "node-career" },
  { label: "Applications", detail: "Portal + email resumes", icon: Mail, className: "node-applicants" },
  { label: "AI matching", detail: "Role-specific criteria", icon: Sparkles, className: "node-match" },
  { label: "Interviews", detail: "Google Meet + Zoom", icon: CalendarDays, className: "node-meet" },
  { label: "Pipeline", detail: "Every next step", icon: GitBranch, className: "node-pipeline" },
  { label: "Offer letters", detail: "Email automation", icon: FileCheck2, className: "node-offer" },
];
export function HeroDiagram() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 110, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 110, damping: 24 });
  const reset = () => { x.set(0); y.set(0); };
  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (paused || reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 16);
  };
  return <figure className={`hero-diagram ${paused ? "diagram-paused" : ""}`}>
    <div className="diagram-topline"><span><span className="tiny-dot" />THE CONNECTED HIRING ENGINE</span><button aria-label={paused ? "Play diagram animation" : "Pause diagram animation"} aria-pressed={paused} onClick={() => { reset(); setPaused(!paused); }}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
    <div className="diagram-scene" onPointerMove={follow} onPointerLeave={reset} role="img" aria-label="3D hiring diagram connecting career page publishing, email applications, AI matching, Google Meet and Zoom interviews, pipeline tracking, and automated offer emails through Wellgenz.">
      <div className="diagram-glow" aria-hidden="true" /><div className="diagram-shadow" aria-hidden="true" />
      <motion.div className="diagram-tilt" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }} aria-hidden="true"><div className="diagram-plane"><div className="diagram-grid" />
        <svg className="diagram-connections" viewBox="0 0 540 540" fill="none"><defs><linearGradient id="flow-line"><stop stopColor="#8e5feb"/><stop offset="1" stopColor="#e6866d"/></linearGradient></defs>{["M270 270 L110 100","M270 270 L370 80","M270 270 L455 260","M270 270 L375 435","M270 270 L115 430","M270 270 L65 270"].map(path => <path key={path} d={path} stroke="url(#flow-line)" strokeWidth="2" strokeDasharray="5 7" />)}</svg>
        {nodes.map(node => <div key={node.label} className={`diagram-tile ${node.className}`}><div className="tile-top"><node.icon size={24} strokeWidth={1.6} /><strong>{node.label}</strong><span>{node.detail}</span></div><span className="tile-edge" /></div>)}
        <div className="diagram-engine"><div className="engine-floor engine-floor-back" /><div className="engine-floor engine-floor-mid" /><div className="engine-top"><Sparkles size={29} strokeWidth={1.3} /><span>wellgenz<span>.</span></span><small>PEOPLE → POSSIBILITIES</small></div><div className="engine-edge" /></div>
      </div></motion.div>
      <div className="diagram-callout callout-inbox"><span className="callout-icon"><Mail size={15} /></span><div><strong>From inbox to opportunity</strong><span>Resume → candidate profile</span></div></div>
      <div className="diagram-callout callout-meeting"><span className="callout-icon"><Check size={15} /></span><div><strong>The next step, connected</strong><span>Shortlist → interview → offer</span></div></div>
    </div>
    <figcaption>One connected journey. From first hello to the offer email.<small>Illustrative product concept <span className="cursor-hint">· Move your cursor to explore</span></small></figcaption>
  </figure>;
}
