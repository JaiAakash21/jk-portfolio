"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, site, links } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

/**
 * Scroll-aware header.
 *
 * Past the first viewport it condenses: the rule fades in, the bar tightens,
 * and a section read-out appears in the wordmark slot. It never hides on
 * scroll-up/down — a nav that plays peekaboo is a nav you cannot rely on.
 * Mobile gets a full-screen panel with a focus trap and scroll lock.
 */
export default function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Condense state — passive scroll listener, no layout reads per frame.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section — IntersectionObserver rather than scroll maths.
  useEffect(() => {
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile panel: scroll lock, Escape, and a simple focus trap.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const f = panelRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
      if (!f?.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeLabel = nav.find((n) => n.href.endsWith(`#${active}`))?.label;

  return (
    <header
      data-condensed={condensed || undefined}
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500
                 data-condensed:border-b data-condensed:border-rule
                 data-condensed:bg-bg/72 data-condensed:backdrop-blur-xl"
    >
      <div className="shell">
        <div
          className="flex items-center justify-between transition-[padding] duration-500
                     py-5 data-condensed:py-3"
          data-condensed={condensed || undefined}
        >
          {/* Wordmark + live section read-out */}
          <Link href="/" className="group -m-2 flex items-baseline gap-3 p-2">
            <span className="font-mono text-[0.8125rem] font-medium tracking-[0.12em] text-fg">
              {site.wordmark}
            </span>
            <span className="sr-only">{site.name} — home</span>
            <span className="hidden h-3 w-px bg-rule-strong sm:block" aria-hidden="true" />
            <span className="relative hidden overflow-hidden text-[0.8125rem] text-fg-muted sm:block">
              <span
                className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ transform: condensed && activeLabel ? "translateY(-100%)" : "translateY(0)" }}
              >
                <span className="block">{site.shortName}</span>
                <span className="block text-accent">{activeLabel ?? ""}</span>
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = item.href.endsWith(`#${active}`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative px-3 py-2 text-[0.8125rem] text-fg-muted transition-colors hover:text-fg aria-[current]:text-fg"
                >
                  <span className="relative">
                    {item.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
                      style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.resumePath}
              download
              className="hidden rounded-full border border-rule px-4 py-2 text-[0.8125rem] text-fg-muted transition-colors hover:border-rule-strong hover:text-fg sm:block"
            >
              Résumé
            </a>
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="grid size-9 place-items-center rounded-full border border-rule text-fg md:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className="absolute left-0 block h-px w-full bg-current transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ transform: open ? "translateY(6px) rotate(45deg)" : "translateY(0)" }}
                />
                <span
                  className="absolute left-0 top-[11px] block h-px w-full bg-current transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "translateY(0)" }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-0 z-40 flex flex-col bg-bg md:hidden"
      >
        <div className="shell flex flex-1 flex-col justify-between pb-10 pt-24">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-rule py-5"
              >
                <span className="label label-accent">{item.index}</span>
                <span className="display text-[2rem]">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4">
            <a href={site.resumePath} download className="label -my-2 inline-block py-2">Download résumé ↓</a>
            <div className="flex gap-5">
              <a href={links.github} className="label hover-line -my-2 inline-block py-2" target="_blank" rel="noreferrer noopener">GitHub</a>
              <a href={links.linkedin} className="label hover-line -my-2 inline-block py-2" target="_blank" rel="noreferrer noopener">LinkedIn</a>
              <a href={links.email} className="label hover-line -my-2 inline-block py-2">Email</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
