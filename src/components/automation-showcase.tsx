"use client";

import { useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, FileCheck2, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const messages = [
  {
    label: "Shortlist",
    icon: Check,
    subject: "Avery, let’s take the next step.",
    body: "Thank you for applying for the Product Designer role. We’d love to continue the conversation and learn more about your work.",
    status: "Shortlist email",
    next: "Invite to interview",
  },
  {
    label: "Interview",
    icon: CalendarDays,
    subject: "Your interview details, all in one place.",
    body: "We’re looking forward to meeting you. Your invitation includes the scheduled date, time, interviewer, and online meeting link.",
    status: "Interview invitation",
    next: "Google Meet or Zoom",
  },
  {
    label: "Offer",
    icon: FileCheck2,
    subject: "Your next chapter starts here.",
    body: "We’re pleased to share your offer for the Product Designer role. Review your offer letter and the next steps from our hiring team.",
    status: "Offer letter email",
    next: "Offer communication",
  },
  {
    label: "Rejection",
    icon: Mail,
    subject: "An update on your application.",
    body: "Thank you for your interest and the time you invested. We won’t be moving forward for this role, and we appreciate the opportunity to learn about your experience.",
    status: "Rejection email",
    next: "Close the loop",
  },
];

export function AutomationShowcase() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const message = messages[active];

  return (
    <div className="automation-showcase mail-studio">
      <div className="mail-studio-heading"><span className="mail-studio-mark"><Mail size={21} aria-hidden="true" /></span><div><span className="mail-studio-eyebrow">CONNECTED COMMUNICATION</span><h3>A little clarity. At every step.</h3></div></div>
      <div className="automation-tabs" role="tablist" aria-label="Hiring email examples">
        {messages.map((item, index) => {
          const isSelected = active === index;
          return (
            <button
              ref={node => {
                refs.current[index] = node;
              }}
              key={item.label}
              role="tab"
              id={`email-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`email-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={event => {
                let next = active;
                if (event.key === "ArrowRight") next = (active + 1) % messages.length;
                else if (event.key === "ArrowLeft")
                  next = (active + messages.length - 1) % messages.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = messages.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                refs.current[next]?.focus();
              }}
            >
              <span className="mail-tab-number" aria-hidden="true">0{index + 1}</span>
              {item.label}
              <item.icon size={16} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="mail-panel-stack">
        {messages.map((item, index) => <motion.div
          key={item.label}
          className="mail-panel"
          role="tabpanel"
          id={`email-panel-${index}`}
          aria-labelledby={`email-tab-${index}`}
          aria-hidden={active !== index}
          inert={active !== index}
          tabIndex={active === index ? 0 : -1}
          initial={false}
          animate={{ opacity: active === index ? 1 : 0, y: active === index ? 0 : 6 }}
          transition={{ duration: reducedMotion ? 0 : .22, ease: [.22, 1, .36, 1] }}
          style={{ visibility: active === index ? "visible" : "hidden" }}
        >
          <div className="email-preview">
            <div className="email-preview-top">
              <span className="email-avatar"><Mail size={20} aria-hidden="true" /></span>
              <div><strong>Your hiring team</strong><span>To: Avery Shah</span></div>
              <span className="example-badge">EXAMPLE</span>
            </div>
            <div className="mail-message-copy">
              <h3>{item.subject}</h3><p>Hi Avery,</p><p>{item.body}</p>
              <p className="email-signature">Warm regards,<br />Your hiring team</p>
            </div>
            <div className="email-footer">
              <span><item.icon size={15} aria-hidden="true" />{item.status}</span>
              <span>{item.next}<ArrowRight size={14} aria-hidden="true" /></span>
            </div>
          </div>
        </motion.div>)}
      </div>

      <span className="sr-only" aria-live="polite">
        Showing {message.status} example
      </span>
    </div>
  );
}
