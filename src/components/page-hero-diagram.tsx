"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
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
  const Icon = diagram.icon;
  function move(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((.5 - (event.clientY - rect.top) / rect.height) * 5);
    pointerY.set(((event.clientX - rect.left) / rect.width - .5) * 5);
  }
  function reset() { pointerX.set(0); pointerY.set(0); }
  return <figure className="page-hero-art" aria-label={`${page}: ${diagram.title}`} onPointerMove={move} onPointerLeave={reset}>
    <div className="page-art-perspective">
      <motion.div className="page-art-board" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}>
        <div className="page-art-foundation" aria-hidden="true" />
        <svg className="page-art-connections" viewBox="0 0 500 440" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M120 102C120 175 250 140 250 220M380 102C380 175 250 140 250 220M120 338C120 265 250 300 250 220M380 338C380 265 250 300 250 220" stroke="#c8b2e5" strokeWidth="1.5" />
          <motion.path d="M120 102C120 175 250 140 250 220C250 300 380 265 380 338" stroke="#9864d2" strokeWidth="2" strokeDasharray="5 18" animate={reduced ? {} : { strokeDashoffset: [0, -92] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
        </svg>
        <motion.div className="page-art-hub" animate={reduced ? {} : { y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <Icon size={30} strokeWidth={1.5} aria-hidden="true" /><strong>wellgenz<span>.</span></strong><span>{diagram.center}</span>
        </motion.div>
        {diagram.nodes.map((node, index) => { const NodeIcon = node.icon; return <motion.div className={`page-art-node page-art-node-${index}`} key={node.title} animate={reduced ? {} : { y: [0, -4, 0] }} transition={{ duration: 5 + index * .4, repeat: Infinity, delay: index * .3, ease: "easeInOut" }}>
          <span className="page-art-node-icon"><NodeIcon size={21} strokeWidth={1.6} aria-hidden="true" /></span><strong>{node.title}</strong><span>{node.detail}</span>
        </motion.div>; })}
      </motion.div>
    </div>
    <figcaption>{diagram.title}<span>Illustrative overview</span></figcaption>
  </figure>;
}
