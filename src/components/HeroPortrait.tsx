import React, { useState } from 'react';
import { Sparkles, ExternalLink, ShieldCheck, Activity, Terminal, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PROFILE } from '../data/portfolioData';

interface HeroPortraitProps {
  onOpenAiAssistant?: () => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({
  onOpenAiAssistant,
  onOpenCaseStudy
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] aspect-[4/5] mx-auto select-none flex items-center justify-center p-3"
      style={{
        perspective: '1000px',
      }}
    >
      {/* 1. Ambient Background Glows */}
      <div 
        className="absolute w-[360px] h-[360px] rounded-full pointer-events-none opacity-40 blur-3xl transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(215,255,62,0.3) 0%, rgba(138,180,255,0.2) 40%, transparent 70%)',
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * -25}px)`
        }}
      />

      {/* 2. Interactive 3D Tilting Card Container */}
      <div
        className="relative w-full h-full rounded-2xl bg-card/90 border border-line p-3 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ease-out"
        style={{
          transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg) translateZ(10px)`,
          boxShadow: isHovered 
            ? '0 0 60px rgba(215,255,62,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 0 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
      >
        {/* Animated Rotating Gradient Rim */}
        <div 
          className="absolute -inset-[2px] rounded-2xl opacity-40 pointer-events-none animate-spin-slow"
          style={{
            background: 'conic-gradient(from 0deg, #D7FF3E, transparent 60deg, #8AB4FF 180deg, transparent 240deg, #D7FF3E 360deg)',
            filter: 'blur(3px)'
          }}
        />

        {/* 3. Portrait Frame with Holographic Treatment */}
        <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-surface border border-line/80 flex items-center justify-center">
          {/* Cybernetic Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#262A34_1px,transparent_1px),linear-gradient(to_bottom,#262A34_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none" />

          {/* Deepak's Actual Photo */}
          <img
            src="/deepak-portrait.jpg"
            alt="Deepak Kumar — Systems & IT Professional"
            className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              mixBlendMode: 'normal',
            }}
          />

          {/* Holographic Scanline Laser Beam */}
          <div 
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 pointer-events-none shadow-[0_0_12px_#D7FF3E] animate-scan-beam"
          />

          {/* Holographic Vignette & Tint */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 30%, transparent 50%, rgba(6,7,9,0.5) 100%), linear-gradient(180deg, rgba(215,255,62,0.04) 0%, transparent 40%, rgba(6,7,9,0.7) 100%)'
            }}
          />

          {/* Top HUD Telemetry Bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur border border-line/80 font-mono text-[10px] text-foreground shadow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-semibold text-primary">SYS.ID // DEEPAK KUMAR</span>
            </div>

            <div className="px-2 py-0.5 rounded bg-primary/20 border border-primary/40 text-primary font-mono text-[9px] font-bold tracking-widest backdrop-blur">
              VERIFIED
            </div>
          </div>

          {/* Corner Cybernetic Ticks */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary pointer-events-none" />

          {/* Floating Lower Telemetry Chip on Photo */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="bg-black/85 backdrop-blur border border-line/80 px-2.5 py-1.5 rounded-md font-mono text-[10px] text-muted-foreground flex items-center gap-2 shadow">
              <Activity className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span className="text-foreground font-medium">Network &amp; AI Systems</span>
            </div>

            <div className="bg-black/85 backdrop-blur border border-line/80 px-2 py-1.5 rounded-md font-mono text-[10px] text-primary font-semibold shadow">
              12+ Shipped
            </div>
          </div>
        </div>

        {/* 4. Bottom Social Profile Launchpad (Direct Links to GitHub & LinkedIn) */}
        <div className="pt-3 flex items-center justify-between gap-2 z-10">
          {/* GitHub Pill */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-surface border border-line hover:border-primary/80 text-xs font-mono text-foreground hover:text-primary transition-all duration-200 group/btn shadow-sm"
          >
            <GithubIcon className="w-4 h-4 text-primary group-hover/btn:scale-110 transition-transform" />
            <span className="font-semibold">Deepakdudez</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
          </a>

          {/* LinkedIn Pill */}
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-surface border border-line hover:border-accent text-xs font-mono text-foreground hover:text-accent transition-all duration-200 group/btn shadow-sm"
          >
            <LinkedinIcon className="w-4 h-4 text-accent group-hover/btn:scale-110 transition-transform" />
            <span className="font-semibold">deep4kkumar</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
};
