import { TechItem, ProjectCaseStudy, FreelanceService } from '../types';

export const PROFILE = {
  name: "Deepak Kumar N",
  role: "Software Engineer | Full Stack & AI Systems",
  location: "Coimbatore, Tamil Nadu, India · Open to Remote",
  status: "Available for Full-Time Roles & Systems Engineering",
  version: "v2.5",
  systemStatus: "System online — B.Tech IT '26 · Verified",
  headline: "Engineering Full-Stack Web & Agentic AI Systems.",
  secondaryText: "Final-year B.Tech Information Technology student (CGPA: 7.50 / 10.0) at Sri Krishna College of Engineering and Technology. Experienced in Java, Spring Boot, React.js, and RESTful APIs, with hands-on development in LLM-powered agentic applications, AWS cloud architectures, and decentralized solar microgrids.",
  email: "deepak.nithyananthan@gmail.com",
  phone: "+91 9360675434",
  github: "https://github.com/Deepakdudez",
  linkedin: "https://www.linkedin.com/in/deep4kkumar/",
  education: [
    {
      degree: "Bachelor of Technology, Information Technology",
      institution: "Sri Krishna College of Engineering and Technology, Coimbatore, Tamil Nadu",
      duration: "2022 – 2026",
      score: "CGPA: 7.50 / 10.0",
      details: "Specialization in Full Stack Development, Cloud Architecture, AI Systems, Distributed Computing, and Database Systems."
    },
    {
      degree: "Intermediate College (Higher Secondary)",
      institution: "Kids Club Matriculation Higher Secondary School, Tiruppur, Tamil Nadu",
      duration: "2021 – 2022",
      score: "Percentage: 76%",
      details: "Higher secondary education with core focus in Mathematics, Physics, Chemistry, and Computer Science."
    }
  ],
  certifications: [
    { name: "AWS Academy Cloud Foundations", issuer: "AWS Academy", status: "Graduate" },
    { name: "Generative AI Mastermind", issuer: "Outskill", status: "Certified" },
    { name: "Java Training", issuer: "IIT Bombay (Spoken Tutorial)", status: "Completed" },
    { name: "Java for Beginners", issuer: "Infosys", status: "Certified" },
    { name: "SQL Standard", issuer: "Skill Rack", status: "Certified" },
    { name: "CCNA (Training)", issuer: "Cisco", status: "Completed" }
  ],
  metrics: [
    { label: "Academic CGPA", value: "7.50" },
    { label: "Graduation Year", value: "2026" },
    { label: "Certifications", value: "6" }
  ],
  trustBadges: [
    "B.Tech IT (2022–2026)",
    "SKCET Coimbatore",
    "Altitudes Intern '25",
    "AWS Academy Certified",
    "IIT Bombay Java",
    "Agentic AI & LLMs"
  ],
  currentlyExploring: {
    title: "Currently exploring",
    description: "Agentic AI workflows, AWS cloud infrastructure orchestration, ICP blockchain smart contracts, and microservices architecture.",
    items: [
      { name: "Agentic AI", status: "Active Building" },
      { name: "AWS (EC2/S3/Lambda)", status: "Certified / Hands-on" },
      { name: "Spring Boot Microservices", status: "Core Stack" },
      { name: "ICP Blockchain", status: "Shipped Live" },
      { name: "Power BI & SQL Analytics", status: "Production Ready" }
    ]
  },
  beliefs: [
    {
      title: "I learn fastest when I build real systems.",
      desc: "Theory provides the map, but writing code, deploying cloud architectures, connecting REST APIs, and observing real performance reveals the actual terrain."
    },
    {
      title: "Technology makes more sense when you understand the problem first.",
      desc: "Never pick a framework or tool just because it is trending. Start with constraints, throughput requirements, and the real end-user workflow."
    },
    {
      title: "A good interface makes complicated systems feel simple.",
      desc: "Underneath might be multi-step LLM agent pipelines, distributed blockchain nodes, and Spring Boot REST services, but the surface should be clear, deliberate, and calm."
    },
    {
      title: "I prefer practical engineering over unnecessary complexity.",
      desc: "A clean, modular architecture with structured REST APIs and automated deployment beats brittle, over-engineered complexity every time."
    }
  ],
  story: "I am a final-year B.Tech Information Technology student at Sri Krishna College of Engineering and Technology (CGPA: 7.50 / 10.0). I combine strong backend foundations in Java, Spring Boot, and RESTful APIs with modern frontend craft in React.js and cutting-edge work in Agentic AI and Cloud infrastructure. During my internship at Altitudes (Jun 2025 – Jul 2025), I engineered a system that translates natural language prompts into complete AWS cloud architecture diagrams. I have also designed and shipped a decentralized solar microgrid on the ICP blockchain and enterprise sales business intelligence dashboards using advanced SQL and Power BI."
};

