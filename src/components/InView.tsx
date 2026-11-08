"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Adds `plate-live` while the element is on screen, so the SVG plates' CSS
 * animations only run when they can actually be seen. Eight simultaneously
 * animating diagrams off-screen is wasted battery for nobody's benefit.
 */
export default function InView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => el.classList.toggle("plate-live", e.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
