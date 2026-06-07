---
status: pending
title: Minimal Admin Demo Coherence
type: frontend
complexity: low
dependencies:
  - task_01
  - task_02
---

# Task 8: Minimal Admin Demo Coherence

## Overview
Polish the admin screen enough that the demo journey does not break when stakeholders inspect pool management. This task is intentionally limited to visual coherence for invite and member information, not new administration capabilities.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST preserve existing admin authorization and pool-management boundaries.
- Requirement 2: MUST visually align invite code and member list content with the refreshed product.
- Requirement 3: MUST use Task 02 demo data to provide a credible member/admin scenario.
- Requirement 4: MUST NOT add new admin features such as member removal, invite regeneration, or role management unless later specified.
- Requirement 5: SHOULD make admin scope clear so the MVP remains focused on the participant journey.
</requirements>

## Subtasks
- [ ] 8.1 Refresh admin page hierarchy around invite and member overview.
- [ ] 8.2 Present invite code and member list using shared cards and labels.
- [ ] 8.3 Keep admin actions limited to existing behavior.
- [ ] 8.4 Validate that demo data includes enough admin/member context.
- [ ] 8.5 Add tests for admin page rendering and authorization-sensitive content.

## Implementation Details
This task is low complexity because it should avoid behavior expansion. Any desire for richer admin tools belongs in a later PRD/TechSpec phase.

### Relevant Files
- `src/app/pools/[poolId]/admin/page.tsx` — Current admin invite and members screen.
- `src/features/pools/queries.ts` — Admin/member data source.
- `src/domain/tenancy.ts` — Role and management authorization rules.
- `src/features/auth/user.ts` — Current authenticated user context.

### Dependent Files
- `src/app/pools/[poolId]/page.tsx` — May link to admin controls for admin members.
- `src/app/globals.css` — Shared card/list/form primitives from Task 01.
- `src/features/pools/actions.ts` — Existing pool actions must remain unaffected.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Admin coherence supports demos without broadening MVP scope.

## Deliverables
- Refreshed admin page with invite and member content aligned to the visual system.
- Tests proving existing admin access and content rendering remain intact.
- Explicit notes if admin depth is insufficient for stakeholder demos.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for admin page render with demo admin/member data **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Admin page renders pool name, invite code, and member list labels.
  - [ ] Member list distinguishes admin and member roles in readable text.
  - [ ] No deferred admin actions are introduced in the MVP screen.
- Integration tests:
  - [ ] Admin demo user can render the admin screen with Task 02 data.
  - [ ] Non-admin member remains blocked or redirected according to existing rules.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Admin screen feels visually coherent without expanding MVP administration scope.
- Existing pool admin authorization remains unchanged.
