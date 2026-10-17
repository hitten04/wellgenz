"use client";

import { useCallback, useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactTurnstile } from "./contact-turnstile";
import { site } from "@/lib/site";

export function ContactForm({ siteKey = "" }: { siteKey?: string }) {
  const [challenge, setChallenge] = useState({ token: "", expiresAt: 0 });
  const [challengeError, setChallengeError] = useState("");
  const handleToken = useCallback((token: string) => {
    setChallenge({ token, expiresAt: token ? Date.now() + 300_000 : 0 });
    setChallengeError("");
  }, []);
  const [draftReady, setDraftReady] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", subject: "General Question", message: "" });
  const draftHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent(`Wellgenz — ${formData.subject}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nWork email: ${formData.email}\nCompany: ${formData.company || "Not provided"}\n\n${formData.message}`)}`;
  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (siteKey && (!challenge.token || Date.now() >= challenge.expiresAt)) {
      setDraftReady(false);
      setChallengeError("Please complete the Cloudflare check before preparing your draft.");
      return;
    }
    setChallengeError("");
    setDraftReady(true);
    window.location.href = draftHref;
  }
  return <form className="contact-form" onSubmit={prepareDraft}>
    <div className="contact-form-row">
      <div className="contact-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder="Alex Morgan" value={formData.name} onChange={e => {setDraftReady(false);setFormData({...formData,name:e.target.value});}}/></div>
      <div className="contact-field"><label htmlFor="contact-email">Work email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@company.com" value={formData.email} onChange={e => {setDraftReady(false);setFormData({...formData,email:e.target.value});}}/></div>
    </div>
    <div className="contact-form-row">
      <div className="contact-field"><label htmlFor="contact-company">Company <span>(optional)</span></label><input id="contact-company" name="company" autoComplete="organization" maxLength={150} placeholder="Your company" value={formData.company} onChange={e => {setDraftReady(false);setFormData({...formData,company:e.target.value});}}/></div>
      <div className="contact-field"><label htmlFor="contact-subject">What is it about?</label><select id="contact-subject" name="subject" value={formData.subject} onChange={e => {setDraftReady(false);setFormData({...formData,subject:e.target.value});}}>{["General Question","Product Walkthrough","Enterprise Hiring","Technical Support","Partnership"].map(s => <option key={s}>{s}</option>)}</select></div>
    </div>
    <div className="contact-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows={5} required maxLength={3000} placeholder="Tell us what you would like to explore…" value={formData.message} onChange={e => {setDraftReady(false);setFormData({...formData,message:e.target.value});}}/></div>
    {siteKey && <ContactTurnstile siteKey={siteKey} onToken={handleToken}/>}
    {challengeError && <p className="contact-form-note" role="alert">{challengeError}</p>}
    <div className="contact-form-actions"><button type="submit" className="button button-dark" disabled={Boolean(siteKey) && !challenge.token}>Prepare email draft<ArrowUpRight size={16} aria-hidden="true"/></button><span className="contact-form-note">Opens your email app. Review and send your message there.</span></div>
    {draftReady && <div className="be-draft-feedback" role="status"><Mail size={19} aria-hidden="true"/><div><strong>Your draft is ready.</strong><p>No message has been sent by this website. If your email app did not open, <a href={draftHref}>open the draft again</a> or email {site.contactEmail} directly.</p></div></div>}
  </form>;
}
