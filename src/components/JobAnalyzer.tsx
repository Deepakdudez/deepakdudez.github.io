import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { analyzeJobDescription } from '../services/ragEngine';
import { JobMatchResult } from '../types';

interface JobAnalyzerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudyForProject?: (projectName: string) => void;
}

export const JobAnalyzer: React.FC<JobAnalyzerProps> = ({
  isOpen,
  onClose,
  onOpenCaseStudyForProject
}) => {
  const [jobText, setJobText] = useState('');
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleJob = `Looking for a Full-Stack / AI Systems Engineer to join our core team. 
Must have strong experience with React, Next.js, and TypeScript.
Hands-on knowledge of Python, REST APIs, and vector databases (pgvector/Pinecone) for building RAG pipelines.
Familiarity with Docker, Linux system administration, and basic Kubernetes is a big plus.`;

  const handleAnalyze = () => {
    if (!jobText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeJobDescription(jobText);
      setResult(res);
      setIsAnalyzing(false);
    }, 400);
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
            <Search className="w-5 h-5 text-accent" />
            <h3 className="font-headings font-bold text-foreground text-lg">
              Compare a Job With My Profile
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md border border-line text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-body">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Paste any job posting or requirement description. The analyzer compares the required technologies and architectural demands against Deepak's verified portfolio evidence.
            </p>
          </div>

          {/* Text Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Job Description / Role Requirements:
              </label>
              <button
                onClick={() => setJobText(sampleJob)}
                className="text-xs font-mono text-primary hover:underline"
              >
                Insert Sample AI / Full-Stack Job
              </button>
            </div>
            <textarea
              rows={5}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste job posting here (e.g. We are seeking a full-stack engineer with React, Python, RAG and Docker experience...)"
              className="w-full bg-input border border-line rounded-lg p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono"
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!jobText.trim() || isAnalyzing}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-all shadow-glow disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-foreground animate-ping" />
                Analyzing Semantics & Alignments...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Semantic Comparison</span>
              </>
            )}
          </button>

          {/* Results Display */}
          {result && (
            <div className="space-y-5 pt-4 border-t border-line animate-in fade-in duration-300">
              {/* Match Overview Box */}
              <div className="bg-surface border border-line rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-muted-foreground">Estimated Alignment:</span>
                  <div className="font-headings font-bold text-foreground text-2xl mt-0.5">
                    {result.matchScore}% Demonstrated Fit
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-primary bg-secondary px-2.5 py-1 rounded border border-line">
                    Grounded Assessment
                  </span>
                </div>
              </div>

              {/* Summary Statement */}
              <div className="text-xs text-foreground bg-card border border-line rounded-lg p-4 leading-relaxed">
                {result.summary}
              </div>

              {/* Demonstrated Skills & Projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface border border-line rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Skills Demonstrated</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.relevantSkills.map(s => (
                      <span key={s} className="text-xs font-mono bg-card border border-line px-2 py-0.5 rounded text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-surface border border-line rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Evidence Projects</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    {result.relatedProjects.map(p => (
                      <div key={p} className="text-xs text-accent font-medium flex items-center gap-1">
                        <span>•</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technology Gaps */}
              <div className="bg-surface border border-line rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-warm text-xs font-mono font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Honest Technology Gaps</span>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {result.technologyGaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-warm">!</span>
                      <span>{gap} — Not yet highlighted as a primary production deliverable.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