export const WHAT_I_BUILD_CATEGORIES = [
  {
    num: "01",
    title: "Agentic AI Systems",
    desc: "Multi-agent pipelines, prompt engineering, and LLMs that automate cloud architecture design and complex workflows.",
    stack: "React.js · Spring Boot · LLMs · AWS",
    icon: "bot"
  },
  {
    num: "02",
    title: "Full-Stack Web Apps",
    desc: "Robust applications with React frontends, Spring Boot backend microservices, and clean RESTful API contracts.",
    stack: "React.js · Java · Spring Boot · REST APIs",
    icon: "layout-dashboard"
  },
  {
    num: "03",
    title: "Cloud & Distributed Systems",
    desc: "Scalable cloud services on AWS (EC2, S3, Lambda) and decentralized solar microgrids deployed on the ICP blockchain.",
    stack: "AWS · EC2 · S3 · Lambda · ICP Blockchain",
    icon: "cloud"
  },
  {
    num: "04",
    title: "Data & BI Analytics",
    desc: "Large-scale transactional data pipelines with advanced SQL (joins, window functions) and executive Power BI dashboards.",
    stack: "SQL · Power BI · ETL · MySQL · PostgreSQL",
    icon: "bar-chart-3"
  },
  {
    num: "05",
    title: "Networking & Troubleshooting",
    desc: "Diagnosing network protocols (TCP/IP, DNS, DHCP, OSI model) and simulating enterprise IT system support environments.",
    stack: "TCP/IP · DNS · DHCP · VMware · Windows Server",
    icon: "network"
  },
  {
    num: "06",
    title: "Automation & CI/CD",
    desc: "Automated builds, GitHub Actions workflows, Postman API testing, and AI-augmented coding with Copilot & Cursor.",
    stack: "GitHub Actions · Postman · Copilot · Cursor",
    icon: "zap"
  }
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "agentic-ai-cloud",
    title: "Agentic AI for Cloud Architecture Generation",
    tagline: "Translates natural language requirements into verified AWS cloud diagrams and service topologies using multi-agent orchestration",
    badge: "Flagship AI Project — Prompt & Agent Engineering",
    category: "AI",
    stack: ["React.js", "Spring Boot", "LLMs (OpenAI/Llama)", "AWS (EC2, S3, Lambda)", "REST APIs", "Prompt Engineering"],
    summaryProblem: "Translating complex business requirements into AWS cloud architecture diagrams requires tedious manual configuration and deep knowledge of hundreds of cloud services.",
    summarySolution: "Multi-agent AI system that decomposes user requirements into verifiable sub-goals, selects optimal AWS services, and renders real-time interactive architecture diagrams.",
    metrics: ["-60% architecture drafting time", "Multi-step agent decomposition", "Real-time AWS visualization"],
    imageQuery: "futuristic cloud architecture generation interface, glowing AWS service nodes, dark tech aesthetic",
    problem: "Solutions architects and developers spend hours manually drafting cloud topology diagrams, choosing compute/storage tiers, and connecting security groups. Junior teams often miss optimal service selections (e.g. EC2 vs Lambda, S3 storage tiers) and secure network boundary best practices.",
    context: "Developed as a flagship project advancing my work from Altitudes internship. The goal was to build a production-grade multi-agent pipeline that accepts plain-English infrastructure prompts and produces verified, interactive AWS cloud architecture diagrams with Spring Boot API orchestration.",
    myRole: "Lead Architect & Full-Stack Developer. Designed the multi-agent prompt chaining logic, developed the Spring Boot REST API layer to mediate between the React UI and LLM endpoints, deployed backend services on AWS EC2 with S3 asset storage and Lambda for event-driven inference.",
    architecture: {
      title: "Agentic AI Cloud Architecture Pipeline",
      description: "How plain language prompts transform into verified, interactive AWS cloud diagrams",
      nodes: [
        { id: "1", name: "User Prompt Interface", type: "client", description: "Engineer specifies infrastructure requirements in natural language", tech: "React.js + Tailwind", rationale: "Provides interactive canvas and real-time prompt feedback" },
        { id: "2", name: "Spring Boot API Gateway", type: "service", description: "Authenticates requests, validates schema, and manages agent task sessions", tech: "Spring Boot / REST APIs", rationale: "Ensures type-safe communication and session isolation" },
        { id: "3", name: "Requirement Decomposition Agent", type: "ai", description: "Breaks user prompt into functional cloud components: Compute, Storage, Database, Networking", tech: "LLM (OpenAI / Llama)", rationale: "Decomposes complex goals into verifiable sub-goals" },
        { id: "4", name: "AWS Service Recommender Agent", type: "ai", description: "Evaluates trade-offs (e.g. Lambda vs EC2, S3 tiering) against cost and latency constraints", tech: "Prompt Engineering Chaining", rationale: "Selects best-fit services aligned with AWS Well-Architected Framework" },
        { id: "5", name: "Topology Generator & Validator", type: "service", description: "Constructs node connection graph and validates network security boundaries (VPC, Security Groups)", tech: "Java Spring Service", rationale: "Guarantees valid AWS topological flow without orphaned resources" },
        { id: "6", name: "Interactive Visualizer Canvas", type: "client", description: "Renders real-time exportable diagram with interactive node inspection", tech: "React SVG Canvas", rationale: "Enables instant visual verification and architecture export" }
      ]
    },
    technologies: [
      { name: "React.js", role: "Frontend Visualization", why: "Component-based architecture allows modular node rendering, zoom/pan canvas, and dynamic property sidebars." },
      { name: "Spring Boot", role: "Backend REST API", why: "Enterprise-grade reliability, dependency injection, and high-throughput mediation between frontend and LLM agents." },
      { name: "LLMs & Prompt Engineering", role: "Multi-Agent Backbone", why: "Decomposes unstructured English into structured JSON topology schemas with verifiable sub-goals." },
      { name: "AWS (EC2, S3, Lambda)", role: "Deployment & Inference", why: "Practical cloud operations: backend on EC2, diagram assets on S3, and serverless inference tasks on Lambda." }
    ],
    challenges: [
      {
        problem: "Hallucinated Connections: Early LLM iterations occasionally created impossible network links (e.g. connecting an S3 bucket directly to a private VPC subnet without VPC endpoints).",
        resolution: "Introduced a deterministic Java graph-validation layer in Spring Boot that validates every generated edge against AWS networking rules before sending to the client."
      },
      {
        problem: "Latency during Multi-step Chaining: Running serial LLM calls for requirement parsing, service selection, and schema generation resulted in 8-12 second response delays.",
        resolution: "Parallelized independent agent tasks (e.g. compute recommendation and database selection run concurrently) cutting roundtrip latency by 55%."
      }
    ],
    decisions: [
      {
        decision: "Spring Boot REST backend over simple serverless Python scripts",
        alternativeRejected: "Standalone Python scripts",
        rationale: "Spring Boot provided structured API versioning, clean microservices separation, and enterprise Java ecosystem reliability."
      },
      {
        decision: "Multi-step Agentic Decomposition over single massive prompt",
        alternativeRejected: "Single prompt generation",
        rationale: "Single prompts frequently omitted required network resources (VPCs, NAT gateways). Chaining dedicated sub-agents dramatically improved output accuracy."
      }
    ],
    lessons: [
      "Agentic AI reliability comes from combining probabilistic LLMs with deterministic validation rules.",
      "Visual real-time feedback keeps users engaged even when deep reasoning chains take a few seconds."
    ],
    futureImprovements: [
      "Add direct Terraform / AWS CloudFormation template export for 1-click infrastructure deployment.",
      "Integrate AWS Cost Calculator API to estimate monthly running costs directly on the diagram."
    ]
  },
  {
    id: "decentralized-grid",
    title: "Decentralize Scalable Grid",
    tagline: "Decentralized solar microgrid management system on ICP blockchain with peer-to-peer energy routing and resilient smart distribution",
    badge: "Live on Blockchain — Web3 & Distributed Systems",
    category: "Blockchain",
    stack: ["React.js", "Spring Boot", "ICP Blockchain", "Smart Grids", "REST APIs", "Microservices"],
    summaryProblem: "Centralized energy distribution networks are prone to catastrophic single points of failure, line transmission losses, and cannot dynamically handle peer-to-peer renewable solar energy trading.",
    summarySolution: "Independent node microgrid system running on ICP blockchain, facilitating resilient peer-to-peer energy routing, load balancing, and autonomous energy distribution without centralized control.",
    metrics: ["Live on ICP Blockchain", "100% decentralized routing", "Fault-tolerant independent nodes"],
    imageQuery: "decentralized smart solar grid network visualization, glowing nodes and power lines, dark futuristic UI",
    problem: "Traditional power grids rely on centralized management. When local solar prosumers generate surplus electricity, selling power back to traditional power stations causes transmission losses, pricing opacity, and grid bottlenecks.",
    context: "Engineered to explore distributed systems and blockchain decentralization applied to clean renewable energy. The platform manages independent solar microgrids, balances battery storage, and enables peer-to-peer energy sharing across local nodes.",
    myRole: "Full-Stack & Blockchain Developer. Built the React.js web interface, designed Spring Boot microservices for node telemetry, and deployed smart grid distribution logic onto the Internet Computer Protocol (ICP) blockchain.",
    liveUrl: "https://4nish-4aaaa-aaaag-ali2a-cai.icp0.io/",
    architecture: {
      title: "Decentralized Microgrid Routing Architecture",
      description: "How distributed energy telemetry flows between solar microgrid nodes and ICP blockchain",
      nodes: [
        { id: "1", name: "Solar Node Prosumers", type: "infra", description: "Rooftop solar panels, battery inverters, and IoT energy meters", tech: "Microgrid IoT", rationale: "Edge energy producers and storage cells" },
        { id: "2", name: "Spring Boot Node Service", type: "service", description: "Aggregates kilowatt-hour telemetry, calculates net surplus, and checks node health", tech: "Spring Boot Microservice", rationale: "Handles fast local telemetry before blockchain commit" },
        { id: "3", name: "Smart Energy Routing Logic", type: "service", description: "Matches local surplus with nearest deficit nodes to minimize line losses", tech: "Algorithmic Routing", rationale: "Optimizes peer-to-peer power transfer efficiency" },
        { id: "4", name: "ICP Blockchain Canister", type: "database", description: "Immutable decentralized ledger recording energy transfer events and node stakes", tech: "Internet Computer Protocol", rationale: "Eliminates centralized single points of failure" },
        { id: "5", name: "React Monitoring Dashboard", type: "client", description: "Real-time visual interface displaying grid frequency, storage levels, and peer transfers", tech: "React.js SPA", rationale: "Allows node operators to observe grid status live" }
      ]
    },
    technologies: [
      { name: "React.js", role: "Grid Operator Frontend", why: "Real-time reactive state updates for live power generation gauges, battery percentages, and transaction logs." },
      { name: "Spring Boot", role: "Node Telemetry Microservices", why: "Efficient multi-threading for continuous sensor reading and reliable RESTful API communication." },
      { name: "ICP Blockchain", role: "Decentralized Execution & Storage", why: "Native on-chain web hosting and smart contract canisters with sub-second finality and zero gas fees for end users." },
      { name: "Smart Grid Routing", role: "Energy Distribution Engine", why: "Guarantees fault-tolerant microgrid operation even during wider grid blackouts." }
    ],
    challenges: [
      {
        problem: "Network Partitions: If a neighborhood node lost external connectivity, it would freeze energy distribution.",
        resolution: "Architected autonomous islanding: nodes can operate as isolated self-balancing microgrids and automatically reconcile transactions upon reconnection."
      },
      {
        problem: "Blockchain Finality & Telemetry Frequency: Committing sub-second sensor readings directly to a blockchain is cost and throughput prohibitive.",
        resolution: "Batched local telemetry in Spring Boot microservices and committed verified rolling settlement blocks to the ICP canister every 30 seconds."
      }
    ],
    decisions: [
      {
        decision: "ICP Blockchain over Ethereum / EVM",
        alternativeRejected: "Ethereum / Polygon",
        rationale: "ICP provides direct on-chain web canister hosting and reverse-gas model, so microgrid operators do not pay transaction gas fees."
      },
      {
        decision: "Decoupled microservice architecture for sensor ingestion",
        alternativeRejected: "Monolithic app",
        rationale: "Enabled independent node scaling across distributed solar installations."
      }
    ],
    lessons: [
      "Decentralized systems must be resilient to edge node dropout from day one.",
      "Energy routing algorithms must account for physical line impedance, not just digital ledger balances."
    ],
    futureImprovements: [
      "Integrate machine learning predictive weather modeling to forecast solar generation 24 hours ahead.",
      "Develop EV charging station dynamic load-balancing integration."
    ]
  },
  {
    id: "sales-bi-analytics",
    title: "Sales Data Analysis & BI Dashboard",
    tagline: "Executive decision intelligence pipeline transforming multi-source sales datasets with advanced SQL into interactive Power BI KPI dashboards",
    badge: "Enterprise Analytics — SQL & Power BI",
    category: "Data & BI",
    stack: ["SQL (MySQL/PostgreSQL)", "Power BI", "ETL Pipelines", "Data Modeling", "CTEs & Window Functions"],
    summaryProblem: "Enterprise sales data scattered across disparate spreadsheets and transactional databases caused inconsistent reporting and blind spots in regional performance.",
    summarySolution: "Engineered an end-to-end data transformation pipeline using advanced SQL joins, CTEs, and window functions feeding an interactive Power BI dashboard with KPI drill-downs.",
    metrics: ["100% data consistency across sources", "Executive KPI visualization", "Multi-source SQL ETL"],
    imageQuery: "modern enterprise sales analytics dashboard, dark background, glowing green and blue charts, Power BI aesthetic",
    problem: "Executives and regional managers lacked visibility into product profitability, customer segment churn, and quarter-over-quarter revenue growth due to inconsistent, uncleaned transactional records across disparate business units.",
    context: "Developed to demonstrate enterprise data analysis, SQL proficiency, and business intelligence reporting. Focused on transforming millions of transactional records into actionable decision-support dashboards.",
    myRole: "Data Analyst & BI Engineer. Designed the dimensional star schema, authored advanced SQL queries (CTEs, window functions, conditional aggregations), built data cleaning pipelines, and engineered interactive Power BI dashboards.",
    architecture: {
      title: "Sales BI Data Pipeline",
      description: "From raw transactional records to executive decision intelligence",
      nodes: [
        { id: "1", name: "Raw Multi-source Data", type: "database", description: "Transactional sales logs, customer databases, and product inventories", tech: "CSV / SQL tables", rationale: "Disparate source data stores" },
        { id: "2", name: "SQL Data Cleaning Layer", type: "service", description: "Handles nulls, deduplication, currency standardization, and type casting", tech: "Advanced SQL", rationale: "Guarantees clean data hygiene before modeling" },
        { id: "3", name: "Dimensional Star Schema", type: "database", description: "FactSales table connected to DimCustomer, DimProduct, DimRegion, and DimDate", tech: "Star Schema Modeling", rationale: "Optimizes analytical query performance and drill-down flexibility" },
        { id: "4", name: "KPI Calculation Engine", type: "service", description: "Calculates YoY revenue growth, profit margin percentages, and customer retention metrics", tech: "SQL Window Functions & DAX", rationale: "Delivers mathematically verified executive metrics" },
        { id: "5", name: "Interactive Power BI Dashboard", type: "client", description: "Executive KPI dashboard with dynamic slicers, revenue heatmaps, and trend projections", tech: "Power BI", rationale: "Empowers leadership to make data-driven decisions in seconds" }
      ]
    },
    technologies: [
      { name: "Advanced SQL", role: "Data Transformation & ETL", why: "Utilized complex joins, CTEs, and window functions (ROW_NUMBER, RANK, LAG/LEAD) for precise trend detection." },
      { name: "Power BI", role: "Executive Visualization", why: "Industry-standard BI platform with rich interactive filtering, cross-highlighting, and DAX measures." },
      { name: "Dimensional Data Modeling", role: "Schema Design", why: "Star schema architecture separates facts from dimensions for fast aggregation across millions of rows." },
      { name: "Data Cleaning Pipelines", role: "Quality Assurance", why: "Eliminates duplicate entries and anomalies for trusted business metrics." }
    ],
    challenges: [
      {
        problem: "Inconsistent Regional Date Formats & Currencies: Sales logs from different regions used conflicting date standards (DD/MM/YYYY vs MM/DD/YYYY) and mixed currency units.",
        resolution: "Built a standardized SQL ingestion script using explicit regex casting, ISO-8601 date parsing, and a daily exchange rate dimension table."
      },
      {
        problem: "Slow Dashboard Refresh on Large Datasets: Complex aggregations in initial Power BI queries caused noticeable report latency.",
        resolution: "Pushed heavy aggregation computations upstream into SQL database views, reducing Power BI dataset load time by over 70%."
      }
    ],
    decisions: [
      {
        decision: "Star Schema over flat denormalized tables",
        alternativeRejected: "One massive wide table",
        rationale: "Star schema maintains strict dimension integrity, reduces storage footprint, and enables flexible multi-dimensional slicing."
      },
      {
        decision: "SQL-first transformation over Power Query only",
        alternativeRejected: "Doing all transformations in Power Query UI",
        rationale: "Writing raw SQL transformations allows version control in Git and makes the data pipeline database-agnostic."
      }
    ],
    lessons: [
      "Data cleaning and modeling represent 80% of successful business intelligence projects.",
      "Clear visual hierarchy and KPI callouts drive executive adoption far better than cluttered chart walls."
    ],
    futureImprovements: [
      "Add automated anomaly detection alerts when regional sales drop more than 2 standard deviations.",
      "Build predictive forecasting model using Python statsmodels for next-quarter demand planning."
    ]
  },
  {
    id: "windows-sysadmin-lab",
    title: "Windows System Administration & Troubleshooting Lab",
    tagline: "Enterprise IT support simulation: user management, DNS/DHCP configuration, and rapid incident resolution workflows",
    badge: "IT Support & Systems Administration",
    category: "Systems",
    stack: ["VMware", "Windows Server", "TCP/IP", "DNS", "DHCP", "Incident Management", "Ticket Resolution"],
    summaryProblem: "Enterprise IT operations suffer from slow incident resolution, permission configuration drift, and poor root-cause documentation when systems fail.",
    summarySolution: "Built a simulated enterprise IT environment to diagnose system, application, and network failures, configure DNS/DHCP, and execute rapid incident triage workflows.",
    metrics: ["<15 min simulated ticket resolution", "Zero unauthorized permission escalations", "Complete SOP documentation"],
    imageQuery: "system administration terminal interface, network topology, server rack diagnostic screen, dark mode",
    problem: "In corporate environments, misconfigured network protocols, DNS resolution errors, and permission misalignments cause severe productivity bottlenecks and downtime for end users.",
    context: "Developed as a comprehensive hands-on laboratory environment to master enterprise IT operations, system administration, network troubleshooting, and customer-facing incident management workflows.",
    myRole: "Systems Administrator & Support Engineer. Configured virtualized Windows Server environments in VMware, managed Active Directory user accounts and group policies, resolved TCP/IP networking faults, and maintained incident resolution documentation.",
    architecture: {
      title: "Enterprise IT Support Simulation Flow",
      description: "How incident tickets are captured, diagnosed, resolved, and documented",
      nodes: [
        { id: "1", name: "End-User Ticket Submission", type: "client", description: "Reported incident: network unreachable, DNS failure, or access denied", tech: "Ticketing Workflow", rationale: "Captures symptoms and urgency" },
        { id: "2", name: "Triage & Diagnostics", type: "service", description: "Verifies OSI layer connectivity: IP configuration, gateway ping, DNS resolution, port status", tech: "CLI / PowerShell / ipconfig / nslookup", rationale: "Isolates network layer vs application layer" },
        { id: "3", name: "System Administration Core", type: "service", description: "Windows Server: user permissions, DHCP scopes, DNS zone files, and services", tech: "Windows Server / VMware", rationale: "Corrects root configuration issues" },
        { id: "4", name: "Resolution Verification", type: "service", description: "Confirms end-to-end service restoration and logs root cause analysis", tech: "Incident Management SOP", rationale: "Ensures no recurring configuration drift" }
      ]
    },
    technologies: [
      { name: "VMware", role: "Virtualization Infrastructure", why: "Enables isolated multi-node network simulations for client-server testing." },
      { name: "Windows Server", role: "Enterprise Administration", why: "Core enterprise platform for user access management, policy enforcement, and server roles." },
      { name: "TCP/IP, DNS, DHCP", role: "Core Network Protocols", why: "Fundamental networking standards required for diagnosing enterprise communication failures." },
      { name: "Incident Management", role: "Operational Discipline", why: "Structured issue triage, root cause analysis (RCA), and documentation ensure reliable system operations." }
    ],
    challenges: [
      {
        problem: "Intermittent DNS Resolution Failures: Client VMs intermittently failed to resolve intranet hostnames due to conflicting DNS forwarders.",
        resolution: "Diagnosed using nslookup and Wireshark; reconfigured primary and secondary DNS zone forwarders and flushed client DNS resolver caches."
      },
      {
        problem: "DHCP Scope Exhaustion: Virtual lab machines running test simulations depleted available IP leases.",
        resolution: "Re-engineered subnet masks to expand IP address pool and shortened lease duration for temporary development instances."
      }
    ],
    decisions: [
      {
        decision: "Virtualized VMware lab environment over single physical host",
        alternativeRejected: "Single desktop OS",
        rationale: "Allowed realistic simulation of enterprise multi-hop routing, domain controllers, and isolated VLANs."
      },
      {
        decision: "Strict documentation of standard operating procedures (SOPs)",
        alternativeRejected: "Informal troubleshooting",
        rationale: "Aligns with enterprise ITIL incident management practices and enables reproducible resolution steps."
      }
    ],
    lessons: [
      "Most mysterious software bugs are actually network or permission misconfigurations underneath.",
      "Clear, empathetic communication with end users during incidents is just as critical as technical troubleshooting."
    ],
    futureImprovements: [
      "Automate repetitive user provisioning tasks using PowerShell automation scripts.",
      "Build a self-service password reset and basic diagnostic portal for end users."
    ]
  }
];

