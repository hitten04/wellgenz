"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "./reveal";

const steps = [
  { number: "01", stage: "Publish", title: "Open the door", text: "Define the role and matching requirements. Publish it to your branded career page in one click.", art: "workflow-publish", outcome: "Your opportunity, ready to share." },
  { number: "02", stage: "Collect", title: "Bring people in", text: "Collect applications from your career page or hiring inbox. Turn resumes into structured profiles.", art: "workflow-applications", outcome: "Every applicant, with context." },
  { number: "03", stage: "Match", title: "Find the fit", text: "Compare skills, experience, and education. Set a shortlist threshold and review the people behind the scores.", art: "workflow-review", outcome: "AI assistance. Human judgment." },
  { number: "04", stage: "Connect", title: "Take the next step", text: "Schedule a Meet or Zoom interview. Follow through with shortlist updates, offers, and rejection emails.", art: "workflow-interview", outcome: "A connected journey to the decision." },
];

export function HomeJourney() {
  const [selected, setSelected] = useState(3);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;
  return (
        <div className="journey-map">
          <ol className="journey-route">
            {steps.map((step, index) => <li key={step.number} data-active={active === index}>
              <Reveal className="journey-stop" delay={index * .06} y={14}>
                <button type="button" className="journey-stop-select"
                  aria-label={`Select step ${step.number}: ${step.title}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                  onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(index); }}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setFocused(index)} onBlur={() => setFocused(null)}
                />
                <div className="journey-stop-art" aria-hidden="true">
                  <Image src={`/images/${step.art}.webp`} alt="" width={256} height={256} sizes="(max-width: 599px) 88px, (max-width: 899px) 112px, 144px"/>
                </div>
                <div className="journey-stop-marker"><span>{step.number}</span><span>{step.stage}</span></div>
                <div className="journey-stop-copy"><h3>{step.title}</h3><p>{step.text}</p></div>
                <div className="journey-stop-outcome"><Check size={14} aria-hidden="true"/><span>{step.outcome}</span></div>
              </Reveal>
            </li>)}
          </ol>
        </div>
  );
}
