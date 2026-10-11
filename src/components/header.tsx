"use client";

import { useReducedMotion } from "./use-reduced-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navigation, site } from "@/lib/site";
import { Wordmark } from "./ui";

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
    const outside = (event: PointerEvent) => {
      if (
        !panel.current?.contains(event.target as Node) &&
        !toggle.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const resize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };

    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="Wellgenz home" onClick={() => setOpen(false)}>
          <Wordmark />
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
        <motion.button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
          whileTap={reduced ? undefined : { scale: 0.92 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="mobile-navigation"
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
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
                variants={{
                  closed: { opacity: 0, x: -10 },
                  open: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <a href={site.appUrl} onClick={() => setOpen(false)}>
                  Login <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
