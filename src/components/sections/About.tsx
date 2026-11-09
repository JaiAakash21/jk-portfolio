import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { nowFocus } from "@/lib/profile";

export default function About() {
  return (
    <section id="about" className="section ruled" aria-labelledby="about-title">
      <div className="shell relative">
        <SectionHead
          index="01"
          id="about-title"
          title="About"
          note="Computer Science undergraduate at Rajalakshmi Engineering College, two internships in, writing mostly backend."
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7 md:col-start-1" stagger>
            <p className="text-[length:var(--text-lead)] leading-[1.35] tracking-[-0.012em] text-fg">
              Most of what I build comes from the same question:{" "}
              <em className="font-[family-name:var(--font-display)] not-italic text-accent">
                what happens when this breaks?
              </em>
            </p>
            <p className="mt-7 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[1.68] text-fg-muted">
              A webhook pipeline that drops an event is worse than one that is
              slow, because nobody finds out until a customer does. A notes app
              that loses your writing when the signal drops is not a notes app. A
              fraud score you cannot explain is not a decision. The interesting
              engineering is usually in the failure case, so that is where I start.
            </p>
            <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[1.68] text-fg-muted">
              In practice that means a transactional outbox so an accepted event
              cannot vanish, retries scheduled in the database where you can query
              and correct them, encrypted local-first storage with a replayable
              action queue, server-authoritative state over WebSockets, and APIs
              with typed contracts at every boundary. The largest of those is{" "}
              <span className="text-fg">RelayForge</span> — a multi-tenant webhook
              delivery platform on Java, Spring Boot, PostgreSQL, Kafka and Redis,
              with 234 automated tests and its own reliability playground that
              injects real failures into the real pipeline.
            </p>
            <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[1.68] text-fg-muted">
              I spent a summer at{" "}
              <span className="text-fg">Zenvic Software Solutions</span> building the
              backend of an AI-assisted incident management platform — 10+ REST
              endpoints, an LLM postmortem module, and an incident memory that
              surfaces the outages you have already solved.
            </p>
            <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[1.68] text-fg-muted">
              I am looking for a software or backend engineering internship where
              correctness matters and the systems have consequences.
            </p>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9" stagger>
            <h3 className="label">Right now</h3>
            <ul className="mt-5 space-y-0">
              {nowFocus.map((item, i) => (
                <li key={item} className="flex gap-4 border-b border-rule py-4 last:border-b-0">
                  <span className="label tnum pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-fg-muted">{item}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-10 space-y-4 border-t border-rule pt-6">
              {[
                ["Based in", "Chennai, India"],
                ["Degree", "B.E. CSE · CGPA 9.17"],
                ["Looking for", "SWE / Backend internships"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="label">{k}</dt>
                  <dd className="text-right text-[0.875rem] text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
