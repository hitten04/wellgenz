"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Check, CircleMinus, SlidersHorizontal, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";

const candidates = [
  {
    name: "Avery Shah",
    initials: "AS",
    score: 92,
    tags: ["Design systems", "Figma"],
    skills: 96,
    experience: 90,
    education: 85,
  },
  {
    name: "Jordan Lee",
    initials: "JL",
    score: 84,
    tags: ["Research", "Prototyping"],
    skills: 88,
    experience: 80,
    education: 80,
  },
  {
    name: "Casey Rao",
    initials: "CR",
    score: 76,
    tags: ["Visual design", "Figma"],
    skills: 80,
    experience: 70,
    education: 75,
  },
];

const criteria = [
  { key: "skills", label: "Skills", weight: 50 },
  { key: "experience", label: "Experience", weight: 30 },
  { key: "education", label: "Education", weight: 20 },
] as const;

export function MatchingDemo() {
  const [threshold, setThreshold] = useState(80);
  const reducedMotion = useReducedMotion();
  const sliderId = useId();
  const qualifying = candidates.filter(candidate => candidate.score >= threshold).length;

  return <div className="match-lab">
    <div className="match-lab-header">
      <div className="match-lab-title"><span><SlidersHorizontal size={21} aria-hidden="true"/></span><div><p>THE MATCHING WORKSPACE</p><h3>Potential, with perspective.</h3></div></div>
      <span className="match-lab-example">Interactive example<ArrowUpRight size={14} aria-hidden="true"/></span>
    </div>
    <div className="match-lab-layout">
      <div className="match-lab-settings">
        <div className="match-lab-role"><span className="match-lab-eyebrow">THE OPEN ROLE</span><h4>Product designer</h4><p>Set the criteria.<br/>See who meets your threshold.</p></div>
        <div className="match-lab-weights"><h4>What matters for this role</h4><div className="match-weight-strip" aria-hidden="true">{criteria.map(item => <span key={item.key} style={{ flex: item.weight }}/>)}</div><ul>{criteria.map(item => <li key={item.key}><span><i aria-hidden="true"/>{item.label}</span><strong>{item.weight}%</strong></li>)}</ul></div>
        <div className="match-lab-threshold">
          <label htmlFor={sliderId}>Shortlist threshold</label>
          <div className="match-threshold-value"><output htmlFor={sliderId}>{threshold}<small>%</small></output><span>Move the slider to<br/>explore the shortlist.</span></div>
          <input id={sliderId} type="range" min="60" max="95" step="1" value={threshold} aria-valuetext={`${threshold} percent matching threshold`} onChange={event => setThreshold(Number(event.target.value))}/>
          <div className="match-range-scale"><span>60%</span><span>95%</span></div>
        </div>
        <p className="match-lab-human"><UsersRound size={18} aria-hidden="true"/><span>Human review<br/><strong>always comes next.</strong></span></p>
      </div>
      <div className="match-lab-results">
        <div className="match-results-heading"><div><span className="match-lab-eyebrow">THE PEOPLE BEHIND THE SCORES</span><h4>Candidate matching</h4></div><span className="match-results-count">3 profiles</span></div>
        <ul className="match-person-list">
          {candidates.map(candidate => {
            const selected = candidate.score >= threshold;
            return <li className="match-person" data-qualifies={selected} key={candidate.name}>
              <div className="match-person-header"><span className="match-person-avatar" aria-hidden="true">{candidate.initials}</span><div className="match-person-identity"><h5>{candidate.name}</h5><p>Product designer</p></div><div className="match-person-score"><strong>{candidate.score}<small>%</small></strong><span>job match</span></div></div>
              <div className="match-person-evidence">{criteria.map(item => <div key={item.key}><div className="match-metric-label"><span>{item.label}</span><strong>{candidate[item.key]}%</strong></div><div className="match-metric-track"><motion.span initial={{ scaleX: reducedMotion ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: reducedMotion ? 0 : .65, ease: [.22, 1, .36, 1] }} style={{ width: `${candidate[item.key]}%` }}/></div></div>)}</div>
              <div className="match-person-footer"><div className="match-person-tags">{candidate.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="match-person-status">{selected ? <Check size={14} aria-hidden="true"/> : <CircleMinus size={14} aria-hidden="true"/>}{selected ? "Meets threshold" : "Below threshold"}</span></div>
            </li>;
          })}
        </ul>
        <div className="match-lab-summary" role="status" aria-live="polite" aria-atomic="true"><span className="match-summary-number">{qualifying}<small>/ 3</small></span><p>Example candidates meet your threshold.<br/><strong>Review the people behind the scores.</strong></p></div>
      </div>
    </div>
    <p className="match-lab-disclaimer">Fictional profiles and illustrative scores. This example runs in your browser and does not process resumes or make hiring decisions.</p>
  </div>;
}
