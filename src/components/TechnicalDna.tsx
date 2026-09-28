import React, { useState } from 'react';
import { Monitor, Server, Brain, Database, Cloud, Network, Shield, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { TECHNICAL_DNA } from '../data/portfolioData';
import { TechItem } from '../types';

interface TechnicalDnaProps {
  onOpenCaseStudyForProject?: (projectName: string) => void;
}

export const TechnicalDna: React.FC<TechnicalDnaProps> = ({ onOpenCaseStudyForProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend');

  const domainTabs = [
    { id: 'Frontend', label: 'Frontend', icon: Monitor, sub: 'React · Next.js', status: 'Used in projects' },
    { id: 'Backend', label: 'Backend', icon: Server, sub: 'Node · Python', status: 'Explore' },
    { id: 'AI', label: 'AI', icon: Brain, sub: 'RAG · Agents', status: 'Explore' },
    { id: 'Data', label: 'Data', icon: Database, sub: 'Postgres · Redis', status: 'Explore' },
    { id: 'Networking', label: 'Networking', icon: Network, sub: 'TCP/IP · Linux', status: 'Explore' },
    { id: 'Cloud', label: 'Cloud', icon: Cloud, sub: 'Docker · CI/CD', status: 'Explore' },
  ];

  const filteredItems = TECHNICAL_DNA.filter(item => {
    if (selectedCategory === 'Cloud') return item.category === 'Cloud' || item.category === 'DevOps';
    return item.category === selectedCategory;
  });

  const getStatusBadge = (status: TechItem['status']) => {
    switch (status) {
      case 'Used in Projects':
        return <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded">Used in Projects</span>;
      case 'Working Knowledge':
        return <span className="font-mono text-[11px] font-semibold text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded">Working Knowledge</span>;
      case 'Currently Learning':
        return <span className="font-mono text-[11px] font-semibold text-warm bg-warm/10 border border-warm/30 px-2 py-0.5 rounded">Currently Learning</span>;
      case 'Exploring':
        return <span className="font-mono text-[11px] font-medium text-muted-foreground bg-surface border border-line px-2 py-0.5 rounded">Exploring</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Interactive Domain Selector matching Banani DnaAi.jsx */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full">
        {domainTabs.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`rounded-lg border p-4 flex flex-col gap-3 text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-primary border-primary text-primary-foreground shadow-glow scale-[1.02]'
                  : 'bg-card border-line hover:border-line/80 text-foreground'
              }`}
            >
              <span className={isSelected ? 'text-primary-foreground' : 'text-primary'}>
                <Icon className="w-5 h-5 stroke-[2.4]" />
              </span>

              <div>
                <div className={`font-headings font-bold text-base ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {tab.label}
                </div>
                <div className={`font-body text-xs mt-1 ${isSelected ? 'text-primary-foreground opacity-80' : 'text-muted-foreground'}`}>
                  {tab.sub}
                </div>
              </div>

              <div className={`font-mono text-xs font-semibold mt-auto flex items-center justify-between ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                <span>{isSelected ? 'Active domain' : `${tab.status} →`}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Domain Evidence List */}
      <div className="bg-card border border-line rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h4 className="font-headings font-bold text-foreground text-lg">
              Verified Proof: {selectedCategory} Domain
            </h4>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {filteredItems.length} documented technologies
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((tech) => (
            <div key={tech.name} className="bg-surface border border-line rounded-lg p-4 flex flex-col justify-between gap-3 hover:border-line/80 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h5 className="font-headings font-bold text-foreground text-base">
                    {tech.name}
                  </h5>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {tech.description}
                  </p>
                </div>
                {getStatusBadge(tech.status)}
              </div>

              <div className="pt-2 border-t border-line/60 flex flex-col gap-1.5 font-body text-xs">
                <div className="text-muted-foreground">
                  <span className="text-foreground font-semibold">Evidence: </span>
                  {tech.evidence}
                </div>

                {tech.projects.length > 0 && (
                  <div className="flex items-center gap-2 pt-1 font-mono text-[11px]">
                    <span className="text-muted-foreground">Used in:</span>
                    {tech.projects.map(p => (
                      <button
                        key={p}
                        onClick={() => onOpenCaseStudyForProject?.(p)}
                        className="text-primary hover:underline font-semibold bg-secondary px-2 py-0.5 rounded border border-line"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                {tech.learnedNext && (
                  <div className="text-warm font-mono text-[11px] pt-1">
                    ↳ Next goal: {tech.learnedNext}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
