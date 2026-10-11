"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { productNavigation } from "@/lib/product-navigation";
import "./product-menu.css";
export function ProductMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = mobile ? "mobile-product-pages" : "desktop-product-pages";
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); button.current?.focus(); } };
    const resize = () => setOpen(false);
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape); window.addEventListener("resize", resize);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); window.removeEventListener("resize", resize); };
  }, [open]);
  const close = () => { setOpen(false); onNavigate?.(); };
  return <div ref={root} className={`product-menu ${mobile ? "product-menu-mobile" : ""}`} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}><button ref={button} type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>Product pages <ChevronDown size={13}/></button><div id={id} className="product-menu-panel" hidden={!open}><Link href="/features" className="product-menu-overview" onClick={close}>Explore the Wellgenz toolkit <ArrowUpRight size={16}/></Link><div>{productNavigation.map((item, i) => <Link key={item.slug} href={`/features/${item.slug}`} onClick={close}><span>0{i+1}</span>{item.name}<ArrowUpRight size={13}/></Link>)}</div></div></div>;
}