export const TECHNICAL_DNA: TechItem[] = [
  // Languages
  { name: "Java", category: "Backend", status: "Used in Projects", evidence: "Core language for Spring Boot REST APIs, microservices, and backend architecture in Agentic AI and Decentralized Grid.", projects: ["Agentic AI for Cloud", "Decentralize Scalable Grid"], description: "OOP principles, collections framework, multi-threading, stream API, and Spring Boot integration." },
  { name: "Spring Boot", category: "Backend", status: "Used in Projects", evidence: "Built RESTful microservices, API mediation layers, dependency injection, and security filters.", projects: ["Agentic AI for Cloud", "Decentralize Scalable Grid", "Altitudes Internship"], description: "REST APIs, Spring Data JPA, Spring Security, microservices architecture, and Postman testing." },
  { name: "React.js", category: "Frontend", status: "Used in Projects", evidence: "Engineered responsive user interfaces, real-time architecture visualizers, and decentralized grid dashboards.", projects: ["Agentic AI for Cloud", "Decentralize Scalable Grid", "Portfolio"], description: "Functional components, custom hooks, virtual DOM, component-based design, and Tailwind CSS." },
  { name: "SQL", category: "Data", status: "Used in Projects", evidence: "Processed multi-source transactional datasets using complex joins, CTEs, and window functions.", projects: ["Sales Data Analysis & BI Dashboard"], description: "Relational database design, query optimization, data transformation, MySQL, and PostgreSQL." },
  { name: "Python", category: "Backend", status: "Used in Projects", evidence: "Scripting, AI prompt workflows, data analysis, and automation.", projects: ["AI & Systems Experiments"], description: "Async programming, data handling, API integrations, and AI model orchestration." },
  { name: "JavaScript / TypeScript", category: "Frontend", status: "Used in Projects", evidence: "Strict type safety and interactive UI logic across all web applications.", projects: ["Agentic AI for Cloud", "Decentralize Scalable Grid", "Portfolio"], description: "ES6+, async/await, DOM manipulation, strict type checking, and modern web APIs." },

  // AI & Cloud
  { name: "Agentic AI & Prompt Engineering", category: "AI", status: "Used in Projects", evidence: "Architected multi-agent AI system decomposing requirements into verifiable sub-goals.", projects: ["Agentic AI for Cloud", "Altitudes Internship"], description: "Prompt chaining, structured JSON outputs, few-shot prompting, and guardrails." },
  { name: "LLMs (OpenAI, Gemini, Llama)", category: "AI", status: "Used in Projects", evidence: "Integrated LLM backbones with Spring Boot REST APIs for automated cloud diagram synthesis.", projects: ["Agentic AI for Cloud", "Altitudes Internship"], description: "Model selection, temperature calibration, context window management, and RAG architectures." },
  { name: "AWS (EC2, S3, Lambda)", category: "Cloud", status: "Used in Projects", evidence: "Certified AWS Academy Cloud Foundations; deployed backend on EC2, assets on S3, and serverless tasks on Lambda.", projects: ["Agentic AI for Cloud"], description: "IAM policies, VPC subnets, security groups, S3 storage tiers, and serverless compute." },
  { name: "ICP Blockchain", category: "Cloud", status: "Used in Projects", evidence: "Deployed decentralized solar microgrid live on Internet Computer Protocol blockchain canisters.", projects: ["Decentralize Scalable Grid"], description: "Decentralized canisters, smart contracts, reverse-gas model, and peer-to-peer routing." },

  // Networking & Systems
  { name: "TCP/IP & OSI Model", category: "Networking", status: "Used in Projects", evidence: "Diagnosed packet routing, subnetting, TCP handshakes, and port forwarding.", projects: ["Windows SysAdmin Lab", "Cisco CCNA Training"], description: "Packet structure, 7-layer OSI model, CIDR subnetting, NAT, and network troubleshooting." },
  { name: "DNS & DHCP", category: "Networking", status: "Used in Projects", evidence: "Configured Windows Server DHCP scopes, DNS forwarders, and resolved resolution failures.", projects: ["Windows SysAdmin Lab"], description: "A/AAAA, CNAME, zone transfers, lease management, and nslookup diagnostics." },
  { name: "VMware & Windows Server", category: "Networking", status: "Used in Projects", evidence: "Configured enterprise virtualized environments for IT support and system simulation.", projects: ["Windows SysAdmin Lab"], description: "Virtual networking, VM provisioning, user access control, and incident management." },

  // Data & Tools
  { name: "Power BI", category: "Data", status: "Used in Projects", evidence: "Engineered executive KPI dashboards with interactive slicers and revenue performance metrics.", projects: ["Sales Data Analysis & BI Dashboard"], description: "Data modeling, DAX measures, star schema relationships, and executive reporting." },
  { name: "Git & GitHub Actions", category: "Tools", status: "Used in Projects", evidence: "Active contributor at github.com/Deepakdudez with automated CI/CD deployment pipelines.", projects: ["Portfolio", "Decentralize Scalable Grid"], description: "Branching strategies, pull requests, automated GitHub Pages CI/CD, and version control." },
  { name: "REST APIs & Postman", category: "Tools", status: "Used in Projects", evidence: "Designed, tested, and documented end-to-end request-response workflows.", projects: ["Altitudes Internship", "Agentic AI for Cloud"], description: "HTTP methods, status codes, JSON schemas, authentication headers, and API test suites." }
];

