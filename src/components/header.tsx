"use client";

import { useReducedMotion } from "./use-reduced-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navigation, site } from "@/lib/site";
import Image from "next/image";

export function Header() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };

    const outside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (toggle.current?.contains(target) || panel.current?.contains(target)) return;
      setOpen(false);
    };

    const resize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "pointer";

    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    // Capture phase fires before any child onClick, so no stopPropagation needed on the button.
    // Using only "click" (not touchend) avoids the iOS touchend-fires-before-click race.
    document.addEventListener("click", outside, true);

    return () => {
      document.body.style.cursor = prevCursor;
      document.removeEventListener("click", outside, true);
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="header-brand" aria-label="Wellgenz home" onClick={() => setOpen(false)}>
          <Image src="/wellgenz-logo-transparent.png" alt="Wellgenz" width={1760} height={893} className="header-brand-image" priority />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(item => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <motion.a
          className="nav-login"
          href={site.appUrl}
          whileHover={reduced ? undefined : { scale: 1.03, y: -1 }}
          whileTap={reduced ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 450, damping: 22 }}
        >
          Login <ArrowUpRight size={15} aria-hidden="true" />
        </motion.a>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="mobile-navigation"
            className="mobile-nav"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
            style={{ overflowX: "hidden", overflowY: "auto" }}
          >
            <motion.nav
              aria-label="Mobile navigation"
              initial={reduced ? false : "closed"}
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                closed: {},
              }}
            >
              {navigation.map(item => (
                <motion.div
                  key={item.href}
                  variants={{
                    closed: { opacity: 0, x: -10 },
                    open: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mobile-nav-footer"
                variants={{
                  closed: { opacity: 0, y: 6 },
                  open: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={site.appUrl}
                  className="mobile-nav-login-btn"
                  onClick={() => setOpen(false)}
                >
                  <span>Login to Workspace</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
