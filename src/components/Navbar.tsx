import React, { useState } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenHireModal: () => void;
  onOpenAiAssistant: () => void;
  onOpenCommandPalette: () => void;
  currentSection?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHireModal,
  onOpenAiAssistant,
  onOpenCommandPalette,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Lab', href: '#lab', id: 'lab' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Resume', href: '#resume', id: 'resume' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="w-full flex items-center justify-between px-6 md:px-10 py-4 max-w-[1440px] mx-auto">
        {/* Brand identity matching Banani */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center font-headings text-primary-foreground font-bold text-lg transition-transform duration-200 group-hover:scale-105 shadow-glow">
            D.
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headings font-bold text-foreground text-base tracking-tight group-hover:text-primary transition-colors">
              {PROFILE.name}
            </span>
            <span className="text-xs text-muted-foreground font-body">
              {PROFILE.role}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls matching Banani */}
        <div className="hidden md:flex items-center gap-2.5">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-surface hover:border-primary text-xs font-medium text-foreground transition-all hover:bg-card"
            title="Open Portfolio Intelligence Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Ask AI</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-line bg-surface hover:border-primary/50 text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
            title="Command Palette (Ctrl/Cmd + K)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>⌘K</span>
          </button>

          {/* Live Availability Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-line bg-surface">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-body text-muted-foreground font-medium">
              Available
            </span>
          </div>

          {/* Hire Me CTA Button */}
          <button
            onClick={onOpenHireModal}
            className="font-body text-sm font-semibold bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition-all shadow-glow hover:shadow-lg flex items-center gap-1.5"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
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
            className="p-2 rounded-md border border-line bg-surface text-primary"
            aria-label="Ask AI"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md border border-line bg-surface text-foreground"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-surface p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-xs text-muted-foreground">Available for projects</span>
            </div>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
              className="text-xs font-mono border border-line px-2 py-1 rounded text-muted-foreground"
            >
              ⌘K
            </button>
          </div>

          <nav className="flex flex-col gap-3 font-headings text-lg font-bold">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-foreground hover:text-primary transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
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

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAiAssistant(); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-secondary text-primary font-semibold text-sm border border-line"
            >
              <Sparkles className="w-4 h-4" />
              <span>Talk to My AI Assistant</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenHireModal(); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm"
            >
              <span>Hire Me / Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
