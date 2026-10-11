"use client";

import { useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, FileCheck2, Mail, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const message = messages[active];

  return (
    <div className="automation-showcase">
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
              <item.icon size={14} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={message.label}
          role="tabpanel"
          id={`email-panel-${active}`}
          aria-labelledby={`email-tab-${active}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.985 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="email-preview">
            <div className="email-preview-top">
              <span className="email-avatar">
                <Mail size={20} />
              </span>
              <div>
                <strong>Your hiring team</strong>
                <span>To: Avery Shah</span>
              </div>
              <span className="example-badge">EXAMPLE</span>
            </div>
            <h3>{message.subject}</h3>
            <p>Hi Avery,</p>
            <p>{message.body}</p>
            <p className="email-signature">
              Warm regards,
              <br />
              Your hiring team
            </p>
            <div className="email-footer">
              <span>
                <message.icon size={13} />
                {message.status}
              </span>
              <span>
                {message.next}
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="automation-caption">
        <UserRound size={13} aria-hidden="true" />
        <p>Illustrative email copy and fictional candidate. Actual messages follow your company’s hiring process.</p>
      </div>
      <span className="sr-only" aria-live="polite">
        Showing {message.status} example
      </span>
    </div>
  );
}
