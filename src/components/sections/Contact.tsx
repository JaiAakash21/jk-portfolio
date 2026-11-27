"use client";

import { useRef, useState } from "react";
import { links, site } from "@/lib/site";

export default function Contact() {
  const [feedback, setFeedback] = useState("");
  const address = useRef<HTMLAnchorElement>(null);
  const mailto = links.email + "?subject=Internship%20opportunity";

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(site.email);
      setFeedback("Address copied.");
    } catch {
      if (address.current) {
        const range = document.createRange();
        range.selectNodeContents(address.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setFeedback("Select and copy the email address.");
    }
  }

  return (
    <section id="contact" className="contact-band" aria-labelledby="contact-title">
      <div className="shell contact-layout">
        <div>
          <h2 id="contact-title" className="display">Get in touch<span>.</span></h2>
          <p>Open to software and backend engineering internships.</p>
        </div>
        <div className="contact-address">
          <a ref={address} href={mailto} className="display">{site.email}</a>
          <div className="contact-actions">
            <a href={mailto}>Compose an email <span aria-hidden="true">↗</span></a>
            <button type="button" onClick={copyAddress}>Copy address</button>
            <a href={site.resumePath} download>Résumé ↓</a>
          </div>
          <p role="status">{feedback}</p>
        </div>
      </div>
    </section>
  );
}
