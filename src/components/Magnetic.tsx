"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Pointer-magnetic wrapper. Fine pointers only — on touch it renders as a
 * plain wrapper so tap targets never move under a finger.
 */
export default function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const { gsap } = getGsap();
    const move = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      move((e.clientX - (r.left + r.width / 2)) * strength);
      moveY((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => { move(0); moveY(0); };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
