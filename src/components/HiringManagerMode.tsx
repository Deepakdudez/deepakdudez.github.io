import React from 'react';
import { Sparkles, Check, ArrowRight, X, Clock } from 'lucide-react';

interface HiringManagerModeProps {
  activeRoleFilter: string | null;
  onSelectRoleFilter: (role: string | null) => void;
  onOpenCaseStudy: (projectId: string) => void;
  onOpenHireModal: () => void;
}

export const HiringManagerMode: React.FC<HiringManagerModeProps> = ({
  activeRoleFilter,
  onSelectRoleFilter,
  onOpenCaseStudy,
  onOpenHireModal
}) => {
  const roles = [
    { id: 'ai', label: 'AI & RAG Systems', project: 'gridops', proof: 'GridOps case study + pgvector retriever' },
    { id: 'fullstack', label: 'Full-Stack Software', project: 'flowdesk', proof: 'Flowdesk OS + React / Node / Postgres' },
    { id: 'networking', label: 'Networking & Infra', project: 'netmap', proof: 'NetMap monitor + Prometheus / TCP/IP' },
    { id: 'cloud', label: 'Cloud & DevOps', project: 'gridops', proof: 'Docker Compose + CI/CD pipelines' },
    { id: 'freelance', label: 'Freelance MVP Build', project: 'flowdesk', proof: 'Fast prototype to paid delivery' }
  ];

  if (!activeRoleFilter) return null;

  const currentRole = roles.find(r => r.id === activeRoleFilter) || roles[0];

  return (
    <div className="w-full bg-secondary/90 border border-primary/40 rounded-xl p-5 mb-8 animate-in slide-in-from-top-2 duration-300 shadow-glow">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headings font-bold text-foreground text-base">
                Hiring Manager Fast-Track: {currentRole.label}
              </span>
              <span className="text-[10px] font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded font-bold">
                60-SEC VIEW
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              Filtering portfolio down to verified evidence relevant to your open role.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectRoleFilter(null)}
          className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 bg-surface border border-line px-2.5 py-1.5 rounded transition-colors self-end md:self-auto"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit Filter</span>
        </button>
      </div>

      {/* Role filter pills */}
      <div className="flex flex-wrap items-center gap-2 pt-3">
        <span className="text-xs font-mono text-muted-foreground mr-1">Target focus:</span>
        {roles.map(r => (
          <button
            key={r.id}
            onClick={() => onSelectRoleFilter(r.id)}
            className={`text-xs font-mono px-3 py-1 rounded-md border transition-all ${
              activeRoleFilter === r.id
                ? 'bg-primary text-primary-foreground border-primary font-bold'
                : 'bg-surface border-line text-muted-foreground hover:text-foreground'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Fast-track quick evidence strip */}
      <div className="mt-4 bg-surface border border-line rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
            Primary Demonstration:
          </span>
          <div className="text-xs text-foreground font-medium">
            {currentRole.proof}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenCaseStudy(currentRole.project)}
            className="px-3.5 py-1.5 rounded bg-card border border-line hover:border-primary text-xs font-semibold text-primary flex items-center gap-1.5 transition-colors"
          >
            <span>Inspect Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenHireModal}
            className="px-3.5 py-1.5 rounded bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            <span>Book Intro Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
