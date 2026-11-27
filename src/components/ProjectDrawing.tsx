import { useId } from "react";
import type { Plate } from "@/lib/projects";

/** Compact technical drawings for the featured project index. */
export default function ProjectDrawing({ kind }: { kind: Plate }) {
  const id = useId();
  const drawingId = `drawing-${id}`;
  const revealId = `reveal-${id}`;

  return (
    <svg viewBox="0 0 300 112" className="project-drawing" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <defs>
        <clipPath id={revealId}>
          <rect className="drawing-aperture" width="300" height="112" />
        </clipPath>
        <g id={drawingId}>
          {kind === "delivery" ? (
            <g>
              {[30, 104, 178].map((x, i) => (
                <g key={x} transform={`translate(${x}, 23)`}>
                  <path d="m0 33 39-23 41 23-40 24z M0 33v10l40 24 40-24V33 M40 57v10" />
                  <path d="m11 33 28-16 29 16-28 17z" opacity=".6" />
                  {i === 1 && <path d="m21 32 18-10 19 10-18 11z" fill="currentColor" />}
                </g>
              ))}
            </g>
          ) : kind === "review" ? (
            <g>
              <path d="M31 55h55l17-18h41m-58 18 17 20h41m32-38h28l17 18h39m-84 20h28l17-20" />
              <circle cx="31" cy="55" r="7" /><circle cx="269" cy="55" r="9" />
              {[37, 75].map((y) => <g key={y} transform={`translate(144,${y - 12})`}><rect width="32" height="24" /><path d="M6 8h20m-20 6h13" /></g>)}
              <path d="M103 24h95v65h-95z" strokeDasharray="2 4" opacity=".5" />
            </g>
          ) : (
            <g>
              {[26, 54, 82].map((y, i) => (
                <g key={y}><path d={`M29 ${y}h${48 + i * 10}l${Math.abs(55-y)} ${55-y}H162`} /><circle cx="25" cy={y} r="4" /></g>
              ))}
              <path d="m162 55 22-16 22 16-22 16z M206 55h24l16-17h23m-39 17 16 17h23" />
              <rect x="270" y="34" width="8" height="8" fill="currentColor" /><rect x="270" y="68" width="8" height="8" />
              <path d="m150 55 34-26 34 26-34 26z" strokeDasharray="2 4" opacity=".55" />
            </g>
          )}
        </g>
      </defs>
      <use href={`#${drawingId}`} opacity=".22" />
      <use href={`#${drawingId}`} clipPath={`url(#${revealId})`} />
      <path className="drawing-cursor" d="M0 12v88m-3-88h6m-6 88h6" opacity="0" />
    </svg>
  );
}
