"use client";

import Link from "next/link";
import { nav, site, links } from "@/lib/site";
import Magnetic from "./Magnetic";

export default function SiteFooter() {
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-rule bg-bg-sunken">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="display block text-[clamp(2.25rem,5vw,3.25rem)] leading-none">
              Jai Aakash S<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-[30ch] text-[0.9375rem] text-fg-muted">
              {site.role} · {site.location}
            </p>
            <p className="label mt-8 max-w-[34ch] leading-relaxed">
              Consistency beats intensity. Build every day, improve every day.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="label mb-5">Index</h2>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover-line inline-block py-1.5 text-[0.9375rem] text-fg-muted hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/work" className="hover-line inline-block py-1.5 text-[0.9375rem] text-fg-muted hover:text-fg">
                  All work
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="label mb-5">Elsewhere</h2>
            <ul className="space-y-1">
              {[
                { label: "GitHub", href: links.github, ext: true },
                { label: "LinkedIn", href: links.linkedin, ext: true },
                { label: "LeetCode", href: links.leetcode, ext: true },
                { label: site.email, href: links.email, ext: false },
                { label: "Résumé (PDF)", href: site.resumePath, ext: false },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="hover-line inline-block py-1.5 text-[0.9375rem] text-fg-muted hover:text-fg"
                  >
                    {l.label}
                    {l.ext && <span aria-hidden="true" className="ml-1 text-fg-faint">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-rule pt-7 sm:flex-row sm:items-center">
          <p className="label">
            © {new Date().getFullYear()} {site.name} · Chennai, India
          </p>
          <Magnetic>
            <button
              type="button"
              onClick={toTop}
              className="group flex items-center gap-2.5 rounded-full border border-rule px-4 py-2 text-[0.8125rem] text-fg-muted transition-colors hover:border-accent hover:text-fg"
            >
              Back to top
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5" aria-hidden="true">↑</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
