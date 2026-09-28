import { TechItem, ProjectCaseStudy, FreelanceService } from '../types';

export const PROFILE = {
  name: "Deepak Kumar",
  role: "IT Professional & Systems Freelancer",
  location: "Bangalore · Open to remote",
  status: "Available for freelance & engineering roles",
  version: "v2.4",
  systemStatus: "System online — portfolio v2.4",
  headline: "I build technology that solves real problems.",
  secondaryText: "IT professional and freelancer focused on software, AI, networking, automation, and practical digital solutions. I like understanding how things work, finding the weak point, and building a better way to solve it.",
  email: "hello@deepak.dev",
  github: "https://github.com/Deepakdudez",
  linkedin: "https://www.linkedin.com/in/deep4kkumar/",
  metrics: [
    { label: "systems shipped", value: "12+" },
    { label: "domains covered", value: "6" },
    { label: "verified evidence", value: "100%" }
  ],
  trustBadges: [
    "IT Background",
    "Full-Stack Dev",
    "AI / Automation",
    "Networking",
    "Cloud",
    "Systems Thinking"
  ],
  currentlyExploring: {
    title: "Currently exploring",
    description: "AI agents, RAG architectures, cloud systems and scalable app design.",
    items: [
      { name: "AI Agents", status: "Learning" },
      { name: "RAG", status: "Building" },
      { name: "Docker", status: "Working" },
      { name: "AWS", status: "Exploring" },
      { name: "System Design", status: "Learning" }
    ]
  },
  beliefs: [
    {
      title: "I learn fastest when I build.",
      desc: "Theory provides the map, but running code, debugging network packet drops, and seeing latency metrics reveals the actual terrain."
    },
    {
      title: "Technology makes more sense when you understand the problem first.",
      desc: "Never pick a tool or database just because it is trending. Start with constraints, throughput requirements, and the human user."
    },
    {
      title: "A good interface makes complicated systems feel simple.",
      desc: "Underneath might be distributed vector indices and packet analyzers, but the surface should be clear, deliberate, and calm."
    },
    {
      title: "I prefer practical engineering over unnecessary complexity.",
      desc: "A reliable monolithic architecture with automated backups beats a fragile microservice web every single time for early stage systems."
    }
  ],
  story: "I started with software development, then became increasingly interested in what happens underneath the application — networks, systems, infrastructure, and now AI. Rather than staying in a single isolated layer, I prefer connecting the dots: designing the UI, writing the API, architecting the database, securing the network boundary, and integrating AI models that actually stay grounded in verified data."
};

