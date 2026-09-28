import React, { useState } from 'react';
import { ArrowRight, BookOpen, Layers, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Terminal } from 'lucide-react';
import { PROFILE, TIMELINE_EVENTS } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-12" id="journey">
      {/* Section Heading */}
      <div className="flex flex-col gap-3 max-w-[720px] items-start">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-primary inline-block" />
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
            02 — Journey & Philosophy
          </span>
        </div>
        <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight tracking-tight">
          How I think about systems
        </h2>
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          Understanding software means knowing what happens above the interface and below the operating system kernel.
        </p>
      </div>

      {/* First-person story card */}
      <div className="bg-card border border-line rounded-xl p-6 sm:p-8 space-y-4 shadow-glow">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>My Story in Engineering</span>
        </div>
        <p className="font-body text-base text-foreground leading-relaxed">
          {PROFILE.story}
        </p>
      </div>

      {/* 4 Core Beliefs from Prompt 8 */}
      <div className="space-y-4">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          What I Believe
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILE.beliefs.map((belief, idx) => (
            <div key={idx} className="bg-surface border border-line rounded-lg p-5 space-y-2 hover:border-line/80 transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h4 className="font-headings font-bold text-foreground text-base">
                  {belief.title}
                </h4>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed pl-4">
                {belief.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chronological Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Career Timeline & Milestones
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Click any period to expand details
          </span>
        </div>

        <div className="space-y-3">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => toggleExpand(idx)}
                className={`bg-card border rounded-lg p-5 transition-all duration-200 cursor-pointer ${
                  isExpanded ? 'border-primary bg-surface' : 'border-line hover:border-line/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <div>
                      <div className="font-headings font-bold text-foreground text-base">
                        {event.title}
                      </div>
                      <span className="font-mono text-xs text-accent">
                        {event.year} · {event.category}
                      </span>
                    </div>
                  </div>

                  <button className="text-muted-foreground hover:text-foreground">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="pt-4 mt-3 border-t border-line text-xs font-body text-muted-foreground space-y-2 animate-in fade-in duration-150">
                    <p className="leading-relaxed text-foreground">
                      {event.desc}
                    </p>
                    <div className="font-mono text-[11px] text-primary font-semibold">
                      Milestone: {event.highlight}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
