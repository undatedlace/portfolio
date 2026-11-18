// Single source of truth for all site content. Edit here; components just render it.

export const profile = {
  name: "Ismail Shaikh",
  title: "Senior Full Stack Software Engineer",
  pitch:
    "Full stack engineer building web apps end to end: Node.js and NestJS backends, Angular and React frontends.",
  location: "Andheri, Mumbai",
  timeZone: "Asia/Kolkata",
  email: "shaikhismailinfo@gmail.com",
  linkedin: "https://www.linkedin.com/in/ismail-shaikh-339556287",
  github: "https://github.com/undatedlace",
  resumeFile: "resume.pdf",
  availability: "Open to opportunities",
  summary:
    "Full stack software engineer with 4+ years of experience across the stack: Node.js, Express.js and NestJS backends on PostgreSQL, MongoDB and Redis/BullMQ, and Angular, React and Ionic frontends. REST APIs, modular architecture, RBAC, third-party integrations and responsive, component-driven UI.",
};

export const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "4", label: "Product platforms" },
  { value: "10+", label: "Backend modules owned" },
  { value: "173", label: "API routes secured" },
];

export type Project = {
  name: string;
  /** Optional 2-letter thumbnail mark; defaults to the name initials. */
  mark?: string;
  tags: ("Backend" | "Full-stack" | "AI" | "Frontend")[];
  stack: string[];
  blurb: string;
  bullets: string[];
  link?: { label: string; href: string };
};

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  projects: { name: string; stack: string[]; bullets: string[] }[];
};

export const experience: Job[] = [
  {
    company: "Finoscale Solutions Private Limited",
    role: "Senior Software Engineer",
    period: "Apr 2025 – Aug 2026",
    location: "Mumbai, India",
    projects: [
      {
        name: "Credit Risk Platform",
        stack: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Socket.io", "SSE", "AWS S3/Textract", "OpenAI", "Puppeteer"],
        bullets: [
          "Built and owned 10+ backend modules in a modular Node.js/NestJS (Express.js) + PostgreSQL platform for lending clients, including third-party API integrations (Probe42, CreditSafe, OnGrid) and an MCA analysis engine; migrated scoring off MongoDB.",
          "Closed an API authorization gap where scope checks covered only 9 of ~173 key-reachable routes, using a deny-by-default global interceptor; built API-key management with hashed keys, rotation grace periods and org-level entitlements.",
          "Moved Puppeteer downloads off the REST API into Redis/BullMQ workers with snapshots, dedup, SSE progress and stall recovery.",
          "Built an OCR + LLM pipeline (S3, Textract, Tesseract, OpenAI) extracting structured data from CIBIL reports and financials.",
          "Set up the first formal API test framework for the backend (Jest, Supertest) with a Dockerised test database and provider mocks.",
        ],
      },
      {
        name: "SCIRISK ERP Platform",
        stack: ["Node.js", "NestJS", "MongoDB", "AWS S3", "Docker", "Nginx", "Angular", "Ionic", "PrimeNG"],
        bullets: [
          "Built Node.js/NestJS REST APIs and per-client MongoDB collections for a configurable form engine (12 field types, conditional fields).",
          "Built backend modules for onboarding, role-based access, Excel import, AR/AP reconciliation and credit-risk analytics.",
          "Containerised the frontend and backend with multi-stage Docker builds, serving the Angular app through Nginx.",
        ],
      },
      {
        name: "Fino Bank OS",
        stack: ["Node.js", "NestJS", "MongoDB", "Python (ReportLab, python-docx)", "AWS S3", "Angular", "Ionic", "PrimeNG"],
        bullets: [
          "Built a 5-level approval workflow with hashed single-use email links, and a real-time CAM edit lock (atomic update, SSE).",
          "Built CAM generation for A3/A4 PDF and Word, running Python (ReportLab, python-docx) from NestJS with S3 and pre-signed URLs.",
          "Built an Excel financials importer and ratio engine for audited and provisional periods.",
        ],
      },
    ],
  },
  {
    company: "63 Moons Technologies",
    role: "Frontend Developer",
    period: "May 2022 – Apr 2025",
    location: "Mumbai, India",
    projects: [
      {
        name: "Trading Platforms — Wave 2.0, Breeze, Aero",
        stack: ["Angular", "React", "React Native", "Ionic", "Angular Material", "HTML5", "CSS3", "JavaScript"],
        bullets: [
          "Built responsive UI screens and reusable component styles for high-traffic trading platforms across web and mobile.",
          "Maintained a shared UI style and component library used across multiple product lines, keeping the interface consistent.",
        ],
      },
    ],
  },
];

