import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldAlert, Cpu, Layers, HelpCircle, Lightbulb, GitBranch, Terminal } from 'lucide-react';
import { ProjectCaseStudy } from '../types';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onOpenHireModal: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenHireModal
}) => {
  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-card border border-line rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface/90 sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-primary bg-secondary px-2.5 py-1 rounded border border-line">
              {project.badge}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              Case Study Explorer
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md border border-line text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-10 font-body">
          {/* Top Hero Banner */}
          <div className="space-y-3 border-b border-line pb-6">
            <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight">
              {project.title}
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
              {project.stack.map(tech => (
                <span key={tech} className="bg-surface border border-line px-3 py-1 rounded text-accent">
                  {tech}
                </span>
              ))}
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {project.metrics.map((m, i) => (
                <div key={i} className="bg-surface border border-line rounded-lg p-3 text-center">
                  <span className="font-mono text-xs text-primary font-bold">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 01 — Problem & 02 — Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-line rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2 text-warm font-mono text-xs font-bold uppercase tracking-wider">
                <span>01 — Problem</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="bg-surface border border-line rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
                <span>02 — Context</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {project.context}
              </p>
            </div>
          </div>

          {/* 03 — My Role */}
          <div className="bg-surface border border-primary/40 rounded-lg p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <span>03 — My Contribution & Role</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {project.myRole}
            </p>
          </div>

          {/* 04 — Interactive Architecture Diagram */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <span>04 — Systems Architecture</span>
            </div>
            <ArchitectureDiagram flow={project.architecture} />
          </div>

          {/* 05 — Technology Stack Rationale */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <span>05 — Technology Choices & Purpose</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.technologies.map(t => (
                <div key={t.name} className="bg-surface border border-line rounded-md p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headings font-bold text-foreground text-sm">{t.name}</span>
                    <span className="font-mono text-[11px] text-accent">{t.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 06 — Real Technical Challenges */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-warm font-mono text-xs font-bold uppercase tracking-wider">
              <span>06 — Technical Challenges Solved</span>
            </div>
            <div className="space-y-3">
              {project.challenges.map((c, i) => (
                <div key={i} className="bg-surface border border-line rounded-lg p-4 space-y-2">
                  <div className="text-xs font-mono text-warm font-semibold">
                    Challenge {i + 1}: {c.problem}
                  </div>
                  <div className="text-xs text-foreground/90 pl-3 border-l-2 border-primary">
                    <span className="font-semibold text-primary">Resolution: </span>
                    {c.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 07 — Architectural Decisions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <span>07 — Architectural Decisions & Trade-Offs</span>
            </div>
            <div className="space-y-3">
              {project.decisions.map((d, i) => (
                <div key={i} className="bg-surface border border-line rounded-lg p-4 space-y-1.5 font-body text-xs">
                  <div className="font-headings font-bold text-foreground text-sm flex items-center justify-between">
                    <span>{d.decision}</span>
                    <span className="font-mono text-[11px] text-muted-foreground line-through">
                      Instead of: {d.alternativeRejected}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-primary font-semibold">Why: </span>{d.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 08 — Lessons & 09 — Future Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-surface border border-line rounded-lg p-5 space-y-3">
              <div className="text-xs font-mono text-accent font-bold uppercase tracking-wider">
                08 — Lessons Learned
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {project.lessons.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-line rounded-lg p-5 space-y-3">
              <div className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                09 — Future Improvements
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {project.futureImprovements.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Case Study Footer CTA */}
          <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              Interested in similar architecture for your company?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenHireModal();
              }}
              className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-primary/90 transition-all shadow-glow flex items-center gap-2"
            >
              <span>Discuss This Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
