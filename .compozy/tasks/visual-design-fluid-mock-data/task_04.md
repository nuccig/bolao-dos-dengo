---
status: pending
title: Login, Join, And Create-Pool Visual Flows
type: frontend
complexity: medium
dependencies:
  - task_01
---

# Task 4: Login, Join, And Create-Pool Visual Flows

## Overview
Make the entry flows feel trustworthy, focused, and visually consistent with the refreshed product. This task covers login, invited pool join, and pool creation screens so the journey from interest to participation does not feel fragmented.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST keep existing authentication and server-action behavior intact.
- Requirement 2: MUST apply shared form, shell, button, and message primitives from Task 01.
- Requirement 3: MUST make invite joining and pool creation understandable without technical terminology.
- Requirement 4: MUST preserve mobile readability and touch-friendly controls.
- Requirement 5: SHOULD identify any stakeholder-demo access gaps caused by authentication requirements for later TechSpec resolution.
</requirements>

## Subtasks
- [ ] 4.1 Refresh login screen hierarchy and messaging for a private-pool product.
- [ ] 4.2 Refresh invite/join flow with clear expectations and error/success message placement.
- [ ] 4.3 Refresh pool creation flow with concise labels and next-step clarity.
- [ ] 4.4 Align all entry forms with shared visual primitives from Task 01.
- [ ] 4.5 Add tests for rendering, labels, accessible controls, and preserved form actions.

## Implementation Details
This task is visual and experiential. It must not add new authentication methods, new admin capabilities, or broad onboarding logic unless a later TechSpec explicitly calls for it.

### Relevant Files
- `src/app/login/page.tsx` — Login route shell and page copy.
- `src/app/login/login-form.tsx` — Client login form with Google and magic-link actions.
- `src/app/join/page.tsx` — Invite code form for joining a pool.
- `src/app/pools/new/page.tsx` — Pool creation form.
- `src/features/pools/actions.ts` — Existing join and create server actions.
- `src/features/auth/user.ts` — Existing authenticated-user guard.

### Dependent Files
- `src/app/page.tsx` — Landing CTAs should connect cleanly to these entry flows.
- `src/app/pools/page.tsx` — Successful pool creation or joining leads to the pool list.
- `src/app/globals.css` — Shared form and layout primitives may be consumed or extended.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Entry flows connect the public landing page to the authenticated pool journey.

## Deliverables
- Refreshed login, join, and create-pool screens using shared visual primitives.
- Clear mobile copy for invited users and pool creators.
- Tests proving the forms remain accessible and connected to existing behavior.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for entry-flow page render and form availability **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Login form renders Google and magic-link options with accessible labels.
  - [ ] Join form renders invite-code input and submit action with clear labels.
  - [ ] Create-pool form renders pool-name input and submit action with clear labels.
- Integration tests:
  - [ ] Entry pages render inside the shared visual shell without runtime errors.
  - [ ] Existing form actions remain attached to join and create-pool forms.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Entry screens feel like the same product as the landing page.
- Users can understand whether they should sign in, join by invite, or create a pool.