export const TIMELINE_EVENTS = [
  {
    year: "Jun 2025 – Jul 2025",
    title: "Full Stack Developer Intern — Altitudes",
    category: "Work Experience",
    desc: "Designed and shipped a natural-language-to-cloud-architecture feature, allowing users to describe infrastructure in plain English and receive generated AWS diagrams — integrating Spring Boot REST APIs with an LLM backbone. Built data-driven frontend components in HTML, CSS, JavaScript, and React.js with reusable UI patterns, reducing iteration time. Integrated REST APIs end-to-end across backend and frontend layers. Applied AI-assisted coding tools (Copilot, Cursor) to accelerate development.",
    highlight: "Shipped natural language to AWS architecture feature using Spring Boot & LLMs."
  },
  {
    year: "2022 – 2026",
    title: "B.Tech in Information Technology — SKCET",
    category: "Education",
    desc: "Sri Krishna College of Engineering and Technology, Coimbatore, Tamil Nadu. Maintained a CGPA of 7.50 / 10.0 with core focus in Data Structures, Database Management Systems, Computer Networks, Operating Systems, Full Stack Engineering, and Cloud Technologies. Built and published decentralized blockchain applications and AI architecture generators.",
    highlight: "Maintained 7.50 CGPA while publishing decentralized blockchain energy grid and AI architecture generator."
  },
  {
    year: "2021 – 2022",
    title: "Intermediate / Higher Secondary — Kids Club",
    category: "Education",
    desc: "Kids Club Matriculation Higher Secondary School, Tiruppur, Tamil Nadu. Completed higher secondary education with 76% in Mathematics, Physics, Chemistry, and Computer Science, establishing strong analytical and computational foundations.",
    highlight: "Graduated with 76% score with strong performance in Mathematics and Computer Science."
  }
];

