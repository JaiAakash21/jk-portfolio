import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";
import Plate from "@/components/Plate";
import InView from "@/components/InView";
import Reveal from "@/components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title} — ${site.name}`,
      description: p.summary,
      url: `${site.url}/work/${p.slug}`,
      type: "article",
      images: [{ url: `/work/${p.slug}/opengraph-image`, width: 1200, height: 630, alt: p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} — ${site.name}`,
      description: p.summary,
      images: [`/work/${p.slug}/opengraph-image`],
    },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      {/* Header */}
      <header className="ruled border-b border-rule pb-14 pt-28 md:pb-18 md:pt-36">
        <div className="shell relative">
          <Link href="/#work" className="label hover-line inline-block hover:text-fg">
            ← Selected work
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label label-accent tnum">{p.index}</span>
            <span className="label">{p.kind}</span>
            <span className="label tnum">{p.year}</span>
          </div>

          <h1 className="display mt-5 max-w-[16ch] text-[length:var(--text-h1)] leading-[0.95]">{p.title}</h1>

          <p className="lead mt-8 max-w-[44ch]">{p.summary}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-2.5 text-[0.875rem] font-medium text-accent-ink"
              >
                Live demo
                <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5">↗</span>
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 rounded-full border border-rule-strong px-5 py-2.5 text-[0.875rem] text-fg transition-colors hover:border-accent"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            )}
            {p.note && <p className="label max-w-[36ch] leading-relaxed">{p.note}</p>}
          </div>
        </div>
      </header>

      {/* Plate */}
      <div className="shell relative -mt-px py-10 md:py-14">
        <InView className="overflow-hidden rounded-xl border border-rule">
          <div className="aspect-[16/10] md:aspect-[2/1]">
            <Plate kind={p.plate} />
          </div>
        </InView>
        <p className="label mt-3">
          Schematic of the system — an original diagram, not a product screenshot.
        </p>
      </div>

      {/* Body */}
      <div className="shell relative pb-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="space-y-14 md:col-span-7">
            <Reveal stagger>
              <h2 className="label tick-rule pt-5">The problem</h2>
              <p className="mt-5 text-[length:var(--text-body-lg)] leading-[1.68] text-fg-muted">{p.problem}</p>
            </Reveal>

            <Reveal stagger>
              <h2 className="label tick-rule pt-5">The approach</h2>
              <p className="mt-5 text-[length:var(--text-body-lg)] leading-[1.68] text-fg-muted">{p.solution}</p>
            </Reveal>

            <Reveal stagger>
              <h2 className="label tick-rule pt-5">Decisions</h2>
              <dl className="mt-5">
                {p.decisions.map((d) => (
                  <div key={d.title} className="border-b border-rule py-6 first:pt-0">
                    <dt className="text-[length:var(--text-h3)] leading-snug text-fg">{d.title}</dt>
                    <dd className="mt-3 text-[0.9375rem] leading-[1.7] text-fg-muted">{d.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal stagger>
              <h2 className="label tick-rule pt-5">My contribution</h2>
              <p className="mt-5 text-[length:var(--text-body-lg)] leading-[1.68] text-fg-muted">{p.contribution}</p>
            </Reveal>
          </div>

          <aside className="space-y-12 md:col-span-4 md:col-start-9">
            <Reveal stagger>
              <h2 className="label border-b border-rule pb-3">Architecture</h2>
              <ol className="mt-1">
                {p.architecture.map((a, idx) => (
                  <li key={a} className="flex gap-4 border-b border-rule py-3.5">
                    <span className="label tnum pt-0.5">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="text-[0.875rem] leading-relaxed text-fg-muted">{a}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal stagger>
              <h2 className="label border-b border-rule pb-3">Features</h2>
              <ul className="mt-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 border-b border-rule py-3.5">
                    <span aria-hidden="true" className="mt-[0.55em] block size-1 shrink-0 rounded-full bg-accent" />
                    <span className="text-[0.875rem] leading-relaxed text-fg-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal stagger>
              <h2 className="label border-b border-rule pb-3">Stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-rule px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] text-fg-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* Next */}
      <nav aria-label="Next project" className="border-t border-rule">
        <Link href={`/work/${next.slug}`} className="group block py-14 transition-colors hover:bg-bg-raised md:py-20">
          <div className="shell flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label">Next project</p>
              <p className="display mt-3 text-[length:var(--text-h1)] leading-none">{next.title}</p>
            </div>
            <span
              aria-hidden="true"
              className="text-[length:var(--text-h2)] text-fg-faint transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 group-hover:text-accent"
            >
              →
            </span>
          </div>
        </Link>
      </nav>
    </article>
  );
}
