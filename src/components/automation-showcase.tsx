"use client";

import { useId, useRef, useState } from "react";
import { CalendarDays, Check, FileCheck2, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";

const messages = [
  { label: "Shortlist", icon: Check, subject: "Avery, let’s take the next step.", body: "Thank you for applying for the Product Designer role. We’d love to learn more about your work and arrange a conversation.", status: "Shortlist email", next: "Invite to interview" },
  { label: "Interview", icon: CalendarDays, subject: "Your interview, all in one place.", body: "We’re looking forward to meeting you. Your invitation brings together the date, time, interviewer, and online meeting link.", status: "Interview invitation", next: "Google Meet or Zoom" },
  { label: "Offer", icon: FileCheck2, subject: "Your next chapter starts here.", body: "We’re pleased to offer you the Product Designer role. Review your offer letter and the next steps from our hiring team.", status: "Offer letter email", next: "Offer communication" },
  { label: "Rejection", icon: Mail, subject: "An update on your application.", body: "Thank you for your time and interest. We won’t be moving forward for this role, and we appreciate getting to know your work.", status: "Rejection email", next: "Close the loop" },
];

export function AutomationShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  return <div className="candidate-messages">
    <div className="message-desk-heading"><span><Mail size={18} aria-hidden="true"/>Hiring updates</span><span>Examples</span></div>
    <div className="message-stage-tabs" role="tablist" aria-label="Hiring email examples">
      {messages.map((item, index) => <button
        key={item.label} type="button" role="tab"
        ref={node => { refs.current[index] = node; }}
        id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`}
        aria-selected={active === index} tabIndex={active === index ? 0 : -1}
        onClick={() => setActive(index)}
        onKeyDown={event => {
          let next = index;
          if (event.key === "ArrowRight") next = (index + 1) % messages.length;
          else if (event.key === "ArrowLeft") next = (index + messages.length - 1) % messages.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = messages.length - 1;
          else return;
          event.preventDefault(); setActive(next); refs.current[next]?.focus();
        }}
      ><item.icon size={15} aria-hidden="true"/>{item.label}</button>)}
    </div>
    {messages.map((item, index) => <motion.div
      key={item.label} className="candidate-message" role="tabpanel"
      id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`}
      tabIndex={0} hidden={active !== index}
      initial={false} animate={{ opacity: active === index ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : .18 }}
    >
      <div className="message-address"><span className="message-avatar" aria-hidden="true">W</span><div><strong>Your hiring team</strong><span>To: Avery Shah</span></div><Mail size={16} aria-hidden="true"/></div>
      <div className="message-letter"><h3>{item.subject}</h3><p>{item.body}</p></div>
      <div className="message-outcome"><span><item.icon size={14} aria-hidden="true"/>{item.next}</span><ArrowUpRight size={15} aria-hidden="true"/></div>
    </motion.div>)}
    <p className="sr-only" aria-live="polite">Showing {messages[active].status} example</p>
  </div>;
}
