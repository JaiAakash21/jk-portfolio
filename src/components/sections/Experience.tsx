import Link from "next/link";
import SectionHead from "../SectionHead";
import { achievements, degree, internships } from "@/lib/profile";

export default function Experience() {
  return (
    <section id="experience" className="section border-t border-rule" aria-labelledby="exp-title">
      <div className="shell">
        <SectionHead id="exp-title" title="Experience" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <h3 className="label border-b border-rule pb-3">Internships</h3>
            <ol className="divide-y divide-rule">
              {internships.map((role) => (
                <li key={role.title} className="py-6">
                  <p className="text-sm text-fg-muted">{role.period}</p>
                  <h4 className="mt-2 text-[length:var(--text-h3)] leading-tight">{role.title}</h4>
                  <p className="mt-1 text-fg-muted">{role.org}</p>
                  <p className="mt-3 max-w-[62ch] leading-relaxed">{role.detail}</p>
                  {role.caseStudy && (
                    <Link href={role.caseStudy.href} className="text-action mt-3 inline-block">{role.caseStudy.title}</Link>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-9">
            <div>
              <h3 className="label border-b border-rule pb-3">Education</h3>
              <h4 className="mt-4 text-lg font-medium">{degree.title}</h4>
              <p className="mt-1 text-fg-muted">{degree.institution}</p>
              <p className="mt-2 text-sm text-fg-muted">{degree.period} · {degree.grade}</p>
            </div>
            <div>
              <h3 className="label border-b border-rule pb-3">Hackathon recognition</h3>
              <ul className="divide-y divide-rule">
                {achievements.map((award) => (
                  <li key={award.title} className="py-4">
                    <h4 className="font-medium">{award.title}</h4>
                    <p className="mt-1 text-fg-muted">{award.detail}</p>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                      {award.projects.map((project) => (
                        <Link key={project.href} href={project.href} className="text-action">{project.title}</Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
