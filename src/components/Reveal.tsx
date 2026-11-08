"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { getGsap, prefersReducedMotion, EASE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of animating the element itself. */
  stagger?: boolean;
  delay?: number;
  /** Travel distance in px. */
  y?: number;
};

/**
 * Scroll-triggered entrance.
 *
 * The element's resting state in CSS is its FINAL state — GSAP sets the
 * from-state at runtime. So with JS off, reduced motion on, or a failed
 * hydration, content is visible and correctly positioned rather than stuck
 * at opacity 0. Nothing here changes layout, so it cannot cause shift.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = false,
  delay = 0,
  y = 26,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { gsap } = getGsap();
    const targets = stagger ? Array.from(el.children) : [el];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 1.05,
        ease: EASE,
        delay,
        stagger: stagger ? 0.075 : 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Component>
  );
}
