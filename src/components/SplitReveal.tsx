"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { getGsap, prefersReducedMotion, EASE } from "@/lib/motion";

/**
 * Line-by-line masked reveal for display headings.
 *
 * SplitType rewrites the DOM, so the original text is restored on cleanup and
 * the component is skipped entirely under reduced motion — leaving the plain,
 * fully accessible heading in place. aria is unaffected either way because the
 * split keeps the same text nodes.
 */
export default function SplitReveal({
  children,
  className,
  delay = 0,
  trigger = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** false = play on mount (hero), true = play on scroll. */
  trigger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!document.fonts) return;

    let split: SplitType | null = null;
    let ctx: gsap.Context | null = null;
    let cancelled = false;

    // Splitting before webfonts land measures the fallback and re-wraps wrong.
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return;
      const { gsap } = getGsap();
      split = new SplitType(el, { types: "lines", lineClass: "sr-line" });

      const lines = split.lines ?? [];
      lines.forEach((line) => {
        const wrap = document.createElement("span");
        wrap.className = "sr-mask";
        line.parentNode?.insertBefore(wrap, line);
        wrap.appendChild(line);
      });

      ctx = gsap.context(() => {
        gsap.from(lines, {
          yPercent: 112,
          duration: 1.2,
          ease: EASE,
          stagger: 0.085,
          delay,
          ...(trigger
            ? { scrollTrigger: { trigger: el, start: "top 86%", once: true } }
            : {}),
        });
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      split?.revert();
    };
  }, [delay, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
