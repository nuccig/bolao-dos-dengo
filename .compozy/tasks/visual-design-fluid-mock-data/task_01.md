---
status: completed
title: Design Foundation — Tokens, Typography, Shared Shell
type: frontend
complexity: medium
dependencies: []
---

# Task 1: Design Foundation — Tokens, Typography, Shared Shell

## Overview
Establish the shared visual foundation needed for the mobile-first refresh. This task turns the `DESIGN.md` direction into reusable page chrome and styling primitives so later screen tasks do not duplicate layout, navigation, stripe, typography, and button patterns.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Requirement 1: MUST preserve the visual direction from `DESIGN.md`, including near-black canvas, sharp cards, restrained M stripe accents, uppercase labels, and mobile-first spacing.
- Requirement 2: MUST provide shared visual primitives for page shells, top navigation, section headers, stripe accents, cards, buttons, links, and form surfaces.
- Requirement 3: MUST keep the visual foundation compatible with existing App Router pages and current authentication redirects.
- Requirement 4: SHOULD address missing reusable patterns such as category tabs and mobile navigation states where needed by downstream tasks.
- Requirement 5: MUST document implementation gaps caused by the missing TechSpec, especially font-loading choices and shared component location.
</requirements>

## Subtasks
- [x] 1.1 Define the shared visual primitives required by all MVP screens.
- [x] 1.2 Align global styles with `DESIGN.md` tokens that are missing or incomplete.
- [x] 1.3 Introduce shared shell/navigation/card primitives for route-level reuse.
- [x] 1.4 Preserve existing layout behavior while improving mobile hierarchy and touch target consistency.
- [x] 1.5 Add focused tests or render checks for the shared primitives.
- [x] 1.6 Document unresolved implementation decisions for the later TechSpec.

## Implementation Details
No `_techspec.md` exists yet. Use the PRD and ADR-001 for product requirements, then choose the smallest implementation that supports downstream screens without creating a full standalone design system.

### Relevant Files
- `DESIGN.md` — Visual source of truth for colors, typography, spacing, components, and breakpoints.
- `src/app/globals.css` — Current home for CSS variables and `m-*` classes.
- `src/app/layout.tsx` — Root shell, metadata, viewport behavior, and global page structure.
- `src/app/page.tsx` — Existing public route that already uses several `m-*` primitives.
- `package.json` — Available validation scripts for lint, typecheck, tests, and build.

### Dependent Files
- `src/app/login/page.tsx` — Will consume shared shell and form styling in Task 04.
- `src/app/join/page.tsx` — Will consume shared shell and form styling in Task 04.
- `src/app/pools/page.tsx` — Will consume shared cards and page hierarchy in Task 05.
- `src/app/pools/[poolId]/page.tsx` — Will consume match-card and action primitives in Task 06.
- `src/app/pools/[poolId]/ranking/page.tsx` — Will consume ranking/card primitives in Task 07.
- `src/app/pools/[poolId]/admin/page.tsx` — Will consume admin card/list primitives in Task 08.

### Related ADRs
- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) — Requires a complete mobile demo journey anchored to the `DESIGN.md` visual direction.

## Deliverables
- Shared visual primitives that downstream tasks can reuse.
- Updated global styling aligned with the MVP needs from `DESIGN.md`.
- Documentation notes for unresolved TechSpec decisions, if any.
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for shared visual primitives and shell rendering **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] Shared shell renders the expected navigation, content slot, and accessible labels.
  - [ ] Shared button/link primitives preserve visible text and accessible names.
  - [ ] Shared card/stripe primitives render children without altering semantic structure.
- Integration tests:
  - [ ] A representative route renders inside the shared shell without authentication or runtime errors.
  - [ ] Mobile viewport render preserves one primary action and readable heading hierarchy.
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Downstream pages can reuse common visual primitives without copying shell markup.
- Core visual tokens and primitives match the PRD and `DESIGN.md` direction.
- No production behavior changes are introduced by the visual foundation alone.

## Implementation Notes (Unresolved Decisions)

- **Font loading**: `BMWTypeNextLatin` is a licensed typeface not available as a web font in this repo. The current fallback stack (`Inter`, `-apple-system`, …) is used everywhere until a font license or a web-font URL is provided. Once resolved, add a `<link>` preload in `layout.tsx` and update the `@font-face` declarations in `globals.css`.
- **No TechSpec**: There is no `_techspec.md` for this PRD. Component file location (`src/components/ui/`) and naming conventions were chosen using the smallest viable structure that matches Next.js App Router conventions. A TechSpec should codify these choices.
- **Hamburger nav**: `AppShell` currently renders a flat top-nav with no hamburger state. DESIGN.md specifies a full-screen overlay on `< 768px`. The mobile hamburger sheet requires `"use client"` state management and is scoped to Task 04 (Login/Join flows) or a dedicated shell iteration.
- **AppShell adoption**: Existing pages (`page.tsx`, `pools/page.tsx`, etc.) have not been migrated to use `AppShell` yet — that is the responsibility of Tasks 03-08. Both the legacy inline-nav pattern and the new `AppShell` are valid during the transition.
- **Category tabs**: The `m-category-tab` / `m-category-tab-active` CSS classes are defined in `globals.css` but no Tabs component exists yet. A dedicated component is expected in the downstream match/prediction screen tasks (Task 06).
