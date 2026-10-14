"use client";

import { useId, useState } from "react";
import { Check, CircleMinus, SlidersHorizontal } from "lucide-react";

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
  const sliderId = useId();
  const qualifying = candidates.filter(candidate => candidate.score >= threshold).length;

  return <div className="match-compact">
    <div className="match-compact-heading"><h3><SlidersHorizontal size={20} aria-hidden="true"/>Candidate matching</h3><span>Product designer <i aria-hidden="true">·</i> Interactive example</span></div>
    <div className="match-compact-toolbar">
      <div className="match-compact-control"><label htmlFor={sliderId}>Shortlist threshold <output htmlFor={sliderId}>{threshold}%</output></label><div className="match-compact-range"><span>60%</span><input id={sliderId} type="range" min="60" max="95" step="1" value={threshold} aria-valuetext={`${threshold} percent matching threshold`} onChange={event => setThreshold(Number(event.target.value))}/><span>95%</span></div></div>
      <p className="match-compact-count" role="status" aria-live="polite" aria-atomic="true"><strong>{qualifying} <span>/ 3</span></strong><span>meet your threshold</span></p>
    </div>
    <table className="match-compact-table">
      <caption className="sr-only">Illustrative candidate scores for a Product designer role. Criteria: skills 50 percent, experience 30 percent, education 20 percent.</caption>
      <thead><tr><th scope="col">Candidate</th><th scope="col">Job match</th>{criteria.map(item => <th key={item.key} scope="col">{item.label}<span>{item.weight}% weight</span></th>)}<th scope="col">Shortlist</th></tr></thead>
      <tbody>{candidates.map(candidate => {
        const selected = candidate.score >= threshold;
        return <tr key={candidate.name} data-qualifies={selected}>
          <th scope="row" className="match-compact-person"><div><span className="match-compact-avatar" aria-hidden="true">{candidate.initials}</span><div><strong>{candidate.name}</strong><span>{candidate.tags.join(" · ")}</span></div></div></th>
          <td className="match-compact-score"><strong>{candidate.score}<small>%</small></strong><span>job match</span></td>
          {criteria.map(item => <td key={item.key} className={`match-compact-metric match-compact-${item.key}`}><span>{item.label}</span><strong>{candidate[item.key]}%</strong><div aria-hidden="true"><i style={{width: `${candidate[item.key]}%`}}/></div></td>)}
          <td className="match-compact-status"><span>{selected ? <Check size={14} aria-hidden="true"/> : <CircleMinus size={14} aria-hidden="true"/>}{selected ? "Meets threshold" : "Below threshold"}</span></td>
        </tr>;
      })}</tbody>
    </table>
    <p className="match-compact-footnote">Fictional profiles and illustrative scores.<span>Human review comes next.</span></p>
  </div>;
}
