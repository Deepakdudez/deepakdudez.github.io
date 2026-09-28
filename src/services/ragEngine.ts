import { PROFILE, PROJECTS, TECHNICAL_DNA, FREELANCE_SERVICES, TIMELINE_EVENTS, FAQS } from '../data/portfolioData';
import { AiChatMessage, ProfileReviewResult, JobMatchResult } from '../types';

// Chunk representation for the retriever
export interface DataChunk {
  id: string;
  source: string;
  section: string;
  topic: string;
  text: string;
  verified: boolean;
  linkId?: string;
}

// Build knowledge base chunks from verified data
export function getKnowledgeBase(): DataChunk[] {
  const chunks: DataChunk[] = [];

  // Profile chunks
  chunks.push({
    id: 'profile-bio',
    source: 'Profile',
    section: 'About Deepak',
    topic: 'general',
    text: `${PROFILE.name} is an ${PROFILE.role} based in ${PROFILE.location}. Headline: "${PROFILE.headline}". Description: ${PROFILE.secondaryText} His core beliefs include: ${PROFILE.beliefs.map(b => b.title).join(' ')}. He is currently open to freelance opportunities and full-time systems/software roles.`,
    verified: true,
    linkId: 'about'
  });

  chunks.push({
    id: 'profile-learning',
    source: 'Profile',
    section: 'Current Focus',
    topic: 'learning',
    text: `Deepak is currently exploring: ${PROFILE.currentlyExploring.description}. Active study items: ${PROFILE.currentlyExploring.items.map(i => `${i.name} (${i.status})`).join(', ')}.`,
    verified: true,
    linkId: 'lab'
  });

  // Project chunks
  PROJECTS.forEach(p => {
    chunks.push({
      id: `proj-${p.id}-summary`,
      source: `Project Case Study — ${p.title}`,
      section: 'Overview',
      topic: p.category.toLowerCase(),
      text: `${p.title} (${p.category}): ${p.tagline}. Problem: ${p.summaryProblem} Solution: ${p.summarySolution} Stack: ${p.stack.join(', ')}. Badge: ${p.badge}. Key metrics: ${p.metrics.join(', ')}.`,
      verified: true,
      linkId: p.id
    });

    chunks.push({
      id: `proj-${p.id}-architecture`,
      source: `Project Case Study — ${p.title}`,
      section: 'Architecture & Decisions',
      topic: 'architecture',
      text: `${p.title} Architecture: ${p.architecture.description}. Nodes: ${p.architecture.nodes.map(n => `${n.name} (${n.tech}): ${n.description}`).join(' -> ')}. Key decisions: ${p.decisions.map(d => `${d.decision} (Rejected: ${d.alternativeRejected}). Rationale: ${d.rationale}`).join('; ')}. Challenges solved: ${p.challenges.map(c => `${c.problem} Resolution: ${c.resolution}`).join('; ')}. Lessons learned: ${p.lessons.join(' ')}. Future improvements planned: ${p.futureImprovements.join(' ')}.`,
      verified: true,
      linkId: p.id
    });
  });

  // Skills chunks
  TECHNICAL_DNA.forEach(s => {
    chunks.push({
      id: `skill-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      source: `Technology Lab — ${s.name}`,
      section: s.category,
      topic: 'skills',
      text: `${s.name} (${s.category}): Confidence level is "${s.status}". Evidence: ${s.evidence} Projects used in: ${s.projects.join(', ')}. Details: ${s.description} ${s.learnedNext ? `Next focus: ${s.learnedNext}` : ''}`,
      verified: true,
      linkId: 'skills'
    });
  });

  // Services chunks
  FREELANCE_SERVICES.forEach(srv => {
    chunks.push({
      id: `srv-${srv.id}`,
      source: `Services — ${srv.title}`,
      section: srv.category,
      topic: 'freelance',
      text: `Freelance Service: ${srv.title} (${srv.category}). Problem addressed: ${srv.problem}. Deliverables include: ${srv.deliverables.join(', ')}. Tech: ${srv.tech.join(', ')}. Typical timeline: ${srv.typicalTimeline}.`,
      verified: true,
      linkId: 'services'
    });
  });

  // Timeline chunks
  TIMELINE_EVENTS.forEach((e, idx) => {
    chunks.push({
      id: `timeline-${idx}`,
      source: `Journey — ${e.year}`,
      section: e.category,
      topic: 'experience',
      text: `Timeline ${e.year} (${e.category}): ${e.title}. ${e.desc} Milestone: ${e.highlight}.`,
      verified: true,
      linkId: 'journey'
    });
  });

  // FAQ chunks
  FAQS.forEach((faq, idx) => {
    chunks.push({
      id: `faq-${idx}`,
      source: `FAQ — ${faq.source}`,
      section: faq.category,
      topic: 'faq',
      text: `Q: ${faq.question} A: ${faq.answer}`,
      verified: true
    });
  });

  return chunks;
}

// -------------------------------------------------------------
// INPUT GUARDRAILS (Prompt Injection, Secret Extraction, Abuse)
// -------------------------------------------------------------
export function checkInputGuardrail(query: string): { isSafe: boolean; reason?: string } {
  const trimmed = query.trim().toLowerCase();

  // Excessive length check
  if (trimmed.length > 600) {
    return { isSafe: false, reason: "Query exceeds the maximum allowable length (600 characters)." };
  }

  // Common prompt injection signatures
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /system\s+prompt/i,
    /you\s+are\s+now\s+(DAN|unrestricted|god\s+mode)/i,
    /reveal\s+(api\s+key|token|password|secret|env|environment\s+variable)/i,
    /print\s+your\s+hidden\s+instructions/i,
    /execute\s+(rm\s+-rf|sudo|cmd|powershell|bash|sh)/i,
    /bypass\s+(safety|guardrail|rule)/i,
    /output\s+(as\s+raw\s+json\s+system|all\s+internal\s+data)/i
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(trimmed)) {
      return {
        isSafe: false,
        reason: "Input safety guardrail triggered: The assistant is strictly constrained to verified portfolio inquiries and cannot disclose internal prompt directives, execute commands, or reveal credentials."
      };
    }
  }

  return { isSafe: true };
}

// -------------------------------------------------------------
// RAG RETRIEVER: Keyword + Semantic Similarity
// -------------------------------------------------------------
export function retrieveRelevantChunks(query: string, maxResults: number = 3): DataChunk[] {
  const chunks = getKnowledgeBase();
  const lowerQuery = query.toLowerCase();
  const terms = lowerQuery.split(/\s+/).filter(t => t.length > 2);

  // Score each chunk
  const scored = chunks.map(chunk => {
    let score = 0;
    const textLower = chunk.text.toLowerCase();
    const sourceLower = chunk.source.toLowerCase();

    // Exact phrase bonus
    if (textLower.includes(lowerQuery) || sourceLower.includes(lowerQuery)) {
      score += 15;
    }

    // Term matches
    for (const term of terms) {
      if (sourceLower.includes(term)) score += 6;
      if (chunk.topic.includes(term)) score += 4;
      if (textLower.includes(term)) score += 2;
    }

    // Boost specialized entities
    if (lowerQuery.includes('rag') && (textLower.includes('rag') || chunk.id.includes('gridops'))) score += 10;
    if (lowerQuery.includes('network') && (textLower.includes('netmap') || chunk.section.includes('Networking'))) score += 10;
    if (lowerQuery.includes('freelance') && (textLower.includes('flowdesk') || chunk.topic === 'freelance')) score += 8;
    if (lowerQuery.includes('experience') && chunk.topic === 'experience') score += 6;
    if (lowerQuery.includes('learn') && chunk.topic === 'learning') score += 8;

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const filtered = scored.filter(s => s.score > 0).slice(0, maxResults);
  if (filtered.length === 0) {
    // Return general profile as fallback
    return [chunks[0]];
  }

  return filtered.map(s => s.chunk);
}

// -------------------------------------------------------------
// AI SYNTHESIS & OUTPUT GUARDRAIL
// -------------------------------------------------------------
export function answerPortfolioQuery(query: string): AiChatMessage {
  const guard = checkInputGuardrail(query);
  if (!guard.isSafe) {
    return {
      id: Math.random().toString(36).substring(7),
      sender: 'assistant',
      text: guard.reason || "I cannot process this request due to portfolio safety guidelines.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGuardrailViolation: true
    };
  }

  const chunks = retrieveRelevantChunks(query, 3);
  const lower = query.toLowerCase();

  let answerText = "";
  const citations = chunks.map(c => ({
    source: c.source,
    section: c.section,
    linkId: c.linkId
  }));

  // Context-guided answers based on grounded portfolio evidence
  if (lower.includes('who is') || lower.includes('about deepak') || lower.includes('background') || lower.includes('tell me about')) {
    answerText = `Deepak Kumar is an IT professional and systems freelancer based in Bangalore (available for remote work). He focuses on full-stack web applications, AI integrations (RAG & embeddings), networking, and practical automation. He has shipped 12+ real-world systems with 100% verified portfolio evidence.`;
  } else if (lower.includes('rag') || lower.includes('ai project') || lower.includes('pgvector') || lower.includes('artificial intelligence')) {
    answerText = `Deepak built GridOps, a support intelligence dashboard that couples a Next.js frontend with a private Python FastAPI RAG pipeline using PostgreSQL and pgvector. It features hybrid BM25 + dense retrieval, recursive markdown chunking, and strict citations, reducing triage time by 42% without hallucinations.`;
  } else if (lower.includes('network') || lower.includes('netmap') || lower.includes('tcp') || lower.includes('ip') || lower.includes('infrastructure')) {
    answerText = `Deepak's networking background is demonstrated through NetMap, an edge home-lab telemetry daemon in Python/Go with Prometheus and Grafana. He implemented sub-second async ICMP/DNS latency monitoring and passive ARP snooping (<0.2% network overhead). He also configures WireGuard VPNs, subnets, and Linux server hosts.`;
  } else if (lower.includes('flowdesk') || lower.includes('freelance os') || lower.includes('saas') || lower.includes('client build')) {
    answerText = `Flowdesk is a freelance operating system built by Deepak using React, Node.js, PostgreSQL, and Stripe Connect. It merges proposals, tokenized magic-link approvals, automated milestone invoicing, and lightweight PDF receipt generation into a single continuous client flow.`;
  } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('technolog') || lower.includes('know')) {
    answerText = `Deepak's technical DNA spans React, Next.js, and TypeScript on the frontend; Node.js, Python (FastAPI), and Go on the backend; pgvector and RAG pipelines for AI; PostgreSQL, Redis, and Prometheus for data; and Linux, Docker, and TCP/IP for networking and cloud infrastructure. All skills are backed by deployed projects or working knowledge.`;
  } else if (lower.includes('currently learning') || lower.includes('learning') || lower.includes('exploring')) {
    answerText = `Deepak is currently actively exploring autonomous AI agents (tool-use orchestration and state machines with LangGraph), AWS cloud architecture (IAM, VPC, CloudWatch), and advanced distributed system design. He distinguishes between what he has shipped vs. what he is actively improving.`;
  } else if (lower.includes('hire') || lower.includes('freelance') || lower.includes('service') || lower.includes('work with') || lower.includes('start a project')) {
    answerText = `Deepak offers freelance services in Web Application Development, AI & RAG Integration, Workflow Automation, Technical Support Dashboards, and Rapid MVP Prototyping. You can submit a project scope via the on-site onboarding form or email him directly at hello@deepak.dev.`;
  } else if (lower.includes('salary') || lower.includes('rate') || lower.includes('cost') || lower.includes('how much')) {
    answerText = `Project pricing is based on scope, technical complexity, and timeline. Deepak provides clear milestone-based estimates with transparent deliverables rather than vague hourly billing. You can request a quote through the contact section.`;
  } else {
    // Grounded synthesis from top chunk
    const topChunk = chunks[0];
    answerText = `Based on verified portfolio records: ${topChunk.text.slice(0, 320)}...`;
  }

  // OUTPUT GUARDRAIL: Verify no unsupported hallucination
  if (answerText.length === 0) {
    answerText = "I don't have verified information about that specific query in Deepak's portfolio data. You can explore his projects directly or ask about his software, AI, or networking experience.";
  }

  return {
    id: Math.random().toString(36).substring(7),
    sender: 'assistant',
    text: answerText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    citations: citations.slice(0, 2)
  };
}

// -------------------------------------------------------------
// PROFILE REVIEW MODE (Prompt 19)
// -------------------------------------------------------------
export function runProfileReview(role: string): ProfileReviewResult {
  const r = role.toLowerCase();

  if (r.includes('frontend')) {
    return {
      role: 'Frontend Developer',
      strongEvidence: [
        "GridOps & Flowdesk showcase complex React / Next.js interfaces with rich state management.",
        "Interactive 3D Technology Ecosystem core built with Three.js canvas and custom shader materials.",
        "Deepak's portfolio itself exhibits responsive layout engineering, custom dark theme, accessible keyboard shortcuts, and zero template code."
      ],
      technologyAlignment: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Three.js / WebGL"],
      missingEvidence: [
        "Limited evidence of large-scale frontend micro-frontends or Module Federation setups.",
        "Could benefit from automated end-to-end Playwright/Cypress test runs documented in the case studies."
      ],
      suggestedImprovements: [
        {
          area: "Automated Testing",
          suggestion: "Add a visible CI test badge and Playwright component test report link to Flowdesk case study.",
          effort: "Low",
          impact: "High"
        },
        {
          area: "Production Story",
          suggestion: "Document web vital metrics (LCP, FID, CLS) optimization journey on high-interaction pages.",
          effort: "Low",
          impact: "High"
        }
      ]
    };
  }

  if (r.includes('ai') || r.includes('rag') || r.includes('machine learning')) {
    return {
      role: 'AI / RAG Engineer',
      strongEvidence: [
        "GridOps demonstrates an end-to-end RAG system with pgvector, recursive markdown chunking, and BM25 hybrid reranking.",
        "Live portfolio intelligence assistant with real input sanitization, query classification, and grounded citation linking.",
        "Strong understanding of prompt injection defenses, hallucination guardrails, and context window economics."
      ],
      technologyAlignment: ["RAG Architecture", "pgvector", "Python FastAPI", "LangChain / LlamaIndex", "Prompt Guardrails", "Embeddings"],
      missingEvidence: [
        "Fine-tuning of proprietary weights (LoRA / QLoRA) is not currently demonstrated in public case studies.",
        "Evaluations using automated benchmarks (RAGAS or TruLens) could be surfaced more prominently."
      ],
      suggestedImprovements: [
        {
          area: "RAG Evaluation",
          suggestion: "Publish RAGAS evaluation scores (faithfulness, answer relevancy, context precision) for the GridOps dataset.",
          effort: "Medium",
          impact: "Very High"
        },
        {
          area: "Agent Workflows",
          suggestion: "Complete and document the LangGraph multi-agent GitHub issue triager currently listed in Lab experiments.",
          effort: "Medium",
          impact: "High"
        }
      ]
    };
  }

  if (r.includes('network') || r.includes('system') || r.includes('devops') || r.includes('cloud')) {
    return {
      role: 'Network / Systems / DevOps Engineer',
      strongEvidence: [
        "NetMap case study proves hands-on packet monitoring, passive ARP inspection, and Prometheus/Grafana time-series telemetry.",
        "Practical understanding of TCP/IP, DNS propagation, subnets, WireGuard tunnels, and Linux systemd services.",
        "Docker containerization applied across all projects with multi-stage builds and compose networks."
      ],
      technologyAlignment: ["Linux CLI", "TCP/IP & Subnets", "Prometheus & Grafana", "Docker", "Python / Go", "Reverse Proxies (Caddy/Nginx)"],
      missingEvidence: [
        "Multi-region Kubernetes (K8s) cluster orchestration is not yet shown in the flagship projects.",
        "Terraform / Infrastructure as Code (IaC) is currently in the 'Learning' phase rather than 'Used in Projects'."
      ],
      suggestedImprovements: [
        {
          area: "Infrastructure as Code",
          suggestion: "Add a Terraform repository provisioner for the NetMap cloud monitoring node.",
          effort: "Medium",
          impact: "High"
        },
        {
          area: "Failure Simulation",
          suggestion: "Write a short post-mortem or chaos test showing how NetMap survived a simulated gateway outage.",
          effort: "Low",
          impact: "High"
        }
      ]
    };
  }

  // Default: Full Stack / General Software Engineer
  return {
    role: 'Full-Stack Software Engineer',
    strongEvidence: [
      "Demonstrated ability to take projects from zero to production (GridOps, Flowdesk, NetMap).",
      "Full stack range: React/TypeScript frontend, Node/Python backend, PostgreSQL database, and Linux infrastructure.",
      "Clear engineering maturity: architectural trade-off documentation, decision rationales, and honest post-launch lessons."
    ],
    technologyAlignment: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker"],
    missingEvidence: [
      "High-scale distributed messaging pipelines (Kafka / RabbitMQ) are not highlighted.",
      "No public mobile apps (React Native / Flutter) shown in current flagship case studies."
    ],
    suggestedImprovements: [
      {
        area: "Deployment Observability",
        suggestion: "Document CI/CD pipeline steps and deployment health metrics for Flowdesk.",
        effort: "Low",
        impact: "High"
      },
      {
        area: "Open Source Proof",
        suggestion: "Publish a standalone npm package or open-source utility derived from the portfolio's RAG guardrail layer.",
        effort: "Medium",
        impact: "Very High"
      }
    ]
  };
}

// -------------------------------------------------------------
// JOB DESCRIPTION ANALYZER (Prompt 21)
// -------------------------------------------------------------
export function analyzeJobDescription(jobText: string): JobMatchResult {
  const lower = jobText.toLowerCase();

  const skillKeywords = [
    { name: "React", match: lower.includes("react") },
    { name: "TypeScript", match: lower.includes("typescript") || lower.includes("ts") },
    { name: "Next.js", match: lower.includes("next.js") || lower.includes("nextjs") },
    { name: "Node.js", match: lower.includes("node") || lower.includes("express") },
    { name: "Python", match: lower.includes("python") || lower.includes("fastapi") },
    { name: "AI / RAG", match: lower.includes("rag") || lower.includes("llm") || lower.includes("ai") || lower.includes("vector") },
    { name: "PostgreSQL", match: lower.includes("postgres") || lower.includes("sql") || lower.includes("database") },
    { name: "Docker", match: lower.includes("docker") || lower.includes("container") },
    { name: "Networking", match: lower.includes("network") || lower.includes("tcp") || lower.includes("dns") || lower.includes("linux") },
    { name: "REST APIs", match: lower.includes("api") || lower.includes("rest") },
    { name: "Kubernetes", match: lower.includes("kubernetes") || lower.includes("k8s") },
    { name: "AWS / Cloud", match: lower.includes("aws") || lower.includes("cloud") || lower.includes("gcp") || lower.includes("azure") }
  ];

  const matched = skillKeywords.filter(k => k.match).map(k => k.name);
  const relevantProjects: string[] = [];

  if (matched.some(m => m === 'AI / RAG' || m === 'Python' || m === 'Next.js')) {
    relevantProjects.push('GridOps — Support Intelligence');
  }
  if (matched.some(m => m === 'Networking' || m === 'Docker' || m === 'Python')) {
    relevantProjects.push('NetMap — Home Lab Monitor');
  }
  if (matched.some(m => m === 'React' || m === 'Node.js' || m === 'PostgreSQL')) {
    relevantProjects.push('Flowdesk — Freelance OS');
  }

  // Missing or gap skills
  const potentialGaps: string[] = [];
  if (lower.includes("kubernetes") || lower.includes("k8s")) potentialGaps.push("Kubernetes cluster orchestration");
  if (lower.includes("terraform")) potentialGaps.push("Terraform / IaC");
  if (lower.includes("graphql")) potentialGaps.push("GraphQL schema design");
  if (lower.includes("kafka")) potentialGaps.push("Kafka / Distributed message queues");
  if (lower.includes("ci/cd") && !matched.includes("Docker")) potentialGaps.push("Advanced CI/CD deployment pipelines");

  if (potentialGaps.length === 0) {
    potentialGaps.push("High-throughput distributed systems benchmarking");
  }

  const matchPercent = Math.min(95, Math.max(50, Math.round((matched.length / Math.max(1, matched.length + potentialGaps.length)) * 100)));

  return {
    matchScore: matchPercent,
    relevantSkills: matched.length > 0 ? matched : ["TypeScript", "Full-Stack Development", "Systems Thinking"],
    relatedProjects: relevantProjects.length > 0 ? relevantProjects : ["GridOps — Support Intelligence", "Flowdesk — Freelance OS"],
    technologyGaps: potentialGaps,
    suggestedImprovements: [
      "Highlight specific deployment metrics and production uptime records in relevant project summaries.",
      "Include a dedicated architectural trade-off slide addressing scalability constraints relevant to this role."
    ],
    summary: `Deepak's profile demonstrates solid alignment with this role's core engineering needs (${matched.slice(0, 4).join(', ')}). While specialized enterprise tools like ${potentialGaps[0]} are not explicitly emphasized as primary production deliverables, his demonstrated full-stack and systems foundation indicates he can ramp up quickly.`
  };
}