export const WHAT_I_BUILD_CATEGORIES = [
  {
    num: "01",
    title: "Web Applications",
    desc: "Responsive products with clean architecture and real auth, data, and deployment.",
    stack: "React · Next.js · Node · TypeScript",
    icon: "layout-dashboard"
  },
  {
    num: "02",
    title: "AI Systems",
    desc: "Assistants, RAG pipelines and agents grounded in your own verified data with strict guardrails.",
    stack: "RAG · Agents · Embeddings · pgvector",
    icon: "bot"
  },
  {
    num: "03",
    title: "Automation",
    desc: "Kill repetitive work with scripts, cron jobs, webhook handlers, and smart workflows.",
    stack: "Python · n8n · APIs · Bash",
    icon: "zap"
  },
  {
    num: "04",
    title: "Networking / Infra",
    desc: "Subnets, DNS, VPNs and troubleshooting that actually holds up under real load.",
    stack: "TCP/IP · Linux · Wireshark · Caddy",
    icon: "network"
  },
  {
    num: "05",
    title: "Cloud / DevOps",
    desc: "Dockerized builds shipped with repeatable CI/CD pipelines and observability.",
    stack: "Docker · CI/CD · AWS · Prometheus",
    icon: "cloud"
  },
  {
    num: "06",
    title: "Data / Analytics",
    desc: "Dashboards and metric collectors that explain what is happening and why.",
    stack: "Postgres · Grafana · Analytics",
    icon: "bar-chart-3"
  }
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "gridops",
    title: "GridOps — Support Intelligence",
    tagline: "Unified dashboard + AI triage grounded in live internal documentation",
    badge: "Solo build — design to deploy",
    category: "AI",
    stack: ["Next.js", "RAG", "pgvector", "Docker", "TypeScript", "FastAPI"],
    summaryProblem: "Support teams drown in tickets with zero context. Repetitive questions take up 65% of Tier-1 engineer time.",
    summarySolution: "Unified dashboard + AI triage grounded in docs with vector search and citations.",
    metrics: ["-42% initial triage time", "94% citation accuracy", "<220ms retrieval"],
    imageQuery: "dark tech support dashboard interface, black background, lime green charts and tickets, cinematic premium",
    problem: "Technical support teams at growing software products suffer from ticket fatigue. An internal audit revealed over 60% of submitted inquiries were already answered in internal knowledge bases, but engineers spent minutes searching through disparate Notion, GitHub Wiki, and Confluence docs for each incident.",
    context: "I built GridOps as an end-to-end support accelerator. It had to run in a private VPC so sensitive customer logs never left the infrastructure, while providing instant semantic answers to incoming queries with verifiable citations.",
    myRole: "Sole Architect & Developer. Designed the dark UI dashboard in Next.js, built the document ingestion pipeline in Python FastAPI, configured PostgreSQL with pgvector, and packaged everything into Docker Compose for single-command deployment.",
    architecture: {
      title: "RAG Triage Pipeline",
      description: "How user queries flow from the web UI to grounded verified responses",
      nodes: [
        { id: "1", name: "User / Agent", type: "client", description: "Support engineer views incoming ticket queue", tech: "Next.js UI", rationale: "Keyboard-driven fast triage interface" },
        { id: "2", name: "API Gateway", type: "service", description: "Authenticates requests and applies token bucket rate limits", tech: "FastAPI / Node", rationale: "Prevents LLM quota flooding" },
        { id: "3", name: "Input Guardrail", type: "ai", description: "Checks for prompt injection and internal secret exfiltration attempts", tech: "Regex + Guardrail classifier", rationale: "Mandatory security boundary" },
        { id: "4", name: "RAG Retriever", type: "ai", description: "Hybrid search: BM25 keywords + cosine vector similarity", tech: "pgvector & pg_trgm", rationale: "Pure vectors miss exact error codes like ERR_CONN_REFUSED" },
        { id: "5", name: "Vector DB", type: "database", description: "Embedded documentation chunks with metadata tags", tech: "PostgreSQL 16 + pgvector", rationale: "Keeps data self-hosted without external SaaS lock-in" },
        { id: "6", name: "LLM Synthesizer", type: "ai", description: "Builds answer restricted solely to retrieved context with citations", tech: "Self-hosted / OpenAI compatible API", rationale: "Zero hallucination guarantee" },
        { id: "7", name: "Output Guardrail", type: "service", description: "Verifies every statement links to an ingested source ID", tech: "JSON Schema Validator", rationale: "Ensures evidence-backed responses" }
      ]
    },
    technologies: [
      { name: "Next.js 14", role: "Frontend UI", why: "Server components reduce bundle size; provides clean API routes for proxying." },
      { name: "PostgreSQL + pgvector", role: "Vector & Relational Storage", why: "No need for a separate vector DB service like Pinecone when Postgres handles both ACID relations and high-speed vector indexes." },
      { name: "FastAPI (Python)", role: "Ingestion Worker", why: "Async support, native integration with chunking libraries and embedding models." },
      { name: "Docker", role: "Deployment Containerization", why: "Ensures reproducible environments between local dev and customer servers." }
    ],
    challenges: [
      {
        problem: "Context Chunk Boundary Loss: Code snippets and configuration blocks were getting chopped across chunk boundaries, making answers wrong.",
        resolution: "Implemented recursive markdown-aware chunking with 15% sliding window overlap and custom syntax preservation for code blocks."
      },
      {
        problem: "Acronym Blindness: When users searched for exact error strings like 'SSL_ST_INIT', dense semantic vectors ranked general SSL guides above the exact fix.",
        resolution: "Introduced Reciprocal Rank Fusion (RRF) combining dense cosine similarity with sparse BM25 keyword matching."
      }
    ],
    decisions: [
      {
        decision: "Self-hosted pgvector instead of Pinecone SaaS",
        alternativeRejected: "Pinecone / Weaviate Cloud",
        rationale: "Enterprise clients required on-premises data isolation where documentation never crosses third-party boundaries."
      },
      {
        decision: "Strict source citation requirement in LLM system prompt",
        alternativeRejected: "Freeform open synthesis",
        rationale: "Support agents need to click directly into the doc source before forwarding answers to paying customers."
      }
    ],
    lessons: [
      "Vector search is only 40% of a good RAG system; the other 60% is clean document preprocessing, metadata filtering, and output guardrails.",
      "Support teams value speed over verbosity — short, bulleted solutions with direct doc links are 10x more helpful than paragraph essays."
    ],
    futureImprovements: [
      "Add automated Slack bot webhook listener to suggest fixes directly within customer-facing incident channels.",
      "Implement automated feedback collection (thumbs up/down) that fine-tunes chunk reranking weights."
    ]
  },
  {
    id: "netmap",
    title: "NetMap — Home Lab Monitor",
    tagline: "Live topology mapping, sub-second latency alerts, and DNS insights for edge labs",
    badge: "Solo build — hardware to software",
    category: "Networking",
    stack: ["Python", "Linux", "TCP/IP", "Grafana", "Prometheus", "Go", "Docker"],
    summaryProblem: "Home networks and local labs fail silently and blindly. Diagnosis usually happens only after something crashes.",
    summarySolution: "Live topology mapping, ping jitter alerts, DNS sinkhole stats, and ARP auto-discovery.",
    metrics: ["<0.2% network overhead", "Sub-second failover alert", "Real-time topology"],
    imageQuery: "network topology visualization dark UI, glowing nodes and connection lines, premium tech aesthetic",
    problem: "When running self-hosted servers, micro-PCs, and smart home appliances on a local subnet, intermittent network degradation and DNS resolution dropouts often go unnoticed until a service becomes completely unreachable.",
    context: "I wanted a continuous, lightweight network watchdog that runs on a Raspberry Pi / low-power Linux box, constantly mapping device availability, latency spikes, and gateway route stability without flooding the Wi-Fi spectrum with noisy scans.",
    myRole: "Designed the architecture, wrote the daemon in Python/Go, built Prometheus metrics exporters, configured custom Grafana dashboards, and simulated network partitions to verify automated alerting.",
    architecture: {
      title: "Network Telemetry Flow",
      description: "Passive discovery to real-time visual telemetry",
      nodes: [
        { id: "1", name: "Local Subnet Devices", type: "infra", description: "Servers, IoT, laptops, router gateway", tech: "ARP / DHCP", rationale: "Target nodes to monitor" },
        { id: "2", name: "NetMap Daemon", type: "service", description: "Passive ARP snooping & async ICMP/DNS pings", tech: "Python / Scapy", rationale: "Maintains <0.2% traffic overhead" },
        { id: "3", name: "Prometheus Collector", type: "service", description: "Scrapes latency, packet loss, and jitter gauges", tech: "Prometheus TSDB", rationale: "Standard time-series database with retention policies" },
        { id: "4", name: "Grafana Visualization", type: "client", description: "Live dark-mode topology and latency heatmap", tech: "Grafana 10", rationale: "High contrast visual dashboard for instant incident detection" },
        { id: "5", name: "Alertmanager", type: "service", description: "Triggers webhook on >2% packet drop over 30s", tech: "Telegram Webhook / Pushover", rationale: "Immediate phone notification before user notices lag" }
      ]
    },
    technologies: [
      { name: "Python / Go", role: "Daemon Service", why: "Low memory footprint (<40MB RAM) for 24/7 background operation on ARM hardware." },
      { name: "Prometheus", role: "Time-series Store", why: "Efficient storage for high-frequency latency measurements." },
      { name: "Grafana", role: "Metrics UI", why: "Rich time-series graphing, customizable dark theme panels, and threshold alerts." },
      { name: "Linux / systemd", role: "Process Supervisor", why: "Automatic restart on fault and native journalctl logging." }
    ],
    challenges: [
      {
        problem: "Network Flooding: Naive active ICMP sweeps across 254 IP addresses every 5 seconds triggered packet loss on older IoT microcontrollers.",
        resolution: "Switched to passive kernel ARP table monitoring combined with staggered, jittered probes only targeting active leases."
      },
      {
        problem: "False Positives during Sleep States: Laptops entering sleep mode triggered spurious disconnect notifications.",
        resolution: "Added hysteresis: an alert only fires if a device misses 6 consecutive heartbeat probes over 90 seconds."
      }
    ],
    decisions: [
      {
        decision: "Prometheus + Grafana instead of building custom charting from scratch",
        alternativeRejected: "Custom web UI with Chart.js",
        rationale: "Grafana provides enterprise-grade alerting, threshold rules, and time-range scrubbing without reinventing time-series math."
      },
      {
        decision: "Single binary Go agent alongside Python scraper",
        alternativeRejected: "Heavy Electron desktop app",
        rationale: "Must run headlessly on headless edge devices with minimal CPU consumption."
      }
    ],
    lessons: [
      "Real-world networking is full of edge cases like asymmetric routing and Wi-Fi power-save modes that pure software developers rarely consider.",
      "Observability is only as good as the signal-to-noise ratio — alerting too frequently trains users to ignore alerts."
    ],
    futureImprovements: [
      "Add automated traceroute triggers that automatically fire when hop latency exceeds 50ms.",
      "Integrate speedtest-cli scheduling during low-utilization 3 AM windows."
    ]
  },
  {
    id: "flowdesk",
    title: "Flowdesk — Freelance OS",
    tagline: "Proposals, client onboarding, milestone invoices and delivery in one cohesive flow",
    badge: "Freelance client build",
    category: "Web Applications",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe Connect", "Tailwind CSS", "PDFKit"],
    summaryProblem: "Freelancers juggle 4-5 disconnected tools for proposals, contract signatures, time-tracking, and invoicing.",
    summarySolution: "One integrated platform: proposals become contracts, contracts become milestone invoices, with automated Stripe payouts.",
    metrics: ["100% automated milestone billing", "<3 min invoice creation", "Zero lost invoices"],
    imageQuery: "minimal freelance invoicing web app dark mode, elegant clean interface, lime accent",
    problem: "Freelance software engineers and IT consultants waste hours every week switching between Google Docs proposals, DocuSign contracts, Harvest timers, and Stripe dashboards, frequently leading to invoice discrepancies and payment delays.",
    context: "Commissioned by a freelance collective to build a consolidated operating system where a project progresses naturally from an agreed proposal to live deliverables and milestone-triggered payouts.",
    myRole: "Full-Stack Engineer. Built the React frontend, structured the PostgreSQL database schemas, implemented secure Stripe Connect webhooks, and created automated PDF invoice generation.",
    architecture: {
      title: "Proposal to Payout Flow",
      description: "Lifecycle of a freelance contract and payment release",
      nodes: [
        { id: "1", name: "Freelancer", type: "client", description: "Creates scope & milestone breakdown", tech: "React SPA", rationale: "Fast markdown-supported proposal builder" },
        { id: "2", name: "Client Portal", type: "client", description: "Client signs scope and approves deliverables", tech: "Tokenized public link", rationale: "Frictionless approval with no login required" },
        { id: "3", name: "Node API", type: "service", description: "Business logic, milestone state transitions", tech: "Node / Express / Prisma", rationale: "Type-safe database transactions" },
        { id: "4", name: "Postgres DB", type: "database", description: "Normalized relational model: Clients, Projects, Milestones, Invoices", tech: "PostgreSQL", rationale: "Strict foreign keys and atomic payment state" },
        { id: "5", name: "Stripe Connect", type: "service", description: "Credit card / ACH processing with automatic payouts", tech: "Stripe API & Webhooks", rationale: "Handles PCI compliance and automated deposit" },
        { id: "6", name: "PDF Generator", type: "service", description: "Creates compliant tax receipts and delivery certificates", tech: "PDFKit on Node worker", rationale: "Instant downloadable receipts for clients" }
      ]
    },
    technologies: [
      { name: "React + Vite", role: "Client App", why: "Instant page navigation and snappy optimistic UI updates." },
      { name: "Node.js / Express", role: "Backend API", why: "Fast JSON processing and rich ecosystem for Stripe and PDF generation." },
      { name: "PostgreSQL with Prisma", role: "Database", why: "Strong data integrity guarantees essential for financial records." },
      { name: "Tailwind CSS", role: "Styling", why: "Custom dark theme matching professional modern SaaS aesthetic." }
    ],
    challenges: [
      {
        problem: "Stripe Webhook Concurrency: When clients paid multi-milestone invoices simultaneously, duplicate event triggers risked double-crediting.",
        resolution: "Implemented idempotent webhook processing storing Stripe event IDs with database transaction locks."
      },
      {
        problem: "PDF Generation Performance: Server-side headless browsers (Puppeteer) consumed too much RAM on the low-tier VPS.",
        resolution: "Replaced Puppeteer with lightweight native streaming PDFKit, cutting memory footprint by 88% and generation time to 80ms."
      }
    ],
    decisions: [
      {
        decision: "Tokenized Magic Links for Client Approvals instead of requiring client user accounts",
        alternativeRejected: "Mandatory client signup with email/password",
        rationale: "Clients hated creating another password just to approve a milestone, causing approval delays."
      },
      {
        decision: "Single Postgres database with multi-tenant row level security",
        alternativeRejected: "Database-per-tenant architecture",
        rationale: "Significantly simpler migrations and backup administration for an early-stage product."
      }
    ],
    lessons: [
      "Reducing client friction directly correlates with how fast invoices get paid.",
      "Financial software requires defensive coding: every balance calculation must be handled in integer cents on the backend, never floating point."
    ],
    futureImprovements: [
      "Add automated recurring retainer contracts with monthly Stripe auto-charge.",
      "Integrate bank feed reconciliation via Plaid."
    ]
  }
];

