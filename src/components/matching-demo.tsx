"use client";

import { useState } from "react";
import { Check, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

export function MatchingDemo() {
  const [threshold, setThreshold] = useState(80);
  const qualifying = candidates.filter(candidate => candidate.score >= threshold).length;

  return (
    <div className="matching-demo">
      <div className="demo-top">
        <span>
          <Sparkles size={16} /> Candidate matching
        </span>
        <span className="demo-label">INTERACTIVE EXAMPLE</span>
      </div>

      <div className="demo-controls">
        <div className="demo-role">
          <span className="micro-label">ROLE</span>
          <strong>Product designer</strong>
          <span>Skills 50% · Experience 30% · Education 20%</span>
        </div>
        <div className="threshold-control">
          <label htmlFor="shortlist-threshold">
            <SlidersHorizontal size={14} />
            Shortlist threshold <output htmlFor="shortlist-threshold">{threshold}%</output>
          </label>
          <input
            id="shortlist-threshold"
            type="range"
            min="60"
            max="95"
            step="1"
            value={threshold}
            onChange={event => setThreshold(Number(event.target.value))}
          />
          <div className="range-scale">
            <span>60%</span>
            <span>95%</span>
          </div>
        </div>
      </div>

      <div className="demo-candidates">
        {candidates.map(candidate => {
          const selected = candidate.score >= threshold;
          return (
            <motion.div
              layout
              className={`demo-candidate ${selected ? "qualifies" : ""}`}
              key={candidate.name}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <div className="demo-candidate-top">
                <span className="avatar avatar-lilac">{candidate.initials}</span>
                <div>
                  <strong>{candidate.name}</strong>
                  <span>Product designer</span>
                </div>
                <span className="demo-score">
                  {candidate.score}
                  <small>%</small>
                </span>
              </div>
              <div className="demo-tags">
                {candidate.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="score-breakdown">
                {(["skills", "experience", "education"] as const).map(key => (
                  <div key={key}>
                    <span>{key}</span>
                    <div className="score-track">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${candidate[key]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <span>{candidate[key]}%</span>
                  </div>
                ))}
              </div>
              <div className="shortlist-status">
                <AnimatePresence mode="wait">
                  {selected ? (
                    <motion.span
                      key="qualifies"
                      initial={{ scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      <Check size={14} /> Meets shortlist threshold
                    </motion.span>
                  ) : (
                    <motion.span
                      key="below"
                      initial={{ scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      Below shortlist threshold
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="demo-bottom">
        <p aria-live="polite" aria-atomic="true">
          <span className="tiny-dot" />
          {qualifying} of 3 example candidates meet your threshold.
        </p>
        <span>Human review comes next.</span>
      </div>
      <p className="demo-disclaimer">
        Fictional profiles and illustrative scores. This example runs in your browser and does not process resumes or make hiring decisions.
      </p>
    </div>
  );
}
