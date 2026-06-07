---
status: pending
title: Pool List And Active-Pool Entry Experience
type: frontend
complexity: medium
dependencies:
  - task_01
  - task_02
---

# Task 5: Pool List And Active-Pool Entry Experience

## Overview
Refresh the authenticated pool list so members immediately understand their active competition and next destination. This task uses the shared visual foundation and happy-path demo data to make the first post-login screen feel useful rather than empty or administrative.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST show an active pool entry that communicates current competition status and the next action.
- Requirement 2: MUST use demo data from Task 02 when validating the happy-path experience.
- Requirement 3: MUST preserve pool membership boundaries and existing authenticated access behavior.
- Requirement 4: MUST provide clear paths to pool detail, ranking, joining, and creating a pool.
- Requirement 5: SHOULD keep empty-state improvements limited to what is necessary for MVP coherence.
</requirements>

## Subtasks
- [ ] 5.1 Refresh the pool list hierarchy around active pool participation.
- [ ] 5.2 Make pool cards scan-friendly on mobile with clear next actions.
- [ ] 5.3 Ensure demo data produces a meaningful active-pool card.
- [ ] 5.4 Preserve existing join/create navigation options without crowding the screen.
- [ ] 5.5 Add tests for pool-list rendering, active-pool content, and navigation links.

## Implementation Details
This task depends on Task 02 for meaningful data. If Task 02 chooses a seed or fixture strategy that changes query behavior, align with that outcome rather than introducing a second data path.

### Relevant Files
- `src/app/pools/page.tsx` — Authenticated pool list route.
- `src/features/pools/queries.ts` — `listUserPools` data source.
- `src/features/auth/user.ts` — Current authenticated-user requirement.
- `src/app/join/page.tsx` — Secondary path for joining another pool.
- `src/app/pools/new/page.tsx` — Secondary path for creating a pool.

### Dependent Files
- `src/app/pools/[poolId]/page.tsx` — Primary destination from active-pool cards.
- `src/app/pools/[poolId]/ranking/page.tsx` — Secondary destination from pool status or ranking CTA.
- `src/app/globals.css` — Shared card and layout primitives from Task 01.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Pool list is the hub between entry and the prediction/ranking loop.

## Deliverables
- Refreshed pool list with active-pool visual priority.
- Demo-backed pool card content that supports the MVP journey.
- Tests covering active-pool display, links, and authenticated render behavior.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for pool-list query rendering with demo data **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Pool card renders pool name, role/status, and primary action.
  - [ ] Empty or missing pool data still renders a clear next action without breaking layout.
  - [ ] Pool card links use accessible names.
- Integration tests:
  - [ ] Pool list renders the Task 02 active pool for a demo member.
  - [ ] Active-pool primary action routes toward the pool detail page.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- A mobile user can identify their active pool and next action immediately after login.
- Pool list remains scoped to the authenticated member's pools.
