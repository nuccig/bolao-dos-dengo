---
status: pending
title: Landing Page Visual Refresh
type: frontend
complexity: medium
dependencies:
  - task_01
---

# Task 3: Landing Page Visual Refresh

## Overview
Refresh the public landing page so a first-time mobile visitor understands the app promise in under one minute. The page should communicate private World Cup prediction pools, social competition, and the next action using the shared visual foundation from Task 01.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST make the app proposition clear on mobile within the first screen and first minute of use.
- Requirement 2: MUST use the shared visual primitives from Task 01 instead of introducing one-off page chrome.
- Requirement 3: MUST translate the BMW M-inspired visual language into football and private-pool context through copy, hierarchy, and content.
- Requirement 4: MUST provide clear calls to action for joining or starting a pool.
- Requirement 5: SHOULD avoid adding rich competition features that the PRD defers to later phases.
</requirements>

## Subtasks
- [ ] 3.1 Clarify the landing page message around private World Cup prediction pools.
- [ ] 3.2 Present a mobile-first hero and supporting sections aligned with `DESIGN.md`.
- [ ] 3.3 Make primary and secondary calls to action obvious and thumb-friendly.
- [ ] 3.4 Replace generic placeholder content with football/social competition content.
- [ ] 3.5 Add tests for landing render, calls to action, and key messaging.

## Implementation Details
Use the PRD success metric as the primary scope guard: fast comprehension matters more than adding extra marketing sections. No `_techspec.md` exists yet, so document any unresolved decisions around imagery, copy source, or exact route destinations.

### Relevant Files
- `src/app/page.tsx` — Current landing page and existing hardcoded match preview.
- `src/app/globals.css` — Current `.m-photo-band`, typography, button, card, and stripe styles.
- `src/app/layout.tsx` — Root metadata and shared layout behavior.
- `DESIGN.md` — Source for hero, photo-band, card, and stripe direction.

### Dependent Files
- `src/app/login/page.tsx` — Landing calls to action may route users into login.
- `src/app/join/page.tsx` — Landing calls to action may route invited users into join.
- `src/app/pools/new/page.tsx` — Landing calls to action may route creators into pool creation.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Landing is the first step in the accepted visitor-to-ranking demo journey.

## Deliverables
- A refreshed landing page aligned with the shared visual foundation and PRD messaging.
- Mobile-first calls to action for joining or starting a pool.
- Tests covering key landing content and navigation affordances.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for landing page render and primary CTA availability **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Landing page renders the product proposition for private World Cup prediction pools.
  - [ ] Primary call to action is visible and has an accessible name.
  - [ ] Secondary call to action is visible and distinct from the primary action.
- Integration tests:
  - [ ] Landing page renders with the shared shell from Task 01.
  - [ ] Mobile viewport render preserves headline, value proposition, and primary action without horizontal overflow.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- A new mobile visitor can identify what the app does and where to go next.
- Landing content feels football-focused while preserving the `DESIGN.md` visual tone.