export const FREELANCE_SERVICES: FreelanceService[] = [
  {
    id: "fullstack-dev",
    title: "Full-Stack Web Development",
    category: "Engineering",
    tagline: "High-performance web applications built with React.js, Spring Boot, and robust RESTful APIs",
    problem: "Outdated or buggy web systems hurt conversion, frustrate users, and are difficult to maintain without constant developer firefighting.",
    whatIBuild: [
      "Interactive modern React.js frontend applications",
      "Enterprise-grade Java Spring Boot RESTful microservices",
      "Secure API integration, auth flows, and database schemas",
      "Responsive UI/UX with Tailwind CSS and clean component architecture"
    ],
    tech: ["React.js", "Java", "Spring Boot", "REST APIs", "Tailwind CSS", "MySQL / PostgreSQL"],
    workflow: [
      { step: "01. Architecture & API Contracts", detail: "Review requirements, model database schemas, and define clear RESTful API endpoints." },
      { step: "02. Core Implementation", detail: "Build responsive React components and Spring Boot services in testable milestones." },
      { step: "03. Testing & Hardening", detail: "Validate edge cases using Postman, test performance, and ensure mobile responsiveness." },
      { step: "04. Deployment & Handover", detail: "Deploy to cloud infrastructure, set up automated CI/CD pipelines, and provide complete documentation." }
    ],
    deliverables: ["Full source code repository", "Dockerized deployment setup", "Postman API collection", "Documentation & setup guide"],
    typicalTimeline: "2 – 5 weeks"
  },
  {
    id: "ai-systems",
    title: "Agentic AI & LLM Systems",
    category: "Artificial Intelligence",
    tagline: "Turn complex workflows into automated, multi-agent AI pipelines with prompt engineering and guardrails",
    problem: "Generic AI chatbots hallucinate, produce inconsistent outputs, and lack deterministic validation required for real enterprise workflows.",
    whatIBuild: [
      "Multi-agent task decomposition pipelines using LLMs (OpenAI, Gemini, Llama)",
      "Automated diagram and document generation from natural language prompts",
      "Prompt engineering and structured JSON output validation",
      "Spring Boot REST API mediation layers connecting frontend UIs to AI services"
    ],
    tech: ["React.js", "Spring Boot", "LLMs", "Prompt Engineering", "AWS", "REST APIs"],
    workflow: [
      { step: "01. Prompt & Task Decomposition", detail: "Deconstruct the manual task into verifiable sub-goals and prompt chains." },
      { step: "02. Agent Orchestration", detail: "Build multi-step agent pipelines with fallback strategies and deterministic output validators." },
      { step: "03. Backend & UI Integration", detail: "Connect AI endpoints to Spring Boot REST APIs and interactive React interfaces." },
      { step: "04. Verification & Testing", detail: "Test against edge cases to eliminate hallucinations and ensure consistent performance." }
    ],
    deliverables: ["Tested AI pipeline codebase", "Spring Boot API integration", "Validation rules & prompt templates", "Operational documentation"],
    typicalTimeline: "2 – 4 weeks"
  },
  {
    id: "data-bi",
    title: "Data Analysis & Power BI Dashboards",
    category: "Data & BI",
    tagline: "Transform multi-source transactional data into interactive, executive decision-support dashboards",
    problem: "Siloed data in conflicting formats makes it impossible for business leaders to track KPIs, identify profit trends, or make confident decisions.",
    whatIBuild: [
      "Advanced SQL data transformation pipelines (joins, CTEs, window functions)",
      "Interactive Power BI executive dashboards with dynamic filtering and slicers",
      "Star schema data modeling and automated ETL data cleaning",
      "Revenue growth, profit margin, and customer segmentation KPI analytics"
    ],
    tech: ["SQL", "Power BI", "ETL Pipelines", "PostgreSQL", "MySQL", "Data Modeling"],
    workflow: [
      { step: "01. Data Audit & Extraction", detail: "Inspect raw data sources, identify data quality issues, and define key metrics." },
      { step: "02. SQL ETL & Cleaning", detail: "Write robust SQL scripts with joins and CTEs to standardize types and clean anomalies." },
      { step: "03. Star Schema Modeling", detail: "Design optimized dimension and fact tables for fast interactive aggregation." },
      { step: "04. Dashboard Engineering", detail: "Build executive visual dashboards in Power BI with custom DAX calculations and slicers." }
    ],
    deliverables: ["Power BI report files (.pbix)", "Documented SQL ETL transformation scripts", "Data model documentation", "Executive KPI walkthrough"],
    typicalTimeline: "1 – 3 weeks"
  }
];