export const TECHNICAL_DNA: TechItem[] = [
  // Frontend
  { name: "React", category: "Frontend", status: "Used in Projects", evidence: "Built GridOps, Flowdesk, and this interactive portfolio with custom state architectures and animations.", projects: ["GridOps", "Flowdesk", "Portfolio"], description: "Component lifecycle, custom hooks, performance tuning, and accessible component architectures." },
  { name: "Next.js", category: "Frontend", status: "Used in Projects", evidence: "Production deployment with App Router, server actions, and dynamic route handlers.", projects: ["GridOps"], description: "SSR, SSG, streaming responses, and edge caching." },
  { name: "TypeScript", category: "Frontend", status: "Used in Projects", evidence: "Strict type safety across full-stack applications with zero loose `any` casts.", projects: ["GridOps", "Flowdesk", "Portfolio"], description: "Generics, Discriminated Unions, Zod validation, and utility types." },
  { name: "Tailwind CSS", category: "Frontend", status: "Used in Projects", evidence: "Engineered complete design systems with custom palettes, CSS variables, and dark themes.", projects: ["GridOps", "Flowdesk", "Portfolio"], description: "Utility-first CSS, custom plugins, and responsive grid layouts." },
  { name: "Three.js / 3D", category: "Frontend", status: "Working Knowledge", evidence: "Interactive 3D technology ecosystem core, particle fields, and custom shaders.", projects: ["Portfolio 3D Core"], description: "Scene graphs, camera controls, materials, buffers, and requestAnimationFrame loops." },
  
  // Backend
  { name: "Node.js / Express", category: "Backend", status: "Used in Projects", evidence: "REST APIs, authentication middleware, Stripe webhook pipelines, and PDF generation.", projects: ["Flowdesk"], description: "Event loop, asynchronous streams, middleware architecture, and security hardening." },
  { name: "Python (FastAPI)", category: "Backend", status: "Used in Projects", evidence: "High-performance async API for document chunking, embeddings, and vector similarity search.", projects: ["GridOps"], description: "Pydantic validation, async/await, background tasks, and AI model orchestration." },
  { name: "Linux Bash Scripting", category: "Backend", status: "Used in Projects", evidence: "Automated backup cron jobs, log rotation, and server provisioning scripts.", projects: ["NetMap"], description: "Shell scripting, piping, process monitoring, and systemd service management." },
  { name: "Go", category: "Backend", status: "Working Knowledge", evidence: "Lightweight background daemons and network ping probes.", projects: ["NetMap Agent"], description: "Goroutines, channels, fast binary compilation, and low-latency systems.", learnedNext: "Deepening concurrent network socket handling." },

  // AI & RAG
  { name: "RAG Architecture", category: "AI", status: "Used in Projects", evidence: "Document ingestion, hybrid BM25 + dense retrieval, re-ranking, and citation generation.", projects: ["GridOps", "Ask Deepak's AI"], description: "Semantic search, chunking strategies, prompt guardrails, and context budgeting." },
  { name: "pgvector", category: "AI", status: "Used in Projects", evidence: "Self-hosted PostgreSQL vector index (HNSW / IVFFlat) handling thousands of doc chunks.", projects: ["GridOps"], description: "Vector distance metrics, cosine similarity queries, and combined relational joins." },
  { name: "AI Agents & Workflows", category: "AI", status: "Currently Learning", evidence: "Multi-step tool-use pipelines, planning loops, and state machines with LangGraph.", projects: ["Lab Experiments"], description: "Autonomous task execution, structured JSON outputs, and reflection patterns." },
  { name: "Prompt Security & Guardrails", category: "AI", status: "Used in Projects", evidence: "Layered protection against prompt injection, jailbreaks, and sensitive data leakage.", projects: ["Ask Deepak's AI", "GridOps"], description: "Input regex sanitization, output verification schemas, and confidence thresholding." },

  // Data
  { name: "PostgreSQL", category: "Data", status: "Used in Projects", evidence: "Relational modeling, indexing strategies, foreign key constraints, and ACID transactions.", projects: ["GridOps", "Flowdesk"], description: "Schema normalization, complex queries, connection pooling, and pgvector extension." },
  { name: "Redis", category: "Data", status: "Working Knowledge", evidence: "Rate limiting token buckets and session caching in Node APIs.", projects: ["Flowdesk"], description: "In-memory key-value data structures, pub/sub, and expiration policies." },
  { name: "Prometheus", category: "Data", status: "Used in Projects", evidence: "Metric scraping, PromQL queries, and time-series aggregation for edge infrastructure.", projects: ["NetMap"], description: "Counter, Gauge, and Histogram metrics, scrape configurations, and retention." },

  // Networking
  { name: "TCP/IP & Subnetting", category: "Networking", status: "Used in Projects", evidence: "Subnet calculations, VLAN isolation, routing tables, and gateway configurations.", projects: ["NetMap", "Home Lab"], description: "OSI layer model, packet framing, CIDR math, NAT, and port forwarding." },
  { name: "DNS & DHCP", category: "Networking", status: "Used in Projects", evidence: "Configured local Pi-hole sinkhole, authoritative DNS records, and split-horizon DNS.", projects: ["NetMap"], description: "A/AAAA, CNAME, MX, TXT records, propagation, and lease management." },
  { name: "Wireshark & Packet Analysis", category: "Networking", status: "Working Knowledge", evidence: "Diagnosing TCP handshake resets, DNS lookup delays, and TLS negotiation failures.", projects: ["NetMap"], description: "Packet sniffing, display filters, TCP stream reconstruction, and protocol debugging." },
  { name: "VPN / WireGuard", category: "Networking", status: "Used in Projects", evidence: "Encrypted point-to-point tunnels between remote development nodes and home lab servers.", projects: ["Home Lab"], description: "Public key cryptography, AllowedIPs routing, and split tunneling." },

  // Cloud & DevOps
  { name: "Docker & Compose", category: "Cloud", status: "Used in Projects", evidence: "Multi-stage builds, non-root users, volume persistence, and compose multi-container orchestration.", projects: ["GridOps", "NetMap", "Flowdesk"], description: "Container lifecycle, bridge networks, resource limits, and healthchecks." },
  { name: "CI/CD (GitHub Actions)", category: "Cloud", status: "Used in Projects", evidence: "Automated linting, TypeScript checking, test runners, and SSH deployment hooks.", projects: ["GridOps", "Portfolio"], description: "Workflow triggers, secrets management, matrix builds, and artifact caching." },
  { name: "AWS Fundamentals", category: "Cloud", status: "Currently Learning", evidence: "Deploying static assets to S3 + CloudFront, configuring EC2 instances with security groups.", projects: ["Cloud Lab"], description: "IAM policies, VPC subnets, S3 bucket policies, and CloudWatch logs.", learnedNext: "Terraform infrastructure as code." },
  { name: "Reverse Proxies (Caddy/Nginx)", category: "Cloud", status: "Used in Projects", evidence: "Automated Let's Encrypt SSL termination, header forwarding, and WebSocket proxying.", projects: ["GridOps", "NetMap"], description: "Caddyfile configuration, proxy buffers, CORS headers, and gzip compression." }
];

