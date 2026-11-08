import type { Plate as PlateKind } from "@/lib/projects";

/**
 * Project plates.
 *
 * These are original schematic drawings of each system's architecture — not
 * screenshots, and not pretending to be. No real product UI was available to
 * photograph, and a fake browser chrome would misrepresent the work, so each
 * project is instead drawn as the thing it actually is: a queue, a pipeline,
 * a routing graph, a classifier.
 *
 * Pure SVG, no JS, no images. Animation is CSS-only and switched off by the
 * global reduced-motion rule.
 */

const S = {
  rule: "var(--rule-strong)",
  faint: "var(--rule)",
  fg: "var(--fg)",
  muted: "var(--fg-muted)",
  accent: "var(--accent)",
  sage: "var(--sage)",
};

const mono = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      className="plate size-full"
      role="img"
      aria-label={`Schematic diagram: ${label}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="pgrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke={S.faint} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill="var(--bg-raised)" />
      <rect width="640" height="400" fill="url(#pgrid)" opacity="0.5" />
      {children}
    </svg>
  );
}

function Tag({ x, y, children, accent }: { x: number; y: number; children: string; accent?: boolean }) {
  return (
    <text x={x} y={y} style={mono} fill={accent ? S.accent : S.muted}>
      {children}
    </text>
  );
}

/* ---------------------------------------------------------------- 01 sync */
function SyncPlate() {
  return (
    <Frame label="encrypted action queue replaying to a server after reconnect">
      <Tag x={32} y={40}>Local · encrypted</Tag>
      <Tag x={432} y={40}>Remote</Tag>

      {/* device boundary */}
      <rect x="32" y="56" width="240" height="288" rx="10" fill="none" stroke={S.rule} />
      <rect x="432" y="56" width="176" height="288" rx="10" fill="none" stroke={S.faint} strokeDasharray="4 5" />

      {/* queued actions */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="plate-row" style={{ animationDelay: `${i * 0.55}s` }}>
          <rect x="52" y={86 + i * 58} width="200" height="42" rx="7" fill="var(--bg)" stroke={S.faint} />
          <rect x="66" y={101 + i * 58} width="10" height="12" rx="2" fill={S.accent} opacity="0.85" />
          <path d={`M67 ${101 + i * 58} v-4 a4 4 0 0 1 8 0 v4`} fill="none" stroke={S.accent} strokeWidth="1.4" />
          <rect x="88" y={101 + i * 58} width={96 - i * 13} height="5" rx="2.5" fill={S.muted} opacity="0.55" />
          <rect x="88" y={111 + i * 58} width={62 + i * 9} height="5" rx="2.5" fill={S.muted} opacity="0.3" />
          <text x="238" y={111 + i * 58} style={{ ...mono, fontSize: 10.5 }} fill={S.muted} textAnchor="end">
            {["PUT", "DEL", "PUT", "ADD"][i]}
          </text>
        </g>
      ))}

      {/* replay path */}
      <path d="M272 200 H352" stroke={S.rule} strokeWidth="1.5" fill="none" />
      <path d="M352 200 H424" stroke={S.accent} strokeWidth="2" fill="none" strokeDasharray="6 6" className="plate-dash" />
      <path d="M418 195 l8 5 -8 5" fill="none" stroke={S.accent} strokeWidth="2" />
      <circle cx="312" cy="200" r="15" fill="var(--bg)" stroke={S.rule} />
      <text x="312" y="204" style={{ ...mono, fontSize: 10.5 }} fill={S.accent} textAnchor="middle">SW</text>
      <Tag x={282} y={238}>replay</Tag>

      {/* applied records */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="plate-in" style={{ animationDelay: `${0.4 + i * 0.5}s` }}>
          <rect x="452" y={94 + i * 56} width="136" height="36" rx="6" fill="var(--bg)" stroke={S.faint} />
          <circle cx="470" cy={112 + i * 56} r="4" fill={S.sage} />
          <rect x="484" y={109 + i * 56} width={78 - i * 14} height="5" rx="2.5" fill={S.muted} opacity="0.45" />
        </g>
      ))}
      <Tag x={452} y={300} accent>v3 conflict → resolve</Tag>
      <rect x="452" y="310" width="136" height="24" rx="12" fill="none" stroke={S.accent} opacity="0.5" />
      <rect x="456" y="314" width="64" height="16" rx="8" fill={S.accent} opacity="0.18" />
    </Frame>
  );
}

/* ---------------------------------------------------------------- 02 grid */
function GridPlate() {
  const cells = [
    [3, 2, 0.9], [4, 2, 0.55], [3, 3, 0.7], [8, 5, 0.85], [9, 5, 0.5],
    [12, 3, 0.4], [6, 7, 0.65], [7, 7, 0.35], [14, 6, 0.6],
  ] as const;
  return (
    <Frame label="incident density grid with a route planned around hotspots">
      <Tag x={32} y={40}>Hotspot density</Tag>
      <g transform="translate(32,56)">
        <rect width="576" height="256" rx="10" fill="var(--bg)" stroke={S.rule} />
        {cells.map(([cx, cy, w], i) => (
          <g key={i}>
            <rect x={cx * 36} y={cy * 30} width="36" height="30" fill={S.accent} opacity={w * 0.3} />
            {w > 0.7 && (
              <circle cx={cx * 36 + 18} cy={cy * 30 + 15} r="16" fill={S.accent} opacity="0.3"
                className="plate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
            )}
          </g>
        ))}
        {/* unsafe direct line vs planned route */}
        <path d="M40 220 L520 60" fill="none" stroke={S.muted} strokeWidth="1.5" strokeDasharray="3 5" opacity="0.5" />
        <path d="M40 220 L140 212 L190 140 L330 120 L420 70 L520 60" fill="none"
          stroke={S.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="plate-draw" />
        <circle cx="40" cy="220" r="6" fill={S.fg} />
        <circle cx="520" cy="60" r="6" fill="none" stroke={S.accent} strokeWidth="2.5" />
      </g>
      <Tag x={32} y={340}>Direct · higher risk</Tag>
      <Tag x={220} y={340} accent>Planned · avoids hotspots</Tag>
      <rect x="196" y="332" width="14" height="2" fill={S.accent} />
      <rect x="8" y="332" width="0" height="0" fill="none" />
    </Frame>
  );
}

/* ------------------------------------------------------------ 03 incident */
function IncidentPlate() {
  const stages = ["Intake", "RCA", "Memory", "Postmortem"];
  return (
    <Frame label="incident triage pipeline with retrieval before generation">
      <Tag x={32} y={40}>Incident pipeline</Tag>
      {stages.map((s, i) => (
        <g key={s} className="plate-in" style={{ animationDelay: `${i * 0.3}s` }}>
          <rect x={32 + i * 150} y="92" width="124" height="74" rx="8"
            fill="var(--bg)" stroke={i === 2 ? S.accent : S.rule} strokeWidth={i === 2 ? 1.6 : 1} />
          <text x={94 + i * 150} y="124" style={{ ...mono, fontSize: 11.5 }}
            fill={i === 2 ? S.accent : S.fg} textAnchor="middle">{s}</text>
          <text x={94 + i * 150} y="146" style={{ ...mono, fontSize: 11.5 }} fill={S.muted} textAnchor="middle">
            {["10+ API", "LLM", "keyword", "draft"][i]}
          </text>
          {i < 3 && (
            <path d={`M${156 + i * 150} 129 H${176 + i * 150}`} stroke={S.rule} strokeWidth="1.5" />
          )}
        </g>
      ))}

      {/* memory store feeding stage 3 */}
      <path d="M394 166 V214" stroke={S.accent} strokeWidth="1.5" strokeDasharray="5 5" className="plate-dash" />
      <Tag x={332} y={240} accent>Similar past incidents</Tag>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={332 + i * 0} y={250 + i * 32} width="276" height="26" rx="5" fill="var(--bg)" stroke={S.faint} />
          <circle cx={346} cy={263 + i * 32} r="3" fill={S.sage} opacity={1 - i * 0.28} />
          <rect x="358" y={260 + i * 32} width={150 - i * 26} height="5" rx="2.5" fill={S.muted} opacity={0.5 - i * 0.12} />
          <text x="596" y={267 + i * 32} style={{ ...mono, fontSize: 11.5 }} fill={S.muted} textAnchor="end">
            {["0.91", "0.74", "0.52"][i]}
          </text>
        </g>
      ))}

      {/* triage volume bars */}
      <Tag x={32} y={240}>Triage queue</Tag>
      {[76, 54, 90, 38, 64, 46].map((h, i) => (
        <rect key={i} x={32 + i * 44} y={330 - h * 0.8} width="26" height={h * 0.8} rx="3"
          fill={i === 2 ? S.accent : S.muted} opacity={i === 2 ? 0.8 : 0.3} />
      ))}
      <line x1="32" y1="330" x2="296" y2="330" stroke={S.rule} />
    </Frame>
  );
}

/* --------------------------------------------------------------- 04 board */
function BoardPlate() {
  return (
    <Frame label="chess board with server-authoritative move broadcast to two clients">
      <Tag x={32} y={40}>Server-authoritative state</Tag>
      <g transform="translate(176,52)">
        {Array.from({ length: 64 }, (_, i) => {
          const r = Math.floor(i / 8), c = i % 8;
          return (
            <rect key={i} x={c * 36} y={r * 36} width="36" height="36"
              fill={(r + c) % 2 ? S.fg : "transparent"} opacity={(r + c) % 2 ? 0.07 : 0} />
          );
        })}
        <rect width="288" height="288" fill="none" stroke={S.rule} />
        {/* a knight's move and a bishop line */}
        <path d="M54 234 L126 162" stroke={S.accent} strokeWidth="2.5" strokeLinecap="round" className="plate-draw" />
        <circle cx="54" cy="234" r="7" fill={S.accent} />
        <circle cx="126" cy="162" r="7" fill="none" stroke={S.accent} strokeWidth="2.5" />
        <path d="M198 90 L270 162" stroke={S.sage} strokeWidth="2" strokeDasharray="5 5" className="plate-dash" />
        <circle cx="198" cy="90" r="6" fill={S.sage} />
      </g>

      {/* two clients receiving the same broadcast */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(32,${96 + i * 112})`} className="plate-in" style={{ animationDelay: `${i * 0.45}s` }}>
          <rect width="112" height="76" rx="8" fill="var(--bg)" stroke={S.rule} />
          <text x="14" y="26" style={{ ...mono, fontSize: 10.5 }} fill={S.muted}>{i ? "BLACK" : "WHITE"}</text>
          <rect x="14" y="38" width="84" height="5" rx="2.5" fill={S.muted} opacity="0.4" />
          <rect x="14" y="50" width="56" height="5" rx="2.5" fill={S.muted} opacity="0.25" />
          <circle cx="96" cy="24" r="4" fill={S.sage} className="plate-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
          <path d={`M112 38 H${i ? 160 : 160}`} stroke={S.accent} strokeWidth="1.5" strokeDasharray="4 4" className="plate-dash" />
        </g>
      ))}
      <Tag x={32} y={340}>chess.js validates · io broadcasts</Tag>
      <Tag x={462} y={360} accent>&lt; 200 ms local</Tag>
    </Frame>
  );
}

