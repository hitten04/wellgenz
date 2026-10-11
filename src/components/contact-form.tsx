"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "General Question",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate brief processing for realistic feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          className="contact-form-success"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -16 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <motion.div
            className="contact-success-icon"
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 420, damping: 22 }}
          >
            <CheckCircle2 size={36} />
          </motion.div>
          <h3>Message received.</h3>
          <p>
            Thank you, {formData.name || "there"}. We’ve received your note and our team will get back to you at <strong>{formData.email}</strong> within 24 business hours.
          </p>
          <motion.button
            type="button"
            className="button button-dark"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                company: "",
                subject: "General Question",
                message: "",
              });
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Send another message
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="email">Work Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                type="text"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="subject">Inquiry Type</label>
              <select
                id="subject"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
              >
                <option value="General Question">General Question</option>
                <option value="Product Walkthrough">Product Walkthrough</option>
                <option value="Enterprise Hiring">Enterprise Hiring</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              required
              placeholder="Tell us about your team’s hiring needs or any questions about Wellgenz..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="contact-form-actions">
            <motion.button
              type="submit"
              className="button button-dark"
              disabled={loading}
              whileHover={loading ? undefined : { scale: 1.025, y: -1 }}
              whileTap={loading ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {loading ? "Sending note..." : "Send Message"}
              <Send size={15} />
            </motion.button>
            <span className="contact-form-note">
              We respect your inbox. No spam or unsolicited promotions.
            </span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
