import React, { useState } from 'react';
import { Mail, Download, Send, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROFILE } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

interface ContactFormProps {
  initialService?: string;
  onDownloadResume?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService,
  onDownloadResume
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialService || 'Web Application');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectOptions = [
    'Web Application Development',
    'AI & RAG System Integration',
    'Workflow Automation & Scripting',
    'Technical Support Systems & Dashboards',
    'Rapid MVP / Prototype Development',
    'Technical Architecture Consultation',
    'Full-Time / Contract Engineering Role'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#D7FF3E', '#8AB4FF', '#FFC46B']
        });
      } catch (e) {}
    }, 600);
  };

  return (
    <div className="w-full px-6 sm:px-10 py-14 bg-card border border-line rounded-xl flex flex-col gap-6 shadow-glow" id="contact">
      {/* Top Header matching Banani */}
      <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
        06 — Contact
      </div>
      <h3 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight">
        Let's build something useful.
      </h3>

      {submitted ? (
        /* Confirmation State matching Section 25 of Master Prompt */
        <div className="bg-surface border border-primary/50 rounded-lg p-8 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 text-primary">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-headings font-bold text-xl text-foreground">
              Message received.
            </span>
          </div>

          <p className="font-body text-sm text-foreground leading-relaxed max-w-xl">
            I now know what you're trying to build. I review inquiries personally and will respond to <span className="text-primary font-mono">{email}</span> within 24 hours. The next step is turning the idea into something real.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors underline"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-surface border border-line rounded-md px-4 py-3 focus-within:border-primary transition-colors">
              <label className="font-mono text-xs text-muted-foreground block">
                Your name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full bg-transparent font-body text-sm text-foreground font-medium mt-0.5 focus:outline-none placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="bg-surface border border-line rounded-md px-4 py-3 focus-within:border-primary transition-colors">
              <label className="font-mono text-xs text-muted-foreground block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-transparent font-body text-sm text-foreground font-medium mt-0.5 focus:outline-none placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          {/* Row 2: Project Type Select */}
          <div className="bg-surface border border-line rounded-md px-4 py-3 relative focus-within:border-primary transition-colors">
            <label className="font-mono text-xs text-muted-foreground block">
              Project type — AI assistant, web app, automation…
            </label>
            <div className="relative mt-0.5">
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-transparent font-body text-sm text-foreground font-medium appearance-none focus:outline-none cursor-pointer pr-6"
              >
                {projectOptions.map(opt => (
                  <option key={opt} value={opt} className="bg-card text-foreground">
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div className="bg-surface border border-line rounded-md px-4 py-3 min-h-[96px] focus-within:border-primary transition-colors">
            <label className="font-mono text-xs text-muted-foreground block mb-1">
              Tell me what you’re trying to build…
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Give a short overview of your project, technical goals, or problem you want to solve..."
              className="w-full bg-transparent font-body text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/50 resize-none"
            />
          </div>

          {/* Row 4: Action Buttons matching Banani */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground font-body text-sm font-semibold rounded-md px-5 py-3.5 hover:bg-primary/90 transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Start a project</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onDownloadResume || (() => window.print())}
              className="border border-line text-foreground font-body text-sm font-medium rounded-md px-5 py-3.5 hover:border-primary/80 transition-colors flex items-center justify-center gap-2 bg-surface"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Resume</span>
            </button>
          </div>
        </form>
      )}

      {/* Direct Contact Links matching Banani */}
      <div className="flex flex-wrap items-center gap-6 font-body text-xs text-muted-foreground pt-4 border-t border-line">
        <a 
          href={`mailto:${PROFILE.email}`} 
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-primary" />
          <span>{PROFILE.email}</span>
        </a>

        <a 
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5 text-foreground" />
          <span>GitHub</span>
        </a>

        <a 
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <LinkedinIcon className="w-3.5 h-3.5 text-accent" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};
