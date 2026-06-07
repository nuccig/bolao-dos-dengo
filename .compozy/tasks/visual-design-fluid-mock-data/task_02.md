---
status: pending
title: Happy-Path Demo Scenario And Seed
type: backend
complexity: high
dependencies: []
---

# Task 2: Happy-Path Demo Scenario And Seed

## Overview
Create the representative data story required for the visual refresh: one active private pool with members, upcoming matches, editable predictions, and a ranking. This task makes the product demo credible without depending on live provider data or real user data.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST provide one realistic happy-path pool scenario with safe representative content only.
- Requirement 2: MUST include enough data for pool list, pool detail, predictions, ranking, and minimal admin views.
- Requirement 3: MUST keep demo content aligned with domain rules for prediction locks, scoring, ranking, and pool membership.
- Requirement 4: MUST be repeatable for local development and visual validation without requiring live API-Football data.
- Requirement 5: MUST explicitly document unresolved implementation choices because `_techspec.md` is missing, including seed strategy, demo access, and real versus placeholder team names.
</requirements>

## Subtasks
- [ ] 2.1 Define the happy-path data narrative for an active World Cup private pool.
- [ ] 2.2 Provide representative users, memberships, matches, predictions, and ranking outcomes.
- [ ] 2.3 Ensure demo data respects prediction lock and scoring expectations.
- [ ] 2.4 Make the scenario repeatable for local development and stakeholder demos.
- [ ] 2.5 Document how demo data should be used and what it does not cover.
- [ ] 2.6 Add tests that prove the scenario supports the required screens and domain outcomes.

## Implementation Details
No `_techspec.md` exists yet. Do not invent broad infrastructure beyond what is needed for the PRD happy path; capture any seed-versus-fixture decision as a gap for the TechSpec if it remains unresolved.

### Relevant Files
- `prisma/schema.prisma` — Defines pool, membership, match, prediction, invite, and user profile data relationships.
- `src/features/pools/queries.ts` — Shows the data shapes consumed by pool list, pool detail, ranking, and admin pages.
- `src/domain/scoring.ts` — Defines scoring behavior the demo ranking must respect.
- `src/domain/ranking.ts` — Defines ranking ordering and tiebreakers.
- `src/domain/prediction-lock.ts` — Defines whether prediction inputs should be editable.
- `.env.example` — Should document any demo-data environment expectations if introduced.
- `package.json` — May need a repeatable demo/seed command if the implementation chooses that path.

### Dependent Files
- `src/app/pools/page.tsx` — Needs a visible active pool for the demo.
- `src/app/pools/[poolId]/page.tsx` — Needs matches and prediction states.
- `src/app/pools/[poolId]/ranking/page.tsx` — Needs ranking rows and current-user context.
- `src/app/pools/[poolId]/admin/page.tsx` — Needs invite and member data for minimal coherence.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Requires happy-path mocked data that supports the full mobile demo journey.

## Deliverables
- A repeatable happy-path demo scenario covering pool, members, matches, predictions, and ranking.
- Clear documentation or environment notes for running or identifying the demo scenario.
- Tests proving demo data produces valid screen-ready states and domain-consistent ranking.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for seeded/demo pool queries and ranking readiness **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Demo scenario includes at least one active pool, multiple members, multiple upcoming matches, and ranking-relevant predictions.
  - [ ] Demo match and prediction timestamps produce expected editable and non-editable states.
  - [ ] Demo ranking inputs produce deterministic points and ordering.
- Integration tests:
  - [ ] Pool-list query can return the demo active pool.
  - [ ] Pool-detail query can return match and prediction data for the demo user.
  - [ ] Ranking query can return ordered demo standings without live provider data.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Demo data supports the MVP happy path without production personal data.
- Demo scenario can be recreated consistently in local development.
- Downstream visual tasks have representative content for all required authenticated screens.
