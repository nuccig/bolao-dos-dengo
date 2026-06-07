---
status: pending
title: Cross-Journey Polish And Demo Validation
type: chore
complexity: medium
dependencies:
  - task_01
  - task_03
  - task_04
  - task_05
  - task_06
  - task_07
  - task_08
---

# Task 9: Cross-Journey Polish And Demo Validation

## Overview
Validate the complete mobile-first journey after the screen-level tasks are complete. This task checks that the visitor-to-ranking demo feels like one coherent product, satisfies the PRD success metric, and leaves clear notes for any Phase 2 visual states.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST validate the full mobile journey from landing through pool activity and ranking.
- Requirement 2: MUST verify that the under-one-minute comprehension goal is testable through a demo walkthrough.
- Requirement 3: MUST check responsive quality at phone, tablet, and desktop sizes.
- Requirement 4: MUST ensure visual consistency across all MVP screens without introducing new product scope.
- Requirement 5: MUST document remaining gaps for Phase 2, including empty, locked, completed, and user-not-ranked states.
</requirements>

## Subtasks
- [ ] 9.1 Walk the complete visitor-to-ranking journey on a mobile viewport.
- [ ] 9.2 Verify visual consistency against `DESIGN.md` and ADR-001.
- [ ] 9.3 Check responsive behavior across phone, tablet, and desktop widths.
- [ ] 9.4 Confirm demo data supports the required walkthrough without live provider data.
- [ ] 9.5 Document remaining Phase 2 state gaps and unresolved TechSpec decisions.
- [ ] 9.6 Run the full local verification suite for the completed visual refresh.

## Implementation Details
This task should only make final polish changes needed to meet the PRD acceptance criteria. If the walkthrough reveals larger missing implementation decisions, document them rather than expanding scope silently.

### Relevant Files
- `.compozy/tasks/visual-design-fluid-mock-data/_prd.md` — Source requirements and success metrics.
- `.compozy/tasks/visual-design-fluid-mock-data/adrs/adr-001.md` — Accepted product approach.
- `DESIGN.md` — Visual quality checklist.
- `src/app/page.tsx` — Journey start.
- `src/app/login/page.tsx` — Entry flow.
- `src/app/join/page.tsx` — Invite flow.
- `src/app/pools/page.tsx` — Authenticated hub.
- `src/app/pools/[poolId]/page.tsx` — Prediction loop.
- `src/app/pools/[poolId]/ranking/page.tsx` — Ranking outcome.
- `src/app/pools/[poolId]/admin/page.tsx` — Minimal admin coherence.
- `package.json` — Verification scripts.

### Dependent Files
- `src/app/globals.css` — May receive small polish fixes if consistency gaps remain.
- `src/features/demo/scenario.ts` — If created by Task 02, may need documentation or small data adjustments.
- `.env.example` — May need final documentation notes for demo data usage.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — This task validates that the accepted approach was achieved.

## Deliverables
- End-to-end mobile demo validation notes or runbook.
- Final responsive and visual consistency fixes, if needed.
- Documented Phase 2 gaps and unresolved implementation decisions.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for the complete demo journey **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Shared visual primitives still pass after all screen-level changes.
  - [ ] Demo scenario assertions still pass after final data polish.
  - [ ] Route-level render tests still expose required headings and actions.
- Integration tests:
  - [ ] Full demo journey can be traversed from landing to pool list, pool detail, and ranking with representative data.
  - [ ] Responsive checks at 375px, 768px, and 1280px show no horizontal overflow or unreadable primary content.
  - [ ] Full verification suite passes after final polish.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- A user can understand the app proposition, next prediction action, and ranking outcome in under one minute on mobile.
- The MVP screens feel like one cohesive product aligned with `DESIGN.md`.
- Phase 2 gaps are documented rather than hidden.
