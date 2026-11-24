import Link from "next/link";
import DeliveryTrace from "../DeliveryTrace";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="hero" className="shell portfolio-intro" aria-labelledby="intro-name">
      <div className="intro-copy">
        <p className="intro-role">Backend engineer <span aria-hidden="true">/</span> Chennai, India</p>
        <h1 id="intro-name" className="display">Jai <em>Aakash</em> S<span>.</span></h1>
        <p className="intro-summary">I build APIs in Java and Python. On RelayForge, I tested what happens to a webhook when its message broker goes offline.</p>
        <div className="intro-actions">
          <Link className="primary-action" href="/#work">Explore my work</Link>
          <a className="text-action" href={site.resumePath} download>Download résumé</a>
        </div>
        <p className="intro-availability">Open to backend and software engineering internships</p>
      </div>
      <DeliveryTrace />
    </section>
  );
}
