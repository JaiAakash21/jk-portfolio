import { site } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="section bio" aria-labelledby="about-title">
      <div className="shell bio-spread">
        <div className="bio-print">
          <h2 id="about-title">About me</h2>
          <span className="bio-monogram display" aria-hidden="true">JA</span>
          <span className="bio-location">Chennai, India</span>
        </div>
        <div className="bio-story">
          <p className="bio-lead display">My work starts with Java and Python.</p>
          <p>I study Computer Science and Engineering at Rajalakshmi Engineering College in Chennai.</p>
          <dl>
            <div><dt>Zenvic</dt><dd>I built incident analysis APIs and a postmortem tool that retrieves similar outages.</dd></div>
            <div><dt>Acentra finals</dt><dd>I worked on the handoff to human reviewers, from explaining a fraud flag to holding a discharge task for a clinician.</dd></div>
          </dl>
          <a className="text-action" href={site.resumePath} download>Download my résumé <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
