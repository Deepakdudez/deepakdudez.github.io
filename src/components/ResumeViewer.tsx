import React, { useState } from 'react';
import { Search, ExternalLink, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PROFILE, PROJECTS } from '../data/portfolioData';

interface ResumeViewerProps {
  onOpenAiAssistant?: () => void;
  onOpenCaseStudy: (projectId: string) => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  onOpenCaseStudy
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const filteredProjects = searchQuery
    ? PROJECTS.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : PROJECTS;

  return (
    <div className="w-full bg-card border border-line rounded-xl overflow-hidden shadow-2xl" id="resume-container">
      {/* Top Action Bar */}
      <div className="p-6 border-b border-line bg-surface/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider block mb-1">
            Verified Credentials &amp; Industry Resume
          </span>
          <h3 className="font-headings font-bold text-foreground text-2xl">
            {PROFILE.name} — Official Resume
          </h3>
          <p className="text-xs text-muted-foreground font-body">
            {PROFILE.role} · B.Tech IT '26 (SKCET) · Altitudes Intern '25
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, projects, tools…"
              className="bg-input border border-line rounded-md pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-52"
            />
          </div>

          {/* Print/Download Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-glow cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="p-6 sm:p-12 space-y-8 font-body max-w-4xl mx-auto bg-surface/40 print:bg-white print:text-black">
        {/* Header Section */}
        <div className="border-b border-line pb-6 text-center space-y-3">
          <h1 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight print:text-black">
            {PROFILE.name}
          </h1>
          <p className="font-headings text-sm sm:text-base text-primary font-semibold print:text-black">
            {PROFILE.role}
          </p>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-muted-foreground pt-1 print:text-black">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>{PROFILE.email}</span>
            </a>
            <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{PROFILE.phone}</span>
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <GithubIcon className="w-3.5 h-3.5 text-primary" />
              <span>GitHub: Deepakdudez</span>
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <LinkedinIcon className="w-3.5 h-3.5 text-accent" />
              <span>LinkedIn: deep4kkumar</span>
            </a>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-warm" />
              <span>Coimbatore, India</span>
            </span>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="space-y-2">
          <div className="border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-xs uppercase tracking-widest text-primary">
              Professional Summary
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed print:text-black">
            Final-year B.Tech Information Technology student (CGPA: 7.50 / 10.0) with demonstrated experience in full-stack development and AI-driven systems. Proficient in Java, Spring Boot, React.js, and RESTful API design, with hands-on exposure to LLM-powered agentic applications and AWS cloud services. Built production-ready projects spanning decentralized energy grids on ICP blockchain, cloud architecture generation via LLMs, and business intelligence dashboards. Certified in AWS Cloud Foundations, Java (IIT Bombay &amp; Infosys), and SQL.
          </p>
        </section>

        {/* Work Experience */}
        <section className="space-y-3">
          <div className="border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-xs uppercase tracking-widest text-primary">
              Work Experience
            </h4>
          </div>

          <div className="bg-card/70 border border-line rounded-lg p-5 space-y-3 print:border-none print:p-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="font-headings font-bold text-foreground text-sm sm:text-base print:text-black">
                  Full Stack Developer Intern
                </span>
                <span className="text-primary font-medium text-xs sm:text-sm ml-2 font-mono">
                  — Altitudes
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground print:text-black">
                Jun 2025 – Jul 2025 · Remote
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside leading-relaxed print:text-black">
              <li>
                Designed and shipped a natural-language-to-cloud-architecture feature, allowing users to describe infrastructure in plain English and receive generated AWS diagrams — integrating Spring Boot REST APIs with an LLM backbone.
              </li>
              <li>
                Built data-driven frontend components in HTML, CSS, and JavaScript with reusable UI patterns, reducing frontend development iteration time.
              </li>
              <li>
                Integrated REST APIs end-to-end across backend and frontend layers, contributing to a full-stack workflow from database queries to UI rendering.
              </li>
              <li>
                Applied AI-assisted coding tools (GitHub Copilot, Cursor) to accelerate feature development and code review cycles.
              </li>
              <li>
                Identified and resolved API-related and UI issues, improving application reliability.
              </li>
            </ul>
          </div>
        </section>

        {/* Flagship Projects */}
        <section className="space-y-4">
          <div className="border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-xs uppercase tracking-widest text-primary">
              Projects
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-card/70 border border-line rounded-lg p-5 space-y-3 hover:border-primary/60 transition-all group print:border-none print:p-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-headings font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors print:text-black">
                      {p.title}
                    </span>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-[10px] font-mono text-primary hover:bg-primary/20 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => onOpenCaseStudy(p.id)}
                    className="text-xs font-mono text-primary flex items-center gap-1 hover:underline cursor-pointer print:hidden"
                  >
                    <span>View Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] font-mono text-accent">
                  <span className="font-bold">Tech Stack:</span> {p.stack.join(' · ')}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed print:text-black">
                  {p.summarySolution}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {p.metrics.map(m => (
                    <span key={m} className="px-2.5 py-1 rounded bg-surface border border-line font-mono text-[10px] text-foreground print:border print:text-black">
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Table matching resume */}
        <section className="space-y-3">
          <div className="border-b border-line pb-1.5">
            <h4 className="font-headings font-bold text-foreground text-xs uppercase tracking-widest text-primary">
              Technical Skills
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-primary font-bold block">Languages</span>
              <span className="text-muted-foreground print:text-black">Java (Spring Boot), Python, JavaScript / TypeScript, SQL, HTML5, CSS3</span>
            </div>
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-primary font-bold block">Frontend</span>
              <span className="text-muted-foreground print:text-black">React.js, HTML5, CSS3, Tailwind CSS, Angular (familiar), component-based UI design</span>
            </div>
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-primary font-bold block">Backend &amp; APIs</span>
              <span className="text-muted-foreground print:text-black">Spring Boot, RESTful APIs, GraphQL (familiar), microservices architecture, Postman</span>
            </div>
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-primary font-bold block">AI / LLMs</span>
              <span className="text-muted-foreground print:text-black">OpenAI, Gemini, Llama, Claude — prompt engineering, agentic AI pipelines</span>
            </div>
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-accent font-bold block">Cloud &amp; DevOps</span>
              <span className="text-muted-foreground print:text-black">AWS (EC2, S3, Lambda), Docker (familiar), GitHub Actions, CI/CD pipelines</span>
            </div>
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-accent font-bold block">Databases</span>
              <span className="text-muted-foreground print:text-black">MySQL, SQL (joins, transformations, window functions), PostgreSQL, MongoDB</span>
            </div>
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-warm font-bold block">Networking &amp; Support</span>
              <span className="text-muted-foreground print:text-black">TCP/IP, DNS, DHCP, OSI Model, Network Troubleshooting, VMware, Windows Server</span>
            </div>
            <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
              <span className="font-mono text-[11px] text-warm font-bold block">Data &amp; BI Analytics</span>
              <span className="text-muted-foreground print:text-black">Power BI, data visualization, KPI dashboards, ETL pipelines</span>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <section className="space-y-3">
            <div className="border-b border-line pb-1.5">
              <h4 className="font-headings font-bold text-foreground text-xs uppercase tracking-widest text-primary">
                Education
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
                <div className="flex items-center justify-between font-headings font-bold text-foreground print:text-black">
                  <span>B.Tech — Information Technology</span>
                  <span className="font-mono text-primary">2022 – 2026</span>
                </div>
                <div className="text-muted-foreground font-medium print:text-black">
                  Sri Krishna College of Engineering and Technology, Coimbatore
                </div>
                <div className="font-mono text-[11px] text-accent font-bold">
                  CGPA: 7.50 / 10.0
                </div>
              </div>

              <div className="bg-card/70 border border-line p-3.5 rounded-lg space-y-1 print:border">
                <div className="flex items-center justify-between font-headings font-bold text-foreground print:text-black">
                  <span>Intermediate College (Higher Secondary)</span>
                  <span className="font-mono text-primary">2021 – 2022</span>
                </div>
                <div className="text-muted-foreground font-medium print:text-black">
                  Kids Club Matriculation Higher Secondary School, Tiruppur
                </div>
                <div className="font-mono text-[11px] text-accent font-bold">
                  Percentage: 76%
                </div>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="space-y-3">
            <div className="border-b border-line pb-1.5">
              <h4 className="font-headings font-bold text-foreground text-xs uppercase tracking-widest text-primary">
                Certifications
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs">
              {PROFILE.certifications.map(c => (
                <div key={c.name} className="bg-card/70 border border-line p-2.5 rounded-lg flex items-center justify-between print:border">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-foreground font-medium print:text-black">{c.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{c.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Additional */}
        <section className="border-t border-line pt-4 text-xs font-mono text-muted-foreground flex flex-wrap items-center justify-between gap-2 print:text-black">
          <div>
            <span className="text-foreground font-semibold">Open Source:</span> Active contributor at{' '}
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              github.com/Deepakdudez
            </a>
          </div>
          <div>
            <span className="text-foreground font-semibold">Languages:</span> English (Professional), Tamil (Native)
          </div>
        </section>
      </div>
    </div>
  );
};