export const skills: { group: string; featured?: boolean; items: string[] }[] = [
  {
    group: "Backend",
    featured: true,
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Microservices", "JWT", "OAuth2", "RBAC", "API Security", "Data Validation", "Third-Party API Integrations", "BullMQ", "Async Processing", "Webhooks", "WebSockets (Socket.io)", "SSE"],
  },
  { group: "Frontend", featured: true, items: ["Angular", "React", "React Native", "Redux Toolkit (RTK)", "TanStack Query", "Ionic", "RxJS", "PrimeNG", "Tailwind CSS"] },
  { group: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "SQL", "Python", "HTML5", "CSS3"] },
  { group: "Databases", items: ["PostgreSQL (TypeORM, Prisma)", "MongoDB (Mongoose)", "Redis", "Schema Design", "Indexing", "Query Tuning", "Transactions", "Caching"] },
  { group: "Cloud & DevOps", items: ["AWS (EC2, S3, IAM)", "Cloudflare", "Docker", "Nginx", "CI/CD (GitHub Actions, Azure Pipelines)", "Git"] },
  { group: "AI / Generative AI", items: ["OpenAI GPT-4.1/GPT-5", "LLM Integration", "AWS Textract", "Tesseract OCR", "Puppeteer", "Python (ReportLab, python-docx)"] },
  { group: "Testing & Other", items: ["Jest", "Supertest", "Unit & Integration Testing", "Swagger", "SOLID Principles", "Clean Architecture", "Agile/Scrum"] },
];