/* --------------------------------------------------------------- 05 route */
function RoutePlate() {
  return (
    <Frame label="navigation falling back from online tiles to on-device maps">
      <Tag x={32} y={40}>Online · live tiles</Tag>
      <Tag x={332} y={40} accent>Offline · MBTiles on device</Tag>
      <line x1="320" y1="56" x2="320" y2="344" stroke={S.rule} strokeDasharray="4 6" />

      {[0, 1].map((side) => {
        const dx = side * 300;
        const col = side ? S.accent : S.muted;
        return (
          <g key={side} transform={`translate(${32 + dx},72)`}>
            <rect width="256" height="212" rx="8" fill="var(--bg)" stroke={S.faint} />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="0" y1={i * 53} x2="256" y2={i * 53} stroke={S.faint} />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={i * 51} y1="0" x2={i * 51} y2="212" stroke={S.faint} />
            ))}
            <path d="M28 184 L84 184 L84 112 L176 112 L176 44 L224 44"
              fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className={side ? "plate-draw" : undefined} opacity={side ? 1 : 0.55} />
            <circle cx="28" cy="184" r="6" fill={S.fg} />
            <g transform="translate(206,24)">
              <circle r="12" fill={side ? S.accent : S.sage} opacity="0.18" />
              <path d="M-4 0 h8 M0 -4 v8" stroke={side ? S.accent : S.sage} strokeWidth="2" />
            </g>
          </g>
        );
      })}

      <g transform="translate(32,306)">
        <rect width="256" height="30" rx="15" fill="var(--bg)" stroke={S.faint} />
        <circle cx="20" cy="15" r="4" fill={S.sage} />
        <text x="34" y="19" style={{ ...mono, fontSize: 10.5 }} fill={S.muted}>MAPBOX · TRAFFIC</text>
      </g>
      <g transform="translate(332,306)">
        <rect width="256" height="30" rx="15" fill="var(--bg)" stroke={S.accent} strokeOpacity="0.5" />
        <circle cx="20" cy="15" r="4" fill={S.accent} className="plate-pulse" />
        <text x="34" y="19" style={{ ...mono, fontSize: 10.5 }} fill={S.accent}>SQLITE · NO SIGNAL</text>
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------------- 06 rules */
function RulesPlate() {
  const rules = [
    ["R-07 velocity", 0.42, true],
    ["R-02 geo mismatch", 0.28, true],
    ["R-11 device age", 0.21, false],
    ["R-04 amount z-score", 0.09, false],
  ] as const;
  return (
    <Frame label="named rules contributing to a risk score, routed to a reviewer queue">
      <Tag x={32} y={40}>Contributing rules</Tag>
      {rules.map(([name, w, fired], i) => (
        <g key={name} className="plate-in" style={{ animationDelay: `${i * 0.25}s` }}>
          <rect x="32" y={64 + i * 46} width="300" height="34" rx="6" fill="var(--bg)" stroke={S.faint} />
          <circle cx="50" cy={81 + i * 46} r="4" fill={fired ? S.accent : S.muted} opacity={fired ? 1 : 0.4} />
          <text x="64" y={85 + i * 46} style={{ ...mono, fontSize: 10.5 }} fill={fired ? S.fg : S.muted}>
            {name.toUpperCase()}
          </text>
          <rect x="218" y={76 + i * 46} width="80" height="10" rx="5" fill={S.muted} opacity="0.18" />
          <rect x="218" y={76 + i * 46} width={80 * w * 2} height="10" rx="5" fill={fired ? S.accent : S.muted} opacity={fired ? 0.85 : 0.35} />
          <text x="320" y={85 + i * 46} style={{ ...mono, fontSize: 10.5 }} fill={S.muted} textAnchor="end">
            +{w.toFixed(2)}
          </text>
        </g>
      ))}

      <path d="M332 150 H392" stroke={S.rule} strokeWidth="1.5" />
      <g transform="translate(400,96)">
        <rect width="208" height="108" rx="10" fill="var(--bg)" stroke={S.accent} strokeOpacity="0.55" />
        <text x="18" y="30" style={{ ...mono, fontSize: 10.5 }} fill={S.muted}>RISK SCORE</text>
        <text x="18" y="74" style={{ fontFamily: "var(--font-display)", fontSize: 40 }} fill={S.accent}>0.91</text>
        <text x="190" y="92" style={{ ...mono, fontSize: 11.5 }} fill={S.muted} textAnchor="end">4 RULES CITED</text>
      </g>

      <Tag x={400} y={238}>Reviewer queue</Tag>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="400" y={250 + i * 32} width="208" height="26" rx="5" fill="var(--bg)" stroke={S.faint} />
          <text x="414" y={267 + i * 32} style={{ ...mono, fontSize: 11.5 }} fill={S.muted}>TX-48{21 - i * 4}</text>
          <rect x="548" y={256 + i * 32} width="46" height="14" rx="7"
            fill={[S.accent, S.muted, S.sage][i]} opacity="0.2" />
          <text x="571" y={266 + i * 32} style={{ ...mono, fontSize: 9.5 }}
            fill={[S.accent, S.muted, S.sage][i]} textAnchor="middle">{["0.91", "0.58", "0.12"][i]}</text>
        </g>
      ))}
      <Tag x={32} y={268}>Audit trail</Tag>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="40" cy={288 + i * 24} r="3" fill={S.muted} opacity="0.5" />
          {i < 3 && <line x1="40" y1={291 + i * 24} x2="40" y2={309 + i * 24} stroke={S.faint} />}
          <rect x="54" y={285 + i * 24} width={210 - i * 30} height="5" rx="2.5" fill={S.muted} opacity="0.3" />
        </g>
      ))}
    </Frame>
  );
}

