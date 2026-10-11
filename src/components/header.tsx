"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/lib/site";
import { Wordmark } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!panel.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setOpen(false);
    };
    const resize = () => { if (window.innerWidth >= 960) setOpen(false); };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("keydown", close); window.removeEventListener("pointerdown", outside); window.removeEventListener("resize", resize); };
  }, [open]);
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" aria-label="Wellgenz home" onClick={() => setOpen(false)}><Wordmark /></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <a className="nav-login" href={site.appUrl}>Login <ArrowUpRight size={15} aria-hidden="true" /></a>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
  </div><div ref={panel} id="mobile-navigation" className="mobile-nav" hidden={!open}><nav aria-label="Mobile navigation">{navigation.map(item => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}<a href={site.appUrl}>Login <ArrowUpRight size={16} aria-hidden="true" /></a></nav></div></header>;
}
