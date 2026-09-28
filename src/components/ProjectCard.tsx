import React from 'react';
import { ArrowRight, Sparkles, Terminal, Activity, FileCode, Cpu, Layers, BarChart3, ShieldCheck, ExternalLink } from 'lucide-react';
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

  // Custom visual header for each project
  const renderVisualHeader = () => {
    if (project.id === 'agentic-ai-cloud') {
      return (
        <div className="w-full aspect-video bg-gradient-to-br from-surface via-card to-background relative overflow-hidden flex items-center justify-center p-6 border-b border-line group-hover:border-primary/50 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#D7FF3E_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <div className="w-full max-w-sm bg-surface/90 border border-line rounded-lg p-4 shadow-xl space-y-3 z-10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[11px] font-mono text-primary flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AGENTIC AI // AWS SYNTHESIZER
              </span>
              <span className="text-[10px] font-mono text-accent">SPRING BOOT API</span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between text-muted-foreground">
                <span>Prompt Decomposition</span>
                <span className="text-primary font-bold">4 Sub-Agents Chained</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>AWS Topology Mapping</span>
                <span className="text-foreground">EC2 · S3 · Lambda · VPC</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">LLM ORCHESTRATION</span>
              <span className="text-[10px] font-mono bg-accent/20 text-accent px-2 py-0.5 rounded font-bold">AWS READY</span>
            </div>
          </div>
        </div>
      );
    }

    if (project.id === 'decentralized-grid') {
      return (
        <div className="w-full aspect-video bg-gradient-to-br from-surface via-card to-background relative overflow-hidden flex items-center justify-center p-6 border-b border-line group-hover:border-accent/50 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#8AB4FF_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <div className="w-full max-w-sm bg-surface/90 border border-line rounded-lg p-4 shadow-xl space-y-3 z-10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[11px] font-mono text-accent flex items-center gap-1.5 font-bold">
                <Activity className="w-3.5 h-3.5 text-accent animate-pulse" />
                ICP BLOCKCHAIN CANISTER
              </span>
              <span className="text-[10px] font-mono text-primary font-bold">LIVE ON WEB3</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
              <div className="bg-surface border border-line p-1.5 rounded text-center">
                <span className="text-muted-foreground block text-[9px]">SOLAR</span>
                <span className="text-primary font-bold">14.2 kWh</span>
              </div>
              <div className="bg-surface border border-line p-1.5 rounded text-center">
                <span className="text-muted-foreground block text-[9px]">STORAGE</span>
                <span className="text-accent font-bold">92% BATT</span>
              </div>
              <div className="bg-surface border border-line p-1.5 rounded text-center">
                <span className="text-muted-foreground block text-[9px]">P2P PEERS</span>
                <span className="text-foreground font-bold">8 NODES</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (project.id === 'sales-bi-analytics') {
      return (
        <div className="w-full aspect-video bg-gradient-to-br from-surface via-card to-background relative overflow-hidden flex items-center justify-center p-6 border-b border-line group-hover:border-warm/50 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#FFC46B_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <div className="w-full max-w-sm bg-surface/90 border border-line rounded-lg p-4 shadow-xl space-y-3 z-10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[11px] font-mono text-warm flex items-center gap-1.5 font-bold">
                <BarChart3 className="w-3.5 h-3.5 text-warm" />
                POWER BI // SQL PIPELINE
              </span>
              <span className="text-[10px] font-mono text-foreground">STAR SCHEMA</span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between text-muted-foreground">
                <span>SQL Transformations</span>
                <span className="text-warm font-semibold">CTEs &amp; Window Functions</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Executive Metric</span>
                <span className="text-primary font-semibold">YoY Profit Margins</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono bg-warm/20 text-warm px-2 py-0.5 rounded font-bold">ETL VERIFIED</span>
              <span className="text-[10px] font-mono bg-surface border border-line text-foreground px-2 py-0.5 rounded">DAX MEASURES</span>
            </div>
          </div>
        </div>
      );
    }

    // Windows SysAdmin Lab
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-surface via-card to-background relative overflow-hidden flex items-center justify-center p-6 border-b border-line group-hover:border-primary/50 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(#F2F1EA_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
        <div className="w-full max-w-sm bg-surface/90 border border-line rounded-lg p-4 shadow-xl space-y-3 z-10 backdrop-blur">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <span className="text-[11px] font-mono text-primary flex items-center gap-1.5 font-bold">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              VMWARE IT LAB // SYSADMIN
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">TCP/IP &amp; DNS</span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Incident Triage</span>
              <span className="text-primary font-bold">&lt;15 min Resolution</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>DHCP &amp; Active Directory</span>
              <span className="text-foreground">Zero Permission Drift</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={() => onOpenCaseStudy(project)}
      className="bg-card border border-line rounded-xl overflow-hidden flex flex-col justify-between hover:border-primary/80 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-2xl hover:translate-y-[-2px]"
    >
      <div>
        {/* Dynamic Visual Banner */}
        {renderVisualHeader()}

        {/* Content Area */}
        <div className="p-6 space-y-4">
          {/* Top metadata tags */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-primary font-bold">
              {numString} // {project.category.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground border border-line bg-surface/80 rounded px-2 py-0.5">
              {project.badge.split('—')[0]}
            </span>
          </div>

          {/* Project Title and Live Demo indicator */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-headings font-bold text-foreground text-xl leading-snug group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
                  title="Open Live Deployment"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Metrics Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="font-mono text-[10px] text-foreground bg-surface border border-line rounded px-2 py-1"
              >
                ✓ {metric}
              </span>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] text-muted-foreground bg-surface/50 border border-line/60 rounded px-1.5 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Call to Action */}
      <div className="p-6 pt-0">
        <div className="border-t border-line/60 pt-4 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
          <span className="font-medium">View full case study</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
