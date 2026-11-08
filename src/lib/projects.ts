/**
 * Project data.
 *
 * Every claim below is sourced from one of:
 *   - the repository README on github.com/JaiAakash21
 *   - Jai Aakash's CV
 *   - the previous portfolio at jaiaakash.xyz
 * Figures are reproduced only where the source states them, and are labelled
 * with the conditions the source gives (e.g. "in local testing").
 */

export type Plate =
  | "sync"      // offline queue / sync timeline
  | "grid"      // hotspot density grid
  | "incident"  // incident triage pipeline
  | "board"     // chess board + move vectors
  | "route"     // routing graph with fallback
  | "rules"     // rule engine -> score -> review
  | "vision"    // feature extraction / anomaly split
  | "tickets";  // RBAC ticket flow

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  year: string;
  /** One line. Shown in the index row and as the card subtitle. */
  summary: string;
  /** The failure case the project exists to handle. */
  problem: string;
  /** How it is built. */
  solution: string;
  /** What Jai Aakash specifically did. Honest about solo vs team work. */
  contribution: string;
  architecture: string[];
  decisions: { title: string; body: string }[];
  features: string[];
  stack: string[];
  plate: Plate;
  repo?: string;
  demo?: string;
  /** Shown when there is no public repository, so the absence is explained. */
  note?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "offline-first-notes",
    index: "01",
    title: "Offline-First Notes",
    kind: "PWA · Security",
    year: "2026",
    summary:
      "An installable notes app where every record is encrypted before it touches disk and every action survives losing the network.",
    problem:
      "Most web apps treat offline as an error state: the request fails, the spinner hangs, the work is lost. A note-taking tool is exactly the case where that is unacceptable — you write when you have a moment, not when you have bandwidth.",
    solution:
      "The app never writes to a server directly. Every create, update and delete is appended to an encrypted action queue in IndexedDB and applied to local state immediately. A service worker precaches the shell so the app opens instantly with no network at all. When connectivity returns — or when the Background Sync API fires the `sync-actions` tag — the queue is replayed in order, and version conflicts are surfaced to the user rather than silently resolved.",
    contribution:
      "Solo build: storage layer, encryption, service worker, sync engine, conflict resolver and UI.",
    architecture: [
      "UI reads and writes only to local encrypted stores",
      "Actions appended to an encrypted `actions` queue in IndexedDB",
      "Service worker precaches the shell and serves a fetch fallback",
      "Background Sync (`sync-actions`) replays the queue in order",
      "Per-item versioning detects conflicts against the remote base",
      "Conflict resolver offers Keep Mine / Keep Remote / Merge",
    ],
    decisions: [
      {
        title: "Encrypt before persisting, not after",
        body:
          "A passphrase derives a key via PBKDF2 against a stored salt; records are encrypted with AES-GCM before they are written. Only ciphertext blobs reach IndexedDB and decryption happens in memory, so a copied profile directory yields nothing readable.",
      },
      {
        title: "An action queue instead of last-write-wins",
        body:
          "Storing intent rather than final state means the replay is deterministic and auditable. It also makes undo/redo fall out of the same records, and gives the sync timeline something real to display.",
      },
      {
        title: "Make the sync visible",
        body:
          "Offline apps fail quietly. A sync timeline, a queue panel and a data-weight indicator turn invisible background behaviour into something the user can inspect and trust.",
      },
      {
        title: "Ship a simulator with the app",
        body:
          "A developer panel forces offline mode and injects latency, and the service worker honours those overrides. Offline behaviour that cannot be reproduced on demand does not get tested.",
      },
    ],
    features: [
      "Offline activity replay — record, queue, replay",
      "Sync timeline with step-by-step status",
      "Conflict resolver with a visual diff slider",
      "Local-only AES-GCM encrypted storage",
      "Client-side full-text search ranked by frequency, recency and interaction",
      "Offline notification scheduling via the service worker",
      "Sync simulator: force offline, simulate slow network, inspect the queue",
      "Storage-usage indicator with limit warnings",
    ],
    stack: ["JavaScript", "IndexedDB", "Service Workers", "Web Crypto API", "AES-GCM", "PBKDF2", "Background Sync", "PWA"],
    plate: "sync",
    repo: "https://github.com/JaiAakash21/Offline-First-App",
    demo: "https://offline-first-app-seven.vercel.app",
    featured: true,
  },
  {
    slug: "crimelens-ai",
    index: "02",
    title: "CrimeLens AI",
    kind: "Web + Mobile · AI",
    year: "2026",
    summary:
      "An urban-safety platform: citizens report incidents from mobile, a dashboard surfaces hotspots, and routing suggests ways around them.",
    problem:
      "Crime data tends to sit in reports nobody reads. The people who could act on it — a resident choosing a route home, an officer deciding where to patrol — have no interface to it at the moment the decision is made.",
    solution:
      "A FastAPI service backed by Supabase ingests incident reports and serves them to two clients: an Expo / React Native app for reporting on the move, and a Next.js dashboard for analysis. Reports are geocoded and clustered into hotspots, rendered on a map, and fed into OSRM routing so a suggested route can prefer lower-risk areas. Gemini assists with incident classification and report generation.",
    contribution:
      "Built as a hackathon project — AI Nexus Hackathon finalist. Contributed across the FastAPI backend (routers, services, Pydantic models, geo and pagination utilities) and the Next.js dashboard.",
    architecture: [
      "FastAPI backend — routers, services, Pydantic schemas, geo utilities",
      "Supabase for persistence and auth",
      "Expo / React Native app for citizen incident reporting",
      "Next.js dashboard for monitoring, trends and reports",
      "Google Maps for incident geography, OSRM for route planning",
      "Gemini for incident classification and report generation",
      "pytest test suite, ruff linting",
    ],
    decisions: [
      {
        title: "Two clients, one API",
        body:
          "Reporting happens on a phone in the street; analysis happens at a desk. Rather than compromise on one responsive web app, the backend serves a thin mobile client and a data-dense dashboard separately, with shared Pydantic schemas as the contract.",
      },
      {
        title: "Routing as the output, not the map",
        body:
          "A heatmap tells you where crime happened. A safer route tells you what to do about it. Wiring hotspot output into OSRM turns the analysis into an action.",
      },
      {
        title: "A monorepo with real boundaries",
        body:
          "`backend/`, `apps/dashboard`, `apps/mobile` and `packages/` keep the Python service and the two JavaScript clients independently runnable and testable rather than entangled.",
      },
    ],
    features: [
      "Real-time incident reporting with title, description, category and location",
      "Interactive crime map with geographic incident display",
      "Hotspot detection over areas of high incident concentration",
      "Safer-route planning via OSRM",
      "Admin dashboard for trends, analytical reports and user management",
    ],
    stack: ["Python", "FastAPI", "Supabase", "Next.js", "TypeScript", "React Native", "Expo", "Gemini", "OSRM", "pytest"],
    plate: "grid",
    repo: "https://github.com/JaiAakash21/crimelens-ai",
    featured: true,
  },
  {
    slug: "inframind",
    index: "03",
    title: "InfraMind",
    kind: "Internship · Backend",
    year: "2026",
    summary:
      "An AI-assisted infrastructure incident management system, built as a backend engineering intern at Zenvic Software Solutions.",
    problem:
      "Infrastructure incidents arrive faster than they can be triaged by hand, and the knowledge of how the last identical outage was fixed usually lives in someone's memory or a chat log nobody can search.",
    solution:
      "A FastAPI service exposing the incident lifecycle as a REST API: intake, AI-assisted root cause analysis, health monitoring, report generation and postmortems. An incident memory system indexes past incidents by keyword and field so that a new incident can be matched against similar historical ones, and an LLM-backed module drafts the postmortem from the incident record.",
    contribution:
      "Backend development intern. Built the backend services, the REST API surface, the AI-assisted postmortem module and the incident memory retrieval.",
    architecture: [
      "FastAPI service with Pydantic request/response models",
      "SQLite persistence",
      "10+ REST endpoints across incident management, RCA, reporting and health",
      "LLM integration with prompt engineering for postmortem drafting",
      "Keyword / field-based incident memory for retrieving similar past incidents",
    ],
    decisions: [
      {
        title: "Retrieval before generation",
        body:
          "A keyword and field-based memory over past incidents runs first, so the postmortem module drafts from precedent rather than from the model's priors alone.",
      },
      {
        title: "Pydantic as the API contract",
        body:
          "Typed schemas at every boundary meant the frontend could integrate against generated docs, and malformed incident payloads failed at the edge instead of inside the analysis pipeline.",
      },
    ],
    features: [
      "Incident management endpoints covering the full lifecycle",
      "AI-powered root cause analysis",
      "Automated report generation",
      "Health monitoring endpoints",
      "AI-assisted postmortem generation via LLM integration",
      "Incident memory retrieval over similar past incidents",
    ],
    stack: ["Python", "FastAPI", "SQLite", "Pydantic", "REST APIs", "LLM Integration", "Prompt Engineering", "Git"],
    plate: "incident",
    note: "Built during an internship at Zenvic Software Solutions Pvt. Ltd. The source is not public.",
    featured: true,
  },
  {
    slug: "checkmate",
    index: "04",
    title: "CheckMate",
    kind: "Real-time · Multiplayer",
    year: "2026",
    summary:
      "Real-time multiplayer chess. Two browsers, one authoritative game state, moves validated against the full rule set.",
    problem:
      "Multiplayer board games look simple until two clients disagree. Castling rights, en passant, promotion, threefold repetition — and both players need to see the same board within the span of a thought.",
    solution:
      "An Express + Socket.IO server owns the game state. Clients send intent, not state: a move is emitted, validated server-side through chess.js against the full rule set, and the resulting position is broadcast to both players. The React client renders from that broadcast, so the two boards cannot drift.",
    contribution: "Solo build: realtime server, game-state handling, and the React client.",
    architecture: [
      "Express + Socket.IO server holding authoritative game state",
      "chess.js for move generation and legality checks",
      "React 19 + Vite client rendering from server broadcasts",
      "Socket.IO rooms isolating concurrent games",
    ],
    decisions: [
      {
        title: "Server-authoritative moves",
        body:
          "Validating on the client is a race and an invitation to cheat. The client proposes; the server decides and broadcasts. Every board is a projection of one state.",
      },
      {
        title: "Use a proven rules engine",
        body:
          "chess.js covers the rule set — including the edge cases that take longer to get right than the rest of the app combined. Reimplementing it would have been effort spent on a solved problem.",
      },
      {
        title: "Tune the event path, not the renderer",
        body:
          "Move synchronisation latency was reduced to under 200 ms in local testing by optimising Socket.IO event handling rather than by making the board redraw faster.",
      },
    ],
    features: [
      "Real-time two-player games over WebSockets",
      "Full move validation and 20+ chess rules via chess.js",
      "Concurrent games via Socket.IO rooms",
      "Responsive board and game interface across desktop and mobile",
    ],
    stack: ["React 19", "Vite", "Node.js", "Express", "Socket.IO", "chess.js", "Tailwind CSS", "Framer Motion"],
    plate: "board",
    repo: "https://github.com/JaiAakash21/CheckMate",
    featured: true,
  },
  {
    slug: "road-sos",
    index: "05",
    title: "ROAD SAS",
    kind: "Mobile · Offline-first",
    year: "2026",
    summary:
      "Emergency navigation that keeps routing when coverage drops, falling back to on-device vector maps.",
    problem:
      "The moment you most need directions to the nearest hospital is often the moment you have no signal. A navigation app that requires the network has failed exactly when it mattered.",
    solution:
      "A Flutter app with a dual-mode mapping engine. Online, it pulls live tiles and traffic from Mapbox. Offline, it renders MBTiles vector maps stored on the device and routes against local JSON service data. Riverpod watches connectivity and rebuilds only the affected layers, so the switch between modes is a state change rather than a restart.",
    contribution: "Hackathon project. Contributed to the Flutter application and its offline mapping and routing paths.",
    architecture: [
      "Flutter + Dart, state managed with Riverpod",
      "flutter_map with Mapbox tiles when online",
      "MBTiles vector tiles rendered on-device when offline",
      "geolocator for continuous high-accuracy positioning",
      "sensors_plus reading accelerometer and gyroscope",
      "SQLite (sqflite) and shared_preferences for local data",
      "flutter_tts and telephony for voice and emergency contact",
    ],
    decisions: [
      {
        title: "Treat offline as a first-class mode",
        body:
          "Offline is not a degraded fallback bolted on at the end — the map renderer, the service directory and the routing all have an on-device implementation, so the UI is the same either way.",
      },
      {
        title: "Riverpod for connectivity transitions",
        body:
          "Connection state changes mid-journey. Scoping rebuilds to the affected widgets means markers and route overlays swap sources without tearing down the map.",
      },
    ],
    features: [
      "Hybrid online / offline operation",
      "Nearest hospitals, police, fire stations and tow services",
      "One-tap SOS that locks onto the closest service",
      "Route calculation in both modes",
      "High-contrast interface designed for use under stress",
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Mapbox", "MBTiles", "SQLite", "geolocator", "sensors_plus"],
    plate: "route",
    repo: "https://github.com/JaiAakash21/road-sos",
    featured: true,
  },
  {
    slug: "fraudlens",
    index: "06",
    title: "FraudLens",
    kind: "Hackathon · Fintech",
    year: "2026",
    summary:
      "Explainable, rule-based fraud detection with a human reviewer queue and an audit trail behind every score.",
    problem:
      "A fraud model that outputs 0.91 and nothing else cannot be acted on, argued with, or audited. Reviewers need to know which rule fired and why.",
    solution:
      "A FastAPI rule engine scores transactions against named rules. Each score carries the rules that produced it, so the output is a reason, not just a number. Flagged transactions route to a React reviewer queue, and every decision is written to an audit trail.",
    contribution: "Built for the Acentra 'Build to Care' hackathon as part of a team.",
    architecture: [
      "Transaction intake",
      "FastAPI rule engine evaluating named rules",
      "Risk score emitted with the contributing rule names",
      "React + TypeScript reviewer queue for flagged transactions",
      "Audit trail recording every decision",
    ],
    decisions: [
      {
        title: "Rules over an opaque model",
        body:
          "For a reviewer-facing tool, a named rule that a human can read and contest beats a marginally better score nobody can explain.",
      },
      {
        title: "A human in the loop by design",
        body:
          "The system routes rather than decides. Its output is a prioritised queue for a reviewer, which keeps the accountability where it belongs.",
      },
    ],
    features: [
      "Rule-based transaction risk scoring",
      "Every score traced back to named rules",
      "Reviewer queue for flagged transactions",
      "Audit trail of decisions",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    plate: "rules",
    repo: "https://github.com/JaiAakash21/acentra-Goodfellas",
    featured: false,
  },
  {
    slug: "industrial-defect-detection",
    index: "07",
    title: "Industrial Defect Detection",
    kind: "Computer Vision",
    year: "2026",
    summary:
      "An end-to-end inspection workflow: classify the view, detect the anomaly, show the heatmap, measure the result.",
    problem:
      "Manual visual inspection on a production line is slow, inconsistent between inspectors, and gives no record of why a part was rejected.",
    solution:
      "A pipeline built on the MANGO workflow platform. Images are validated and organised, classified by product view (bottom / side / top), then passed through a ResNet18 feature extractor into a Random Forest classifier that separates good from defective parts. Heatmaps visualise the regions behind a call, and a precision-recall curve with PR-AUC quantifies the model rather than relying on accuracy alone.",
    contribution: "Solo build: dataset preparation, the classification and anomaly stages, and the evaluation workflow.",
    architecture: [
      "Defect detection — dataset validation and preparation",
      "Image classification into bottom / side / top views",
      "ResNet18 pretrained backbone for feature extraction",
      "Random Forest classifier for good vs anomaly",
      "Heatmap generation over image regions",
      "Precision-recall analysis with PR-AUC",
    ],
    decisions: [
      {
        title: "Frozen backbone plus a classical classifier",
        body:
          "Deep features from a pretrained ResNet18 fed into a Random Forest trains in minutes on a modest dataset and avoids overfitting that end-to-end fine-tuning would invite at this scale.",
      },
      {
        title: "Report PR-AUC, not accuracy",
        body:
          "Defects are the minority class. Accuracy flatters a model that calls everything good; a precision-recall curve shows what it actually does on the class that matters.",
      },
      {
        title: "Classify the view before judging the part",
        body:
          "A defect that is obvious from the top is invisible from the side. Routing by view first means each anomaly decision is made against comparable images.",
      },
    ],
    features: [
      "Multi-class view classification",
      "Good vs anomaly detection",
      "Heatmap visualisation of image regions",
      "Precision-recall evaluation with PR-AUC",
      "End-to-end workflow execution on the MANGO platform",
    ],
    stack: ["Python", "PyTorch", "Torchvision", "scikit-learn", "NumPy", "Pillow", "Matplotlib", "MANGO"],
    plate: "vision",
    repo: "https://github.com/JaiAakash21/Industrial-Defect-Detection-Workflow",
    featured: false,
  },
  {
    slug: "campusfix",
    index: "08",
    title: "CampusFix",
    kind: "Full-stack · RBAC",
    year: "2026",
    summary:
      "A campus maintenance portal where students, staff and admins each see a different system through one API.",
    problem:
      "Campus maintenance requests get lost between a noticeboard, a WhatsApp group and whoever happens to be on duty. Nobody can see the status of their own request.",
    solution:
      "A PHP REST API over MySQL with role-based access control, serving a React SPA. Students report issues with category, priority and an image; staff work an assigned queue; admins assign tickets, manage users and export metrics. Security was treated as part of the build: CSRF tokens regenerated on authentication, prepared statements throughout, hardened `.htaccess`, and enforced HTTPS.",
    contribution: "Solo build: API, database schema, RBAC, the React client and the production deployment.",
    architecture: [
      "React 19 + Vite SPA with React Router 7",
      "PHP 8.2 REST API using PDO prepared statements",
      "MySQL / MariaDB (InnoDB)",
      "Role-based access control with protected routing",
      "Apache with .htaccess hardening and SPA deep-link rewriting",
    ],
    decisions: [
      {
        title: "RBAC at the API, not just the router",
        body:
          "Hiding a route in the client is a UI convenience. Every endpoint re-checks the role, so a crafted request from a student session cannot reach an admin action.",
      },
      {
        title: "Security hardening as a feature",
        body:
          "CSRF tokens regenerated on authentication, `SameSite=Lax` session cookies with reverse-proxy HTTPS detection, global JSON exception handling, and a production seed that creates categories only — never demo accounts.",
      },
    ],
    features: [
      "Students: report issues with category, priority and image; track status; comment",
      "Staff: assigned queue, status updates, resolution notes",
      "Admin: ticket assignment, user and category management, metrics, CSV export",
      "CSRF protection, prepared statements, HTTPS enforcement",
    ],
    stack: ["React 19", "Vite", "PHP 8.2", "MySQL", "Bootstrap 5", "Chart.js", "Apache"],
    plate: "tickets",
    repo: "https://github.com/JaiAakash21/Campusfix",
    demo: "https://campusfix.free.nf/",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Smaller builds, listed as an index rather than given full case studies. */
export const alsoBuilt = [
  {
    title: "Campus Energy Consumption Tracker",
    desc: "Energy monitoring with automated workflows, AI-assisted complaint analysis and API integration.",
    stack: "Zoho Creator",
    href: null,
    note: "No public repository",
  },
  {
    title: "Automated Web Security Scanner",
    desc: "CLI that checks HTTPS, six security headers and CORS behaviour for a URL, exporting JSON and CSV reports. Built for IBM SkillsBuild Cyber Security 2026.",
    stack: "Python",
    href: "https://github.com/JaiAakash21/automated-web-security-scanner",
    note: null,
  },
  {
    title: "Guess The Number",
    desc: "Browser game with instant feedback and best-attempt tracking. Written to practise DOM fundamentals.",
    stack: "HTML · CSS · JS",
    href: "https://guess-the-number-liart-six.vercel.app/",
    note: null,
  },
] as const;
