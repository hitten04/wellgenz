import type { CSSProperties } from "react";
import { FileText, Mail } from "lucide-react";

// All examples are fictional; each mounted card occupies one phase of a six-second loop.
const candidates = [
  { name: "Avery Morgan", role: "Product designer", initial: "A", delay: "0s", theme: "peach" },
  { name: "Jordan Ellis", role: "Frontend engineer", initial: "J", delay: "-4s", theme: "lilac" },
  { name: "Riley Chen", role: "People operations", initial: "R", delay: "-2s", theme: "blue" },
];

export function CandidateDeck() {
  return <div className="candidate-deck">{candidates.map(candidate => <div key={candidate.name} className={`intake-face deck-card deck-${candidate.theme}`} style={{ "--deck-delay": candidate.delay } as CSSProperties}>
    <span className="journey-label"><FileText size={14} />NEW POSSIBILITIES</span>
    <div className="paper-profile"><span className={`profile-avatar avatar-${candidate.theme}`}>{candidate.initial}</span><div><strong>{candidate.name}</strong><span>{candidate.role}</span></div><span className="paper-pin" /></div>
    <div className="paper-lines"><i /><i /><i /></div>
    <div className="intake-channels"><span>Career portal</span><span><Mail size={10} />Email</span></div>
  </div>)}</div>;
}
