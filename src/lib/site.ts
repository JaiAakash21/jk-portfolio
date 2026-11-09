/**
 * Single source of truth for personal data.
 * Every value here is verified against the CV, the live GitHub repositories,
 * or jaiaakash.xyz. Nothing is invented.
 */

export const site = {
  name: "Jai Aakash S",
  shortName: "Jai Aakash",
  wordmark: "JA",
  role: "Backend & Full-Stack Engineer",
  location: "Chennai, India",
  url: "https://jaiaakash.xyz",
  email: "jaiaakashs21@gmail.com",
  resumePath: "/JaiAakash_S_Resume.pdf",
  /** Short line used in <title>, OG and the JSON-LD description. */
  tagline: "Computer Science student building backends, delivery pipelines and offline-first systems that keep working when the network does not.",
  availability: "Open to Software / Backend Engineering internships",
} as const;

export const links = {
  github: "https://github.com/JaiAakash21",
  linkedin: "https://www.linkedin.com/in/jaiaakash21/",
  leetcode: "https://leetcode.com/u/jaiaakash21/",
  email: `mailto:${site.email}`,
} as const;

export const nav = [
  { label: "About", href: "/#about", index: "01" },
  { label: "Work", href: "/#work", index: "02" },
  { label: "Stack", href: "/#stack", index: "03" },
  { label: "Experience", href: "/#experience", index: "04" },
  { label: "Contact", href: "/#contact", index: "05" },
] as const;
