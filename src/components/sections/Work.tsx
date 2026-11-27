import Link from "next/link";
import ProjectDrawing from "../ProjectDrawing";
import { alsoBuilt, featuredProjects, otherProjects } from "@/lib/projects";

export default function Work() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="shell">
        <div className="work-heading"><h2 id="work-title" className="display">Selected work</h2><span>Engineering case studies</span></div>
        <div className="cover-stack">
          {featuredProjects.map((p) => (
            <article className="project-cover" data-plate={p.plate} key={p.slug}>
              <div className="cover-copy">
                <p className="cover-kind">{p.kind}</p>
                <h3 className="display">{p.title}</h3>
                <p className="cover-summary">{p.summary}</p>
                <p className="cover-stack-line">{p.stack.slice(0, 4).join(" · ")}</p>
                <div className="cover-links">
                  <Link href={`/work/${p.slug}`} aria-label={`Read the ${p.title} case study`}>
                    Case study <span aria-hidden="true">→</span>
                  </Link>
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
                </div>
              </div>
              <div className="cover-illustration" aria-hidden="true">
                <div className="cover-orbit"><ProjectDrawing kind={p.plate} /></div>
              </div>
            </article>
          ))}
        </div>
        <details className="work-archive">
          <summary>More projects <span>{otherProjects.length + alsoBuilt.length}</span></summary>
          <ul>
            {otherProjects.map((p) => <li key={p.slug}><Link href={`/work/${p.slug}`}>{p.title}</Link><div><p>{p.summary}</p>{p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}</div></li>)}
            {alsoBuilt.map((p) => <li key={p.title}>{p.href ? <a href={p.href}>{p.title}</a> : <strong>{p.title}</strong>}<p>{p.desc}</p></li>)}
          </ul>
        </details>
      </div>
    </section>
  );
}
