# Security, Safety & Privacy Guardrails

## 1. Multi-Layer Guardrail Architecture

The AI assistant and interactive review modules are protected by layered security boundaries designed to prevent abuse, prompt injection, and credential exfiltration:

```text
       USER INPUT
           │
           ▼
┌───────────────────────────────┐
│       INPUT GUARDRAIL         │
│  - Length Check (< 600 chars) │
│  - Prompt Injection Defense   │
│  - Secret Exfiltration Block  │
└──────────────┬────────────────┘
               │ (Pass)
               ▼
┌───────────────────────────────┐
│     RETRIEVAL GUARDRAIL       │
│  - Allowlisted Portfolio Data │
│  - Data as Data, Not Directives│
│  - Strict Chunk Attribution   │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│       OUTPUT GUARDRAIL        │
│  - Grounded Fact Verification │
│  - Zero Hallucination Rule    │
│  - Mandatory Source Citations │
└──────────────┬────────────────┘
               │
               ▼
      VERIFIED RESPONSE
```

---

## 2. Input Guardrails

The assistant inspects incoming queries using regex pattern matching and semantic classification in `src/services/ragEngine.ts`:

- **Length Constraints**: Inputs exceeding 600 characters are rejected immediately.
- **Prompt Injection Defense**: Detects phrases like:
  - `ignore all previous instructions`
  - `you are now DAN / god mode`
  - `system prompt`
  - `print your hidden instructions`
  - `execute rm -rf / sudo / bash / powershell`
- **Credential Protection**: Detects and neutralizes attempts to extract API keys, environment variables, or private filesystem tokens.

When an injection attempt is detected, the assistant safely aborts execution and provides an educational message:
> *"Input safety guardrail triggered: The assistant is strictly constrained to verified portfolio inquiries and cannot disclose internal prompt directives, execute commands, or reveal credentials."*

---

## 3. Retrieval Guardrails

- The retriever accesses **only verified internal portfolio chunks** defined in `src/data/portfolioData.ts`.
- Instructions contained within retrieved documentation chunks are treated strictly as passive **data**, never executable prompt commands.
- External internet crawling is disallowed in the public assistant sandbox.

---

## 4. Output Guardrails

Before presenting answers to the user:
1. **No Invented Claims**: The assistant never fabricates client counts, salary figures, fake awards, or unverified employers.
2. **Citations**: Answers include structured references (e.g., `Source: Project Case Study — GridOps`).
3. **Graceful Fallbacks**: If information is not in the verified dataset, the assistant explicitly responds:
   > *"I don't have verified information about that specific query in Deepak's portfolio data."*

---

## 5. Privacy & Data Minimization

- **No Third-Party Tracking**: No surveillance tracking cookies or invasive fingerprinting scripts.
- **Transient Memory**: In-browser chat messages exist solely in local component state and are discarded upon page reload.
- **Client Confidentiality**: Project case studies reflect real technical challenges while omitting proprietary client API keys and confidential database credentials.
