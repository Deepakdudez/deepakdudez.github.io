import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch device or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check hovered element for context tags
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestLink = target.closest('button, a, [data-cursor]');
      if (closestLink) {
        setIsHovered(true);
        const customTag = closestLink.getAttribute('data-cursor');
        if (customTag) {
          setCursorText(customTag);
        } else if (closestLink.textContent?.toLowerCase().includes('case study')) {
          setCursorText('VIEW CASE STUDY');
        } else if (closestLink.textContent?.toLowerCase().includes('ask ai') || closestLink.textContent?.toLowerCase().includes('ask my ai')) {
          setCursorText('ASK AI');
        } else if (closestLink.textContent?.toLowerCase().includes('hire') || closestLink.textContent?.toLowerCase().includes('start a project')) {
          setCursorText('START A CONVERSATION');
        } else if (closestLink.textContent?.toLowerCase().includes('explore')) {
          setCursorText('EXPLORE');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out select-none hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Outer subtle ring */}
      <div
        className={`rounded-full border border-primary transition-all duration-200 flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 bg-primary/10 border-primary shadow-glow scale-125'
            : 'w-4 h-4 border-primary/50'
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      </div>

      {/* Floating context label */}
      {cursorText && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-surface/90 border border-primary/60 text-primary text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded shadow-lg whitespace-nowrap backdrop-blur animate-in fade-in duration-150">
          {cursorText}
        </div>
      )}
    </div>
  );
};
