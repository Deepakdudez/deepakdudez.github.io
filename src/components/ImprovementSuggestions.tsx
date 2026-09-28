import React, { useState } from 'react';
import { X, Lightbulb, ArrowRight, CheckCircle2, Sliders } from 'lucide-react';

interface ImprovementSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({
  isOpen,
  onClose
}) => {
  const categories = [
    'Projects',
    'AI & RAG',
    'Networking',
    'Cloud & DevOps',
    'Resume',
    'Portfolio UI',
    'Freelancing'
  ];

  const [activeCategory, setActiveCategory] = useState<string>('Projects');

  const suggestionsData: Record<string, {
    title: string;
    why: string;
    recommended: string;
    tech: string;
    effort: 'Low' | 'Medium' | 'High';
    impact: 'High' | 'Very High';
    nextStep: string;
  }> = {
    'Projects': {
      title: 'Add live interactive staging sandboxes to project case studies.',
      why: 'Hiring managers and clients prefer testing a live demo in under 15 seconds rather than reading descriptions alone.',
      recommended: 'Deploy lightweight demo instances of GridOps triage and NetMap topology on public staging subdomains.',
      tech: 'Docker + Fly.io / Caddy / Cloudflare Tunnels',
      effort: 'Medium',
      impact: 'Very High',
      nextStep: 'Spin up a containerized demo instance of GridOps with anonymized sample docs.'
    },
    'AI & RAG': {
      title: 'Document quantitative RAG evaluation benchmarks.',
      why: 'Anyone can build a basic LangChain wrapper, but serious AI engineers benchmark precision, retrieval recall, and answer faithfulness.',
      recommended: 'Implement an automated test suite with RAGAS or TruLens calculating groundedness scores on 50 sample support queries.',
      tech: 'RAGAS + Python + Synthetic Testset Generation',
      effort: 'Medium',
      impact: 'Very High',
      nextStep: 'Write an evaluation script testing GridOps context retrieval with synthetic edge queries.'
    },
    'Networking': {
      title: 'Document an automated network chaos test.',
      why: 'Proving that a monitoring tool can catch silent packet drops and DNS blackouts under actual partition stress demonstrates real-world reliability.',
      recommended: 'Simulate simulated router resets and interface link flaps with NetEm or iptables packet drop rules, logging NetMap alert latency.',
      tech: 'Linux NetEm + iptables + Grafana Annotations',
      effort: 'Low',
      impact: 'High',
      nextStep: 'Run a 30-second 10% packet drop simulation and capture the Grafana threshold trigger in the NetMap case study.'
    },
    'Cloud & DevOps': {
      title: 'Convert manual server setups into Terraform infrastructure as code.',
      why: 'Engineering leads value reproducible cloud environments where infrastructure changes are tracked in version control.',
      recommended: 'Write Terraform modules provisioning an AWS VPC with public/private subnets and an EC2 Docker host.',
      tech: 'Terraform + AWS VPC + GitHub Actions',
      effort: 'Medium',
      impact: 'High',
      nextStep: 'Publish a clean GitHub repository containing the NetMap cloud monitoring Terraform recipe.'
    },
    'Resume': {
      title: 'Add 1-click printable clean PDF version with matching typography.',
      why: 'Recruiters frequently share PDFs in hiring committee Slack channels without opening web links.',
      recommended: 'Provide both online searchable mode and an ATS-friendly single-page PDF download.',
      tech: 'Tailwind Print Stylesheet + Clean ATS Schema',
      effort: 'Low',
      impact: 'High',
      nextStep: 'Use the on-site resume export to download an instant PDF.'
    },
    'Portfolio UI': {
      title: 'Maintain strict accessibility contrast and reduced motion options.',
      why: 'High-contrast dark interfaces must remain legible across diverse displays and respect system accessibility preferences.',
      recommended: 'Enforce WCAG AAA contrast ratios and respect prefers-reduced-motion for all 3D canvas loops.',
      tech: 'CSS Media Queries + Accessible Color Tokens',
      effort: 'Low',
      impact: 'High',
      nextStep: 'Continuously verify Lighthouse accessibility scores above 95+.'
    },
    'Freelancing': {
      title: 'Add clear client milestone scopes and sample contract templates.',
      why: 'Clients want to know what working with you actually looks like from day 1 to final handover.',
      recommended: 'Include sample milestone delivery schedules and clear deliverables checklists for each service.',
      tech: 'Flowdesk Client Flow + Milestone Breakdown',
      effort: 'Low',
      impact: 'Very High',
      nextStep: 'Review the updated Services page which now features structured 4-step workflows for every service.'
    }
  };

  const current = suggestionsData[activeCategory] || suggestionsData['Projects'];

  React.useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-card border border-line rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface/90 sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="font-headings font-bold text-foreground text-lg">
              Technical Improvement System
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md border border-line text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-body">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Select a domain to see concrete, evidence-based improvement roadmaps that would strengthen Deepak's engineering profile:
          </p>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary font-bold shadow-glow'
                    : 'bg-surface border-line text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Structured Suggestion Report matching Prompt 20 */}
          <div className="bg-surface border border-line rounded-lg p-6 space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider block mb-1">
                Recommended Technical Improvement
              </span>
              <h4 className="font-headings font-bold text-foreground text-lg leading-snug">
                {current.title}
              </h4>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-warm font-semibold">Why this matters:</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {current.why}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-accent font-semibold">Specific Approach:</span>
              <p className="text-xs text-foreground leading-relaxed">
                {current.recommended}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-line/60 font-mono text-xs">
              <div className="bg-card border border-line p-2.5 rounded">
                <span className="text-muted-foreground block text-[10px]">Technology</span>
                <span className="text-foreground font-semibold truncate block">{current.tech}</span>
              </div>
              <div className="bg-card border border-line p-2.5 rounded">
                <span className="text-muted-foreground block text-[10px]">Effort</span>
                <span className="text-warm font-bold">{current.effort}</span>
              </div>
              <div className="bg-card border border-line p-2.5 rounded">
                <span className="text-muted-foreground block text-[10px]">Impact</span>
                <span className="text-primary font-bold">{current.impact}</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted-foreground font-mono">
              <span className="text-foreground font-semibold">Next Step: </span>
              {current.nextStep}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-surface border border-line hover:border-primary rounded-md text-xs font-semibold text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
