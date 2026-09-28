import React from 'react';
import { ArrowRight, Layers, Sparkles, Terminal, Activity, FileCode } from 'lucide-react';
import { ProjectCaseStudy } from '../types';

interface ProjectCardProps {
  project: ProjectCaseStudy;
  index: number;
  onOpenCaseStudy: (project: ProjectCaseStudy) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onOpenCaseStudy,
}) => {
  const numString = `0${index + 1}`;

  // Visual header representation if external image is not loaded
  const renderVisualHeader = () => {
    if (project.id === 'gridops') {
      return (
        <div className="w-full aspect-video bg-gradient-to-br from-surface via-card to-background relative overflow-hidden flex items-center justify-center p-6 border-b border-line group-hover:border-primary/50 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#D7FF3E_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <div className="w-full max-w-sm bg-surface/90 border border-line rounded-lg p-4 shadow-xl space-y-3 z-10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[11px] font-mono text-primary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                RAG TRIAGE ACTIVE
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">LATENCY: 182ms</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-3/4 bg-line rounded" />
              <div className="h-2 w-full bg-surface border border-line rounded" />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded">pgvector: 98% MATCH</span>
              <span className="text-[10px] font-mono bg-accent/20 text-accent px-2 py-0.5 rounded">GROUNDED</span>
            </div>
          </div>
        </div>
      );
    }

    if (project.id === 'netmap') {
      return (
        <div className="w-full aspect-video bg-gradient-to-br from-surface via-card to-background relative overflow-hidden flex items-center justify-center p-6 border-b border-line group-hover:border-warm/50 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#8AB4FF_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <div className="w-full max-w-sm bg-surface/90 border border-line rounded-lg p-4 shadow-xl space-y-3 z-10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[11px] font-mono text-warm flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-warm" />
                12 LAB NODES LIVE
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">LOSS: 0.0%</span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1 font-mono text-[10px]">
              <div className="flex-1 bg-surface border border-line p-1.5 rounded text-center">
                <span className="text-muted-foreground block">DNS</span>
                <span className="text-foreground font-semibold">1.4ms</span>
              </div>
              <div className="flex-1 bg-surface border border-line p-1.5 rounded text-center">
                <span className="text-muted-foreground block">GW PING</span>
                <span className="text-primary font-semibold">0.8ms</span>
              </div>
              <div className="flex-1 bg-surface border border-line p-1.5 rounded text-center">
                <span className="text-muted-foreground block">OVERHEAD</span>
                <span className="text-warm font-semibold">&lt;0.2%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Flowdesk
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-surface via-card to-background relative overflow-hidden flex items-center justify-center p-6 border-b border-line group-hover:border-accent/50 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(#F2F1EA_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
        <div className="w-full max-w-sm bg-surface/90 border border-line rounded-lg p-4 shadow-xl space-y-3 z-10 backdrop-blur">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <span className="text-[11px] font-mono text-accent flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-accent" />
              INVOICE #2026-081
            </span>
            <span className="text-[10px] font-mono text-primary font-bold">PAID ($2,400)</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Milestone 02 Delivery</span>
              <span className="text-foreground">Approved ✓</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Stripe Payout</span>
              <span className="text-primary">Instant</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-line rounded-lg overflow-hidden flex flex-col hover:border-primary/80 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-glow group">
      {/* Visual Header */}
      {renderVisualHeader()}

      {/* Card Content matching Banani */}
      <div className="p-7 flex flex-col gap-4 flex-1">
        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-primary tracking-widest">
            {numString}
          </span>
          <span className="font-body text-xs text-muted-foreground border border-line rounded-md px-2.5 py-1">
            {project.badge}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-headings font-bold text-foreground text-2xl leading-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Tech Tags in Accent Blue */}
        <div className="font-mono text-xs text-accent font-medium">
          {project.stack.join(' · ')}
        </div>

        {/* Side-by-side Problem vs Solution from Banani */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-1">
          {/* Problem Box */}
          <div className="bg-surface border border-line rounded-md p-4">
            <div className="font-mono text-xs font-bold text-warm uppercase tracking-wider mb-1.5">
              Problem
            </div>
            <div className="font-body text-xs text-foreground leading-relaxed line-clamp-3">
              {project.summaryProblem}
            </div>
          </div>

          {/* Solution Box */}
          <div className="bg-surface border border-line rounded-md p-4">
            <div className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
              Solution
            </div>
            <div className="font-body text-xs text-foreground leading-relaxed line-clamp-3">
              {project.summarySolution}
            </div>
          </div>
        </div>

        {/* Bottom CTA row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-line mt-auto gap-2">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="font-body text-sm font-semibold text-foreground hover:text-primary flex items-center gap-2 group-hover:underline transition-colors"
          >
            <span>Open case study</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </button>
          
          <span className="font-mono text-[11px] text-muted-foreground">
            Architecture · Decisions · Lessons →
          </span>
        </div>
      </div>
    </div>
  );
};
