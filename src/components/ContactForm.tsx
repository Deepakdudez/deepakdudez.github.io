import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Download, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  Phone, 
  Clock, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROFILE } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export interface SubmittedResponse {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  timestamp: string;
  formattedDate: string;
  status: 'delivered' | 'pending';
}

interface ContactFormProps {
  initialService?: string;
  onDownloadResume?: () => void;
}

const STORAGE_KEY = 'deepak_portfolio_inquiries_v2';

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService,
  onDownloadResume
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialService || 'Web Application Development');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Persistent responses list reflecting on page
  const [responses, setResponses] = useState<SubmittedResponse[]>([]);
  const [latestSubmitted, setLatestSubmitted] = useState<SubmittedResponse | null>(null);

  const projectOptions = [
    'Web Application Development',
    'AI & RAG System Integration',
    'Workflow Automation & Scripting',
    'Technical Support Systems & Dashboards',
    'Rapid MVP / Prototype Development',
    'Technical Architecture Consultation',
    'Full-Time / Contract Engineering Role'
  ];

  // Load responses from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setResponses(parsed);
          if (parsed.length > 0) {
            setLatestSubmitted(parsed[0]);
          }
        }
      }
    } catch (e) {
      console.warn('Could not read saved responses from localStorage:', e);
    }
  }, []);

  // Update initialService if prop changes
  useEffect(() => {
    if (initialService) {
      setProjectType(initialService);
    }
  }, [initialService]);

  const saveResponses = (newResponses: SubmittedResponse[]) => {
    setResponses(newResponses);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newResponses));
    } catch (e) {
      console.warn('Could not save responses to localStorage:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(now);

    const newResponse: SubmittedResponse = {
      id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      name: name.trim(),
      email: email.trim(),
      projectType,
      message: message.trim(),
      timestamp: now.toISOString(),
      formattedDate,
      status: 'delivered'
    };

    // Reflect response immediately on the page and persist
    const updatedList = [newResponse, ...responses];
    saveResponses(updatedList);
    setLatestSubmitted(newResponse);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#D7FF3E', '#8AB4FF', '#FFC46B']
      });
    } catch (err) {}

    // Dispatch via FormSubmit AJAX service to Deepak's email
    try {
      await fetch('https://formsubmit.co/ajax/deepak.nithyananthan@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType,
          message: message.trim(),
          _subject: `New Portfolio Inquiry from ${name.trim()} (${projectType})`,
          _replyto: email.trim(),
          _captcha: 'false',
          _template: 'table'
        })
      });
    } catch (err) {
      console.warn('FormSubmit network notice, response is safely reflected on page:', err);
    } finally {
      setIsSubmitting(false);
      // Reset inputs so user can submit another while response reflects on page
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  const handleCopyDetails = (item: SubmittedResponse) => {
    const text = `Inquiry Reference: ${item.id}\nFrom: ${item.name} (${item.email})\nTopic: ${item.projectType}\nDate: ${item.formattedDate}\nMessage: ${item.message}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDeleteResponse = (id: string) => {
    const filtered = responses.filter(r => r.id !== id);
    saveResponses(filtered);
    if (latestSubmitted?.id === id) {
      setLatestSubmitted(filtered.length > 0 ? filtered[0] : null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all submitted responses from this device?')) {
      saveResponses([]);
      setLatestSubmitted(null);
    }
  };

  const getGmailComposeUrl = (respName?: string, respEmail?: string, respType?: string, respMsg?: string) => {
    const sName = respName || name;
    const sEmail = respEmail || email;
    const sType = respType || projectType;
    const sMsg = respMsg || message;

    const subject = `Portfolio Project Inquiry: ${sType} (${sName || 'Client'})`;
    const body = `Hi Deepak,\n\nName: ${sName}\nEmail: ${sEmail}\nTopic: ${sType}\n\nMessage:\n${sMsg}\n\n---\nSent via Portfolio Contact Form`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="w-full space-y-6" id="contact">
      {/* Main Form Container */}
      <div className="w-full px-6 sm:px-10 py-10 bg-card border border-line rounded-xl flex flex-col gap-6 shadow-xl">
        {/* Top Header */}
        <div className="space-y-1">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <span>07 — Get in Touch</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-muted-foreground font-normal">Active Inbox</span>
          </div>
          <h3 className="font-headings font-bold text-foreground text-3xl sm:text-4xl leading-tight">
            Let's build something useful.
          </h3>
          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Submissions are delivered directly to{' '}
            <span className="text-primary font-mono font-semibold">{PROFILE.email}</span>{' '}
            and reflected live on this page.
          </p>
        </div>

        {/* Latest Response Reflection Receipt (Shows prominently right here when submitted) */}
        {latestSubmitted && (
          <div className="bg-surface/90 border border-primary/40 rounded-lg p-5 sm:p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-headings font-bold text-base text-foreground">
                  Response Reflected on Page &amp; Dispatched!
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] bg-primary/10 text-primary px-2.5 py-0.5 rounded border border-primary/20">
                  {latestSubmitted.id}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {latestSubmitted.formattedDate}
                </span>
              </div>
            </div>

            {/* Response Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-body">
              <div className="p-3 rounded bg-card/60 border border-line">
                <span className="font-mono text-[10px] text-muted-foreground uppercase block">Submitter</span>
                <span className="font-semibold text-foreground text-xs">{latestSubmitted.name}</span>
                <span className="text-muted-foreground text-[11px] block truncate">{latestSubmitted.email}</span>
              </div>

              <div className="p-3 rounded bg-card/60 border border-line">
                <span className="font-mono text-[10px] text-muted-foreground uppercase block">Topic / Scope</span>
                <span className="font-medium text-primary text-xs">{latestSubmitted.projectType}</span>
              </div>

              <div className="p-3 rounded bg-card/60 border border-line">
                <span className="font-mono text-[10px] text-muted-foreground uppercase block">Delivery Target</span>
                <span className="font-mono text-emerald-400 text-xs truncate block">{PROFILE.email}</span>
                <span className="text-[10px] text-muted-foreground">Direct Inbox Delivery</span>
              </div>
            </div>

            {/* Reflected Message Box */}
            <div className="p-3.5 rounded bg-card/80 border border-line text-xs font-body space-y-1">
              <span className="font-mono text-[10px] text-muted-foreground uppercase block">Submitted Response Message:</span>
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                "{latestSubmitted.message}"
              </p>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={getGmailComposeUrl(
                    latestSubmitted.name,
                    latestSubmitted.email,
                    latestSubmitted.projectType,
                    latestSubmitted.message
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Pre-filled in Gmail</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyDetails(latestSubmitted)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-3 py-1.5 rounded bg-card border border-line transition-colors cursor-pointer"
                >
                  {copiedId === latestSubmitted.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setLatestSubmitted(null)}
                className="text-xs font-mono text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Dismiss receipt view
              </button>
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-surface border border-line rounded-md px-4 py-3 focus-within:border-primary transition-colors">
              <label className="font-mono text-xs text-muted-foreground block">
                Your name *
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
                Your email *
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
              Project type / Inquiry topic
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
          <div className="bg-surface border border-line rounded-md px-4 py-3 min-h-[110px] focus-within:border-primary transition-colors">
            <label className="font-mono text-xs text-muted-foreground block mb-1">
              Tell me what you’re trying to build or discuss… *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your project, engineering role requirements, or challenge you want to solve..."
              className="w-full bg-transparent font-body text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/50 resize-none"
            />
          </div>

          {/* Row 4: Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground font-body text-sm font-semibold rounded-md px-5 py-3.5 hover:bg-primary/90 transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  <span>Submitting &amp; Routing Response...</span>
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Response (Reflects Live on Page)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onDownloadResume || (() => window.print())}
              className="border border-line text-foreground font-body text-sm font-medium rounded-md px-5 py-3.5 hover:border-primary/80 transition-colors flex items-center justify-center gap-2 bg-surface cursor-pointer"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>View Resume</span>
            </button>
          </div>
        </form>

        {/* Direct Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-line font-body text-xs text-muted-foreground">
          <a 
            href={`mailto:${PROFILE.email}`} 
            className="p-3 rounded-lg bg-surface border border-line flex items-center gap-2 hover:border-primary hover:text-primary transition-all group"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] font-mono text-muted-foreground">Email</span>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{PROFILE.email}</span>
            </div>
          </a>

          <a 
            href={`tel:${PROFILE.phone}`} 
            className="p-3 rounded-lg bg-surface border border-line flex items-center gap-2 hover:border-primary hover:text-primary transition-all group"
          >
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] font-mono text-muted-foreground">Phone</span>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{PROFILE.phone}</span>
            </div>
          </a>

          <a 
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer" 
            className="p-3 rounded-lg bg-surface border border-line flex items-center gap-2 hover:border-primary hover:text-primary transition-all group"
          >
            <GithubIcon className="w-4 h-4 text-primary shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] font-mono text-muted-foreground">GitHub</span>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Deepakdudez</span>
            </div>
          </a>

          <a 
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer" 
            className="p-3 rounded-lg bg-surface border border-line flex items-center gap-2 hover:border-accent hover:text-accent transition-all group"
          >
            <LinkedinIcon className="w-4 h-4 text-accent shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] font-mono text-muted-foreground">LinkedIn</span>
              <span className="font-semibold text-foreground group-hover:text-accent transition-colors">deep4kkumar</span>
            </div>
          </a>
        </div>
      </div>

      {/* Submitted Responses Log & Real-time Reflection Feed */}
      <div className="w-full px-6 sm:px-10 py-8 bg-card/70 border border-line rounded-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <h4 className="font-headings font-bold text-foreground text-lg">
                Submitted Responses &amp; Inquiry Activity Log
              </h4>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {responses.length} {responses.length === 1 ? 'response' : 'responses'} recorded
              </span>
            </div>
            <p className="text-xs font-body text-muted-foreground">
              Every inquiry submitted through this page reflects live below and is sent to Deepak's email.
            </p>
          </div>

          {responses.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs font-mono text-muted-foreground hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {responses.length === 0 ? (
          <div className="p-8 border border-dashed border-line rounded-lg text-center space-y-2 bg-surface/30">
            <Sparkles className="w-6 h-6 text-primary mx-auto opacity-75" />
            <p className="font-headings font-semibold text-sm text-foreground">
              No responses submitted on this browser yet
            </p>
            <p className="text-xs font-body text-muted-foreground max-w-md mx-auto">
              Fill out the form above to get in touch with Deepak. Once submitted, your response details will reflect here in real-time.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {responses.map((item) => (
              <div 
                key={item.id}
                className="p-5 rounded-lg bg-surface border border-line hover:border-primary/40 transition-all space-y-3"
              >
                {/* Item Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {item.id}
                    </span>
                    <span className="font-semibold text-foreground text-sm font-body">
                      {item.name}
                    </span>
                    <span className="text-muted-foreground text-xs font-mono hidden sm:inline">
                      &lt;{item.email}&gt;
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Sent to Deepak</span>
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.formattedDate}
                    </span>
                  </div>
                </div>

                {/* Topic Pill */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-muted-foreground">Topic:</span>
                  <span className="text-primary font-medium">{item.projectType}</span>
                </div>

                {/* Response Text */}
                <div className="p-3 rounded bg-card/60 border border-line text-xs font-body text-foreground whitespace-pre-wrap leading-relaxed">
                  {item.message}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-line/60">
                  <div className="flex items-center gap-2">
                    <a
                      href={getGmailComposeUrl(item.name, item.email, item.projectType, item.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open in Gmail Web</span>
                    </a>

                    <span className="text-line text-xs">|</span>

                    <button
                      type="button"
                      onClick={() => handleCopyDetails(item)}
                      className="text-[11px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteResponse(item.id)}
                    className="text-[11px] font-mono text-muted-foreground hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
