import { skillGroups } from "@/lib/profile";

export default function Stack() {
  return (
    <section id="stack" className="section border-t border-rule" aria-labelledby="stack-title">
      <div className="shell profile-layout">
        <h2 id="stack-title" className="display">Toolkit</h2>
        <dl className="toolkit">
          {skillGroups.map((group) => (
            <div key={group.label}><dt>{group.label}</dt><dd>{group.items.join(" · ")}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
