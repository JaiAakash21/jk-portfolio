"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import SplitReveal from "../SplitReveal";
import Magnetic from "../Magnetic";
import { site, links } from "@/lib/site";

/**
 * Contact.
 *
 * Deliberately not a form. There is no backend behind this site, and a form
 * that shows "Message sent!" without sending anything is worse than no form
 * at all — it loses real messages silently. So: the address in full, one
 * click to copy, one click to open a composed draft.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission).
      // The address is visible and selectable, so there is nothing to recover.
    }
  };

  const mailto =
    `${links.email}?subject=${encodeURIComponent("Internship opportunity")}` +
    `&body=${encodeURIComponent("Hi Jai Aakash,\n\n")}`;

  return (
    <section id="contact" className="section ruled border-t border-rule" aria-labelledby="contact-title">
      <div className="shell relative">
        <div className="tick-rule pt-6">
          <div className="flex items-baseline gap-4">
            <span className="label label-accent tnum">05</span>
            <span className="label">Contact</span>
          </div>
        </div>

        <SplitReveal className="mt-10">
          <h2 id="contact-title" className="display text-[length:var(--text-h1)] leading-[0.95]">
            Looking for an intern who sweats the <em>failure case</em>?
          </h2>
        </SplitReveal>

        <Reveal stagger y={28}>
          <p className="mt-7 max-w-[46ch] text-[length:var(--text-body-lg)] leading-relaxed text-fg-muted">
            I&apos;m after a software or backend engineering internship. If you&apos;re
            hiring, or building something where reliability matters, I&apos;d like to
            hear about it.
          </p>
        </Reveal>

        {/* The address, large */}
        <Reveal className="mt-14" y={24}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-rule py-7">
            <a
              href={mailto}
              className="display hover-line text-[clamp(1.5rem,4.6vw,3.25rem)] leading-none text-fg"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-[0.8125rem] text-fg-muted transition-colors hover:border-accent hover:text-fg"
            >
              <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
              <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
            </button>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-3" stagger>
          <Magnetic>
            <a
              href={mailto}
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-3 text-[0.875rem] font-medium text-accent-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]"
            >
              Compose an email
              <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2.5 rounded-full border border-rule-strong px-5 py-3 text-[0.875rem] text-fg transition-colors hover:border-accent"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.resumePath}
              download
              className="inline-flex items-center gap-2.5 rounded-full border border-rule-strong px-5 py-3 text-[0.875rem] text-fg transition-colors hover:border-accent"
            >
              Résumé <span aria-hidden="true">↓</span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="mt-16 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-3" stagger>
          {[
            { k: "GitHub", v: "JaiAakash21", href: links.github },
            { k: "LinkedIn", v: "jaiaakash21", href: links.linkedin },
            { k: "LeetCode", v: "250+ solved", href: links.leetcode },
          ].map((c) => (
            <a
              key={c.k}
              href={c.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between gap-4 bg-bg p-6 transition-colors hover:bg-bg-raised"
            >
              <span>
                <span className="label block">{c.k}</span>
                <span className="mt-1.5 block text-[0.9375rem] text-fg">{c.v}</span>
              </span>
              <span aria-hidden="true" className="text-fg-faint transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">↗</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
