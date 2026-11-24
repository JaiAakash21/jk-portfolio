/** Tools used in project work, internships and integration tests. */
export const skillGroups = [
  { label: "Languages", items: ["Java", "Python", "SQL", "TypeScript", "JavaScript"] },
  { label: "Backend", items: ["Spring Boot", "FastAPI", "Pydantic", "SQLAlchemy", "Node.js", "Express"] },
  { label: "Data & messaging", items: ["PostgreSQL", "Apache Kafka", "Redis", "Firestore", "SQLite", "MySQL"] },
  { label: "Testing & delivery", items: ["Testcontainers", "JUnit", "pytest", "Playwright", "Docker", "GitHub Actions", "OpenTelemetry"] },
  { label: "Interfaces", items: ["React", "Next.js", "React Native", "IndexedDB", "Service workers"] },
];

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "education";
  detail: string[];
  stack?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: "Jun – Jul 2026",
    title: "Backend Development Intern",
    org: "Zenvic Software Solutions Pvt. Ltd.",
    kind: "work",
    detail: [
      "Built FastAPI endpoints for incident intake, root cause analysis, reporting and health checks. Used Pydantic for validation and SQLAlchemy with SQLite for persistence.",
      "Built an LLM-assisted postmortem generator that retrieves similar past incidents using keyword and field matching.",
    ],
    stack: ["Python", "FastAPI", "SQLite", "Pydantic", "REST APIs", "Git"],
  },
  {
    period: "Dec 2025",
    title: "Web Development Intern",
    org: "Zenvic Software Solutions Pvt. Ltd.",
    kind: "work",
    detail: [
      "Developed responsive pages and reusable UI components, improving consistency across desktop and mobile.",
      "Built interactive frontend modules and resolved cross-browser compatibility issues.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    period: "2024 – 2028",
    title: "B.E. Computer Science and Engineering",
    org: "Rajalakshmi Engineering College, Chennai",
    kind: "education",
    detail: ["CGPA 9.17"],
  },
  {
    period: "2024",
    title: "Higher Secondary (Class XII)",
    org: "Raj Matriculation Hr. Sec. School",
    kind: "education",
    detail: ["91.67% — ranked School Third"],
  },
  {
    period: "2022",
    title: "SSLC (Class X)",
    org: "Raj Matriculation Hr. Sec. School",
    kind: "education",
    detail: ["89%"],
  },
];

export const achievements = [
  {
    title: "AI Nexus Hackathon — Finalist",
    detail: "Presented CrimeLens AI, a platform for predictive urban safety and crime intelligence.",
  },
  {
    title: "Acentra hackathon finals",
    detail: "Contributed backend workflows for CareBridge and integrated explainable risk scoring into FraudLens.",
  },
  {
    title: "School First in Class XI",
    detail: "Ranked School Third in Class XII.",
  },
];

export const beyondCode = [
  { title: "Chess", detail: "The reason CheckMate exists. Openings are just cached search." },
  { title: "Rubik's cube", detail: "Algorithms you execute with your hands." },
  { title: "Competitive problem solving", detail: "I practise data structures and algorithms in Java." },
  { title: "Reading systems write-ups", detail: "Postmortems and architecture decision records, mostly." },
];
