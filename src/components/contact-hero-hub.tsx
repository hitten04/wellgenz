"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  MapPin,
  Clock,
  Zap,
  Calendar,
  Check,
  Mail,
  ArrowRight,
  Headphones,
} from "lucide-react";
import { site } from "@/lib/site";
import { useReducedMotion } from "./use-reduced-motion";

type HubTab = {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  points: string[];
  sla: string;
  primaryAction: {
    label: string;
    href: string;
    isAnchor?: boolean;
  };
};

const tabs: HubTab[] = [
  {
    id: "walkthrough",
    tabLabel: "Product Walkthrough",
    badge: "1-on-1 Demo",
    title: "Explore Wellgenz in Real Time",
    description:
      "See how AI candidate scoring, structured resume analysis, and company portals work in a personalized session with our product team.",
    points: [
      "Custom walkthrough tailored to your hiring pipeline",
      "Live preview of automated scoring & email flows",
      "Direct answers on setup and team onboarding",
    ],
    sla: "Average response < 2 hrs",
    primaryAction: {
      label: "Request a Walkthrough",
      href: "#contact-form",
      isAnchor: true,
    },
  },
  {
    id: "general",
    tabLabel: "General Inquiry",
    badge: "Direct Support",
    title: "Direct Connection with Our Team",
    description:
      "Have a quick question about features, candidate privacy, or how Wellgenz fits your existing tools? We are here to help.",
    points: [
      "Prompt answers directly from our in-house team",
      "No automated chatbot dead-ends or canned responses",
      "Dedicated follow-up within 24 business hours",
    ],
    sla: "Reply within 24 business hours",
    primaryAction: {
      label: `Email ${site.contactEmail}`,
      href: `mailto:${site.contactEmail}`,
    },
  },
  {
    id: "enterprise",
    tabLabel: "Custom & Enterprise",
    badge: "High Volume",
    title: "Hiring at Scale & Custom Workflows",
    description:
      "For organizations hiring at volume, requiring role-based permissions across multiple departments, and specialized candidate workflows.",
    points: [
      "Multi-department access & permission controls",
      "Custom candidate journey stages & evaluations",
      "Dedicated onboarding specialist",
    ],
    sla: "Priority routing",
    primaryAction: {
      label: "Connect with Team",
      href: "#contact-form",
      isAnchor: true,
    },
  },
];

export function ContactHeroHub() {
  const [activeTabId, setActiveTabId] = useState<string>("walkthrough");
  const reduced = useReducedMotion();
  const currentTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <figure className="contact-hero-hub" aria-label="Wellgenz Direct Response and Concierge Hub">
      <div className="contact-hub-backdrop" aria-hidden="true" />

      <motion.div
        className="contact-hub-card"
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Hub Header: Live Status & Location Bar */}
        <div className="contact-hub-header">
          <div className="contact-hub-live-badge">
            <span className="contact-hub-live-dot" aria-hidden="true" />
            <span>Direct Desk Active</span>
          </div>

          <div className="contact-hub-meta">
            <span className="contact-hub-meta-item">
              <MapPin size={13} aria-hidden="true" />
              <span>Ahmedabad, IN</span>
            </span>
            <span className="contact-hub-meta-divider" aria-hidden="true">·</span>
            <span className="contact-hub-meta-item">
              <Clock size={13} aria-hidden="true" />
              <span>Fast Response</span>
            </span>
          </div>
        </div>

        {/* Interactive Mode Tabs */}
        <div className="contact-hub-tabs" role="tablist" aria-label="Inquiry Type Switcher">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                id={`hub-tab-${tab.id}`}
                aria-controls={`hub-panel-${tab.id}`}
                className={`contact-hub-tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <span>{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div
          id={`hub-panel-${currentTab.id}`}
          role="tabpanel"
          aria-labelledby={`hub-tab-${currentTab.id}`}
          className="contact-hub-panel"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="contact-hub-panel-inner"
            >
              <div className="contact-hub-title-row">
                <span className="contact-hub-badge">
                  <Sparkles size={12} aria-hidden="true" />
                  {currentTab.badge}
                </span>
                <span className="contact-hub-sla">
                  <Zap size={13} aria-hidden="true" />
                  {currentTab.sla}
                </span>
              </div>

              <h2 className="contact-hub-title">{currentTab.title}</h2>
              <p className="contact-hub-desc">{currentTab.description}</p>

              {/* Bullet points */}
              <ul className="contact-hub-points">
                {currentTab.points.map((point) => (
                  <li key={point}>
                    <span className="contact-hub-check">
                      <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Actions row */}
              <div className="contact-hub-action-row">
                <a
                  href={currentTab.primaryAction.href}
                  onClick={(e) => handleAnchorClick(e, currentTab.primaryAction.href)}
                  className="contact-hub-primary-btn"
                >
                  <span>{currentTab.primaryAction.label}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>

                <a
                  href={`mailto:${site.contactEmail}`}
                  className="contact-hub-secondary-link"
                  title="Direct Email"
                >
                  <Mail size={14} aria-hidden="true" />
                  <span>{site.contactEmail}</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Concierge Footer Bar */}
        <div className="contact-hub-footer">
          <div className="contact-hub-team">
            <div className="contact-hub-avatars" aria-hidden="true">
              <span className="hub-avatar hub-avatar-1">P</span>
              <span className="hub-avatar hub-avatar-2">A</span>
              <span className="hub-avatar hub-avatar-3">E</span>
            </div>
            <div className="contact-hub-team-text">
              <strong>Wellgenz Concierge Desk</strong>
              <span>100% human response · No bot loops</span>
            </div>
          </div>
          <div className="contact-hub-footer-badge">
            <Headphones size={13} aria-hidden="true" />
            <span>Direct Support</span>
          </div>
        </div>

        {/* Floating Ambient Badges */}
        <motion.div
          className="contact-hub-float contact-hub-float-top"
          aria-hidden="true"
          animate={reduced ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="contact-hub-float-icon">
            <Zap size={14} />
          </span>
          <div>
            <strong>Direct Routing</strong>
            <span>Direct to recruitment leads</span>
          </div>
        </motion.div>

        <motion.div
          className="contact-hub-float contact-hub-float-bottom"
          aria-hidden="true"
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <span className="contact-hub-float-icon">
            <Calendar size={14} />
          </span>
          <div>
            <strong>Flexible Timezones</strong>
            <span>Walkthroughs arranged for your hours</span>
          </div>
        </motion.div>
      </motion.div>

      <figcaption>
        Direct Response Console
        <span>Select an inquiry type or reach our Ahmedabad team directly</span>
      </figcaption>
    </figure>
  );
}
