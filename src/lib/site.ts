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
  url: "https://www.jaiaakash.xyz",
  email: "jaiaakashs21@gmail.com",
  resumePath: "/JaiAakash_S_Resume.pdf",
  /** Short line used in <title>, OG and the JSON-LD description. */
  tagline: "Jai Aakash S is a computer science student in Chennai building event-driven systems with Java, Spring Boot, Kafka and FastAPI. Explore projects, engineering decisions and internship experience.",
  availability: "Open to Software / Backend Engineering internships",
} as const;

export const links = {
  github: "https://github.com/JaiAakash21",
  linkedin: "https://www.linkedin.com/in/jaiaakash21/",
  leetcode: "https://leetcode.com/u/jaiaakash21/",
  email: `mailto:${site.email}`,
} as const;

export const nav = [
  { label: "Work", href: "/#work", index: "01" },
  { label: "About", href: "/#about", index: "02" },
  { label: "Toolkit", href: "/#stack", index: "03" },
  { label: "Experience", href: "/#experience", index: "04" },
  { label: "Contact", href: "/#contact", index: "05" },
] as const;
