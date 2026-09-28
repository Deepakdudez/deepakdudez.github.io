import React, { useState } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Sparkles, Layers, Briefcase, Code2, Cpu, FileText, Send, Home } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PROFILE } from '../data/portfolioData';

export type PageTab = 'overview' | 'projects' | 'experience' | 'skills' | 'lab' | 'resume' | 'contact';

interface NavbarProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  onOpenHireModal: () => void;
  onOpenAiAssistant: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenHireModal,
  onOpenAiAssistant,
  onOpenCommandPalette
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; id: PageTab; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Overview', id: 'overview', icon: Home },
    { label: 'Projects', id: 'projects', icon: Layers },
    { label: 'Experience', id: 'experience', icon: Briefcase },
    { label: 'Skills & DNA', id: 'skills', icon: Code2 },
    { label: 'AI & Lab', id: 'lab', icon: Cpu },
    { label: 'Resume', id: 'resume', icon: FileText },
    { label: 'Contact', id: 'contact', icon: Send },
  ];

  const handleNavClick = (id: PageTab) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-3 max-w-[1440px] mx-auto gap-4">
        {/* Brand identity */}
        <button 
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center font-headings text-primary-foreground font-bold text-lg transition-transform duration-200 group-hover:scale-105 shadow-glow">
            D.
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headings font-bold text-foreground text-sm sm:text-base tracking-tight group-hover:text-primary transition-colors">
              {PROFILE.name}
            </span>
            <span className="text-[11px] text-muted-foreground font-body">
              {PROFILE.role}
            </span>
          </div>
        </button>

        {/* Desktop Split-View Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 font-body text-xs font-medium bg-surface/80 border border-line rounded-lg p-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* GitHub Icon Link */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md border border-line bg-surface hover:border-primary/60 text-muted-foreground hover:text-primary transition-all shadow-sm"
            title="Deepak's GitHub (Deepakdudez)"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn Icon Link */}
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md border border-line bg-surface hover:border-accent text-muted-foreground hover:text-accent transition-all shadow-sm"
            title="Deepak's LinkedIn (deep4kkumar)"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Ask AI Pill */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-surface hover:border-primary text-xs font-medium text-foreground transition-all hover:bg-card cursor-pointer"
            title="Open Portfolio Intelligence Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Ask AI</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-line bg-surface hover:border-primary/50 text-xs font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Command Palette (Ctrl/Cmd + K)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>⌘K</span>
          </button>

          {/* Hire Me CTA Button */}
          <button
            onClick={onOpenHireModal}
            className="font-body text-xs font-semibold bg-primary text-primary-foreground rounded-md px-3.5 py-1.5 hover:bg-primary/90 transition-all shadow-glow hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md border border-line bg-surface text-muted-foreground"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenAiAssistant}
            className="p-2 rounded-md border border-line bg-surface text-primary cursor-pointer"
            aria-label="Ask AI"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md border border-line bg-surface text-foreground cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-line bg-surface p-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs text-muted-foreground font-mono">B.Tech IT '26 · Available</span>
            </div>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
              className="text-xs font-mono border border-line px-2 py-1 rounded text-muted-foreground cursor-pointer"
            >
              ⌘K
            </button>
          </div>

          {/* Mobile Page Navigation List */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-headings font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'text-foreground hover:bg-card hover:text-primary'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Social Links */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-line">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-card border border-line font-mono text-xs text-foreground hover:text-primary"
            >
              <GithubIcon className="w-3.5 h-3.5 text-primary" />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-card border border-line font-mono text-xs text-foreground hover:text-accent"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-accent" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenHireModal(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-xs cursor-pointer shadow-glow"
            >
              <span>Hire Me / Contact Deepak</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
