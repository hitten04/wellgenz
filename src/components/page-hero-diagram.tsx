"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from "motion/react";
import { BriefcaseBusiness, CalendarDays, ChartNoAxesCombined, FileText, Globe2, Heart, HelpCircle, Mail, MessageSquare, ScanText, ShieldCheck, Sparkles, UsersRound, Workflow, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "./use-reduced-motion";
import type { PointerEvent } from "react";

type Node = { title: string; detail: string; icon: LucideIcon };
type Diagram = { title: string; center: string; icon: LucideIcon; nodes: [Node, Node, Node, Node] };
const diagrams: Record<string, Diagram> = {
  Features: { title: "Your hiring toolkit, connected.", center: "One workspace", icon: Sparkles, nodes: [
    { title: "Publish", detail: "Jobs & career pages", icon: Globe2 }, { title: "Understand", detail: "Resumes & AI matching", icon: ScanText },
    { title: "Organize", detail: "Pipeline & team notes", icon: UsersRound }, { title: "See clearly", detail: "Hiring analytics", icon: ChartNoAxesCombined },
  ] },
  "How it works": { title: "Every step carries the context forward.", center: "Hiring in flow", icon: Workflow, nodes: [
    { title: "01 · Publish", detail: "Share your open roles", icon: BriefcaseBusiness }, { title: "02 · Review", detail: "Find relevant people", icon: ScanText },
    { title: "04 · Follow up", detail: "Offers & email updates", icon: Mail }, { title: "03 · Meet", detail: "Schedule an interview", icon: CalendarDays },
  ] },
  "Why Wellgenz": { title: "Less scattered work. More shared clarity.", center: "People first", icon: Heart, nodes: [
    { title: "One context", detail: "Connected candidate data", icon: FileText }, { title: "Team alignment", detail: "Notes & shared stages", icon: UsersRound },
    { title: "Your judgment", detail: "AI supports your review", icon: Sparkles }, { title: "Clear access", detail: "Role-based permissions", icon: ShieldCheck },
  ] },
  FAQs: { title: "A clearer picture, before you begin.", center: "Find clarity", icon: HelpCircle, nodes: [
    { title: "Getting started", detail: "Know your workspace", icon: BriefcaseBusiness }, { title: "AI & matching", detail: "Understand the process", icon: Sparkles },
    { title: "Your team", detail: "Access & collaboration", icon: UsersRound }, { title: "Hiring tools", detail: "Explore the essentials", icon: Workflow },
  ] },
  "About us": { title: "Built around the human side of hiring.", center: "Meet Wellgenz", icon: Heart, nodes: [
    { title: "Our purpose", detail: "More room for people", icon: Heart }, { title: "Our approach", detail: "Make hiring clearer", icon: Sparkles },
    { title: "Your team", detail: "Work better together", icon: UsersRound }, { title: "The journey", detail: "From role to offer", icon: Workflow },
  ] },
  "Contact us": { title: "Start with a conversation.", center: "Let’s connect", icon: MessageSquare, nodes: [
    { title: "Explore", detail: "Discuss your hiring needs", icon: BriefcaseBusiness }, { title: "Ask", detail: "Questions about Wellgenz", icon: HelpCircle },
    { title: "Share", detail: "Tell us what matters", icon: MessageSquare }, { title: "Connect", detail: "Reach our team by email", icon: Mail },
  ] },
};

export function PageHeroDiagram({ page }: { page: string }) {
  const diagram = diagrams[page] ?? diagrams.Features;
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerX, { stiffness: 75, damping: 22 });
  const rotateY = useSpring(pointerY, { stiffness: 75, damping: 22 });
  const lightX = useSpring(50, { stiffness: 100, damping: 25 });
  const lightY = useSpring(50, { stiffness: 100, damping: 25 });
  const lightOpacity = useSpring(0, { stiffness: 90, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,.85), rgba(204,166,245,.22) 25%, transparent 58%)`;
  const cardX = useTransform(rotateY, value => value * 1.25);
  const hubX = useTransform(rotateY, value => value * 2);
  const Icon = diagram.icon;
  function move(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    pointerX.set((.5 - y) * 10);
    pointerY.set((x - .5) * 10);
    lightX.set(x * 100);
    lightY.set(y * 100);
    lightOpacity.set(1);
  }
  function reset() { pointerX.set(0); pointerY.set(0); lightOpacity.set(0); }
  return <figure className="page-hero-art" aria-label={`${page}: ${diagram.title}`} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <div className="workspace-perspective">
      <motion.div className="workspace-scene" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}>
        <div className="workspace-shadow" aria-hidden="true" />
        <div className="workspace-sheet workspace-sheet-back" aria-hidden="true" />
        <div className="workspace-sheet workspace-sheet-mid" aria-hidden="true" />
        <motion.div className="workspace-light" aria-hidden="true" style={{ background: spotlight, opacity: reduced ? 0 : lightOpacity }} />
        <motion.div className="workspace-window" style={{ x: reduced ? 0 : cardX }} animate={reduced ? {} : { y: [0, -4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          <div className="workspace-chrome"><span /><span /><span /><span>wellgenz / {page.toLowerCase()}</span></div>
          <div className="workspace-heading"><span className="workspace-emblem"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span><div><span>YOUR CONNECTED WORKSPACE</span><strong>{diagram.center}</strong></div></div>
          <div className="workspace-rows">{diagram.nodes.slice(0, 2).map((node, i) => { const RowIcon = node.icon; return <div className="workspace-row" key={node.title}><span><RowIcon size={19} aria-hidden="true" /></span><div><strong>{node.title}</strong><span>{node.detail}</span></div><span className="workspace-row-index">0{i + 1}</span></div>; })}</div>
          <div className="workspace-track" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="workspace-bottom"><span>One connected journey</span><Sparkles size={15} aria-hidden="true" /></div>
        </motion.div>
        {diagram.nodes.slice(2).map((node, index) => { const NodeIcon = node.icon; return <motion.div className={`workspace-float workspace-float-${index}`} key={node.title} style={{ x: reduced ? 0 : hubX }} animate={reduced ? {} : { y: [0, index ? -7 : 6, 0] }} transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}>
          <span className="workspace-float-icon"><NodeIcon size={23} strokeWidth={1.6} aria-hidden="true" /></span><div><strong>{node.title}</strong><span>{node.detail}</span></div><span className="workspace-float-dot" aria-hidden="true" />
        </motion.div>; })}
        <motion.div className="workspace-brand-tile" aria-hidden="true" style={{ x: reduced ? 0 : hubX }} animate={reduced ? {} : { y: [0, -6, 0], rotate: [-8, -5, -8] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><Sparkles size={27} strokeWidth={1.4} /><span>w<span>.</span></span></motion.div>
      </motion.div>
    </div>
    <figcaption>{diagram.title}<span>Illustrative overview</span></figcaption>
  </figure>;
}
