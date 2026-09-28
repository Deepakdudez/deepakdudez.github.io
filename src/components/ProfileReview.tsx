import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { runProfileReview } from '../services/ragEngine';
import { ProfileReviewResult } from '../types';

interface ProfileReviewProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const ProfileReview: React.FC<ProfileReviewProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const roles = [
    'Frontend Developer',
    'AI / RAG Engineer',
    'Full-Stack Software Engineer',
    'Network / Systems / DevOps',
    'Freelance Consultant'
  ];

  const [selectedRole, setSelectedRole] = useState<string>(roles[0]);
  const [reviewResult, setReviewResult] = useState<ProfileReviewResult>(runProfileReview(roles[0]));

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setReviewResult(runProfileReview(role));
  };

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
        className="relative w-full max-w-3xl bg-card border border-line rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface/90 sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-headings font-bold text-foreground text-lg">
              Profile Review Mode
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
          {/* Question Prompt */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
              Step 01 — Target Role
            </span>
            <h4 className="font-headings font-bold text-foreground text-xl">
              What kind of role are you reviewing Deepak for?
            </h4>
            <p className="text-xs text-muted-foreground">
              The AI analyzer evaluates verified portfolio records against standard industry requirements for that role.
            </p>
          </div>

          {/* Role Pill Selectors */}
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`text-xs font-medium px-3.5 py-2 rounded-md border transition-all ${
                  selectedRole === role
                    ? 'bg-primary text-primary-foreground border-primary font-bold shadow-glow'
                    : 'bg-surface border-line text-muted-foreground hover:text-foreground hover:border-line/80'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Review Results */}
          <div className="space-y-6 pt-4 border-t border-line">
            {/* Strong Evidence */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strong Evidence Demonstrated</span>
              </div>
              <div className="space-y-2">
                {reviewResult.strongEvidence.map((item, i) => (
                  <div key={i} className="bg-surface border border-line rounded-lg p-3 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Alignment */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider block">
                Technology Alignment
              </span>
              <div className="flex flex-wrap gap-2">
                {reviewResult.technologyAlignment.map((tech) => (
                  <span key={tech} className="bg-surface border border-line px-3 py-1 rounded text-xs font-mono text-accent">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Evidence */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-warm font-mono text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Missing or Under-Demonstrated Evidence</span>
              </div>
              <div className="space-y-2">
                {reviewResult.missingEvidence.map((item, i) => (
                  <div key={i} className="bg-surface border border-line rounded-lg p-3 text-xs text-muted-foreground leading-relaxed flex items-start gap-2.5">
                    <span className="text-warm font-bold mt-0.5">!</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Improvements */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Concrete Suggested Improvements</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reviewResult.suggestedImprovements.map((imp, i) => (
                  <div key={i} className="bg-surface border border-line rounded-lg p-4 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-accent font-semibold">{imp.area}</span>
                        <span className="text-muted-foreground">Impact: <span className="text-primary font-bold">{imp.impact}</span></span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed">
                        {imp.suggestion}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground pt-2 border-t border-line/60">
                      Effort to add: <span className="text-foreground">{imp.effort}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-line flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-surface border border-line hover:border-primary rounded-md text-xs font-semibold text-foreground transition-colors"
            >
              Done Reviewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
