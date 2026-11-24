"use client";

import { useState } from "react";

const stages = [
  { label: "Accepted", title: "Request accepted", detail: "The API returns HTTP 202 after committing the event and outbox row to PostgreSQL." },
  { label: "Pending", title: "Kafka is offline", detail: "The outbox holds the event. Delivery stays pending and the receiver gets zero requests." },
  { label: "Delivered", title: "Delivery resumes", detail: "Kafka restarts. The same event reaches the receiver, which records one HTTP 200." },
];

function TraceDrawing({ stage }: { stage: number }) {
  const layers = [
    { y: 124, label: "Receiver", active: stage === 2 },
    { y: 65, label: "Outbox", active: stage === 1 },
    { y: 6, label: "API", active: stage === 0 },
  ];
  return (
    <svg className="trace-drawing" viewBox="0 0 480 286" role="img" aria-label={`Delivery architecture, ${stages[stage].title}`}>
      <defs>
        <pattern id="trace-grid" width="36" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 18 0 36 10 18 20Z" fill="none" stroke="#738578" strokeWidth=".65" opacity=".32" />
        </pattern>
      </defs>
      <rect width="480" height="286" fill="url(#trace-grid)" />
      <g transform="translate(28,5)" strokeLinejoin="round">
        {layers.map(({ y, label, active }) => (
          <g key={label} transform={`translate(0,${y})`} className={active ? "trace-layer active" : "trace-layer"}>
            <path d="m58 82 118-64 118 64-118 65Z" fill={active ? "#df7751" : "#758879"} />
            <path d="m58 82 118 65v14L58 96Z" fill={active ? "#a94b2c" : "#405547"} />
            <path d="m176 147 118-65v14l-118 65Z" fill={active ? "#bd5937" : "#506756"} />
            <path d="m74 82 102-55 102 55-102 55Z" stroke={active ? "#ffd3a9" : "#b8c7b5"} fill="none" />
            <path d="m120 82 56-30 56 30-56 31Z m19 0 37-20 37 20-37 20Z m19 0 18-10 18 10-18 10Z" stroke={active ? "#804129" : "#445b49"} fill="none" />
            <path d="M295 84h27l10-9h15" fill="none" stroke={active ? "#ffab7d" : "#a7b8a7"} />
            <text x="352" y="80" fill={active ? "#ffb18c" : "#e0e6da"} fontSize="13" fontFamily="var(--font-mono)">{label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function DeliveryTrace() {
  const [stage, setStage] = useState(1);
  return (
    <figure className="trace-panel">
      <figcaption><strong>RelayForge</strong><span>Kafka outage replay</span></figcaption>
      <TraceDrawing stage={stage} />
      <div className="trace-controls" role="group" aria-label="Explore the recorded recovery test">
        {stages.map((item, i) => (
          <button key={item.label} type="button" aria-pressed={stage === i} onClick={() => setStage(i)}>{item.label}</button>
        ))}
      </div>
      <div className="trace-description" aria-live="polite">
        <strong>{stages[stage].title}</strong><p>{stages[stage].detail}</p>
      </div>
    </figure>
  );
}
