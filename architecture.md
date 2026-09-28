# Systems Architecture Document

## 1. Overview & Architectural Philosophy

This application is built as a **digital product, interactive personal brand, and intelligent portfolio experience** for **Deepak Kumar**, an IT/technology professional and systems freelancer.

Rather than a generic static website, the architecture is partitioned into four distinct layers:

```text
┌────────────────────────────────────────────────────────┐
│                        UI LAYER                        │
│   React 18 · TypeScript · Tailwind CSS · Three.js 3D   │
│   Space Grotesk & Inter · High Contrast Cyber Dark UI   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                   APPLICATION LAYER                    │
│   Global Command Palette (⌘K) · Recruiter Fast-Track   │
│   Case Study Modals · Interactive Architecture Maps    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    AI / RAG LAYER                      │
│   Input Guardrail · Intent Classifier · RAG Retriever  │
│   pgvector / BM25 Index · Output Verification Guard    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                       DATA LAYER                       │
│   Structured Document Chunks · Verified Case Studies   │
│   Confidence-Labeled DNA · Grounded FAQ Knowledge Base │
└────────────────────────────────────────────────────────┘
```

---

## 2. Component Hierarchy & System Modules

### 2.1 3D Technology Ecosystem Core (`HeroCore3D.tsx`)
- **Technology**: Native Three.js WebGL canvas with dynamic buffer geometries.
- **Visual Model**: Translucent central icosahedron with neon lime (`#D7FF3E`) wireframe overlay, surrounded by three orbital rings tilted at angles matching the Banani specification (`rotateX(68deg)`, `rotate(-18deg)`).
- **Network Cloud**: 180 floating data particles with spherical distribution and 40 dynamic interconnection segments.
- **Interactivity**: Smooth spring dampening tracking mouse coordinates for natural parallax without viewport jitter.
- **Accessibility**: Automatically checks `prefers-reduced-motion` to halt animations when requested by the OS.

### 2.2 Interactive Profile Map (`HeroProfileMap.tsx`)
- Placed directly beneath the 3D ecosystem core.
- Allows immediate deep inspection across 8 dimensions: `Me`, `Skills`, `Projects`, `AI`, `Networking`, `Cloud`, `Experience`, `Learning`.
- Expands verified details, key metrics, and case study links without forcing the visitor to scroll.

### 2.3 Deep Case Study System (`ProjectCard.tsx` + `CaseStudyModal.tsx`)
Each project is structured as a production case study containing 9 required engineering dimensions:
1. **01 — Problem**: Root failure or friction being solved.
2. **02 — Context**: Operational environment and business impact.
3. **03 — My Role**: Explicit personal engineering contributions.
4. **04 — Systems Architecture**: Interactive flow diagram with hover rationale.
5. **05 — Technology Choices**: Specific reasons why tools were selected.
6. **06 — Technical Challenges Solved**: Real bugs, concurrency bottlenecks, and resolutions.
7. **07 — Architectural Decisions & Trade-Offs**: Selected vs rejected alternatives.
8. **08 — Lessons Learned**: Engineering takeaways.
9. **09 — Future Improvements**: Production roadmap demonstrating engineering maturity.

### 2.4 Technology Lab & DNA (`TechnicalDna.tsx` + `TechLab.tsx`)
- **Honest Labeling**: Replaces fake percentage bars with meaningful labels:
  - `Used in Projects`
  - `Working Knowledge`
  - `Currently Learning`
  - `Exploring`
- **Interactive Lab**: Live client-side simulations including document chunking, ICMP ping sweeps, and guardrail validation.

---

## 3. Global Command Palette & Navigation
- Accessible via global shortcut `⌘K` or `Ctrl + K`.
- Keyboard accessible: Arrow keys, Enter, and Escape.
- Instant access to case studies, resume download, profile review, and project onboarding.