/* -------------------------------------------------------------- 07 vision */
function VisionPlate() {
  return (
    <Frame label="feature extraction into a classifier, with a precision-recall curve">
      <Tag x={32} y={40}>Views</Tag>
      {["TOP", "SIDE", "BOTTOM"].map((v, i) => (
        <g key={v} transform={`translate(32,${56 + i * 74})`}>
          <rect width="84" height="62" rx="6" fill="var(--bg)" stroke={i === 0 ? S.accent : S.faint} />
          <rect x="14" y="14" width="56" height="34" rx="3" fill={S.muted} opacity="0.14" />
          <circle cx="42" cy="31" r="11" fill="none" stroke={i === 0 ? S.accent : S.muted} strokeWidth="1.5" opacity="0.8" />
          <text x="42" y="58" style={{ ...mono, fontSize: 10.5 }} fill={S.muted} textAnchor="middle">{v}</text>
        </g>
      ))}

      <path d="M116 180 H156" stroke={S.rule} strokeWidth="1.5" />
      <g transform="translate(156,142)">
        <rect width="96" height="76" rx="8" fill="var(--bg)" stroke={S.rule} />
        <text x="48" y="32" style={{ ...mono, fontSize: 10.5 }} fill={S.fg} textAnchor="middle">ResNet18</text>
        <text x="48" y="50" style={{ ...mono, fontSize: 9.5 }} fill={S.muted} textAnchor="middle">frozen</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={14 + i * 12} y="58" width="7" height="10" rx="1.5" fill={S.accent} opacity={0.25 + i * 0.1} />
        ))}
      </g>

      <path d="M252 180 H292" stroke={S.rule} strokeWidth="1.5" />
      {/* feature scatter: good vs anomaly */}
      <g transform="translate(292,88)">
        <rect width="150" height="184" rx="8" fill="var(--bg)" stroke={S.faint} />
        {[[30, 140], [48, 122], [38, 154], [62, 136], [26, 118], [54, 158], [44, 104], [70, 150], [34, 132]].map(([x, y], i) => (
          <circle key={`g${i}`} cx={x} cy={y} r="4" fill={S.sage} opacity="0.75" />
        ))}
        {[[104, 48], [118, 66], [96, 72], [124, 36], [110, 86]].map(([x, y], i) => (
          <circle key={`a${i}`} cx={x} cy={y} r="4.5" fill={S.accent} className="plate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
        <path d="M12 60 L142 150" stroke={S.fg} strokeWidth="1.4" strokeDasharray="5 5" opacity="0.45" />
        <text x="12" y="176" style={{ ...mono, fontSize: 9.5 }} fill={S.sage}>GOOD</text>
        <text x="138" y="22" style={{ ...mono, fontSize: 9.5 }} fill={S.accent} textAnchor="end">ANOMALY</text>
      </g>

      {/* PR curve */}
      <Tag x={462} y={76}>PR curve</Tag>
      <g transform="translate(462,88)">
        <rect width="146" height="184" rx="8" fill="var(--bg)" stroke={S.faint} />
        <line x1="24" y1="156" x2="130" y2="156" stroke={S.rule} />
        <line x1="24" y1="24" x2="24" y2="156" stroke={S.rule} />
        <path d="M24 32 C68 34 92 46 106 80 C116 106 120 132 128 154"
          fill="none" stroke={S.accent} strokeWidth="2.2" className="plate-draw" />
        <text x="24" y="176" style={{ ...mono, fontSize: 9.5 }} fill={S.muted}>RECALL</text>
        <text x="18" y="20" style={{ ...mono, fontSize: 9.5 }} fill={S.muted}>PREC</text>
      </g>
      <Tag x={32} y={300}>Heatmap</Tag>
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={32 + (i % 9) * 26} y={312 + Math.floor(i / 9) * 24} width="22" height="20" rx="2"
          fill={S.accent} opacity={[0.07, 0.1, 0.3, 0.62, 0.38, 0.14, 0.08, 0.06, 0.05,
                                    0.08, 0.2, 0.52, 0.8, 0.46, 0.12, 0.07, 0.05, 0.04][i]} />
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------------- 08 tickets */
function TicketsPlate() {
  const lanes = [
    { role: "STUDENT", n: 3, col: S.muted },
    { role: "STAFF", n: 2, col: S.sage },
    { role: "ADMIN", n: 4, col: S.accent },
  ];
  return (
    <Frame label="role-based ticket lanes checked at the API boundary">
      <Tag x={32} y={40}>Role-based access</Tag>
      {lanes.map((lane, i) => (
        <g key={lane.role} transform={`translate(${32 + i * 196},56)`}>
          <rect width="180" height="288" rx="10" fill="var(--bg)" stroke={S.faint} />
          <rect width="180" height="34" rx="10" fill={lane.col} opacity="0.1" />
          <text x="16" y="23" style={{ ...mono, fontSize: 10.5 }} fill={lane.col}>{lane.role}</text>
          <circle cx="162" cy="17" r="4" fill={lane.col} />
          {Array.from({ length: lane.n }, (_, j) => (
            <g key={j} className="plate-in" style={{ animationDelay: `${(i * 3 + j) * 0.18}s` }}>
              <rect x="14" y={50 + j * 54} width="152" height="44" rx="6" fill="var(--bg-raised)" stroke={S.faint} />
              <rect x="26" y={64 + j * 54} width={92 - j * 10} height="5" rx="2.5" fill={S.muted} opacity="0.45" />
              <rect x="26" y={76 + j * 54} width={56 + j * 8} height="5" rx="2.5" fill={S.muted} opacity="0.25" />
              <rect x="130" y={62 + j * 54} width="24" height="10" rx="5" fill={lane.col} opacity="0.3" />
            </g>
          ))}
        </g>
      ))}
      <path d="M212 200 H228" stroke={S.rule} strokeWidth="1.5" />
      <path d="M408 200 H424" stroke={S.rule} strokeWidth="1.5" />
      <Tag x={32} y={368}>Every endpoint re-checks the role · PDO prepared statements</Tag>
    </Frame>
  );
}

const PLATES: Record<PlateKind, () => React.ReactElement> = {
  sync: SyncPlate,
  grid: GridPlate,
  incident: IncidentPlate,
  board: BoardPlate,
  route: RoutePlate,
  rules: RulesPlate,
  vision: VisionPlate,
  tickets: TicketsPlate,
};

export default function Plate({ kind }: { kind: PlateKind }) {
  const C = PLATES[kind];
  return <C />;
}
