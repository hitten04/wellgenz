"use client";
import { useId, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

import { motion } from "motion/react";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Check, FileText, KanbanSquare, Sparkles } from "lucide-react";

export function HeroVisual() {
  return (
    <div
      className="hero-visual"
      aria-label="Illustration of a candidate connected with a role through AI matching"
    >
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="orbit orbit-three" aria-hidden="true" />
      <div className="orbit-dot orbit-dot-one" aria-hidden="true" />
      <div className="orbit-dot orbit-dot-two" aria-hidden="true" />
      <div className="visual-caption">
        <span className="tiny-dot" />A little less busywork. A lot more possibility.
      </div>
      <div className="hero-role">
        <span className="visual-icon">
          <BriefcaseBusiness size={18} />
        </span>
        <div>
          <span className="micro-label">THE OPPORTUNITY</span>
          <strong>Product designer</strong>
          <span>Design · Full time</span>
        </div>
        <ArrowRight size={16} aria-hidden="true" />
      </div>
      <div className="hero-core">
        <Sparkles size={34} strokeWidth={1.25} aria-hidden="true" />
        <span>
          Potential,<br />connected.
        </span>
      </div>
      <div className="hero-candidate">
        <div className="avatar avatar-peach">AS</div>
        <div className="candidate-info">
          <strong>Avery Shah</strong>
          <span>Product designer</span>
        </div>
        <span className="match-pill">92% match</span>
        <div className="candidate-skills">
          <span>Figma</span>
          <span>Design systems</span>
          <span>Research</span>
        </div>
        <div className="candidate-foot">
          <span>
            <Check size={13} /> Meets shortlist criteria
          </span>
          <Sparkles size={13} />
        </div>
      </div>
      <div className="hero-note">
        <span className="note-icon">
          <Check size={15} />
        </span>
        <div>
          <strong>Ready for a conversation</strong>
          <span>Your next step, in focus.</span>
        </div>
      </div>
      <span className="visual-disclaimer">Illustrative product concept · Fictional candidate</span>
    </div>
  );
}

export function ResumeVisual() {
  const reduced = useReducedMotion();

  return (
    <div
      className="resume-visual"
      aria-label="Illustration of a resume transformed into structured skills"
    >
      <div className="resume-file" style={{ position: "relative", overflow: "hidden" }}>
        {!reduced && (
          <motion.div
            className="resume-scanner-beam"
            animate={{ y: [-10, 100, -10] }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              ease: "easeInOut",
            }}
          />
        )}
        <FileText size={22} />
        <span>resume.pdf</span>
        <div className="paper-line" />
        <div className="paper-line short" />
        <div className="paper-line" />
      </div>

      <span className="parse-arrow">
        <ArrowRight size={18} />
      </span>

      <div className="parsed-profile">
        <span className="micro-label">PROFILE, ORGANIZED</span>
        <div>
          {["Python", "Docker"].map(skill => (
            <span key={skill} className="skill-tag">
              <Check size={10} style={{ color: "#7e52a8", marginRight: 3 }} />
              {skill}
            </span>
          ))}
        </div>
        <div>
          {["Experience", "Education"].map(item => (
            <span key={item} className="skill-tag">
              <Sparkles size={10} style={{ color: "#7e52a8", marginRight: 3 }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CareerVisual() {
  return (
    <div className="career-visual">
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <span className="browser-address">Your company. Your careers.</span>
      </div>
      <div className="career-content">
        <span className="career-brand">
          studio north<span>®</span>
        </span>
        <h4>
          Do work that<br />moves you.
        </h4>
        <div className="career-job">
          <span>Product designer</span>
          <ArrowRight size={15} />
        </div>
        <div className="career-job">
          <span>Frontend engineer</span>
          <ArrowRight size={15} />
        </div>
      </div>
      <span className="visual-disclaimer">Illustrative company & roles</span>
    </div>
  );
}

export function PipelineVisual() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stages = [
    { title: "New", subtitle: "Start with the person", name: "Jordan Lee", label: "Profile ready", icon: FileText, next: "Review the application", context: "Resume & candidate details" },
    { title: "Shortlisted", subtitle: "Consider the fit", name: "Avery Shah", label: "Criteria matched", icon: Check, next: "Consider an interview", context: "Matching criteria & team notes" },
    { title: "Interview", subtitle: "Make the connection", name: "Sam Morgan", label: "Conversation scheduled", icon: CalendarDays, next: "Coordinate the interview", context: "Time, meeting link & reviewer" },
    { title: "Offer", subtitle: "Begin the next chapter", name: "Taylor Kim", label: "Next chapter", icon: Check, next: "Follow through on the offer", context: "Offer email & application stage" },
  ];
  return <figure className="hiring-journey" aria-labelledby={`${id}-heading`}>
    <div className="hiring-journey-layout"><div className="hiring-journey-intro"><p className="hiring-journey-eyebrow"><KanbanSquare size={16} strokeWidth={1.4} aria-hidden="true"/>The hiring journey</p><h3 id={`${id}-heading`}>One journey.<br/><span>Every next step.</span></h3><div className="hiring-journey-tabs" role="tablist" aria-label="Preview a hiring stage">{stages.map((stage,index) => <button key={stage.title} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={node => { tabs.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={event => {
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % stages.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + stages.length - 1) % stages.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = stages.length - 1;
      else return;
      event.preventDefault(); setActive(next); tabs.current[next]?.focus();
    }}><span className="hiring-journey-number">0{index+1}</span><span><strong>{stage.title}</strong><span>{stage.subtitle}</span></span><ArrowRight size={16} aria-hidden="true"/></button>)}</div></div>
    <div className="hiring-journey-panels">{stages.map((stage,index) => <div key={stage.title} className="hiring-journey-panel" role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} aria-hidden={active !== index} inert={active !== index} tabIndex={active === index ? 0 : -1}><div className="hiring-journey-panel-top"><span>0{index+1} / {stage.title}</span><span className="hiring-journey-status"><stage.icon size={13} aria-hidden="true"/>{stage.label}</span></div><div className="hiring-journey-person"><span className="hiring-journey-avatar" aria-hidden="true">{stage.name.split(" ").map(part => part[0]).join("")}</span><div><strong>{stage.name}</strong><span>Product designer</span></div></div><dl className="hiring-journey-details"><div><dt>In context</dt><dd>{stage.context}</dd></div><div><dt>Next step</dt><dd>{stage.next}</dd></div></dl><div className="hiring-journey-panel-note"><span aria-hidden="true"/><span>Candidate context stays with the application.</span></div></div>)}</div></div>
    <figcaption><span>Explore a stage to see its next step.</span><span>Illustrative journey · Fictional candidates</span></figcaption>
  </figure>;
}