export const FREELANCE_SERVICES: FreelanceService[] = [
  {
    id: "web-dev",
    title: "Web Application Development",
    category: "Full-Stack Development",
    tagline: "Modern responsive web applications with rock-solid architecture and clean code",
    problem: "Outdated or buggy web software hurts conversion, frustrates users, and is impossible to maintain or scale without constant developer firefighting.",
    whatIBuild: [
      "Custom SaaS platforms and client management dashboards",
      "High-performance interactive marketing and portfolio sites",
      "Internal operations portals and admin tools",
      "API integrations with third-party payment and auth providers"
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    workflow: [
      { step: "01. Architecture & Wireframe", detail: "Review requirements, model database schema, map API contracts, and agree on visual prototypes." },
      { step: "02. Core Implementation", detail: "Build responsive frontend and robust backend in sprint milestones with live staging previews." },
      { step: "03. Testing & Hardening", detail: "Validate edge cases, mobile responsiveness, auth boundaries, and Lighthouse performance." },
      { step: "04. Handover & Deployment", detail: "Deploy to your cloud host, configure custom domains/SSL, and provide clean documentation." }
    ],
    deliverables: ["Full source code repository", "Dockerized deployment configuration", "API documentation & setup guide", "30 days post-launch support"],
    typicalTimeline: "2 – 6 weeks depending on project scope"
  },
  {
    id: "ai-integration",
    title: "AI & RAG System Integration",
    category: "Artificial Intelligence",
    tagline: "Turn your company's documents into an accurate, grounded AI assistant that doesn't hallucinate",
    problem: "Generic chatbots make up answers, leak sensitive company secrets, and offer zero citations, making them dangerous for real customer support.",
    whatIBuild: [
      "Internal knowledge base Q&A bots with verified citations",
      "Customer support triage assistants that draft verified responses",
      "Document summarization and automated data extraction pipelines",
      "Multi-layer security guardrails against prompt injection and data leaks"
    ],
    tech: ["Python", "pgvector / Vector DBs", "RAG Pipelines", "FastAPI", "Next.js"],
    workflow: [
      { step: "01. Document Auditing", detail: "Analyze existing docs, identify formats, define chunking strategy, and establish ground truth." },
      { step: "02. Pipeline & Vector DB", detail: "Build embedding ingestion pipeline with metadata tagging and hybrid BM25 search." },
      { step: "03. Guardrail Configuration", detail: "Implement strict prompt constraints, citation requirements, and hallucination detectors." },
      { step: "04. UI & Testing", detail: "Deliver a clean chat interface with clickable sources and test against edge-case queries." }
    ],
    deliverables: ["Ingestion pipeline script", "Configured vector database", "Frontend chat component / API", "Guardrail test suite report"],
    typicalTimeline: "2 – 4 weeks"
  },
  {
    id: "automation",
    title: "Workflow Automation & Scripting",
    category: "Automation",
    tagline: "Eliminate repetitive manual tasks and connect tools that refuse to talk to each other",
    problem: "Team members waste hours copying data between spreadsheets, CRMs, and email systems, leading to human error and delayed customer follow-ups.",
    whatIBuild: [
      "Automated data synchronization between webhooks, APIs, and databases",
      "Scheduled reporting scripts and PDF invoice generation",
      "Telegram/Slack alerting bots for critical system events",
      "Custom web scraping and monitoring pipelines"
    ],
    tech: ["Python", "Node.js", "Cron / systemd", "REST Webhooks", "Docker"],
    workflow: [
      { step: "01. Process Mapping", detail: "Deconstruct the repetitive workflow, map inputs, failure points, and data targets." },
      { step: "02. Script Engineering", detail: "Write resilient scripts with error handling, retries, and rate-limit compliance." },
      { step: "03. Deployment & Scheduling", detail: "Deploy to a lightweight server or cloud worker with automated health monitoring." },
      { step: "04. Logging & Verification", detail: "Establish audit logs and failure alerts so issues are caught immediately." }
    ],
    deliverables: ["Tested automation scripts", "Scheduling/service config", "Failover alert webhooks", "Operations documentation"],
    typicalTimeline: "1 – 2 weeks"
  },
  {
    id: "tech-support",
    title: "Technical Support Systems & Dashboards",
    category: "Systems & Infrastructure",
    tagline: "Observability dashboards and internal diagnostic tools to keep your services healthy",
    problem: "When servers or network links go down, teams find out from angry customer emails instead of automated diagnostic monitors.",
    whatIBuild: [
      "Custom Grafana & Prometheus monitoring dashboards",
      "Network status and service uptime pages",
      "Internal support ticketing triage interfaces",
      "Server log aggregator viewers and search tools"
    ],
    tech: ["Prometheus", "Grafana", "Linux", "Docker", "Python", "React"],
    workflow: [
      { step: "01. Telemetry Audit", detail: "Identify critical metrics: CPU, memory, HTTP response latency, and network error rates." },
      { step: "02. Exporter Setup", detail: "Install Prometheus exporters and configure metric collection intervals." },
      { step: "03. Dashboard Design", detail: "Build high-contrast visual panels with meaningful warning and critical thresholds." },
      { step: "04. Alert Routing", detail: "Connect notification webhooks to team Slack or email channels." }
    ],
    deliverables: ["Grafana dashboard JSON exports", "Prometheus configuration files", "Alerting rule definitions", "Incident response checklist"],
    typicalTimeline: "1 – 3 weeks"
  },
  {
    id: "prototype",
    title: "Rapid MVP & Prototype Development",
    category: "Product Engineering",
    tagline: "Turn an idea into a functional, investor-ready or customer-testable software product in record time",
    problem: "Founders spend months stuck in product design debates without getting a working product into users' hands to validate market demand.",
    whatIBuild: [
      "Functional Minimum Viable Products (MVPs) ready for first users",
      "Clickable interactive proof-of-concept prototypes",
      "Authentication, billing, and database infrastructure from day one",
      "Clean codebase ready to scale rather than throwaway spaghetti code"
    ],
    tech: ["React", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    workflow: [
      { step: "01. Scope Scoping", detail: "Cut unnecessary features to focus ruthlessly on the single core problem." },
      { step: "02. Build Sprint", detail: "Rapid execution with daily async progress updates and staging URLs." },
      { step: "03. User Acceptance", detail: "Verify end-to-end user journeys from signup to value delivery." },
      { step: "04. Launch", detail: "Go live with analytics and monitoring enabled." }
    ],
    deliverables: ["Deployable web app MVP", "Clean GitHub repository", "Database migrations", "Architecture roadmap for V2"],
    typicalTimeline: "3 – 5 weeks"
  },
  {
    id: "consultation",
    title: "Technical Architecture Consultation",
    category: "Consulting",
    tagline: "Architecture reviews, technology selection, and roadmapping before you write expensive code",
    problem: "Choosing the wrong database, hosting model, or software pattern early can cost thousands of dollars and months of refactoring later.",
    whatIBuild: [
      "Full architecture review and bottleneck diagnosis",
      "Technology stack recommendations tailored to your budget and scale",
      "Security and networking posture assessments",
      "Database schema and data flow optimization reports"
    ],
    tech: ["System Design", "Cloud Infrastructure", "Security Hardening", "Architecture Diagrams"],
    workflow: [
      { step: "01. Discovery Session", detail: "Deep dive into your current challenges, scale targets, and existing codebase." },
      { step: "02. Independent Analysis", detail: "Review schemas, infrastructure setups, and API bottlenecks." },
      { step: "03. Written Recommendations", detail: "Deliver a structured architecture report with trade-off matrices." },
      { step: "04. Q&A Walkthrough", detail: "Interactive session to walk your team through the proposed implementation plan." }
    ],
    deliverables: ["Written Architecture Review Document", "Interactive Diagram (Mermaid / SVG)", "Risk Matrix", "Recommended Action Plan"],
    typicalTimeline: "3 – 5 days"
  }
];

export const TIMELINE_EVENTS = [
  {
    year: "2024 – Present",
    title: "Freelance IT & Systems Engineer",
    category: "Freelancing",
    desc: "Partnering with startups, small businesses, and agencies to build resilient web applications, custom AI assistants with pgvector RAG pipelines, and automated support dashboards. Focus on systems that don't break.",
    highlight: "Shipped 12+ production client deliverables across web, automation, and AI."
  },
  {
    year: "2023 – 2024",
    title: "Systems & Support Engineering Internship",
    category: "Experience",
    desc: "Diagnosed edge network connectivity issues, monitored server infrastructure, maintained Linux hosts, and automated repetitive support ticket triaging using Python scripts and internal webhooks.",
    highlight: "Cut routine manual server check time by 70% with automated bash/cron watchdog."
  },
  {
    year: "2022 – 2023",
    title: "Technical Exploration — Networking, Linux & AI",
    category: "Exploration",
    desc: "Built a dedicated home lab running Linux hosts, configured subnets, VLANs, reverse proxies (Caddy/Nginx), and analyzed packet behaviors with Wireshark. Began experimenting with local LLMs, embeddings, and vector databases.",
    highlight: "Created NetMap to monitor real-time packet loss across 12 home lab devices."
  },
  {
    year: "2020 – 2024",
    title: "Bachelor of Technology in Information Technology",
    category: "Education",
    desc: "Comprehensive coursework in Operating Systems, Computer Networks, Database Management Systems, Data Structures & Algorithms, and Distributed Computing. Led final-year engineering project on decentralized data reliability.",
    highlight: "Graduated with strong foundation in core computer science and systems architecture."
  }
];

export const FAQS = [
  {
    question: "Who is Deepak Kumar?",
    answer: "Deepak Kumar is an IT professional and freelancer based in Bangalore (available for remote work globally). He focuses on full-stack web development, AI integrations (RAG, embeddings, guardrails), networking, systems infrastructure, and practical workflow automation.",
    category: "General",
    source: "profile.json"
  },
  {
    question: "What technologies does Deepak work with?",
    answer: "Deepak specializes in TypeScript, React, Next.js, and Node.js on the application layer; Python, FastAPI, and pgvector for AI and RAG systems; PostgreSQL, SQLite, and Redis for data; and Linux, Docker, TCP/IP, and Prometheus for systems and networking.",
    category: "Skills",
    source: "skills.json"
  },
  {
    question: "What is GridOps?",
    answer: "GridOps is a support intelligence application built by Deepak. It combines a Next.js dark-mode dashboard with a Python FastAPI RAG pipeline backed by PostgreSQL pgvector, cutting initial ticket triage time by 42% while providing verifiable citations for every answer.",
    category: "Projects",
    source: "projects/gridops.json"
  },
  {
    question: "What demonstrates Deepak's networking knowledge?",
    answer: "His NetMap project demonstrates practical networking: he implemented passive ARP inspection, sub-second async ICMP/DNS latency monitoring, and Prometheus/Grafana visualization with <0.2% network overhead. He also manages home lab subnets, WireGuard VPNs, and Linux server hosts.",
    category: "Networking",
    source: "projects/netmap.json"
  },
  {
    question: "What is Deepak currently learning?",
    answer: "Deepak is currently deepening his knowledge in autonomous AI agents and multi-agent orchestration frameworks (such as LangGraph), AWS cloud architecture (IAM, VPC, CloudWatch), and advanced distributed system design.",
    category: "Learning",
    source: "profile.json"
  },
  {
    question: "Can Deepak work on freelance projects?",
    answer: "Yes, Deepak is actively taking on freelance projects in Web Application Development, AI & RAG Integration, Workflow Automation, Technical Support Dashboards, and MVP builds. You can reach out via the contact form or email hello@deepak.dev.",
    category: "Freelance",
    source: "services.json"
  }
];
