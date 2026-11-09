import type { Metadata } from "next";
import Link from "next/link";

import { projects, alsoBuilt } from "@/lib/projects";
import { site } from "@/lib/site";
import Plate from "@/components/Plate";
import InView from "@/components/InView";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project with a case study, plus the smaller builds — webhook delivery infrastructure, offline-first systems, real-time multiplayer and computer vision.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work — ${site.name}`,
    description: "Every project with a case study, plus the smaller builds.",
    url: `${site.url}/work`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Work — ${site.name}` }],
  },
};

export default function WorkIndex() {
  return (
    <>
      <header className="ruled border-b border-rule pb-14 pt-28 md:pb-18 md:pt-36">
        <div className="shell relative">
          <Link href="/" className="label hover-line inline-block hover:text-fg">
            ← Home
          </Link>

          <h1 className="display mt-10 max-w-[18ch] text-[length:var(--text-h1)] leading-[0.95]">
            Work<span className="text-accent">.</span>
          </h1>

          <p className="lead mt-8 max-w-[46ch]">
            {projects.length} projects with a full case study, and the smaller builds
            underneath. Each one starts from a failure case.
          </p>
        </div>
      </header>

      <div className="shell relative py-14 md:py-20">
        <ol className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.map((p) => (
            <Reveal as="li" key={p.slug} y={24}>
              <Link href={`/work/${p.slug}`} className="group/card block">
                <InView className="overflow-hidden rounded-xl border border-rule transition-colors group-hover/card:border-rule-strong">
                  <div className="aspect-[16/10]">
                    <Plate kind={p.plate} />
                  </div>
                </InView>

                <div className="mt-5 flex items-center gap-3">
                  <span className="label label-accent tnum">{p.index}</span>
                  <span className="label">{p.kind}</span>
                  <span className="label tnum ml-auto">{p.year}</span>
                </div>

                <h2 className="display mt-3 text-[length:var(--text-h3)] leading-tight">
                  <span className="hover-line">{p.title}</span>
                </h2>

                <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-fg-muted">
                  {p.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
                  {p.stack.slice(0, 5).map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-rule px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.04em] text-fg-muted"
                    >
                      {s}
                    </li>
                  ))}
                  {p.stack.length > 5 && (
                    <li className="px-1 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] text-fg-faint">
                      +{p.stack.length - 5}
                    </li>
                  )}
                </ul>
              </Link>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20">
          <Reveal className="tick-rule pt-6">
            <h2 className="display text-[length:var(--text-h3)]">Also built</h2>
          </Reveal>
          <Reveal className="mt-8" stagger>
            {alsoBuilt.map((b) => {
              const row = (
                <>
                  <span className="col-span-12 text-[length:var(--text-body-lg)] text-fg sm:col-span-4">
                    <span className={b.href ? "hover-line" : undefined}>{b.title}</span>
                  </span>
                  <span className="col-span-12 text-[0.875rem] text-fg-muted sm:col-span-5">{b.desc}</span>
                  <span className="label col-span-10 sm:col-span-2">{b.stack}</span>
                  <span aria-hidden="true" className="col-span-2 text-right text-fg-faint sm:col-span-1">
                    {b.href ? "↗" : ""}
                  </span>
                </>
              );
              return b.href ? (
                <a
                  key={b.title}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/row grid grid-cols-12 items-baseline gap-3 border-b border-rule py-5 transition-colors hover:border-rule-strong"
                >
                  {row}
                </a>
              ) : (
                <div key={b.title} className="grid grid-cols-12 items-baseline gap-3 border-b border-rule py-5">
                  {row}
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </>
  );
}
