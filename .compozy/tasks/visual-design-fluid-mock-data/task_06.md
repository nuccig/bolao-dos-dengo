---
status: pending
title: Pool Detail Match And Prediction Cards
type: frontend
complexity: high
dependencies:
  - task_01
  - task_02
---

# Task 6: Pool Detail Match And Prediction Cards

## Overview
Refresh the pool detail screen around the core user loop: seeing upcoming matches and entering predictions before kickoff. This task should make match cards, prediction forms, deadlines, and lock states easy to scan and use on a phone.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST prioritize upcoming matches, prediction inputs, kickoff timing, and current prediction state.
- Requirement 2: MUST preserve existing prediction lock rules and save behavior.
- Requirement 3: MUST use Task 02 demo data to validate realistic match and prediction content.
- Requirement 4: MUST make the primary prediction action thumb-friendly and clear on mobile.
- Requirement 5: SHOULD include limited locked/completed visual cues only when the happy-path data requires them.
</requirements>

## Subtasks
- [ ] 6.1 Refresh pool header and match list hierarchy for mobile scanning.
- [ ] 6.2 Present match cards with teams, kickoff context, prediction state, and deadline clarity.
- [ ] 6.3 Present prediction inputs and save actions using shared visual primitives.
- [ ] 6.4 Preserve lock behavior and domain-driven editability cues.
- [ ] 6.5 Add tests for match card states, prediction form rendering, and lock behavior display.
- [ ] 6.6 Document any unresolved decisions around exact match-card variants for the TechSpec.

## Implementation Details
This is the highest-risk UI task because it touches the core participation flow. Keep behavioral changes tightly scoped and avoid changing scoring, lock, or membership rules.

### Relevant Files
- `src/app/pools/[poolId]/page.tsx` — Current pool detail, match list, and prediction forms.
- `src/features/pools/queries.ts` — `getPoolForMember` and match/prediction data.
- `src/features/pools/actions.ts` — `savePredictionAction` mutation.
- `src/domain/prediction-lock.ts` — Lock/editability rules.
- `src/domain/scoring.ts` — Context for prediction outcomes and points display.
- `src/app/globals.css` — Shared card, input, button, and stripe classes.

### Dependent Files
- `src/app/pools/[poolId]/ranking/page.tsx` — Ranking should visually connect to prediction outcomes.
- `src/app/pools/page.tsx` — Pool cards may link into the detail screen.
- `src/features/pools/queries.ts` — Query shape may need to support visual content needs from Task 02.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Match/prediction cards are the central proof of the mobile demo journey.

## Deliverables
- Refreshed pool detail screen with mobile-first match and prediction cards.
- Clear editable, locked, and saved prediction cues for the happy-path scenario.
- Tests covering match-card content, prediction form availability, and lock-state rendering.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for pool detail rendering with demo match/prediction data **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Editable match card renders teams, kickoff time, score inputs, and save action.
  - [ ] Saved prediction state renders the user's current predicted score.
  - [ ] Locked match state hides or disables editing and explains why.
  - [ ] Match card uses non-color-only status text for editability.
- Integration tests:
  - [ ] Pool detail page renders Task 02 upcoming matches for a demo member.
  - [ ] Prediction form remains connected to the existing save action.
  - [ ] Authenticated pool access remains restricted to valid members.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- A mobile member can identify which match needs a prediction and how to submit it.
- Existing prediction lock and save behavior remains intact.
