/** Tools used in project work, internships and integration tests. */
export const skillGroups = [
  { label: "Languages", items: ["Java", "Python", "SQL", "TypeScript", "JavaScript"] },
  { label: "Backend", items: ["Spring Boot", "FastAPI", "Pydantic", "SQLAlchemy", "Node.js", "Express"] },
  { label: "Data & messaging", items: ["PostgreSQL", "Apache Kafka", "Redis", "Firestore", "SQLite", "MySQL"] },
  { label: "Testing & delivery", items: ["Testcontainers", "JUnit", "pytest", "Playwright", "Docker", "GitHub Actions", "OpenTelemetry"] },
  { label: "Interfaces", items: ["React", "Next.js", "React Native", "IndexedDB", "Service workers"] },
];

export const internships = [
  {
    period: "Jun – Jul 2026",
    title: "Backend Development Intern",
    org: "Zenvic Software Solutions Pvt. Ltd.",
    detail: "Built FastAPI endpoints for incident intake, analysis and reporting, with Pydantic validation and SQLAlchemy persistence. Added a postmortem tool that retrieves similar incidents to help draft a report.",
    caseStudy: { title: "Inside InfraMind", href: "/work/inframind" },
  },
  {
    period: "Dec 2025",
    title: "Web Development Intern",
    org: "Zenvic Software Solutions Pvt. Ltd.",
    detail: "Built reusable React components for responsive pages and fixed rendering issues across browsers.",
  },
];

export const degree = {
  title: "B.E. Computer Science and Engineering",
  institution: "Rajalakshmi Engineering College, Chennai",
  period: "2024 – 2028",
  grade: "CGPA 9.17",
};

export const achievements = [
  {
    title: "Acentra hackathon finals",
    detail: "Built discharge follow-up workflows and integrated fraud scoring into a reviewer console.",
    projects: [
      { title: "CareBridge", href: "/work/carebridge" },
      { title: "FraudLens", href: "/work/fraudlens" },
    ],
  },
  {
    title: "AI Nexus Hackathon finalist",
    detail: "Presented an urban safety platform that uses incident hotspots in route planning.",
    projects: [{ title: "CrimeLens AI", href: "/work/crimelens-ai" }],
  },
];
