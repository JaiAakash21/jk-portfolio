import Reveal from "./Reveal";

/** Consistent section opener: index, title, optional note. */
export default function SectionHead({
  index,
  title,
  note,
  id,
}: {
  index: string;
  title: string;
  note?: string;
  id?: string;
}) {
  return (
    <Reveal className="tick-rule pt-6" stagger>
      <div className="flex items-baseline gap-4">
        <span className="label label-accent tnum">{index}</span>
        <h2 id={id} className="display text-[length:var(--text-h2)]">{title}</h2>
      </div>
      {note && <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-fg-muted">{note}</p>}
    </Reveal>
  );
}
