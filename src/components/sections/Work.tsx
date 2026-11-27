import Link from "next/link";
import ProjectDrawing from "../ProjectDrawing";
import { alsoBuilt, featuredProjects, otherProjects } from "@/lib/projects";

export default function Work() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="shell">
        <div className="work-heading"><h2 id="work-title" className="display">Selected work</h2><span>Engineering case studies</span></div>
        <div className="work-list">
          {featuredProjects.map((p) => (
            <article className="work-entry" key={p.slug}>
              <div className="work-art"><ProjectDrawing kind={p.plate} /></div>
              <div className="work-identity"><span className="project-kind">{p.kind}</span><h3>{p.title}</h3></div>
              <div className="work-context"><p>{p.summary}</p><span>{p.stack.slice(0, 4).join("  ·  ")}</span></div>
              <div className="work-actions"><Link className="read-case" href={`/work/${p.slug}`}>Case study <span aria-hidden="true">→</span></Link>{p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}</div>
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
