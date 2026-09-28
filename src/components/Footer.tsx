import React from 'react';
import { Terminal, Heart } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface FooterProps {
  onOpenCommandPalette: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCommandPalette,
  onNavigateSection
}) => {
  return (
    <footer className="w-full border-t border-line bg-surface/40">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left attribution from Banani */}
        <span className="font-body text-xs text-muted-foreground text-center sm:text-left">
          © 2026 {PROFILE.name} — designed &amp; engineered by hand. No templates.
        </span>

        {/* Right navigation links + social profile links + ⌘K trigger */}
        <div className="flex flex-wrap items-center justify-center gap-5 font-body text-xs text-muted-foreground">
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
            onClick={() => onNavigateSection('work')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => onNavigateSection('lab')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Lab
          </button>
          <button
            onClick={() => onNavigateSection('services')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => onNavigateSection('resume')}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Resume
          </button>

          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 border border-line bg-surface hover:border-primary/60 text-muted-foreground hover:text-foreground rounded-md px-2.5 py-1 transition-colors font-mono"
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
