import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Filter, Terminal, ShieldCheck, CheckCircle2, Layers, Briefcase, Code2, Cpu, FileText, Send, Home, ExternalLink } from 'lucide-react';
import { PROFILE, PROJECTS } from './data/portfolioData';
import { ProjectCaseStudy } from './types';

// Components
import { Navbar, PageTab } from './components/Navbar';
import { HeroCore3D } from './components/HeroCore3D';
import { HeroProfileMap } from './components/HeroProfileMap';
import { BuildGrid } from './components/BuildGrid';
import { ProjectCard } from './components/ProjectCard';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { TechnicalDna } from './components/TechnicalDna';
import { AiAssistant } from './components/AiAssistant';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TechLab } from './components/TechLab';
import { ResumeViewer } from './components/ResumeViewer';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { HiringManagerMode } from './components/HiringManagerMode';
import { HeroPortrait } from './components/HeroPortrait';
import { GithubIcon, LinkedinIcon } from './components/BrandIcons';

// Modals
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProfileReview } from './components/ProfileReview';
import { JobAnalyzer } from './components/JobAnalyzer';
import { ImprovementSuggestions } from './components/ImprovementSuggestions';
import { CommandPalette } from './components/CommandPalette';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  // Page Navigation State (Splitting the long page into dedicated views)
  const [activeTab, setActiveTab] = useState<PageTab>(() => {
    const hash = window.location.hash.replace('#', '') as PageTab;
    const validTabs: PageTab[] = ['overview', 'projects', 'experience', 'skills', 'lab', 'resume', 'contact'];
    return validTabs.includes(hash) ? hash : 'overview';
  });

  // Modal states
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);
  const [isProfileReviewOpen, setIsProfileReviewOpen] = useState(false);
  const [isJobAnalyzerOpen, setIsJobAnalyzerOpen] = useState(false);
  const [isImprovementOpen, setIsImprovementOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [hiringModeRole, setHiringModeRole] = useState<string | null>(null);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');
  const [contactInitialService, setContactInitialService] = useState<string | undefined>(undefined);

  // Sync activeTab with URL hash
  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageTab;
      const validTabs: PageTab[] = ['overview', 'projects', 'experience', 'skills', 'lab', 'resume', 'contact'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global keyboard shortcut for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenCaseStudyById = (projectId: string) => {
    const found = PROJECTS.find(p => p.id === projectId);
    if (found) {
      setSelectedCaseStudy(found);
    }
  };

  const handleOpenHireModal = (serviceName?: string) => {
    setContactInitialService(serviceName);
    handleTabChange('contact');
  };

  // Filter projects by category
  const filteredProjects = projectCategoryFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.toLowerCase() === projectCategoryFilter.toLowerCase());

  const navTabs: { id: PageTab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects', count: PROJECTS.length },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills & DNA' },
    { id: 'lab', label: 'AI & Lab' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body relative selection:bg-primary selection:text-primary-foreground">
      {/* Context-aware custom magnetic cursor */}
      <CustomCursor />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={handleOpenCaseStudyById}
        onOpenAiAssistant={() => handleTabChange('lab')}
        onOpenProfileReview={() => setIsProfileReviewOpen(true)}
        onOpenJobAnalyzer={() => setIsJobAnalyzerOpen(true)}
        onNavigateSection={(sectionId) => handleTabChange(sectionId as PageTab)}
      />

      {/* Deep Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenHireModal={() => handleOpenHireModal()}
      />

      {/* Profile Review Modal */}
      <ProfileReview
        isOpen={isProfileReviewOpen}
        onClose={() => setIsProfileReviewOpen(false)}
        onSelectProject={handleOpenCaseStudyById}
      />

      {/* Job Description Analyzer Modal */}
      <JobAnalyzer
        isOpen={isJobAnalyzerOpen}
        onClose={() => setIsJobAnalyzerOpen(false)}
        onOpenCaseStudyForProject={handleOpenCaseStudyById}
      />

      {/* Technical Improvement Modal */}
      <ImprovementSuggestions
        isOpen={isImprovementOpen}
        onClose={() => setIsImprovementOpen(false)}
      />

      {/* Global Sticky Navbar with Split Page Tabs */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenHireModal={() => handleOpenHireModal()}
        onOpenAiAssistant={() => handleTabChange('lab')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Container */}
      <main className="max-w-[1440px] mx-auto min-w-[320px] px-4 sm:px-8 py-6">
        {/* Recruiter / Hiring Manager Active Mode */}
        {hiringModeRole && (
          <div className="mb-6">
            <HiringManagerMode
              activeRoleFilter={hiringModeRole}
              onSelectRoleFilter={setHiringModeRole}
              onOpenCaseStudy={handleOpenCaseStudyById}
              onOpenHireModal={() => handleOpenHireModal()}
            />
          </div>
        )}

        {/* Secondary Sub-Navbar Bar */}
        <div className="w-full flex items-center justify-between border-b border-line pb-4 mb-8 overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-1 font-mono text-xs">
            <span className="text-muted-foreground">SYS.NAV // DEEPAK KUMAR /</span>
            <span className="text-primary font-bold uppercase">{activeTab}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-1 text-[10px] ${activeTab === tab.id ? 'opacity-90' : 'opacity-60'}`}>
                    ({tab.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: OVERVIEW & 3D SYSTEM CORE                         */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Top Status Indicators */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>{PROFILE.systemStatus}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                <span>{PROFILE.location}</span>
              </div>
            </div>

            {/* Hero Two-Column Grid: Pitch + Animated Holographic Cybernetic Portrait */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headlines, Pitch, CTAs, Social Links, Badges */}
              <div className="lg:col-span-7 space-y-5">
                <h1 className="font-headings font-bold text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
                  {PROFILE.headline}
                </h1>

                <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {PROFILE.secondaryText}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleTabChange('projects')}
                    className="font-body text-sm font-semibold bg-primary text-primary-foreground rounded-md px-6 py-3 hover:bg-primary/90 transition-all shadow-glow flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore My Projects (4)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleTabChange('lab')}
                    className="font-body text-sm font-medium border border-line text-muted-foreground hover:text-foreground rounded-md px-5 py-3 hover:border-accent transition-colors flex items-center gap-2 bg-surface cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Talk to My AI</span>
                  </button>

                  <button
                    onClick={() => handleTabChange('resume')}
                    className="font-body text-sm font-medium border border-line text-foreground rounded-md px-5 py-3 hover:border-primary/80 transition-colors bg-surface cursor-pointer flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-primary" />
                    <span>View Resume</span>
                  </button>
                </div>

                {/* Direct Profile Access Buttons (GitHub & LinkedIn) */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-line hover:border-primary text-xs font-mono text-foreground hover:text-primary transition-all shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4 text-primary" />
                    <span>github.com/Deepakdudez</span>
                  </a>

                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-line hover:border-accent text-xs font-mono text-foreground hover:text-accent transition-all shadow-sm"
                  >
                    <LinkedinIcon className="w-4 h-4 text-accent" />
                    <span>linkedin.com/in/deep4kkumar</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {PROFILE.trustBadges.map(badge => (
                    <span
                      key={badge}
                      className="font-mono text-xs text-muted-foreground border border-line bg-surface/60 rounded-md px-3 py-1.5"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Metrics Snapshot */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line/60 max-w-lg">
                  {PROFILE.metrics.map(m => (
                    <div key={m.label}>
                      <div className="font-headings font-bold text-primary text-2xl sm:text-3xl">
                        {m.value}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground uppercase">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Animated Holographic Cybernetic Portrait */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <HeroPortrait
                  onOpenAiAssistant={() => handleTabChange('lab')}
                  onOpenCaseStudy={handleOpenCaseStudyById}
                />
              </div>
            </div>

            {/* Interactive 3D Ecosystem Core */}
            <div className="w-full bg-surface border border-line rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-card/60">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>identity.ecosystem — interactive 3d</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-line" />
                  <span className="w-2.5 h-2.5 rounded-full bg-line" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
              </div>

              <HeroCore3D onNodeClick={(node) => {
                if (node === 'ai') handleOpenCaseStudyById('agentic-ai-cloud');
                else if (node === 'cloud') handleOpenCaseStudyById('decentralized-grid');
                else handleTabChange('projects');
              }} />

              <HeroProfileMap
                onSelectProject={handleOpenCaseStudyById}
                onOpenAiAssistant={() => handleTabChange('lab')}
              />
            </div>

            {/* Explore Me Action Strip */}
            <div className="border border-line rounded-xl p-6 bg-card/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    Explore Me
                  </div>
                  <div className="font-headings font-bold text-foreground text-xl">
                    One profile, tailored for your review
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">Select an entry point</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => setHiringModeRole('fullstack')}
                  className="bg-surface border border-primary/60 rounded-lg p-4 flex items-center justify-between hover:bg-card transition-all text-left group shadow-glow cursor-pointer"
                >
                  <span className="font-body text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    I'm hiring — find relevant work
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsJobAnalyzerOpen(true)}
                  className="bg-surface border border-line rounded-lg p-4 flex items-center justify-between hover:border-accent hover:bg-card transition-all text-left group cursor-pointer"
                >
                  <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Compare a job with my profile
                  </span>
                  <Sparkles className="w-4 h-4 text-accent" />
                </button>

                <button
                  onClick={() => handleTabChange('lab')}
                  className="bg-surface border border-line rounded-lg p-4 flex items-center justify-between hover:border-primary hover:bg-card transition-all text-left group cursor-pointer"
                >
                  <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Open Technology Lab
                  </span>
                  <Terminal className="w-4 h-4 text-primary" />
                </button>

                <button
                  onClick={() => handleTabChange('resume')}
                  className="bg-surface border border-line rounded-lg p-4 flex items-center justify-between hover:border-warm hover:bg-card transition-all text-left group cursor-pointer"
                >
                  <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    View official ATS resume
                  </span>
                  <FileText className="w-4 h-4 text-warm" />
                </button>
              </div>
            </div>

            {/* What I Build Grid */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col gap-2 max-w-[720px]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-primary inline-block" />
                  <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                    01 — What I Build
                  </span>
                </div>
                <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                  Systems, not just screens
                </h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Every build starts from a concrete problem. I design the interface, architect the backend, secure the network boundaries, and package reproducible deployments.
                </p>
              </div>

              <BuildGrid onCategoryClick={() => handleTabChange('projects')} />
            </div>

            {/* Next View Banner */}
            <div className="pt-6 border-t border-line flex justify-end">
              <button
                onClick={() => handleTabChange('projects')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-glow cursor-pointer"
              >
                <span>Next: Explore Projects &amp; Case Studies (4)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: PROJECTS & CASE STUDIES                           */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-primary inline-block" />
                  <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                    02 — Featured Work &amp; Case Studies
                  </span>
                </div>
                <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                  Case studies, not cards
                </h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Problem → architecture → decisions → lessons. Every project shows my role, trade-offs, and what I'd improve next.
                </p>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'ai', label: 'AI & LLMs' },
                  { id: 'blockchain', label: 'Blockchain' },
                  { id: 'data & bi', label: 'Data & BI' },
                  { id: 'systems', label: 'Systems' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setProjectCategoryFilter(cat.id)}
                    className={`font-mono text-xs rounded-md px-3.5 py-2 transition-all cursor-pointer ${
                      projectCategoryFilter === cat.id
                        ? 'font-bold bg-primary text-primary-foreground shadow-glow'
                        : 'border border-line text-muted-foreground hover:text-foreground hover:bg-surface'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Flagship Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onOpenCaseStudy={(p) => setSelectedCaseStudy(p)}
                />
              ))}
            </div>

            {/* Interactive Architecture Flow Breakdown */}
            <div className="pt-6">
              <ArchitectureDiagram />
            </div>

            {/* Next View Banner */}
            <div className="pt-6 border-t border-line flex items-center justify-between">
              <button
                onClick={() => handleTabChange('overview')}
                className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ← Back to Overview
              </button>
              <button
                onClick={() => handleTabChange('experience')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-glow cursor-pointer"
              >
                <span>Next: Experience &amp; Altitudes Internship</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: EXPERIENCE & JOURNEY                              */}
        {/* ========================================================= */}
        {activeTab === 'experience' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Header */}
            <div className="border-b border-line pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary inline-block" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                  03 — Experience &amp; Journey
                </span>
              </div>
              <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                Work experience &amp; academic milestones
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Hands-on engineering at Altitudes, rigorous computer science foundations at SKCET Coimbatore, and core software beliefs.
              </p>
            </div>

            {/* Main About Section */}
            <AboutSection />

            {/* Freelance & Engineering Services */}
            <div className="pt-6 border-t border-line">
              <ServicesSection onStartProject={handleOpenHireModal} />
            </div>

            {/* Next View Banner */}
            <div className="pt-6 border-t border-line flex items-center justify-between">
              <button
                onClick={() => handleTabChange('projects')}
                className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ← Back to Projects
              </button>
              <button
                onClick={() => handleTabChange('skills')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-glow cursor-pointer"
              >
                <span>Next: Technical DNA &amp; Certifications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: TECHNICAL DNA & CERTIFICATIONS                    */}
        {/* ========================================================= */}
        {activeTab === 'skills' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="border-b border-line pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary inline-block" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                  04 — Technical DNA
                </span>
              </div>
              <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                Click a domain to see verified proof
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                No fake 97% bars. Real evidence: used in production projects, working knowledge, and active learning areas.
              </p>
            </div>

            {/* Technical DNA Grid */}
            <TechnicalDna onOpenCaseStudyForProject={handleOpenCaseStudyById} />

            {/* 6 Industry Certifications Showcase */}
            <div className="bg-card border border-line rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block mb-1">
                    Verified Industry Credentials
                  </span>
                  <h3 className="font-headings font-bold text-foreground text-xl">
                    Certifications &amp; Training
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted-foreground">6 Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PROFILE.certifications.map(c => (
                  <div key={c.name} className="p-4 rounded-lg bg-surface border border-line space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-primary font-bold uppercase">VERIFIED</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{c.status}</span>
                    </div>
                    <div className="font-headings font-bold text-foreground text-sm">
                      {c.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {c.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Exploring & Evidence Banners */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-line rounded-lg p-7 flex flex-col gap-4">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-warm">
                  Currently exploring
                </div>
                <div className="font-headings text-foreground text-xl font-bold leading-snug">
                  {PROFILE.currentlyExploring.description}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {PROFILE.currentlyExploring.items.map(item => (
                    <span
                      key={item.name}
                      className="font-mono text-xs text-foreground bg-surface border border-line rounded-full px-3 py-1.5 flex items-center gap-1.5"
                    >
                      <span>{item.name}</span>
                      <span className="text-primary font-bold text-[10px] uppercase">— {item.status}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-primary rounded-lg p-7 flex flex-col gap-3 justify-between shadow-glow">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground opacity-70">
                  Why hire Deepak?
                </div>
                <div className="font-headings font-bold text-primary-foreground text-2xl leading-tight">
                  I build. I learn. I explain. I improve.
                </div>
                <button
                  onClick={() => setHiringModeRole('fullstack')}
                  className="bg-primary-foreground text-foreground font-body text-sm font-semibold rounded-md px-5 py-3 w-fit hover:bg-black transition-colors cursor-pointer"
                >
                  See the evidence
                </button>
              </div>
            </div>

            {/* Next View Banner */}
            <div className="pt-6 border-t border-line flex items-center justify-between">
              <button
                onClick={() => handleTabChange('experience')}
                className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ← Back to Experience
              </button>
              <button
                onClick={() => handleTabChange('lab')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-glow cursor-pointer"
              >
                <span>Next: AI Assistant &amp; Technology Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: AI ASSISTANT & TECH LAB                           */}
        {/* ========================================================= */}
        {activeTab === 'lab' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="border-b border-line pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary inline-block" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                  05 — Portfolio Intelligence &amp; Technology Lab
                </span>
              </div>
              <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                Don't read everything. Just ask.
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                A RAG assistant grounded in Deepak's verified resume, projects, and skills — with citations and security guardrails.
              </p>
            </div>

            {/* AI Assistant */}
            <AiAssistant
              onOpenProfileReview={() => setIsProfileReviewOpen(true)}
              onOpenJobAnalyzer={() => setIsJobAnalyzerOpen(true)}
              onSelectProject={handleOpenCaseStudyById}
            />

            {/* Interactive Tech Lab Simulators */}
            <div className="pt-6 border-t border-line">
              <TechLab />
            </div>

            {/* Next View Banner */}
            <div className="pt-6 border-t border-line flex items-center justify-between">
              <button
                onClick={() => handleTabChange('skills')}
                className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ← Back to Skills
              </button>
              <button
                onClick={() => handleTabChange('resume')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-glow cursor-pointer"
              >
                <span>Next: View Official Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 6: SEARCHABLE ATS RESUME                             */}
        {/* ========================================================= */}
        {activeTab === 'resume' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="border-b border-line pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary inline-block" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                  06 — Verified Credentials &amp; Resume
                </span>
              </div>
              <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                Official ATS-Compliant Resume
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Searchable, verifiable credentials with one-click clean PDF export.
              </p>
            </div>

            {/* Resume Viewer */}
            <ResumeViewer
              onOpenAiAssistant={() => handleTabChange('lab')}
              onOpenCaseStudy={handleOpenCaseStudyById}
            />

            {/* Next View Banner */}
            <div className="pt-6 border-t border-line flex items-center justify-between">
              <button
                onClick={() => handleTabChange('lab')}
                className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ← Back to AI Lab
              </button>
              <button
                onClick={() => handleTabChange('contact')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-glow cursor-pointer"
              >
                <span>Next: Contact &amp; Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 7: CONTACT & PROJECT ONBOARDING                      */}
        {/* ========================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="border-b border-line pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary inline-block" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                  07 — Contact &amp; Inquiries
                </span>
              </div>
              <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl tracking-tight">
                Let's build something remarkable
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Available for full-time software engineering roles, systems engineering, and contract projects.
              </p>
            </div>

            <ContactForm
              initialService={contactInitialService}
              onDownloadResume={() => handleTabChange('resume')}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onNavigateTab={handleTabChange}
      />
    </div>
  );
}

export default App;
