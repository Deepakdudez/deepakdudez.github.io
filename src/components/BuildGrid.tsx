import React from 'react';
import { LayoutDashboard, Bot, Zap, Network, Cloud, BarChart3, ArrowRight } from 'lucide-react';
import { WHAT_I_BUILD_CATEGORIES } from '../data/portfolioData';

interface BuildGridProps {
  onCategoryClick?: (categoryTitle: string) => void;
}

export const BuildGrid: React.FC<BuildGridProps> = ({ onCategoryClick }) => {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case 'layout-dashboard': return <LayoutDashboard {...props} />;
      case 'bot': return <Bot {...props} />;
      case 'zap': return <Zap {...props} />;
      case 'network': return <Network {...props} />;
      case 'cloud': return <Cloud {...props} />;
      case 'bar-chart-3': return <BarChart3 {...props} />;
      default: return <LayoutDashboard {...props} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {WHAT_I_BUILD_CATEGORIES.map((item) => (
        <div
          key={item.num}
          onClick={() => onCategoryClick?.(item.title)}
          className="bg-card border border-line rounded-lg p-6 flex flex-col gap-4 min-h-[240px] hover:border-primary/80 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-glow-accent cursor-pointer group"
        >
          {/* Top row: Icon container + number */}
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
              {getIcon(item.icon)}
            </div>
            <span className="font-mono text-xs text-muted-foreground font-semibold">
              {item.num}
            </span>
          </div>

          {/* Heading */}
          <div className="font-headings font-bold text-foreground text-xl tracking-tight group-hover:text-primary transition-colors">
            {item.title}
          </div>

          {/* Description */}
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {item.desc}
          </p>

          {/* Bottom stack footer */}
          <div className="mt-auto pt-4 border-t border-line font-mono text-xs text-muted-foreground flex items-center justify-between group-hover:text-foreground transition-colors">
            <span>{item.stack}</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-primary transition-all duration-200" />
          </div>
        </div>
      ))}
    </div>
  );
};