export const FAQS = [
  {
    question: "Who is Deepak Kumar N?",
    answer: "Deepak Kumar N is a Software Engineer specializing in Full Stack Development and AI Systems, currently completing his final year B.Tech in Information Technology at Sri Krishna College of Engineering and Technology, Coimbatore (CGPA: 7.50 / 10.0). He has completed a Full Stack Developer Internship at Altitudes and built production projects in Agentic AI, decentralized blockchain microgrids, and data analytics.",
    category: "General",
    source: "resume.pdf"
  },
  {
    question: "What did Deepak work on during his internship at Altitudes?",
    answer: "At Altitudes (Jun 2025 – Jul 2025), Deepak designed and shipped a natural-language-to-cloud-architecture feature that allows users to describe infrastructure in plain English and receive generated AWS diagrams. He integrated Spring Boot REST APIs with an LLM backbone, built reusable frontend components, and utilized AI-assisted coding tools.",
    category: "Experience",
    source: "experience/altitudes.pdf"
  },
  {
    question: "What is Deepak's Agentic AI Cloud Architecture project?",
    answer: "Agentic AI for Cloud Architecture Generation is a multi-agent system built with React.js, Spring Boot, LLMs, and AWS. It decomposes natural language requirements into verifiable sub-goals, selects optimal AWS services, and renders interactive cloud diagrams in real time.",
    category: "Projects",
    source: "projects/agentic-ai.pdf"
  },
  {
    question: "What is Decentralize Scalable Grid and is it live?",
    answer: "Yes, Decentralize Scalable Grid is deployed live on the Internet Computer Protocol (ICP) blockchain at https://4nish-4aaaa-aaaag-ali2a-cai.icp0.io/. It is a decentralized solar microgrid management platform built with React.js and Spring Boot microservices, enabling peer-to-peer renewable energy distribution without a central authority.",
    category: "Projects",
    source: "projects/decentralized-grid.pdf"
  },
  {
    question: "What certifications does Deepak hold?",
    answer: "Deepak holds 6 verified certifications: AWS Academy Cloud Foundations (AWS Academy), Generative AI Mastermind (Outskill), Java Training (IIT Bombay Spoken Tutorial), Java for Beginners (Infosys), SQL Standard (Skill Rack), and CCNA Training (Cisco).",
    category: "Certifications",
    source: "certifications.pdf"
  },
  {
    question: "How can I contact or hire Deepak Kumar?",
    answer: "You can reach Deepak directly via email at deepak.nithyananthan@gmail.com, by phone at +91 9360675434, or connect on LinkedIn (https://www.linkedin.com/in/deep4kkumar/) and GitHub (https://github.com/Deepakdudez).",
    category: "Contact",
    source: "contact.json"
  }
];
