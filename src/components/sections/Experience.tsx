import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { timeline, achievements, beyondCode } from "@/lib/profile";

export default function Experience() {
  return (
    <section id="experience" className="section ruled border-t border-rule" aria-labelledby="exp-title">
      <div className="shell relative">
        <SectionHead index="04" id="exp-title" title="Experience & education" />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <ol className="relative">
              {timeline.map((entry) => (
                <Reveal as="li" key={`${entry.period}-${entry.title}`} className="group relative border-t border-rule py-8 first:border-t-0 first:pt-0" y={20}>
                  <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                    <div className="sm:col-span-3">
                      <p className="label tnum">{entry.period}</p>
                      <p className="label mt-1.5 !text-fg-faint">
                        {entry.kind === "work" ? "Work" : "Education"}
                      </p>
                    </div>
                    <div className="sm:col-span-9">
                      <h3 className="text-[length:var(--text-h3)] leading-tight text-fg">{entry.title}</h3>
                      <p className="mt-1 text-[0.9375rem] text-accent">{entry.org}</p>
                      <ul className="mt-4 space-y-2.5">
                        {entry.detail.map((d) => (
                          <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                            <span aria-hidden="true" className="mt-[0.6em] block size-1 shrink-0 rounded-full bg-rule-strong" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      {entry.stack && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {entry.stack.map((s) => (
                            <li key={s} className="rounded-full border border-rule px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.6875rem] text-fg-muted">
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="md:col-span-4">
            <Reveal stagger>
              <h3 className="label border-b border-rule pb-3">Recognition</h3>
              <ul className="mt-1">
                {achievements.map((a) => (
                  <li key={a.title} className="border-b border-rule py-4">
                    <p className="text-[0.9375rem] text-fg">{a.title}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-fg-muted">{a.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12" stagger>
              <h3 className="label border-b border-rule pb-3">Beyond code</h3>
              <ul className="mt-1">
                {beyondCode.map((b) => (
                  <li key={b.title} className="border-b border-rule py-4">
                    <p className="text-[0.9375rem] text-fg">{b.title}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-fg-muted">{b.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
