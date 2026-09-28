import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Sparkles, Filter, Terminal, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PROFILE, PROJECTS } from './data/portfolioData';
import { ProjectCaseStudy } from './types';

// Components
import { Navbar } from './components/Navbar';
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
  // Modal states
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);
  const [isProfileReviewOpen, setIsProfileReviewOpen] = useState(false);
  const [isJobAnalyzerOpen, setIsJobAnalyzerOpen] = useState(false);
  const [isImprovementOpen, setIsImprovementOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [hiringModeRole, setHiringModeRole] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<'all' | 'ai'>('all');
  const [contactInitialService, setContactInitialService] = useState<string | undefined>(undefined);

  // Global keyboard shortcut for ⌘K
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCaseStudyById = (projectId: string) => {
    const found = PROJECTS.find(p => p.id === projectId);
    if (found) {
      setSelectedCaseStudy(found);
    }
  };

  const handleOpenHireModal = (serviceName?: string) => {
    setContactInitialService(serviceName);
    scrollToSection('contact');
  };

  const filteredProjects = projectFilter === 'ai' 
    ? PROJECTS.filter(p => p.category === 'AI')
    : PROJECTS;

  return (
    <div className="min-h-screen bg-background text-foreground font-body relative selection:bg-primary selection:text-primary-foreground">
      {/* Context-aware custom magnetic cursor */}
      <CustomCursor />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={handleOpenCaseStudyById}
        onOpenAiAssistant={() => scrollToSection('assistant')}
        onOpenProfileReview={() => setIsProfileReviewOpen(true)}
        onOpenJobAnalyzer={() => setIsJobAnalyzerOpen(true)}
        onNavigateSection={scrollToSection}
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

      {/* Global Navbar */}
      <Navbar
        onOpenHireModal={() => handleOpenHireModal()}
        onOpenAiAssistant={() => scrollToSection('assistant')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Container max-width 1440px matching Banani */}
      <main className="max-w-[1440px] mx-auto min-w-[320px]">
        {/* Recruiter / Hiring Manager Active Mode */}
        {hiringModeRole && (
          <div className="px-6 md:px-10 pt-6">
            <HiringManagerMode
              activeRoleFilter={hiringModeRole}
              onSelectRoleFilter={setHiringModeRole}
              onOpenCaseStudy={handleOpenCaseStudyById}
              onOpenHireModal={() => handleOpenHireModal()}
            />
          </div>
        )}

        {/* HERO SECTION matching Banani */}
        <section className="px-6 md:px-10 pt-10 pb-16 border-b border-line flex flex-col gap-10">
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

          {/* Hero Two-Column Grid: Pitch + Animated Holographic Portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines, Pitch, CTAs, Social Links, Badges */}
            <div className="lg:col-span-7 space-y-5">
              <h1 className="font-headings font-bold text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
                {PROFILE.headline}
              </h1>

              <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {PROFILE.secondaryText}
              </p>

              {/* CTAs matching Banani */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenHireModal()}
                  className="font-body text-sm font-semibold bg-primary text-primary-foreground rounded-md px-6 py-3 hover:bg-primary/90 transition-all shadow-glow flex items-center gap-2"
                >
                  <span>Hire Me</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('work')}
                  className="font-body text-sm font-medium border border-line text-foreground rounded-md px-6 py-3 hover:border-primary/80 transition-colors bg-surface"
                >
                  Explore My Work
                </button>

                <button
                  onClick={() => scrollToSection('assistant')}
                  className="font-body text-sm font-medium border border-line text-muted-foreground hover:text-foreground rounded-md px-5 py-3 hover:border-accent transition-colors flex items-center gap-2 bg-surface"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Talk to My AI</span>
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

              {/* Trust Badges matching Banani */}
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
                onOpenAiAssistant={() => scrollToSection('assistant')}
                onOpenCaseStudy={handleOpenCaseStudyById}
              />
            </div>
          </div>

          {/* Interactive 3D Ecosystem Core Container matching Banani */}
          <div className="w-full bg-surface border border-line rounded-xl overflow-hidden shadow-2xl mt-4">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-card/60">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>identity.ecosystem — interactive</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
            </div>

            {/* 3D Scene */}
            <HeroCore3D onNodeClick={(node) => handleOpenCaseStudyById(node === 'ai' ? 'gridops' : 'netmap')} />

            {/* Interactive Node Map below 3D */}
            <HeroProfileMap
              onSelectProject={handleOpenCaseStudyById}
              onOpenAiAssistant={() => scrollToSection('assistant')}
            />
          </div>
        </section>

        {/* EXPLORE ME ACTION STRIP matching Banani */}
        <section className="px-6 md:px-10 py-12 border-b border-line flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="min-w-[280px]">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-1">
              Explore me
            </div>
            <div className="font-headings font-bold text-foreground text-2xl">
              One profile, many entry points
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {/* Quick Action 1 */}
            <button
              onClick={() => setHiringModeRole('fullstack')}
              className="bg-card border border-primary/60 rounded-lg p-4 flex items-center justify-between hover:bg-surface transition-all text-left group shadow-glow"
            >
              <span className="font-body text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                I'm hiring — find relevant work
              </span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Action 2 */}
            <button
              onClick={() => setIsJobAnalyzerOpen(true)}
              className="bg-card border border-line rounded-lg p-4 flex items-center justify-between hover:border-accent hover:bg-surface transition-all text-left group"
            >
              <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                Compare a job with my profile
              </span>
              <Sparkles className="w-4 h-4 text-accent" />
            </button>

            {/* Quick Action 3 */}
            <button
              onClick={() => setIsImprovementOpen(true)}
              className="bg-card border border-line rounded-lg p-4 flex items-center justify-between hover:border-warm hover:bg-surface transition-all text-left group"
            >
              <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                Suggest an improvement
              </span>
              <span className="font-mono text-xs text-warm font-bold">→</span>
            </button>

            {/* Quick Action 4 */}
            <button
              onClick={() => scrollToSection('lab')}
              className="bg-card border border-line rounded-lg p-4 flex items-center justify-between hover:border-primary hover:bg-surface transition-all text-left group"
            >
              <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                Open Technology Lab
              </span>
              <Terminal className="w-4 h-4 text-primary" />
            </button>
          </div>
        </section>

        {/* SECTION 01: WHAT I BUILD matching Banani */}
        <section className="px-6 md:px-10 py-16 border-b border-line flex flex-col gap-8">
          <div className="flex flex-col gap-3 max-w-[720px] items-start">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary inline-block" />
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                01 — What I build
              </span>
            </div>
            <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight tracking-tight">
              Systems, not just screens
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Every build starts from a problem. I design the interface, architect the backend, secure the network boundaries, and package reproducible deployments.
            </p>
          </div>

          <BuildGrid onCategoryClick={() => scrollToSection('work')} />
        </section>

        {/* SECTION 02: FEATURED WORK / CASE STUDIES matching Banani */}
        <section className="px-6 md:px-10 py-16 border-b border-line flex flex-col gap-8" id="work">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-[720px] items-start">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary inline-block" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                  02 — Featured Work
                </span>
              </div>
              <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight tracking-tight">
                Case studies, not cards
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Problem → architecture → decisions → lessons. Every project shows my role, trade-offs, and what I'd improve next.
              </p>
            </div>

            {/* Filter buttons matching Banani */}
            <div className="flex gap-2">
              <button
                onClick={() => setProjectFilter('all')}
                className={`font-body text-sm rounded-md px-5 py-2.5 transition-all ${
                  projectFilter === 'all'
                    ? 'font-semibold bg-primary text-primary-foreground shadow-glow'
                    : 'font-medium border border-line text-foreground hover:border-line/80'
                }`}
              >
                All projects
              </button>
              <button
                onClick={() => setProjectFilter(projectFilter === 'ai' ? 'all' : 'ai')}
                className={`font-body text-sm rounded-md px-5 py-2.5 transition-all ${
                  projectFilter === 'ai'
                    ? 'font-semibold bg-primary text-primary-foreground shadow-glow'
                    : 'font-medium border border-line text-foreground hover:border-line/80'
                }`}
              >
                Filter by: AI
              </button>
            </div>
          </div>

          {/* 3 Flagship Project Cards matching Banani 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpenCaseStudy={(p) => setSelectedCaseStudy(p)}
              />
            ))}
          </div>

          {/* Architecture strip matching Banani */}
          <ArchitectureDiagram />
        </section>

        {/* SECTION 03: TECHNICAL DNA matching Banani */}
        <section className="px-6 md:px-10 py-16 border-b border-line flex flex-col gap-8">
          <div className="flex flex-col gap-3 max-w-[720px] items-start">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary inline-block" />
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                03 — Technical DNA
              </span>
            </div>
            <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight tracking-tight">
              Click a domain to see the proof
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              No fake 97% bars. Just labels that mean something: used in projects, working knowledge, currently learning.
            </p>
          </div>

          <TechnicalDna onOpenCaseStudyForProject={handleOpenCaseStudyById} />

          {/* Currently Exploring & Why Hire Me Banners matching Banani */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
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
                Why hire me?
              </div>
              <div className="font-headings font-bold text-primary-foreground text-2xl leading-tight">
                I build. I learn. I explain. I improve.
              </div>
              <button
                onClick={() => setHiringModeRole('fullstack')}
                className="bg-primary-foreground text-foreground font-body text-sm font-semibold rounded-md px-5 py-3 w-fit hover:bg-black transition-colors"
              >
                See the evidence
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 04: PORTFOLIO INTELLIGENCE AI ASSISTANT matching Banani */}
        <section className="px-6 md:px-10 py-16 border-b border-line flex flex-col gap-8" id="assistant">
          <div className="flex flex-col gap-3 max-w-[720px] items-start">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary inline-block" />
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-primary">
                04 — Portfolio intelligence
              </span>
            </div>
            <h2 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight tracking-tight">
              Don't read everything. Just ask.
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              A RAG assistant grounded in verified data — resume, projects, skills — with citations and guardrails.
            </p>
          </div>

          <AiAssistant
            onOpenProfileReview={() => setIsProfileReviewOpen(true)}
            onOpenJobAnalyzer={() => setIsJobAnalyzerOpen(true)}
            onSelectProject={handleOpenCaseStudyById}
          />
        </section>

        {/* JOURNEY & ABOUT SECTION */}
        <section className="px-6 md:px-10 py-16 border-b border-line">
          <AboutSection />
        </section>

        {/* FREELANCE SERVICES SECTION matching Banani 05 */}
        <section className="px-6 md:px-10 py-16 border-b border-line" id="services">
          <ServicesSection onStartProject={handleOpenHireModal} />
        </section>

        {/* SECRET TECH LAB SECTION */}
        <section className="px-6 md:px-10 py-16 border-b border-line">
          <TechLab />
        </section>

        {/* SEARCHABLE RESUME VIEWER */}
        <section className="px-6 md:px-10 py-16 border-b border-line" id="resume">
          <ResumeViewer
            onOpenAiAssistant={() => scrollToSection('assistant')}
            onOpenCaseStudy={handleOpenCaseStudyById}
          />
        </section>

        {/* SECTION 06: CONTACT ONBOARDING matching Banani */}
        <section className="px-6 md:px-10 py-16">
          <ContactForm
            initialService={contactInitialService}
            onDownloadResume={() => window.print()}
          />
        </section>
      </main>

      {/* Global Footer matching Banani */}
      <Footer
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onNavigateSection={scrollToSection}
      />
    </div>
  );
}
export default App;
