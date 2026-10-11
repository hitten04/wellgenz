"use client";
import { useReducedMotion } from "./use-reduced-motion";

import { motion } from "motion/react";
import { ArrowRight, BriefcaseBusiness, Check, FileText, Sparkles } from "lucide-react";

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
  const stages = [
    { title: "New", names: ["Jordan Lee", "Casey Rao"], label: "Profile ready", icon: FileText },
    { title: "Shortlisted", names: ["Avery Shah"], label: "Criteria matched", icon: Sparkles },
    {
      title: "Interview",
      names: ["Sam Morgan"],
      label: "Conversation scheduled",
      icon: BriefcaseBusiness,
    },
    { title: "Offer", names: ["Taylor Kim"], label: "Next chapter", icon: Check },
  ];

  return (
    <figure className="pipeline-figure">
      <div
        className="pipeline-scroll"
        role="region"
        aria-label="Illustrative recruitment stages, scroll horizontally on small screens"
        tabIndex={0}
      >
        <div className="pipeline-board">
          {stages.map((stage, index) => (
            <div className="pipeline-column" key={stage.title}>
              <div className="pipeline-title">
                <span className={`stage-dot stage-${index}`} />
                <h3>{stage.title}</h3>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              {stage.names.map((name, n) => (
                <div className="pipeline-person" key={name}>
                  <span className={`avatar ${index % 2 ? "avatar-lilac" : "avatar-peach"}`}>
                    {name
                      .split(" ")
                      .map(part => part[0])
                      .join("")}
                  </span>
                  <strong>{name}</strong>
                  <span className="pipeline-person-role">Product designer</span>
                  <span className="pipeline-person-label">
                    <stage.icon size={12} />
                    {n ? "Resume received" : stage.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <figcaption>Illustrative hiring journey · Fictional candidates</figcaption>
    </figure>
  );
}
