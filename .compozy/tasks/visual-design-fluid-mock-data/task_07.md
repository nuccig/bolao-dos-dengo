---
status: pending
title: Ranking Social Competitive Layout
type: frontend
complexity: medium
dependencies:
  - task_01
  - task_02
---

# Task 7: Ranking Social Competitive Layout

## Overview
Refresh the ranking screen so the competition feels social, legible, and motivating on mobile. The layout should make the current user's position easy to find while showing enough point context to trust the standings.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST display ranking position, participant identity, total points, and meaningful breakdown context.
- Requirement 2: MUST highlight the current user's own ranking row or summary.
- Requirement 3: MUST preserve existing ranking and tiebreaker behavior.
- Requirement 4: MUST use Task 02 demo data to validate a competitive standings view.
- Requirement 5: SHOULD avoid adding achievements, streaks, or advanced social features deferred by the PRD.
</requirements>

## Subtasks
- [ ] 7.1 Refresh ranking header and competition summary for fast mobile comprehension.
- [ ] 7.2 Present ranking rows with current-user emphasis and points context.
- [ ] 7.3 Keep standings visually connected to match predictions and scoring.
- [ ] 7.4 Preserve existing ranking query and domain ordering behavior.
- [ ] 7.5 Add tests for ranking content, user highlight, and deterministic ordering display.

## Implementation Details
Ranking must remain a derived view of predictions and match results. Do not change scoring, tiebreakers, or membership access in this visual task unless a later TechSpec explicitly requires it.

### Relevant Files
- `src/app/pools/[poolId]/ranking/page.tsx` — Current ranking screen.
- `src/features/pools/queries.ts` — `getPoolRankingForMember` data source.
- `src/domain/ranking.ts` — Ranking ordering and tiebreakers.
- `src/domain/scoring.ts` — Scoring inputs and point values.
- `src/features/auth/user.ts` — Current-user identity for row highlighting.

### Dependent Files
- `src/app/pools/[poolId]/page.tsx` — Prediction outcomes should visually connect to ranking.
- `src/app/pools/page.tsx` — Pool list may link to ranking as a secondary action.
- `src/app/globals.css` — Shared ranking row/card primitives may be consumed from Task 01.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Ranking is the final proof point in the visitor-to-ranking demo journey.

## Deliverables
- Refreshed ranking screen with social competitive hierarchy.
- Current-user ranking emphasis and readable points context.
- Tests covering ranking row content, current-user highlight, and domain-consistent ordering.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for ranking page rendering with demo standings **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Ranking row renders participant name, position, total points, exact hits, and outcome hits.
  - [ ] Current user's row or summary is visually and semantically identifiable.
  - [ ] Empty ranking data renders a clear message without breaking layout.
- Integration tests:
  - [ ] Ranking page renders Task 02 demo standings in deterministic order.
  - [ ] Ranking page remains restricted to valid pool members.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- A mobile user can find their position and understand why the ranking matters.
- Existing scoring and ranking behavior remains unchanged.
