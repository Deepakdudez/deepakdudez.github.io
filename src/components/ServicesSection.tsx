import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Layers, Sparkles, Zap, Code, ShieldCheck } from 'lucide-react';
import { FREELANCE_SERVICES } from '../data/portfolioData';
import { FreelanceService } from '../types';

interface ServicesSectionProps {
  onStartProject: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onStartProject }) => {
  const [selectedService, setSelectedService] = useState<FreelanceService>(FREELANCE_SERVICES[0]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Top Section Intro */}
      <div className="flex flex-col gap-3 max-w-[720px] items-start">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-primary inline-block" />
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
            05 — Freelance services
          </span>
        </div>
        <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight tracking-tight">
          Have a problem? Let’s turn it into something useful.
        </h2>
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          I work directly with founders, product teams, and businesses to design, engineer, and deploy resilient digital systems.
        </p>
      </div>

      {/* Services Grid (6 services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FREELANCE_SERVICES.map((srv) => {
          const isSelected = selectedService.id === srv.id;

          return (
            <div
              key={srv.id}
              onClick={() => setSelectedService(srv)}
              className={`bg-card border rounded-lg p-6 flex flex-col justify-between gap-5 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-primary shadow-glow bg-surface scale-[1.01]'
                  : 'border-line hover:border-line/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-accent uppercase tracking-wider font-semibold">
                    {srv.category}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {srv.typicalTimeline}
                  </span>
                </div>

                <h3 className="font-headings font-bold text-foreground text-xl leading-snug">
                  {srv.title}
                </h3>

                <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {srv.tagline}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-line">
                <div className="flex flex-wrap gap-1.5">
                  {srv.tech.slice(0, 4).map(t => (
                    <span key={t} className="text-[10px] font-mono bg-surface border border-line px-2 py-0.5 rounded text-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-primary' : 'text-muted-foreground'}>
                    {isSelected ? 'Viewing Details Below' : 'View Workflow & Deliverables'}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Service Deep Breakdown Drawer */}
      <div className="bg-card border border-primary/50 rounded-xl p-6 sm:p-8 space-y-6 shadow-glow animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
              Service Deep-Dive: {selectedService.category}
            </span>
            <h3 className="font-headings font-bold text-foreground text-2xl mt-1">
              {selectedService.title}
            </h3>
          </div>

          <button
            onClick={() => onStartProject(selectedService.title)}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-md hover:bg-primary/90 transition-all shadow-glow flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Start a {selectedService.title.split(' ')[0]} Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Problem Addressed */}
        <div className="bg-surface border border-line rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-mono text-warm font-bold uppercase tracking-wider">
            Problem Addressed
          </span>
          <p className="text-xs text-foreground leading-relaxed">
            {selectedService.problem}
          </p>
        </div>

        {/* 4-Step Engineering Workflow */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider block">
            Typical 4-Step Engineering Workflow
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedService.workflow.map((w, idx) => (
              <div key={idx} className="bg-surface border border-line rounded-lg p-4 space-y-1.5 flex flex-col justify-between">
                <span className="font-mono text-xs font-bold text-primary">{w.step}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {w.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What I Build & Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-surface border border-line rounded-lg p-5 space-y-3">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
              What I Build
            </span>
            <ul className="space-y-2 text-xs text-foreground">
              {selectedService.whatIBuild.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface border border-line rounded-lg p-5 space-y-3">
            <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider">
              Guaranteed Deliverables
            </span>
            <ul className="space-y-2 text-xs text-foreground">
              {selectedService.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
