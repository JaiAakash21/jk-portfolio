import Link from "next/link";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import InView from "../InView";
import Plate from "../Plate";
import { featuredProjects, otherProjects, alsoBuilt, projects } from "@/lib/projects";

export default function Work() {
  return (
    <section id="work" className="section ruled border-t border-rule" aria-labelledby="work-title">
      <div className="shell relative">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionHead
              index="02"
              id="work-title"
              title="Selected work"
              note="Projects that show how I approach a problem: find the failure case first, then build the system that survives it."
            />
            <Reveal className="mt-6">
              <Link href="/work" className="group/all inline-flex items-center gap-2 text-[0.875rem] text-fg">
                <span className="hover-line">Browse every project</span>
                <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/all:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end" stagger>
            <dl className="grid grid-cols-3 gap-4 border-t border-rule pt-5 md:grid-cols-1 md:gap-0 md:border-t-0">
              {[
                ["Case studies", String(projects.length)],
                ["Live demos", String(projects.filter((x) => x.demo).length)],
                ["Open source", String(projects.filter((x) => x.repo).length + alsoBuilt.filter((x) => x.href).length)],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:border-b md:border-rule md:py-3">
                  <dt className="label">{k}</dt>
                  <dd className="tnum font-[family-name:var(--font-display)] text-[1.75rem] leading-none text-fg md:text-[1.25rem]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        {featuredProjects.map((p, i) => (
          <article
            key={p.slug}
            className="group/proj border-t border-rule py-12 md:py-16"
          >
            <div className="shell">
              <div
                className={`grid gap-8 md:grid-cols-12 md:items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Plate */}
                <Reveal className="md:col-span-7" y={32}>
                  <InView className="overflow-hidden rounded-xl border border-rule">
                    <Link
                      href={`/work/${p.slug}`}
                      aria-label={`Read the ${p.title} case study`}
                      className="block aspect-[16/10] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover/proj:scale-[1.012]"
                    >
                      <Plate kind={p.plate} />
                    </Link>
                  </InView>
                </Reveal>

                {/* Copy */}
                <Reveal className="md:col-span-5" stagger y={22}>
                  <div className="flex items-center gap-3">
                    <span className="label label-accent tnum">{p.index}</span>
                    <span className="label">{p.kind}</span>
                    <span className="label ml-auto tnum">{p.year}</span>
                  </div>

                  <h3 className="display mt-4 text-[length:var(--text-h1)] leading-[0.95]">
                    <Link href={`/work/${p.slug}`} className="hover-line">
                      {p.title}
                    </Link>
                  </h3>

                  <p className="mt-5 max-w-[42ch] text-[length:var(--text-body-lg)] leading-relaxed text-fg-muted">
                    {p.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2" aria-label="Stack">
                    {p.stack.slice(0, 6).map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-rule px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.04em] text-fg-muted"
                      >
                        {s}
                      </li>
                    ))}
                    {p.stack.length > 6 && (
                      <li className="px-1 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] text-fg-faint">
                        +{p.stack.length - 6}
                      </li>
                    )}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/work/${p.slug}`}
                      className="group/cta inline-flex items-center gap-2 text-[0.875rem] text-fg"
                    >
                      <span className="hover-line">Read the case study</span>
                      <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/cta:translate-x-1">→</span>
                    </Link>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer noopener" className="label hover-line hover:text-fg">
                        Live demo ↗
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer noopener" className="label hover-line hover:text-fg">
                        Source ↗
                      </a>
                    )}
                    {p.note && !p.repo && <span className="label">Source not public</span>}
                  </div>
                </Reveal>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Index of everything else */}
      <div className="shell relative mt-16 md:mt-24">
        <Reveal className="tick-rule pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="display text-[length:var(--text-h3)]">Also built</h3>
            <Link href="/work" className="label hover-line hover:text-fg">
              All work ↗
            </Link>
          </div>
        </Reveal>

        <Reveal className="mt-8" stagger>
          {otherProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group/row grid grid-cols-12 items-baseline gap-3 border-b border-rule py-5 transition-colors hover:border-rule-strong"
            >
              <span className="label tnum col-span-2 sm:col-span-1">{p.index}</span>
              <span className="col-span-10 text-[length:var(--text-body-lg)] text-fg sm:col-span-4">
                <span className="hover-line">{p.title}</span>
              </span>
              <span className="col-span-12 text-[0.875rem] text-fg-muted sm:col-span-4">{p.summary}</span>
              <span className="label col-span-10 sm:col-span-2">{p.stack.slice(0, 3).join(" · ")}</span>
              <span
                aria-hidden="true"
                className="col-span-2 text-right text-fg-faint transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/row:translate-x-1 group-hover/row:text-accent sm:col-span-1"
              >
                →
              </span>
            </Link>
          ))}

          {alsoBuilt.map((p) => {
            const Row = (
              <>
                <span className="label tnum col-span-2 sm:col-span-1">—</span>
                <span className="col-span-10 text-[length:var(--text-body-lg)] text-fg sm:col-span-4">
                  <span className={p.href ? "hover-line" : undefined}>{p.title}</span>
                </span>
                <span className="col-span-12 text-[0.875rem] text-fg-muted sm:col-span-4">{p.desc}</span>
                <span className="label col-span-10 sm:col-span-2">{p.stack}</span>
                <span aria-hidden="true" className="col-span-2 text-right text-fg-faint sm:col-span-1">
                  {p.href ? "↗" : ""}
                </span>
              </>
            );
            return p.href ? (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group/row grid grid-cols-12 items-baseline gap-3 border-b border-rule py-5 transition-colors hover:border-rule-strong"
              >
                {Row}
              </a>
            ) : (
              <div key={p.title} className="grid grid-cols-12 items-baseline gap-3 border-b border-rule py-5">
                {Row}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