export const projects: Project[] = [
  {
    name: "School ERP — Hera English School",
    mark: "SC",
    tags: ["Full-stack"],
    stack: ["NestJS", "Angular", "PostgreSQL", "Prisma", "Tailwind CSS", "React Native (Expo)", "AWS S3", "Docker", "Python OCR"],
    blurb: "Web ERP and Android/iOS app for a school of about 250 users: admissions, fees, attendance, results and a parent and student portal, on a NestJS + PostgreSQL backend with an Angular frontend.",
    bullets: [
      "Multi-user, multi-role access with role-based configuration and permissions across web and mobile. Server-side sessions in httpOnly cookies, with scope checks so teachers and parents only reach their own classes and children.",
      "Config-driven forms: JSON schemas rendered dynamically, versioned so changing a form never rewrites old applications.",
      "An OCR service that prefills admissions from paper forms.",
      "Fee ledger with append-only payments and reversals, sequential receipt numbers and row locks against double payments. Balances are calculated, never stored.",
      "Validated Excel imports and hardened uploads (file types judged from the bytes, metadata-stripped photos, structurally checked PDFs, S3-compatible storage).",
      "One API serves the Angular web app and the React Native (Expo) app. Built so it can grow into multi-school.",
    ],
    link: { label: "GitHub", href: "https://github.com/undatedlace/SCHOOL-ERP" },
  },
  {
    name: "Credit Risk Platform",
    tags: ["Backend", "AI"],
    stack: ["NestJS", "PostgreSQL", "Redis/BullMQ", "OpenAI", "Textract"],
    blurb: "Modular NestJS + PostgreSQL platform with third-party data integrations, an OCR + LLM extraction pipeline and a deny-by-default API security layer.",
    bullets: [
      "10+ backend modules; Probe42, CreditSafe and OnGrid integrations; MCA analysis engine.",
      "Deny-by-default interceptor closing a 9-of-~173 route authorization gap.",
      "BullMQ workers for heavy Puppeteer jobs, with SSE progress and stall recovery.",
    ],
  },
  {
    name: "SCIRISK ERP Platform",
    mark: "SR",
    tags: ["Full-stack"],
    stack: ["NestJS", "MongoDB", "Angular", "Ionic", "Docker", "Nginx"],
    blurb: "Configurable ERP with a dynamic form engine, onboarding, RBAC, Excel import and reconciliation, built on NestJS APIs with an Angular/Ionic client.",
    bullets: [
      "Form engine with 12 field types and conditional fields, stored per client.",
      "Multi-stage Docker builds with the Angular app served through Nginx.",
    ],
  },
  {
    name: "Fino Bank OS",
    tags: ["Full-stack"],
    stack: ["NestJS", "MongoDB", "Python", "AWS S3", "Angular"],
    blurb: "Approval-workflow platform with a 5-level approval chain and automated PDF/Word memo generation.",
    bullets: [
      "Hashed single-use email approval links; real-time CAM edit lock via atomic update + SSE.",
      "A3/A4 PDF and Word CAM generation with S3 pre-signed URLs; financial ratio engine.",
    ],
  },
  {
    name: "Donation Receipt System — SDI Education Center",
    tags: ["Full-stack"],
    stack: ["NestJS", "MongoDB Atlas", "PDFKit", "AWS S3", "Render", "React Native"],
    blurb: "REST API and React Native app for a charitable education centre, live with real users. Generates branded PDF receipts and shares them with donors over WhatsApp.",
    bullets: [
      "Branded PDF receipts via PDFKit, stored in S3.",
      "WhatsApp deep links to share receipts with donors.",
    ],
  },
  {
    name: "Trading Platforms — Wave 2.0, Breeze, Aero",
    tags: ["Frontend"],
    stack: ["Angular", "React", "React Native", "Ionic", "Angular Material"],
    blurb: "Responsive UI for high-traffic trading platforms across web and mobile, plus a shared component library.",
    bullets: [
      "Reusable component styles used across multiple product lines.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Yashwantrao Chavan Maharashtra Open University (YCMOU) · Sailee Degree College, Borivali, Mumbai",
    period: "Graduated August 2025",
  },
  {
    degree: "Diploma in Information Technology",
    school: "Vidyalankar Polytechnic, Mumbai",
    period: "",
  },
];

export const tabs = [
  { id: "about", label: "About", num: "01" },
  { id: "resume", label: "Resume", num: "02" },
  { id: "portfolio", label: "Portfolio", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
] as const;
export type TabId = (typeof tabs)[number]["id"];

export const headline = "I build full-stack products, from NestJS APIs to Angular and React interfaces.";

export const focus = [
  {
    icon: "server",
    title: "Backend & APIs",
    text: "Modular NestJS / Express services on PostgreSQL and MongoDB, with third-party integrations and clean, tested REST APIs.",
    tag: "10+ modules owned",
  },
  {
    icon: "monitor",
    title: "Frontend apps",
    text: "Responsive Angular, React and Ionic interfaces with PrimeNG, Tailwind and Redux Toolkit, plus shared component libraries.",
    tag: "Angular · React · Ionic",
  },
  {
    icon: "shield",
    title: "Security & async work",
    text: "Deny-by-default authorization, RBAC and hashed API keys, with BullMQ / Redis workers and live SSE progress for heavy jobs.",
    tag: "173 routes secured · BullMQ",
  },
  {
    icon: "sparkles",
    title: "AI document pipelines",
    text: "OCR + LLM extraction from documents and financial statements using S3, Textract, Tesseract and OpenAI.",
    tag: "Textract · OpenAI",
  },
];
