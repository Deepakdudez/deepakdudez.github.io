import React, { useState, useEffect } from 'react';
import { Search, Terminal, ArrowRight, X, Sparkles, Layers, FileText, Send, ShieldCheck, FlaskConical } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenAiAssistant: () => void;
  onOpenProfileReview: () => void;
  onOpenJobAnalyzer: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenAiAssistant,
  onOpenProfileReview,
  onOpenJobAnalyzer,
  onNavigateSection
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { id: 'ask-ai', label: 'Ask Deepak’s AI Assistant', category: 'Intelligence', icon: Sparkles, action: () => { onClose(); onOpenAiAssistant(); } },
    { id: 'review-profile', label: 'Review My Profile by Role', category: 'Recruiting', icon: ShieldCheck, action: () => { onClose(); onOpenProfileReview(); } },
    { id: 'compare-job', label: 'Compare Job Description with Profile', category: 'Recruiting', icon: Search, action: () => { onClose(); onOpenJobAnalyzer(); } },
    { id: 'proj-gridops', label: 'Case Study: GridOps — Support Intelligence', category: 'Projects', icon: Layers, action: () => { onClose(); onSelectProject('gridops'); } },
    { id: 'proj-netmap', label: 'Case Study: NetMap — Home Lab Monitor', category: 'Projects', icon: Layers, action: () => { onClose(); onSelectProject('netmap'); } },
    { id: 'proj-flowdesk', label: 'Case Study: Flowdesk — Freelance OS', category: 'Projects', icon: Layers, action: () => { onClose(); onSelectProject('flowdesk'); } },
    { id: 'nav-lab', label: 'Open Engineering Lab Experiments', category: 'Laboratory', icon: FlaskConical, action: () => { onClose(); onNavigateSection('lab'); } },
    { id: 'nav-resume', label: 'View Searchable Online Resume', category: 'Navigation', icon: FileText, action: () => { onClose(); onNavigateSection('resume'); } },
    { id: 'nav-services', label: 'Freelance Services & Workflows', category: 'Navigation', icon: ArrowRight, action: () => { onClose(); onNavigateSection('services'); } },
    { id: 'nav-contact', label: 'Start a Project / Contact Deepak', category: 'Contact', icon: Send, action: () => { onClose(); onNavigateSection('contact'); } }
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled by parent or toggle
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-card border border-line rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-line flex items-center gap-3 bg-surface">
          <Terminal className="w-5 h-5 text-primary" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. AI, resume, NetMap)..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="text-xs font-mono text-muted-foreground hover:text-foreground border border-line px-1.5 py-0.5 rounded"
          >
            ESC
          </button>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-body">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'text-foreground hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
                    <span className="text-xs">{item.label}</span>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-surface text-muted-foreground'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-xs text-muted-foreground font-mono">
              No matching commands or portfolio entries found.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-line bg-surface/50 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
          <div className="flex gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-primary font-semibold">deepak.terminal</span>
        </div>
      </div>
    </div>
  );
};
