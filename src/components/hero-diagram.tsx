"use client";

import { type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, FileText, Mail, Sparkles, Video } from "lucide-react";

export function HeroDiagram() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 85, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 85, damping: 20 });
  const reset = () => { x.set(0); y.set(0); };
  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - bounds.top) / bounds.height - .5) * 16);
    y.set(((event.clientX - bounds.left) / bounds.width - .5) * 20);
  };
  const enter = (delay: number) => ({ initial: false as const, whileInView: reduced ? undefined : { y: [18, -3, 0] }, viewport: { once: true }, transition: { duration: 1.4, delay, ease: "easeOut" as const } });
  return <figure className="hero-diagram journey-visual">
    <div className="journey-eyebrow"><span /> A LITTLE INTELLIGENCE. A LOT OF POSSIBILITY.</div>
    <div className="diagram-scene" onPointerMove={follow} onPointerLeave={reset} role="img" aria-label="A dimensional hiring journey: resumes enter Wellgenz, role-specific AI matching helps create a shortlist, and the journey continues through interviews and offer emails. Fictional candidate example.">
      <div className="journey-halo" aria-hidden="true" />
      <motion.div className="diagram-tilt" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }} aria-hidden="true">
        <div className="journey-stage">
          <div className="journey-orbit orbit-a" /><div className="journey-orbit orbit-b" /><div className="journey-orbit orbit-c" />
          <svg className="journey-trails" viewBox="0 0 600 600" fill="none"><defs><linearGradient id="journey-gradient"><stop stopColor="#ca9ceb"/><stop offset=".5" stopColor="#8d72dc"/><stop offset="1" stopColor="#eea386"/></linearGradient></defs><path d="M147 158 C147 255 218 242 300 313 C400 313 465 354 465 469 M300 313 C340 221 478 249 478 137 M300 313 C225 377 145 393 145 504" stroke="url(#journey-gradient)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/><path className="journey-signal" pathLength="100" d="M147 158 C147 255 218 242 300 313 C400 313 465 354 465 469" stroke="#a076dc" strokeWidth="4" strokeLinecap="round"/></svg>
          <motion.div className="journey-intake" {...enter(.1)}><div className="paper-back paper-back-two"/><div className="paper-back"/><div className="intake-face"><span className="journey-label"><FileText size={14}/>NEW POSSIBILITIES</span><div className="paper-profile"><span className="profile-avatar avatar-peach">A</span><div><strong>Avery Morgan</strong><span>Product designer</span></div><span className="paper-pin"/></div><div className="paper-lines"><i/><i/><i/></div><div className="intake-channels"><span>Career portal</span><span><Mail size={10}/>Email</span></div></div></motion.div>
          <motion.div className="journey-core-wrap" {...enter(.25)}><div className="journey-core"><div className="core-glass core-glass-back"/><div className="core-glass core-glass-mid"/><div className="core-medallion"><Sparkles size={31} strokeWidth={1.3}/><strong>wellgenz<span>.</span></strong><span>MAKE ROOM FOR PEOPLE</span></div><span className="core-satellite"><Sparkles size={13}/></span></div></motion.div>
          <motion.div className="journey-offer" {...enter(.55)}><span className="offer-seal"><Mail size={21}/></span><div><span className="journey-label">THE NEXT CHAPTER</span><strong>An offer. A new beginning.</strong></div><span className="offer-check"><Check size={12}/></span></motion.div>
          <motion.div className="journey-match" {...enter(.4)}><div className="match-face"><div className="match-heading"><span className="match-icon"><Sparkles size={16}/></span><span>Potential, brought into focus.</span><ArrowUpRight size={15}/></div><div className="match-person"><span className="profile-avatar avatar-lilac">A</span><div><strong>Avery Morgan</strong><span>Ready for a closer look</span><div className="journey-skills"><span>Design systems</span><span>Research</span></div></div></div><div className="journey-evidence"><span>Role-specific matching</span><span><Check size={11}/>Team-led decisions</span></div></div></motion.div>
          <motion.div className="journey-meeting" {...enter(.7)}><span className="meeting-symbol"><Video size={19}/></span><div><span className="journey-label">TURN FIT INTO CONVERSATION</span><strong>Meet your next possibility.</strong><span>Google Meet + Zoom</span></div></motion.div>
          <span className="journey-spark spark-one">✦</span><span className="journey-spark spark-two">✦</span><span className="journey-dot dot-one"/><span className="journey-dot dot-two"/>
        </div>
      </motion.div>
    </div>
    <figcaption>From a first impression to a new beginning.<span>One connected hiring journey · Illustrative concept</span></figcaption>
  </figure>;
}
