/** Skills, experience, education and interests. Sourced from the CV and repositories. */

export type SkillGroup = {
  id: string;
  label: string;
  /** Honest framing — "shipped" means used in a project that exists. */
  items: { name: string; level: "core" | "working" | "learning" }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Python", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "Java", level: "core" },
      { name: "SQL", level: "working" },
      { name: "C++", level: "working" },
      { name: "Dart", level: "working" },
      { name: "PHP", level: "working" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Spring Boot", level: "core" },
      { name: "FastAPI", level: "core" },
      { name: "REST API design", level: "core" },
      { name: "Pydantic", level: "core" },
      { name: "JWT auth", level: "core" },
      { name: "Spring Security", level: "working" },
      { name: "Spring Data JPA", level: "working" },
      { name: "Apache Kafka", level: "working" },
      { name: "Redis", level: "working" },
      { name: "Node.js", level: "working" },
      { name: "Express", level: "working" },
      { name: "Socket.IO", level: "working" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", level: "core" },
      { name: "Next.js", level: "core" },
      { name: "Tailwind CSS", level: "core" },
      { name: "HTML / CSS", level: "core" },
      { name: "PWA / Service Workers", level: "working" },
      { name: "Flutter", level: "working" },
      { name: "Expo", level: "working" },
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      { name: "PostgreSQL", level: "core" },
      { name: "SQLite", level: "core" },
      { name: "SQL schema design", level: "core" },
      { name: "Flyway migrations", level: "working" },
      { name: "MySQL", level: "working" },
      { name: "IndexedDB", level: "working" },
      { name: "Supabase", level: "working" },
      { name: "MongoDB", level: "learning" },
    ],
  },
  {
    id: "aiml",
    label: "AI / ML",
    items: [
      { name: "PyTorch", level: "working" },
      { name: "scikit-learn", level: "working" },
      { name: "OpenCV", level: "working" },
      { name: "Computer vision", level: "working" },
      { name: "LLM integration", level: "working" },
      { name: "Prompt engineering", level: "working" },
      { name: "TensorFlow", level: "learning" },
    ],
  },
  {
    id: "tools",
    label: "Tools & platforms",
    items: [
      { name: "Git / GitHub", level: "core" },
      { name: "Docker / Compose", level: "core" },
      { name: "Postman", level: "core" },
      { name: "GitHub Actions", level: "working" },
      { name: "Vercel", level: "working" },
      { name: "Render", level: "working" },
      { name: "Mapbox", level: "working" },
    ],
  },
  {
    id: "ops",
    label: "Reliability & observability",
    items: [
      { name: "Testcontainers", level: "working" },
      { name: "JUnit 5", level: "working" },
      { name: "pytest", level: "working" },
      { name: "Playwright", level: "working" },
      { name: "Prometheus", level: "working" },
      { name: "Grafana", level: "working" },
      { name: "OpenTelemetry", level: "working" },
      { name: "k6 load testing", level: "learning" },
    ],
  },
  {
    id: "cs",
    label: "Computer science",
    items: [
      { name: "Data structures & algorithms", level: "core" },
      { name: "OOP", level: "core" },
      { name: "Concurrency control", level: "working" },
      { name: "Distributed systems", level: "working" },
      { name: "DBMS", level: "working" },
      { name: "Operating systems", level: "working" },
      { name: "Computer networks", level: "working" },
      { name: "System design", level: "working" },
    ],
  },
];

export const levelCopy: Record<"core" | "working" | "learning", string> = {
  core: "Used across multiple shipped projects",
  working: "Used in at least one shipped project",
  learning: "Currently learning",
};

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
      "Built backend services for InfraMind, an AI-driven infrastructure incident management platform, automating incident analysis and reducing manual triage effort by approximately 65%.",
      "Designed and implemented 10+ REST APIs covering incident management, AI-powered root cause analysis, report generation and health monitoring.",
      "Built an AI-assisted postmortem generation module using LLM integration and prompt engineering, plus a keyword/field-based incident memory that retrieved similar past incidents — cutting documentation time by approximately 70%.",
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
    title: "RelayForge — 234 automated tests, green from a clean build",
    detail:
      "180 unit, 33 Testcontainers integration and 21 Playwright end-to-end tests over a multi-tenant webhook delivery platform. Thirteen real defects were found by running the system rather than reading it.",
  },
  {
    title: "AI Nexus Hackathon — Finalist",
    detail: "Presented CrimeLens AI, a platform for predictive urban safety and crime intelligence.",
  },
  {
    title: "250+ DSA problems solved",
    detail: "Across LeetCode, GeeksforGeeks and HackerRank — arrays, strings, trees, graphs and dynamic programming.",
  },
  {
    title: "School First in Class XI",
    detail: "Ranked School Third in Class XII.",
  },
];

export const beyondCode = [
  { title: "Chess", detail: "The reason CheckMate exists. Openings are just cached search." },
  { title: "Rubik's cube", detail: "Algorithms you execute with your hands." },
  { title: "Competitive problem solving", detail: "A standing habit rather than a sprint — 250+ problems so far." },
  { title: "Reading systems write-ups", detail: "Postmortems and architecture decision records, mostly." },
];

/** Current focus. Kept short and updated by hand. */
export const nowFocus = [
  "Load-testing RelayForge with k6 and publishing the numbers rather than estimating them",
  "Distributed-systems fundamentals — idempotency, backpressure, consensus",
  "Turning hackathon builds into production-grade repositories",
  "Daily DSA practice",
  "First open-source contributions",
];
