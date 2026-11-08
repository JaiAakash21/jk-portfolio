"use client";

import { useState } from "react";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { skillGroups, levelCopy } from "@/lib/profile";

type Level = "core" | "working" | "learning";
const LEVELS: Level[] = ["core", "working", "learning"];
const FILL: Record<Level, number> = { core: 3, working: 2, learning: 1 };

/**
 * Honest skill display.
 *
 * No percentages — a number like "React 85%" is unverifiable and everyone
 * knows it. Instead each entry carries one of three evidence-based levels,
 * defined by how many shipped projects actually use it. Hovering a level in
 * the legend dims everything else, which is the whole interaction.
 */
export default function Stack() {
  const [focus, setFocus] = useState<Level | null>(null);

  return (
    <section id="stack" className="section border-t border-rule" aria-labelledby="stack-title">
      <div className="shell relative">
        <SectionHead
          index="03"
          id="stack-title"
          title="Stack"
          note="Graded by evidence rather than confidence. Hover a grade to isolate it."
        />

        {/* Legend / filter */}
        <Reveal className="mt-10 flex flex-wrap gap-2" stagger>
          {LEVELS.map((lv) => (
            <button
              key={lv}
              type="button"
              onMouseEnter={() => setFocus(lv)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(lv)}
              onBlur={() => setFocus(null)}
              onClick={() => setFocus((f) => (f === lv ? null : lv))}
              aria-pressed={focus === lv}
              className="group flex items-center gap-2.5 rounded-full border border-rule px-3.5 py-2 transition-colors hover:border-rule-strong aria-pressed:border-accent"
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-2.5 w-[3px] rounded-full"
                    style={{
                      background: i < FILL[lv] ? "var(--accent)" : "var(--rule-strong)",
                      opacity: i < FILL[lv] ? 1 : 0.6,
                    }}
                  />
                ))}
              </span>
              <span className="label text-fg-muted">{lv}</span>
              <span className="hidden text-[0.75rem] text-fg-faint sm:inline">— {levelCopy[lv]}</span>
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g) => (
            <Reveal key={g.id} y={20}>
              <h3 className="label border-b border-rule pb-3">{g.label}</h3>
              <ul className="mt-1">
                {g.items.map((item) => {
                  const dim = focus !== null && focus !== item.level;
                  return (
                    <li
                      key={item.name}
                      title={levelCopy[item.level]}
                      className="flex items-center justify-between gap-3 border-b border-rule/60 py-2.5 transition-opacity duration-300"
                      style={{ opacity: dim ? 0.22 : 1 }}
                    >
                      <span className="text-[0.875rem] text-fg">{item.name}</span>
                      <span className="flex shrink-0 gap-0.5" aria-hidden="true">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="block h-2 w-[3px] rounded-full"
                            style={{
                              background: i < FILL[item.level] ? "var(--accent)" : "var(--rule-strong)",
                              opacity: i < FILL[item.level] ? 0.9 : 0.5,
                            }}
                          />
                        ))}
                      </span>
                      <span className="sr-only">{levelCopy[item.level]}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
