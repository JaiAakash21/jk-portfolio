"use client";

import Image from "next/image";
import { useState } from "react";

const stages = [
  { label: "Accepted", layer: "API", title: "Request accepted", detail: "The API returns HTTP 202 after committing the event and outbox row to PostgreSQL." },
  { label: "Pending", layer: "Outbox", title: "Kafka is offline", detail: "The outbox holds the event. Delivery stays pending and the receiver gets zero requests." },
  { label: "Delivered", layer: "Receiver", title: "Delivery resumes", detail: "Kafka restarts. The same event reaches the receiver, which records one HTTP 200." },
];

export default function DeliveryTrace() {
  const [stage, setStage] = useState(1);
  const selected = stages[stage];

  return (
    <figure className="trace-panel" data-stage={stage}>
      <figcaption><strong>RelayForge</strong><span>Kafka outage replay</span></figcaption>
      <div className="trace-scene" aria-hidden="true">
        <div className="trace-object">
          <Image src="/relayforge-assembly.webp" width={1050} height={1050} sizes="(max-width: 600px) 80vw, 425px" alt="" preload />
          <div className="trace-pin"><span>{selected.layer}</span></div>
        </div>
      </div>
      <div className="trace-controls" role="group" aria-label="Explore the recorded recovery test">
        {stages.map((item, i) => (
          <button key={item.label} type="button" aria-pressed={stage === i} onClick={() => setStage(i)}>{item.label}</button>
        ))}
      </div>
      <div className="trace-description" aria-live="polite">
        <strong>{selected.title}</strong><p>{selected.detail}</p>
      </div>
    </figure>
  );
}
