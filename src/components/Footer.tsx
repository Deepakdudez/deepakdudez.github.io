import React from 'react';
import { Terminal, Heart } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { PageTab } from './Navbar';

interface FooterProps {
  onOpenCommandPalette: () => void;
  onNavigateTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCommandPalette,
  onNavigateTab
}) => {
  return (
    <footer className="w-full border-t border-line bg-surface/50 mt-16">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left attribution */}
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="font-body text-xs text-foreground font-semibold">
            {PROFILE.name} — {PROFILE.role}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            B.Tech IT '26 · SKCET Coimbatore · Altitudes Intern '25
          </span>
        </div>

        {/* Right navigation links + social profile links + ⌘K trigger */}
        <div className="flex flex-wrap items-center justify-center gap-4 font-body text-xs text-muted-foreground">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1 font-mono"
          >
            <span>GitHub</span>
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1 font-mono"
          >
            <span>LinkedIn</span>
          </a>

          <span className="text-line hidden sm:inline">|</span>

          <button
            onClick={() => onNavigateTab('overview')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            onClick={() => onNavigateTab('projects')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => onNavigateTab('experience')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={() => onNavigateTab('skills')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Skills
          </button>
          <button
            onClick={() => onNavigateTab('lab')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            AI Lab
          </button>
          <button
            onClick={() => onNavigateTab('resume')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Resume
          </button>
          <button
            onClick={() => onNavigateTab('contact')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Contact
          </button>

          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 border border-line bg-surface hover:border-primary/60 text-muted-foreground hover:text-foreground rounded-md px-2.5 py-1 transition-colors font-mono cursor-pointer"
            title="Open Command Palette (⌘K)"
          >
            <Terminal className="w-3 h-3 text-primary" />
            <span>⌘K</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
