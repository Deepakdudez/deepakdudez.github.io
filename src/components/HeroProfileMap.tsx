import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Code2, Network, Cloud, Briefcase, GraduationCap, BookOpen, Layers } from 'lucide-react';
import { PROFILE, PROJECTS, TECHNICAL_DNA } from '../data/portfolioData';

interface HeroProfileMapProps {
  onSelectProject?: (projectId: string) => void;
  onOpenAiAssistant?: () => void;
}

export const HeroProfileMap: React.FC<HeroProfileMapProps> = ({
  onSelectProject,
  onOpenAiAssistant,
}) => {
  const [activeNode, setActiveNode] = useState<string>('me');

  const nodes = [
    { id: 'me', label: 'Me', icon: Sparkles },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'ai', label: 'AI', icon: Cpu },
    { id: 'networking', label: 'Networking', icon: Network },
    { id: 'cloud', label: 'Cloud', icon: Cloud },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'learning', label: 'Learning', icon: BookOpen },
  ];

  const renderNodeDetails = () => {
    switch (activeNode) {
      case 'me':
        return (
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 p-6 bg-card border-t border-line animate-in fade-in duration-200">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-primary text-xs font-mono font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Identity & Engineering Mindset</span>
              </div>
              <h4 className="font-headings font-bold text-foreground text-xl">
                {PROFILE.name} — {PROFILE.role}
              </h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {PROFILE.secondaryText}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {PROFILE.trustBadges.map(b => (
                  <span key={b} className="text-xs font-medium px-2.5 py-1 rounded bg-surface border border-line text-foreground">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-surface border border-line rounded-lg p-4 min-w-[260px] flex flex-col justify-between gap-3">
              <div className="text-xs text-muted-foreground font-mono">Location & Availability</div>
              <div className="text-sm font-semibold text-foreground">{PROFILE.location}</div>
              <div className="text-xs text-primary font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                <span>Ready for remote contracts</span>
              </div>
              <button
                onClick={onOpenAiAssistant}
                className="mt-2 text-xs font-semibold bg-primary text-primary-foreground py-2 px-3 rounded hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Ask AI About Deepak</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="p-6 bg-card border-t border-line space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-primary font-mono font-semibold uppercase tracking-wider">Verified Stack</span>
                <h4 className="font-headings font-bold text-foreground text-lg">Full-Spectrum Engineering</h4>
              </div>
              <span className="text-xs text-muted-foreground font-mono">Zero arbitrary proficiency bars</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Frontend', 'Backend', 'AI & RAG', 'Systems & Infra'].map((cat, i) => (
                <div key={cat} className="p-3 bg-surface border border-line rounded-md">
                  <div className="text-xs text-accent font-mono mb-1">0{i+1}. {cat}</div>
                  <div className="text-xs text-foreground font-medium">
                    {cat === 'Frontend' ? 'React · Next.js · TypeScript' :
                     cat === 'Backend' ? 'Node.js · Python FastAPI · Go' :
                     cat === 'AI & RAG' ? 'pgvector · Chunking · Guardrails' :
                     'Linux · Docker · TCP/IP · Prometheus'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="p-6 bg-card border-t border-line space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-primary font-mono font-semibold uppercase tracking-wider">Case Studies</span>
                <h4 className="font-headings font-bold text-foreground text-lg">Real Systems Shipped</h4>
              </div>
              <span className="text-xs text-muted-foreground">Click to inspect architecture</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROJECTS.map(p => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProject?.(p.id)}
                  className="p-3 bg-surface border border-line rounded-md hover:border-primary cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-primary font-mono">{p.badge.split('—')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p.title.split('—')[0]}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.summarySolution}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="p-6 bg-card border-t border-line flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in duration-200">
            <div className="space-y-2 flex-1">
              <span className="text-xs text-primary font-mono font-semibold uppercase tracking-wider">AI Engineering</span>
              <h4 className="font-headings font-bold text-foreground text-lg">Grounded RAG & Pragmatic Workflows</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rather than toy chatbots, Deepak designs document ingestion pipelines with recursive markdown chunking, pgvector hybrid search, and strict schema guardrails that eliminate hallucinations.
              </p>
              <div className="flex gap-2 pt-1">
                <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-accent">pgvector</span>
                <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-accent">FastAPI</span>
                <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-accent">BM25 + Dense RRF</span>
              </div>
            </div>
            <button
              onClick={() => onSelectProject?.('gridops')}
              className="px-4 py-2.5 rounded-md bg-secondary border border-line hover:border-primary text-xs font-semibold text-primary flex items-center gap-2 whitespace-nowrap"
            >
              <span>Inspect GridOps Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );

      case 'networking':
        return (
          <div className="p-6 bg-card border-t border-line flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in duration-200">
            <div className="space-y-2 flex-1">
              <span className="text-xs text-warm font-mono font-semibold uppercase tracking-wider">Systems & Networking</span>
              <h4 className="font-headings font-bold text-foreground text-lg">Packet-Level Understanding</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Experienced in low-level TCP/IP, subnets, DNS resolution behavior, Wireshark troubleshooting, and edge daemon monitoring with sub-second alerting.
              </p>
              <div className="flex gap-2 pt-1">
                <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-warm">Prometheus</span>
                <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-warm">Grafana</span>
                <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-warm">WireGuard</span>
              </div>
            </div>
            <button
              onClick={() => onSelectProject?.('netmap')}
              className="px-4 py-2.5 rounded-md bg-secondary border border-line hover:border-warm text-xs font-semibold text-warm flex items-center gap-2 whitespace-nowrap"
            >
              <span>Inspect NetMap Monitor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );

      case 'cloud':
        return (
          <div className="p-6 bg-card border-t border-line space-y-3 animate-in fade-in duration-200">
            <span className="text-xs text-accent font-mono font-semibold uppercase tracking-wider">Cloud & DevOps</span>
            <h4 className="font-headings font-bold text-foreground text-lg">Reproducible Containers & CI/CD</h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              Multi-stage Docker builds, GitHub Actions pipelines with lint/typecheck/deploy stages, and Caddy reverse proxies for automated SSL certificates.
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-foreground">Docker Compose</span>
              <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-foreground">GitHub Actions</span>
              <span className="text-xs bg-surface border border-line px-2.5 py-1 rounded text-foreground">Caddy Server</span>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="p-6 bg-card border-t border-line space-y-3 animate-in fade-in duration-200">
            <span className="text-xs text-primary font-mono font-semibold uppercase tracking-wider">Career Path</span>
            <h4 className="font-headings font-bold text-foreground text-lg">Systems Freelancer & Support Engineer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              12+ delivered systems across client web applications, AI retrieval tools, and edge diagnostic daemons. Known for clear documentation and zero fluff.
            </p>
            <a href="#journey" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
              <span>View full timeline on journey page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        );

      case 'learning':
        return (
          <div className="p-6 bg-card border-t border-line space-y-3 animate-in fade-in duration-200">
            <span className="text-xs text-warm font-mono font-semibold uppercase tracking-wider">Active Growth</span>
            <h4 className="font-headings font-bold text-foreground text-lg">What I Am Improving Now</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {PROFILE.currentlyExploring.items.map(i => (
                <span key={i.name} className="text-xs bg-surface border border-line px-3 py-1.5 rounded-full text-foreground flex items-center gap-2">
                  <span className="font-semibold">{i.name}</span>
                  <span className="text-[10px] text-primary uppercase font-mono tracking-wider">{i.status}</span>
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full border-t border-line bg-surface/50">
      {/* Node selection strip matching Banani */}
      <div className="flex items-center gap-2 px-5 py-3 overflow-x-auto no-scrollbar">
        {nodes.map(node => {
          const isActive = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`font-body text-xs font-medium rounded-full px-3.5 py-1.5 whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-primary text-primary-foreground font-bold shadow-glow scale-105'
                  : 'border border-line text-muted-foreground hover:text-foreground hover:border-line/80 bg-surface'
              }`}
            >
              <node.icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
              <span>{node.label}</span>
            </button>
          );
        })}
      </div>

      {/* Expandable node details */}
      {renderNodeDetails()}
    </div>
  );
};
