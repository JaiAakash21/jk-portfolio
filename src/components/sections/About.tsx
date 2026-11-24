import { site } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="section profile-section" aria-labelledby="about-title">
      <div className="shell profile-layout">
        <h2 className="display" id="about-title">About me</h2>
        <div>
          <p>I’m a Computer Science and Engineering student at Rajalakshmi Engineering College in Chennai. I work mostly in Java and Python.</p>
          <p>At Zenvic I built APIs for incident analysis and a postmortem tool that retrieves similar outages. At the Acentra finals I worked on the handoff between software and a human reviewer, from explaining a fraud flag to holding a discharge task for a clinician.</p>
          <a className="text-action" href={site.resumePath} download>Download my résumé</a>
        </div>
      </div>
    </section>
  );
}
