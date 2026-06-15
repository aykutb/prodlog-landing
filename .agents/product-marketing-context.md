# Product Marketing Context

*Last updated: February 8, 2026*

## Product Overview

**One-liner:** Career infrastructure for product managers to capture impact, get it verified, and turn it into summaries and a public portfolio.

**What it does:** Prodlog is a private log where PMs document outcomes (metrics, context, teammates) over time. It generates career-ready summaries (reviews, resumes, interviews), supports teammate verification of claims, and can feed a shareable product portfolio. Capture is designed to happen where PMs already work (web app, mobile, Slack, browser extension, email, Claude MCP).

**Product category:** PM career documentation / impact tracking / “brag doc” infrastructure (structured, not a spreadsheet or generic notes app).

**Product type:** SaaS (web + integrations; marketing points to `dashboard.prodlog.app`).

**Business model:** Freemium. **Free:** up to 10 impacts, private by default, 3 summaries per month, export anytime. **Pro:** $12/month — unlimited impacts & summaries, validation requests, advanced exports, priority support.

---

## Target Audience

**Target companies:** Any company with product management roles; not enterprise-vertical-specific in current copy.

**Decision-makers:** Individual PMs (primary user and buyer for self-serve); career-focused ICs and leads who own performance reviews, interviews, and promotion narratives.

**Primary use case:** Remember and prove what you shipped and influenced before it fades—then reuse that record for reviews, job search, and storytelling.

**Jobs to be done:**
- “Capture impact while it’s fresh so I’m not scrambling before review season.”
- “Turn scattered work across Slack/Jira/docs into one structured story.”
- “Show credible proof (including optional teammate verification) without oversharing.”

**Use cases:**
- Quarterly / annual performance reviews
- Resume and interview prep (STAR, resume bullets)
- Promotion and calibration conversations
- Public portfolio page for recruiters and hiring managers

---

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| User (PM) | Speed, clarity, privacy, not looking performative | Work is invisible; evidence is scattered | Structured logs, summaries, optional verification |
| Champion | Team visibility of PM value | Hard to compare or defend PM impact | Consistent record and narrative |
| Decision maker (self-serve) | ROI vs. time and cost | “Another tool” fatigue | Low friction, free tier, “pays for itself” framing |

*Full B2B buying committee not emphasized in current site copy—positioning is individual-first.*

---

## Problems & Pain Points

**Core problem:** PMs are judged on impact, not effort—but impact lives in Slack threads, tickets, decks, and memory. It disappears before reviews, interviews, or promotions.

**Why alternatives fall short:**
- **Brag docs / ad-hoc docs:** Unorganized, often written under pressure after the fact; lose the “why” and context.
- **Notion / generic notes:** Freeform; not built for PM milestones, privacy/anonymization, or one-click career outputs.
- **No system:** Scrambling at review time; “blank page” anxiety when compensation or role is on the line.

**What it costs them:** Time reconstituting the past; weaker reviews and interviews; missed credit; stress and anxiety around career moments.

**Emotional tension:** Fear of being forgettable or unpersuasive; discomfort bragging; wanting proof without looking like you’re overselling.

---

## Competitive Landscape

**Direct:** Other structured impact / brag-doc tools and PM-specific journaling apps (positioning should name only what you validate in market).

**Secondary:** Notion, Confluence, Google Docs—flexible but no PM-specific impact structure, privacy/anonymization flows, or summary modes for reviews.

**Indirect:** Doing nothing; annual “remember what I did” scramble; manager-only memory.

**How each falls short:** Generic tools don’t force useful structure or produce review-ready artifacts; unstructured docs don’t scale across quarters or channels.

---

## Differentiation

**Key differentiators:**
- Structured impact model (problem, solution, metrics, teammates, verification)—not freeform pages.
- Privacy and anonymization built in for sharing and exports.
- Summaries tuned to career moments (review, resume, interview / STAR).
- Multi-channel capture (Slack, email, extension, Claude MCP, etc.).
- Teammate verification without awkward email threads (as described on site).

**How we do it differently:** “Infrastructure” not a template—capture when fresh, synthesize when needed.

**Why that’s better:** Less reinvention each cycle; stronger, consistent narrative; credible third-party confirmation when needed.

**Why customers choose us:** One place that connects raw work → verified story → outward-facing portfolio.

---

## Objections

| Objection | Response (from site themes) |
|-----------|------------------------------|
| “I don’t have time for another tool.” | Logging is framed as minutes; capture from existing tools; free tier to try. |
| “My work isn’t flashy enough.” | FAQ: invisible work (alignment, risk, mentorship) counts as impact. |
| “I don’t want my employer seeing this.” | Private by default; anonymization; most users never share (per FAQ stat). |
| “This is just a Notion template.” | Differentiation section: structure, privacy/anonymization, career-specific summaries—not generic storage. |

**Anti-persona:** People who want a full project management suite, customer analytics product, or HR system of record—not a personal career ledger.

---

## Switching Dynamics

**Push:** Review season panic; lost stories; weak evidence in calibrations; scattered artifacts.

**Pull:** Calm, structured record; summaries and portfolio; verification; “quiet credibility.”

**Habit:** Logging in Slack/docs; procrastination until review; familiarity with Notion/docs.

**Anxiety:** Looking boastful; sharing sensitive numbers; switching tools; learning curve.

---

## Customer Language

**How they describe the problem (inferred from copy):**
- “Judged on impact, not effort.”
- “Document your work before it disappears.”
- “Forgetting your work is the expensive option.”

**How we describe the solution:**
- “Career infrastructure for product managers.”
- “Private log,” “impact,” “summaries,” “portfolio,” “validation.”

**Words to use:** Impact, log(s), summaries, portfolio, verification, private, narrative, career moments, proof, capture.

**Words to avoid:** User preference noted elsewhere—avoid em dash “—” in customer-facing strings (project convention).

**Glossary:**

| Term | Meaning (site usage) |
|------|------------------------|
| Log / impact | Structured record of an outcome with context and metrics |
| Summary | Generated text for review, resume, or interview formats |
| Validation | Teammate confirmation of a log |
| Portfolio | Public-facing profile page of product career |

---

## Brand Voice

**Tone:** Professional, calm, confident—peer-to-peer, not hypey.

**Style:** Clear sentences; some serif headlines; “quiet credibility,” “honest answers,” understated proof.

**Personality:** Trustworthy, PM-native, respectful of privacy, slightly literary on headings without being fluffy.

---

## Proof Points

**Metrics:** FAQ cites “90% of our users never share a single log” (validate before external use).

**Customers / logos:** Not on landing in repo reviewed.

**Testimonials:** None captured in components reviewed.

**Value themes:**

| Theme | Proof (current) |
|-------|-----------------|
| Privacy | Default private; anonymization; FAQ usage stat |
| Structure vs. brag doc | FAQ + differentiation |
| Career ROI | Pricing page “hidden tax,” “first career moment” |

---

## Goals

**Business goal:** Drive self-serve signups and Pro conversion (implied by pricing and CTAs).

**Primary conversion action:** `https://dashboard.prodlog.app/auth` — “Start logging free,” “Get started,” “Start Pro trial.”

**Secondary:** View sample log page (`/sample`).

**Current metrics:** Not in repo; fill in when available.

---

*This file was auto-drafted from the prodlog-landing codebase. Correct any factual errors (pricing limits, URLs, stats) and add verbatim customer quotes when you have them.*
