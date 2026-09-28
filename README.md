# Deepak Kumar — Premium 3D Systems & Freelancer Portfolio

> Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Three.js**, faithfully engineered based on the designs at [Banani Preview `Ns_J3cWUwvik`](https://app.banani.co/preview/Ns_J3cWUwvik) and the Master Engineering Prompt.

---

## ⚡ Live Features & Capabilities

### 1. 3D Digital Technology Ecosystem (`HeroCore3D`)
- Built using **Three.js WebGL** with hardware-accelerated buffer geometries.
- Features a central translucent icosahedron wrapped in neon lime (`#D7FF3E`) wireframes, three tilted orbital rings matching the Banani specification, and 180 floating data particles.
- Reacts smoothly to cursor position with spring dampening and respects `prefers-reduced-motion`.
- Displays real-time telemetry overlays: `RAG Pipeline · live`, `Cloud · eu-west`, `Network · 12 nodes`, `vector.db`, `agent: ready`, and `api.latency 38ms`.

### 2. Interactive Profile Map (`HeroProfileMap`)
- Seamlessly transition through: `Me`, `Skills`, `Projects`, `AI`, `Networking`, `Cloud`, `Experience`, and `Learning`.
- Expands rich verified insights, metrics, and architecture links immediately in the Hero.

### 3. Deep Project Case Studies (`CaseStudyModal`)
- Comprehensive case studies for **GridOps** (Support Intelligence RAG), **NetMap** (Edge Network Monitor), and **Flowdesk** (Freelance Operating System).
- Implements all 9 production dimensions:
  1. *01 — Problem*
  2. *02 — Context*
  3. *03 — My Role*
  4. *04 — Systems Architecture (Interactive Flow)*
  5. *05 — Technology Choices & Rationale*
  6. *06 — Technical Challenges Solved*
  7. *07 — Architectural Decisions & Trade-Offs*
  8. *08 — Lessons Learned*
  9. *09 — Future Improvements*

### 4. Interactive Architecture Diagram (`ArchitectureDiagram`)
- Interactive horizontal flow: `User` → `Frontend` → `API Gateway` → `RAG Retriever` → `Vector DB` → `LLM Synthesizer`.
- Hovering over any node displays architectural decisions and engineering rationale.

### 5. Grounded Portfolio Intelligence Assistant (`AiAssistant`)
- "Ask Deepak's AI": RAG assistant strictly constrained to verified portfolio data.
- Layered security guardrails blocking prompt injection, system prompt extraction, and credential exfiltration.
- Verifiable citations with clickable jumps into case studies.

### 6. Recruiter & Hiring Modes
- **Profile Review Mode**: Evaluates portfolio evidence against roles (Frontend, AI/RAG, Network/Systems, Full-Stack) with strong evidence, missing evidence, and concrete technical improvements.
- **Job Description Analyzer**: Paste any JD for semantic matching score, relevant skills, related projects, and gaps.
- **Hiring Manager Fast-Track**: 60-second filtered view highlighting proof for specific open roles.

### 7. Secret "Engineering Lab" (`TechLab`)
- Live RAG document chunking & cosine similarity visualizer.
- Edge network ICMP/DNS latency probe simulator.
- Real-time prompt injection defense inspector.

### 8. Keyboard Command Palette (`⌘K`)
- Trigger with `⌘K` or `Ctrl + K`.
- Instant search, project navigation, AI query invocation, and resume access.

### 9. Context-Aware Custom Cursor (`CustomCursor`)
- Dynamic magnetic cursor that adapts its label based on context: `VIEW CASE STUDY`, `ASK AI`, `EXPLORE`, `START A CONVERSATION`.
- Touch-device safe.

---

## 🚀 Quickstart & Setup

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation
```bash
# Clone or navigate to the project directory
cd deepak-portfolio

# Install dependencies
npm install

# Start local development server (Vite)
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build & Preview
```bash
# Type-check and create production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```text
deepak-portfolio/
├── src/
│   ├── components/            # Reusable UI & 3D Components
│   │   ├── Navbar.tsx         # Header with availability status & ⌘K trigger
│   │   ├── HeroCore3D.tsx     # Three.js 3D ecosystem scene & telemetry
│   │   ├── HeroProfileMap.tsx # Expandable profile dimension explorer
│   │   ├── BuildGrid.tsx      # 6 "What I Build" domain cards
│   │   ├── ProjectCard.tsx    # Flagship case study cards with Problem/Solution
│   │   ├── CaseStudyModal.tsx # Immersive 9-part case study drawer
│   │   ├── ArchitectureDiagram.tsx # Interactive architecture flow diagram
│   │   ├── TechnicalDna.tsx   # Verified technology domain evidence
│   │   ├── AiAssistant.tsx    # Grounded RAG portfolio intelligence assistant
│   │   ├── AboutSection.tsx   # First-person story & chronological timeline
│   │   ├── ServicesSection.tsx# 6 Freelance service modules with 4-step workflows
│   │   ├── TechLab.tsx        # Secret lab: RAG, Network & Guardrail simulators
│   │   ├── ResumeViewer.tsx   # Searchable interactive resume with AI explain
│   │   ├── HiringManagerMode.tsx # 60-second recruiter filter
│   │   ├── ProfileReview.tsx  # Role-specific review with concrete recommendations
│   │   ├── JobAnalyzer.tsx    # Semantic job description matcher
│   │   ├── ImprovementSuggestions.tsx # Structured improvement roadmaps
│   │   ├── CommandPalette.tsx # ⌘K global command menu
│   │   ├── CustomCursor.tsx   # Context-aware magnetic desktop cursor
│   │   ├── ContactForm.tsx    # Project onboarding flow with celebration state
│   │   ├── Footer.tsx         # Footer with copyright and shortcut pill
│   │   └── BrandIcons.tsx     # Custom SVG icons
│   ├── data/
│   │   └── portfolioData.ts   # Verified facts, projects, skills, services, FAQs
│   ├── services/
│   │   └── ragEngine.ts       # RAG retriever, guardrails, review & job analyzer
│   ├── types/
│   │   └── index.ts           # Strict TypeScript interfaces
│   ├── App.tsx                # Master portfolio layout & modal orchestration
│   ├── index.css              # Custom Tailwind directives & theme tokens
│   └── main.tsx               # Application entry point
├── architecture.md            # In-depth system architecture documentation
├── security.md                # Input/output guardrails & privacy policies
├── rag.md                     # Retrieval-augmented generation design
├── .env.example               # Environment variables template
├── tailwind.config.js         # Design token configuration (colors & typography)
└── package.json
```

---

## 🎨 Design System Tokens

- **Foundation**: Dark Graphite / Black `#060709`
- **Surface**: `#0E1015`
- **Card**: `#111319`
- **Borders & Lines**: `#262A34`
- **Primary Accent**: Electric Neon Lime `#D7FF3E`
- **Secondary Accent**: Ice Blue `#8AB4FF`
- **Warm Accent**: Gold / Amber `#FFC46B`
- **Foreground Text**: Crisp Off-White `#F2F1EA`
- **Muted Text**: `#9AA0AB`
- **Typography**: `Space Grotesk` (Headings) + `Inter` (Body) + `JetBrains Mono` (Code)
