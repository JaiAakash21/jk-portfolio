"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { site, links } from "@/lib/site";
import { getGsap, prefersReducedMotion, EASE } from "@/lib/motion";
import Magnetic from "../Magnetic";

const HeroField = dynamic(() => import("../HeroField"), { ssr: false });

/** Live clock in Asia/Kolkata — a real detail, not a decorative fake. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  // Reserve the glyph width so the row cannot shift when the clock arrives.
  return <span className="tnum">{time ?? "--:--"}</span>;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const content = inner.current;
    if (!el || !content || prefersReducedMotion()) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      // Entrance: the eyebrow, name, copy and actions arrive in sequence.
      gsap.timeline({ defaults: { ease: EASE } })
        .from("[data-hero='eyebrow']", { opacity: 0, y: 14, duration: 0.8 }, 0.1)
        .from("[data-hero='line']", { yPercent: 108, duration: 1.25, stagger: 0.09 }, 0.18)
        .from("[data-hero='copy'] > *", { opacity: 0, y: 20, duration: 0.95, stagger: 0.08 }, 0.6)
        .from("[data-hero='actions'] > *", { opacity: 0, y: 16, duration: 0.8, stagger: 0.07 }, 0.78)
        .from("[data-hero='readout']", { opacity: 0, duration: 0.9 }, 0.95);

      // Scroll-linked departure — content drifts and fades as the hero leaves.
      gsap.to(content, {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="ruled relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-7 pt-28 md:pb-9 md:pt-32"
    >
      <HeroField />
      {/* Fallback wash — also the full background when WebGL is skipped. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 85% at 72% 8%, color-mix(in oklab, var(--accent) 9%, transparent) 0%, transparent 62%)" }}
      />

      <div ref={inner} className="shell relative flex flex-1 flex-col justify-center gap-y-12 md:justify-between md:gap-y-0">
        <div>
          <div data-hero="eyebrow" className="flex flex-wrap items-center justify-between gap-y-3">
            <p className="label">Portfolio — {new Date().getFullYear()}</p>
            <p className="label flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              <span className="hidden sm:inline">{site.availability}</span>
              <span className="sm:hidden">Open to internships</span>
            </p>
          </div>

          {/* The name is the hero. Everything else is annotation. */}
          <h1 className="display mt-8 text-[length:var(--text-hero)] md:mt-14">
            <span className="block overflow-hidden"><span data-hero="line" className="block">Jai</span></span>
            <span className="block overflow-hidden">
              <span data-hero="line" className="block">
                Aakash<span className="text-accent">.</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <div data-hero="copy" className="space-y-5 md:col-span-5">
            <p className="text-balance text-[length:var(--text-body-lg)] leading-snug text-fg">
              Backend &amp; full-stack engineer.
              <br />
              <span className="text-fg-muted">Computer Science at Rajalakshmi Engineering College, Chennai.</span>
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-7">
            <p data-hero="copy" className="lead">
              I build systems that keep working when the network doesn&apos;t —
              offline-first storage, real-time state, and APIs that explain
              themselves.
            </p>
          </div>

          <div data-hero="actions" className="flex flex-wrap items-center gap-3 md:col-span-2 md:justify-end">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-3 text-[0.875rem] font-medium text-accent-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]"
              >
                Explore projects
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.resumePath}
                download
                className="group inline-flex items-center gap-2.5 rounded-full border border-rule-strong px-5 py-3 text-[0.875rem] text-fg transition-colors hover:border-accent"
              >
                Résumé
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0.5" aria-hidden="true">↓</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Instrument read-out */}
      <div data-hero="readout" className="shell relative mt-10 md:mt-12">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-4">
          <p className="label">
            Chennai, IN · <LocalTime /> IST
          </p>
          <span className="hidden h-3 w-px bg-rule sm:block" aria-hidden="true" />
          <a href={links.github} target="_blank" rel="noreferrer noopener" className="label hover-line -my-1.5 inline-block py-1.5 hover:text-fg">GitHub ↗</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer noopener" className="label hover-line -my-1.5 inline-block py-1.5 hover:text-fg">LinkedIn ↗</a>
          <a href={links.leetcode} target="_blank" rel="noreferrer noopener" className="label hover-line -my-1.5 inline-block py-1.5 hover:text-fg">LeetCode ↗</a>
          <p className="label ml-auto hidden items-center gap-2 sm:flex">
            Scroll
            <span className="inline-block h-6 w-px bg-gradient-to-b from-accent to-transparent" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
