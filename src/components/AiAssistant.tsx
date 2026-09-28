import React, { useState } from 'react';
import { Send, FileText, Sparkles, Shield, ArrowRight, X, Bot, AlertTriangle } from 'lucide-react';
import { answerPortfolioQuery } from '../services/ragEngine';
import { AiChatMessage } from '../types';

interface AiAssistantProps {
  onOpenProfileReview: () => void;
  onOpenJobAnalyzer: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  onOpenProfileReview,
  onOpenJobAnalyzer,
  onSelectProject
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'init-1',
      sender: 'user',
      text: 'What did Deepak build with RAG?',
      timestamp: '20:15'
    },
    {
      id: 'init-2',
      sender: 'assistant',
      text: 'Deepak built GridOps, a support intelligence assistant with a private RAG pipeline — hybrid BM25 + dense pgvector retriever, recursive chunking, and grounded answers with zero hallucinations.',
      timestamp: '20:15',
      citations: [
        { source: 'Project Case Study — GridOps', section: 'Architecture', linkId: 'gridops' }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: AiChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate natural response latency (350ms)
    setTimeout(() => {
      const response = answerPortfolioQuery(q);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 380);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedPrompts = [
    "What AI projects prove RAG skills?",
    "Show me his networking projects",
    "What technologies does Deepak work with?",
    "What is he currently learning?",
    "Compare a job description"
  ];

  return (
    <div className="bg-card border border-line rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-glow">
      {/* Left Column matching Banani */}
      <div className="p-8 flex flex-col gap-5 justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Ask Deepak's AI
            </span>
          </div>

          <h3 className="font-headings font-bold text-foreground text-3xl leading-tight">
            Have a question about my background?
          </h3>

          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Grounded in verified portfolio data. With citations, guardrails, and zero invented experience.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={() => handleSend("Tell me about Deepak's background and core engineering focus")}
            className="bg-primary text-primary-foreground font-body text-sm font-semibold rounded-md px-5 py-3 hover:bg-primary/90 transition-all shadow-glow flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask my AI</span>
          </button>

          <button
            onClick={onOpenProfileReview}
            className="border border-line text-foreground font-body text-sm font-medium rounded-md px-5 py-3 hover:border-primary/80 transition-colors"
          >
            Review my profile
          </button>

          <button
            onClick={onOpenJobAnalyzer}
            className="border border-line text-muted-foreground hover:text-foreground font-body text-sm font-medium rounded-md px-4 py-3 hover:border-accent transition-colors"
          >
            Job Matcher
          </button>
        </div>

        {/* Suggested Quick Prompt Chips from Banani */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
            Suggested Queries:
          </span>
          <div className="flex gap-2 flex-wrap">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  if (prompt === "Compare a job description") {
                    onOpenJobAnalyzer();
                  } else {
                    handleSend(prompt);
                  }
                }}
                className="font-body text-xs text-muted-foreground hover:text-foreground border border-line hover:border-primary rounded-md px-3 py-1.5 bg-surface transition-all text-left"
              >
                “{prompt}”
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Live Chat Interface matching Banani */}
      <div className="bg-surface border-t lg:border-t-0 lg:border-l border-line p-6 flex flex-col justify-between gap-4 min-h-[420px]">
        {/* Messages Stream */}
        <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}
            >
              {m.sender === 'user' ? (
                <div className="bg-input border border-line rounded-md p-4 max-w-[85%]">
                  <div className="font-body text-sm text-foreground">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div className="bg-secondary border border-line rounded-md p-4 ml-8 max-w-[90%] space-y-2">
                  {m.isGuardrailViolation && (
                    <div className="flex items-center gap-1.5 text-xs text-warm font-mono mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Security Guardrail Active</span>
                    </div>
                  )}

                  <div className="font-body text-sm text-foreground leading-relaxed">
                    {m.text}
                  </div>

                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-line/60 flex flex-wrap gap-2">
                      {m.citations.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (c.linkId && onSelectProject) onSelectProject(c.linkId);
                          }}
                          className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline bg-card/60 px-2 py-1 rounded border border-line"
                        >
                          <FileText className="w-3.5 h-3.5 text-primary" />
                          <span>Source: {c.source}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-end">
              <div className="bg-secondary border border-line rounded-md px-4 py-3 text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span>RAG Retriever searching chunks...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar matching Banani */}
        <div className="mt-auto bg-input border border-line rounded-md px-4 py-2.5 flex items-center justify-between gap-3 focus-within:border-primary transition-colors">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about skills, roles, architecture…"
            className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-all shrink-0 shadow-sm"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
