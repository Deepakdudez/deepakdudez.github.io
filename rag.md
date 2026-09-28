# Retrieval-Augmented Generation (RAG) Architecture

## 1. RAG Pipeline Overview

The portfolio features a grounded Retrieval-Augmented Generation system designed to provide instant, citation-backed answers to hiring managers and potential freelance clients.

```text
                    USER
                      │
                      ▼
              Portfolio Assistant
                      │
                      ▼
                Input Guardrail
                      │
                      ▼
             Query Classification
                      │
                      ▼
                 RAG Retriever
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   Vector Database          Structured Data
    (pgvector)             (Profile / Projects)
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
                Context Builder
                      │
                      ▼
                LLM / Model
                      │
                      ▼
               Output Guardrail
                      │
                      ▼
             User Response + Citations
```

---

## 2. Knowledge Base Data Structure

Documents are partitioned into discrete chunks with verified metadata:

```typescript
export interface DataChunk {
  id: string;          // e.g. "proj-gridops-architecture"
  source: string;      // e.g. "Project Case Study — GridOps"
  section: string;     // e.g. "Architecture"
  topic: string;       // e.g. "ai", "networking", "skills"
  text: string;        // Ground truth factual content
  verified: boolean;   // Ensures only audited facts are ingested
  linkId?: string;     // Deep link for direct UI jump
}
```

### Knowledge Domains:
1. **Profile Data**: Bio, location, core philosophy, and active learning goals.
2. **Flagship Projects**: Problem statements, architecture nodes, trade-offs, and lessons.
3. **Technical DNA**: Technology status (`Used in Projects`, `Working Knowledge`, `Currently Learning`).
4. **Services**: Problem solved, 4-step engineering workflow, and guaranteed deliverables.
5. **Career Journey**: Chronological milestones and verified achievements.
6. **Curated FAQs**: High-frequency queries with direct answers.

---

## 3. Hybrid Retrieval Strategy

Dense vector embeddings alone frequently miss exact error acronyms or specific tool names (e.g. `pgvector`, `ICMP`, `ARP`). 

To address this, the retriever employs a hybrid scoring model:
- **Sparse BM25 / Keyword Matching**: High score for exact terminology matches.
- **Dense Cosine Similarity**: Captures semantic intent across natural language queries.
- **Reciprocal Rank Fusion (RRF)**: Combines ranked lists into a normalized result score.

---

## 4. Grounded Citations & UI Interaction

Every response delivered by the assistant contains lightweight evidence citations:

```text
Deepak built GridOps, a support intelligence assistant with a private RAG pipeline.
---------------------------------------------------------------------------------
[Source: Project Case Study — GridOps] ──▶ Clicking opens the deep case study modal
```

This ensures complete accountability and lets recruiters verify claims in real time.
