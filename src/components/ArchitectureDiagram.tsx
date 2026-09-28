import React, { useState } from 'react';
import { ChevronRight, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { ArchitectureFlow, ArchitectureNode } from '../types';

interface ArchitectureDiagramProps {
  flow?: ArchitectureFlow;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ flow }) => {
  // Default flow matching Banani home screen
  const defaultNodes: ArchitectureNode[] = [
    { id: '1', name: 'User', type: 'client', tech: 'Client Browser', description: 'End-user sends natural language inquiry', rationale: 'Immediate feedback without installing desktop clients' },
    { id: '2', name: 'Frontend', type: 'client', tech: 'Next.js 14 / React', description: 'Renders response with verified source citations', rationale: 'Server Components reduce bundle payload by 40%' },
    { id: '3', name: 'API', type: 'service', tech: 'FastAPI / Node Gateway', description: 'Sanitizes input & rate limits incoming requests', rationale: 'Enforces token bucket security boundary against abuse' },
    { id: '4', name: 'RAG Retriever', type: 'ai', tech: 'Reciprocal Rank Fusion', description: 'Hybrid search: BM25 sparse + cosine dense vectors', rationale: 'Prevents missing exact acronyms like ERR_CONN_REFUSED' },
    { id: '5', name: 'Vector DB', type: 'database', tech: 'PostgreSQL + pgvector', description: 'Self-hosted vector embeddings & document chunks', rationale: 'Data isolation on-prem with zero SaaS third-party leak' },
    { id: '6', name: 'LLM', type: 'ai', tech: 'Grounded LLM Synthesizer', description: 'Generates answer strictly constrained to retrieved context', rationale: 'Output guardrails eliminate hallucinated claims' },
  ];

  const nodes = flow?.nodes || defaultNodes;
  const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);

  return (
    <div className="w-full bg-card border border-line rounded-lg p-5 flex flex-col gap-4">
      {/* Top title bar matching Banani */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            {flow?.title || 'How I document architecture'}
          </span>
        </div>

        <span className="font-mono text-xs text-primary font-medium whitespace-nowrap flex items-center gap-1">
          <span>Hover any node for rationale</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Nodes Flow Diagram matching Banani layout */}
      <div className="flex items-center gap-2 w-full overflow-x-auto py-2 no-scrollbar">
        {nodes.map((node, index) => {
          const isHovered = hoveredNode?.id === node.id;
          const isLast = index === nodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              <div
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`flex-1 min-w-[120px] text-center font-mono text-xs font-medium border rounded-md px-3 py-2.5 transition-all duration-200 cursor-pointer select-none ${
                  isHovered
                    ? 'bg-primary text-primary-foreground border-primary font-bold shadow-glow scale-105'
                    : 'bg-surface border-line text-foreground hover:border-primary/50'
                }`}
              >
                <div className="truncate">{node.name}</div>
                <div className={`text-[10px] mt-0.5 truncate ${isHovered ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {node.tech.split('/')[0]}
                </div>
              </div>

              {!isLast && (
                <span className="text-muted-foreground shrink-0 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-line stroke-[3]" />
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Interactive Tooltip Card */}
      {hoveredNode ? (
        <div className="bg-surface border border-primary/50 rounded-md p-4 animate-in fade-in slide-in-from-top-1 duration-200 shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headings font-bold text-foreground text-sm">
                  {hoveredNode.name}
                </span>
                <span className="text-[11px] font-mono bg-secondary text-primary px-2 py-0.5 rounded">
                  {hoveredNode.tech}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground mt-1">
                {hoveredNode.description}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block">
                Engineering Rationale
              </span>
              <span className="text-xs text-foreground font-medium max-w-xs block text-left sm:text-right">
                {hoveredNode.rationale}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xs font-mono text-muted-foreground/80 italic text-center py-1">
          {flow?.description || "Hover over any architectural component above to reveal design decisions and why specific technologies were selected."}
        </div>
      )}
    </div>
  );
};
