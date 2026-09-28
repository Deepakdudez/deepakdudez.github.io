import React, { useState } from 'react';
import { Download, Search, Sparkles, FileText, CheckCircle2, ExternalLink, Printer } from 'lucide-react';
import { PROFILE, PROJECTS, TECHNICAL_DNA, TIMELINE_EVENTS } from '../data/portfolioData';

interface ResumeViewerProps {
  onOpenAiAssistant: () => void;
  onOpenCaseStudy: (projectId: string) => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  onOpenAiAssistant,
  onOpenCaseStudy
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [explainedSection, setExplainedSection] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExplain = (sectionTitle: string, contextText: string) => {
    setExplainedSection(`AI Insight on "${sectionTitle}": ${contextText}`);
  };

  return (
    <div className="w-full bg-card border border-line rounded-xl overflow-hidden shadow-xl" id="resume-container">
      {/* Action Header */}
      <div className="p-6 border-b border-line bg-surface/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider block mb-1">
            Verified Credentials
          </span>
          <h3 className="font-headings font-bold text-foreground text-2xl">
            Deepak Kumar — Resume
          </h3>
          <p className="text-xs text-muted-foreground font-body">
            Full-Stack Software Engineer & Systems Freelancer · Bangalore / Remote
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, projects, tools…"
              className="bg-input border border-line rounded-md pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-48"
            />
          </div>

          {/* Print/Download Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-glow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* AI Explanation Banner if active */}
      {explainedSection && (
        <div className="p-4 bg-secondary border-b border-primary/40 flex items-start justify-between gap-4 text-xs font-body animate-in fade-in duration-200">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="text-foreground leading-relaxed">
              {explainedSection}
            </div>
          </div>
          <button
            onClick={() => setExplainedSection(null)}
            className="text-muted-foreground hover:text-foreground font-mono text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Resume Content */}
      <div className="p-6 sm:p-10 space-y-8 font-body max-w-4xl mx-auto">
        {/* Professional Summary */}
        <section className="space-y-2">
          <div className="flex items-center justify-between border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-sm uppercase tracking-wider">
              Professional Summary
            </h4>
            <button
              onClick={() => handleExplain('Summary', 'Deepak is an engineer who bridges frontend interface craft with lower-level networking and AI retrieval pipelines. Instead of remaining in an isolated framework, he ships production systems that connect UI, databases, and network daemons.')}
              className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Explain with AI</span>
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {PROFILE.story}
          </p>
        </section>

        {/* Experience & Career Journey */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-sm uppercase tracking-wider">
              Work Experience & Projects
            </h4>
            <button
              onClick={() => handleExplain('Experience', 'Deepak has delivered 12+ real systems as an independent engineer and support intern. He is evaluated on working software rather than corporate tenure titles.')}
              className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Explain with AI</span>
            </button>
          </div>

          <div className="space-y-4">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="bg-surface border border-line rounded-lg p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-headings font-bold text-foreground text-sm">
                    {event.title}
                  </div>
                  <span className="font-mono text-xs text-primary font-semibold">
                    {event.year}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {event.desc}
                </p>
                <div className="text-[11px] font-mono text-accent pt-1">
                  Key Achievement: {event.highlight}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flagship Projects */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-sm uppercase tracking-wider">
              Selected Flagship Projects
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PROJECTS.map(p => (
              <div 
                key={p.id}
                onClick={() => onOpenCaseStudy(p.id)}
                className="bg-surface border border-line rounded-lg p-4 space-y-2 hover:border-primary cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase">{p.category}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="font-headings font-bold text-foreground text-sm">
                  {p.title.split('—')[0]}
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {p.summarySolution}
                </p>
                <div className="font-mono text-[10px] text-accent pt-1">
                  {p.stack.slice(0, 3).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical DNA & Skills Summary */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-sm uppercase tracking-wider">
              Technical Stack & Verified Capabilities
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-surface border border-line p-3 rounded-md">
              <span className="font-mono text-[11px] text-primary font-semibold block mb-1">Frontend & Architecture</span>
              <span className="text-muted-foreground">React, Next.js 14, TypeScript, Tailwind CSS, Three.js, State Management</span>
            </div>
            <div className="bg-surface border border-line p-3 rounded-md">
              <span className="font-mono text-[11px] text-primary font-semibold block mb-1">Backend & AI</span>
              <span className="text-muted-foreground">Python (FastAPI), Node.js, Go (basics), pgvector, RAG pipelines, Guardrails</span>
            </div>
            <div className="bg-surface border border-line p-3 rounded-md">
              <span className="font-mono text-[11px] text-warm font-semibold block mb-1">Networking & Systems</span>
              <span className="text-muted-foreground">TCP/IP, Subnetting, DNS/DHCP, Linux (systemd/bash), Wireshark, WireGuard VPN</span>
            </div>
            <div className="bg-surface border border-line p-3 rounded-md">
              <span className="font-mono text-[11px] text-accent font-semibold block mb-1">Data & Infrastructure</span>
              <span className="text-muted-foreground">PostgreSQL, Redis, Prometheus & Grafana, Docker & Compose, CI/CD Actions</span>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-sm uppercase tracking-wider">
              Education & Certifications
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-foreground font-medium">
              <span>Bachelor of Technology in Information Technology</span>
              <span className="font-mono text-muted-foreground">2020 – 2024</span>
            </div>
            <p className="text-muted-foreground text-[11px]">
              Core coursework: Computer Networks, Operating Systems, Database Systems, Distributed Computing, Algorithm Design.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
