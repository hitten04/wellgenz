"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion/mini";
import { useReducedMotion } from "./use-reduced-motion";

// Animate existing layout nodes. Never touch form controls, disclosure heights,
// canvas scenes, or the individual transforms owned by the 3D illustrations.
const targets = [
  "[data-scroll-reveal]", ".product-motion-card", ".hero-copy", ".hero-bottom",
  ".page-hero-copy", ".page-hero-art", ".contact-hero-hub", ".product-concept",
  ".product-detail-hero > div:first-child", ".product-section-heading",
  ".product-how > div", ".product-how ol > li", ".product-use-case > div",
  ".product-questions > div:first-child", ".product-related-title",
  ".product-related > div:last-child > a", ".product-end > *",
  ".info-team-section > .eyebrow", ".info-team-section > h2",
  "main section > h2", "main section > .eyebrow", ".section-heading",
  ".info-page-nav", ".faq-layout > .section-heading", ".faq-motion-item",
  ".pipeline-context > article", ".pipeline-notes", ".contact-location-card",
  ".contact-form-wrap", ".contact-location-wrap",
  ".legal-page > :not(section)", ".legal-page > section > *",
  ".not-found-copy", ".error-500-copy", ".footer-top > *", ".footer-bottom",
].join(",");

export function ScrollReveals() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.IntersectionObserver || !Element.prototype.animate) return;
    const observed = new Set<HTMLElement>();
    const entered = new Set<HTMLElement>();
    const active = new Map<HTMLElement, ReturnType<typeof animate>>();
    let frame = 0;
    let disposed = false;
    let previousScroll = window.scrollY;
    const compact = window.matchMedia("(max-width: 759px)").matches;

    const settle = (node: HTMLElement) => {
      // cancel restores original styles, including any existing CSS transforms.
      active.get(node)?.cancel();
      active.delete(node);
    };
    const observer = new IntersectionObserver(entries => {
      const upward = window.scrollY < previousScroll;
      previousScroll = window.scrollY;
      entries.forEach(entry => {
        const node = entry.target as HTMLElement;
        if (!entry.isIntersecting) {
          entered.delete(node);
          node.classList.remove("is-revealed");
          settle(node);
          return;
        }
        // Re-arm only after the element fully leaves the viewport, preventing
        // repeated restarts around the reveal threshold in either direction.
        if (entered.has(node) || entry.intersectionRatio < .08) return;
        entered.add(node);
        node.classList.add("is-revealed");
        if (document.hidden || node.contains(document.activeElement)) return;
        const style = getComputedStyle(node);
        if (style.visibility === "hidden" || Number(style.opacity) < .95) return;
        const siblings = Array.from(node.parentElement?.children ?? []);
        const index = Math.max(0, siblings.indexOf(node));
        const delay = Math.min(Number(node.dataset.revealDelay) || (index % 4) * .055, .18);
        const distance = Math.min(Number(node.dataset.revealY) || 20, compact ? 12 : 24);
        const direction = upward ? -1 : 1;
        const visual = node.matches("figure, .feature-card, .product-motion-card");
        // Individual translate/scale properties compose with existing transforms.
        // Motion's mini entrypoint uses native Web Animations, not a scroll loop.
        const animation = animate(node, {
          opacity: [Math.max(.55, Number(style.opacity) * .65), Number(style.opacity)],
          ...(style.translate === "none" ? { translate: [`0px ${distance * direction}px`, "0px 0px"] } : {}),
          ...(visual && style.scale === "none" ? { scale: [compact ? .995 : .985, 1] } : {}),
        }, {
          duration: Math.min(Number(node.dataset.revealDuration) || .65, .85),
          delay,
          ease: [.22, 1, .36, 1],
        });
        active.set(node, animation);
        animation.finished.then(() => {
          if (!disposed && active.get(node) === animation) settle(node);
        }).catch(() => { /* Cancellation on navigation or reduced motion is normal. */ });
      });
    }, { threshold: [0, .08], rootMargin: "0px" });

    const scan = () => {
      frame = 0;
      for (const node of observed) {
        if (!node.isConnected) {
          observer.unobserve(node);
          observed.delete(node);
          entered.delete(node);
          settle(node);
        }
      }
      document.querySelectorAll<HTMLElement>(targets).forEach(node => {
        // Reveal a content block once, instead of animating both it and its children.
        if (observed.has(node) || node.parentElement?.closest(targets) || node.closest("[aria-hidden='true']")) return;
        observed.add(node);
        observer.observe(node);
      });
    };
    const mutations = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(scan);
    });
    scan();
    mutations.observe(document.body, { childList: true, subtree: true });
    const focus = (event: FocusEvent) => {
      for (const node of active.keys()) {
        if (event.target instanceof Node && node.contains(event.target)) settle(node);
      }
    };
    const visibility = () => { if (document.hidden) for (const node of active.keys()) settle(node); };
    document.addEventListener("focusin", focus);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("visibilitychange", visibility);
      for (const node of active.keys()) settle(node);
      for (const node of observed) node.classList.remove("is-revealed");
    };
  }, [pathname, reduced]);

  return null;
}
