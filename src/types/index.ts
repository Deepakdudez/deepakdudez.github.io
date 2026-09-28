export type TechStatus = 'Used in Projects' | 'Working Knowledge' | 'Currently Learning' | 'Exploring';

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI' | 'Data' | 'Networking' | 'Cloud' | 'DevOps' | 'Tools';
  status: TechStatus;
  evidence: string;
  projects: string[];
  description: string;
  learnedNext?: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: 'client' | 'service' | 'ai' | 'database' | 'infra';
  description: string;
  tech: string;
  rationale: string;
}

export interface ArchitectureFlow {
  title: string;
  description: string;
  nodes: ArchitectureNode[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  category: 'AI' | 'Networking' | 'Web Applications' | 'Automation' | 'Blockchain' | 'Data & BI' | 'Systems';
  stack: string[];
  summaryProblem: string;
  summarySolution: string;
  metrics: string[];
  imageQuery: string;
  imageUrl?: string;
  // Deep Case Study Sections (Prompt 9 & 10)
  problem: string;
  context: string;
  myRole: string;
  architecture: ArchitectureFlow;
  technologies: { name: string; role: string; why: string }[];
  challenges: { problem: string; resolution: string }[];
  decisions: { decision: string; alternativeRejected: string; rationale: string }[];
  lessons: string[];
  futureImprovements: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface FreelanceService {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  whatIBuild: string[];
  tech: string[];
  workflow: { step: string; detail: string }[];
  deliverables: string[];
  typicalTimeline: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  citations?: {
    source: string;
    section: string;
    linkId?: string;
  }[];
  isGuardrailViolation?: boolean;
}

export interface ProfileReviewResult {
  role: string;
  strongEvidence: string[];
  technologyAlignment: string[];
  missingEvidence: string[];
  suggestedImprovements: {
    area: string;
    suggestion: string;
    effort: 'Low' | 'Medium' | 'High';
    impact: 'High' | 'Very High';
  }[];
}

export interface JobMatchResult {
  matchScore: number;
  relevantSkills: string[];
  relatedProjects: string[];
  technologyGaps: string[];
  suggestedImprovements: string[];
  summary: string;
}
