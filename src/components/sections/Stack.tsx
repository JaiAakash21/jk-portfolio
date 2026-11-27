import Link from "next/link";
import { skillGroups } from "@/lib/profile";

export default function Stack() {
  return (
    <section id="stack" className="section tool-section" aria-labelledby="stack-title">
      <div className="shell tool-layout">
        <div className="tool-intro">
          <h2 id="stack-title" className="display">Toolkit</h2>
          <p>In RelayForge, Spring Boot accepts the request, PostgreSQL holds the event and Kafka handles delivery.</p>
          <Link className="text-action" href="/work/relayforge">See the architecture ↗</Link>
        </div>
        <dl className="tool-register">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
