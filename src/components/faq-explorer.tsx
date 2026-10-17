"use client";

import { useId, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, CalendarDays, ListFilter, MessageCircle, Plus, Search, ScanText, UsersRound, X } from "lucide-react";
import { SiteLink as Link } from "./site-link";
import { Reveal } from "./reveal";
import { faqGroups, filterFAQGroups } from "@/lib/faq-groups";

const icons = { "getting-started": BookOpen, applications: ScanText, coordination: CalendarDays, team: UsersRound };
const total = faqGroups.reduce((count, group) => count + group.items.length, 0);

export function FAQExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const groups = filterFAQGroups(query, category);
  const count = groups.reduce((sum, group) => sum + group.items.length, 0);
  function reset() { setQuery(""); setCategory("all"); input.current?.focus(); }

  return <section className="faq-library" id="faq-library" aria-labelledby={`${id}-heading`}>
    <Reveal className="faq-library-header"><div><p className="eyebrow">A useful place to start</p><h2 id={`${id}-heading`}>What would you<br/><em>like to know?</em></h2></div><div className="faq-search"><label htmlFor={`${id}-search`}>Search the questions and answers</label><div className="faq-search-box"><Search size={20} strokeWidth={1.5} aria-hidden="true"/><input ref={input} id={`${id}-search`} type="search" placeholder="Try “resume”, “Zoom”, or “access”…" value={query} onChange={event => setQuery(event.target.value)} aria-controls={`${id}-results`}/>{query && <button type="button" onClick={() => {setQuery(""); input.current?.focus();}} aria-label="Clear search"><X size={17} aria-hidden="true"/></button>}</div><p role="status" aria-live="polite" aria-atomic="true">{count} {count === 1 ? "answer" : "answers"}{category === "all" ? " across all topics" : ` in ${faqGroups.find(group => group.id === category)?.label.toLowerCase()}`}{query.trim() ? " matching your search" : " to explore"}.</p></div></Reveal>
    <div className="faq-library-grid">
      <aside className="faq-topic-sidebar"><p className="faq-sidebar-label"><ListFilter size={14} aria-hidden="true"/>Browse by topic</p><nav aria-label="Filter frequently asked questions"><button type="button" aria-pressed={category === "all"} aria-controls={`${id}-results`} onClick={() => setCategory("all")}><span><BookOpen size={17} strokeWidth={1.5} aria-hidden="true"/>All questions</span><span aria-hidden="true">{total}</span></button>{faqGroups.map(group => {const Icon = icons[group.id as keyof typeof icons]; return <button key={group.id} type="button" aria-pressed={category === group.id} aria-controls={`${id}-results`} onClick={() => setCategory(group.id)}><span><Icon size={17} strokeWidth={1.5} aria-hidden="true"/>{group.label}</span><span aria-hidden="true">{group.items.length}</span></button>;})}</nav><div className="faq-sidebar-note"><MessageCircle size={23} strokeWidth={1.3} aria-hidden="true"/><strong>A question of your own?</strong><p>Tell us what your team is exploring.</p><Link href="/contact-us">Ask the Wellgenz team<ArrowUpRight size={15} aria-hidden="true"/></Link></div></aside>
      <div className="faq-results" id={`${id}-results`}>
        {groups.map(group => {const Icon = icons[group.id as keyof typeof icons];return <section className="faq-topic" key={group.id} aria-labelledby={`${id}-${group.id}`}><div className="faq-topic-heading"><span className="faq-topic-icon"><Icon size={23} strokeWidth={1.35} aria-hidden="true"/></span><div><h2 id={`${id}-${group.id}`}>{group.title}</h2><p>{group.description}</p></div><span className="faq-topic-count" aria-label={`${group.items.length} questions`}>{String(group.items.length).padStart(2,"0")}</span></div><div className="faq-topic-questions">{group.items.map((item, index) => <details key={item.question} className="faq-question" open={group.id === "getting-started" && index === 0}><summary><span>{item.question}</span><Plus size={19} strokeWidth={1.5} aria-hidden="true"/></summary><div className="faq-answer"><p>{item.answer}</p></div></details>)}</div></section>;})}
        {groups.length === 0 && <div className="faq-empty"><Search size={30} strokeWidth={1.2} aria-hidden="true"/><h2>No matching answers yet.</h2><p>Try a broader term, choose another topic, or clear the filters to browse every question.</p><button type="button" onClick={reset}>Show all questions<ArrowUpRight size={16} aria-hidden="true"/></button></div>}
      </div>
    </div>
    <Reveal className="faq-contact-line"><MessageCircle size={29} strokeWidth={1.3} aria-hidden="true"/><div><h3>Let’s fill in the blanks.</h3><p>For a product walkthrough or a question specific to your hiring process, start a conversation with us.</p></div><Link href="/contact-us">Contact us<ArrowUpRight size={17} aria-hidden="true"/></Link></Reveal>
  </section>;
}
