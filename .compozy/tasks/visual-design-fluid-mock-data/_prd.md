# Visual Refresh With Fluid Mocked Demo Data

## Overview

Bolao Dos Dengo needs a cohesive mobile-first visual refresh that applies the direction in `DESIGN.md` across the product journey and makes the app understandable without relying on live production data.

The refresh is for new and returning pool participants who need to quickly understand three things on a phone: what the pool is, which matches need predictions, and how their ranking compares with friends. It is also for admins and stakeholders who need a convincing demo of the product before the World Cup 2026 data experience is fully mature.

The MVP will use one realistic happy-path scenario: an active private pool with upcoming matches, user predictions, and a ranking. This scenario should make the app feel alive, testable, and ready for visual review while keeping scope focused.

## Goals

- Help a first-time mobile user understand the app proposition in under one minute.
- Apply the `DESIGN.md` visual language consistently across the visitor-to-ranking journey.
- Make the core pool loop feel fluid on mobile: join or create a pool, view matches, enter predictions, and compare ranking.
- Provide realistic mocked content for demos and visual validation of the happy path.
- Reduce visual fragmentation between pages by making repeated interaction patterns feel consistent.

## User Stories

- As a new visitor, I want to understand quickly that Bolao Dos Dengo is a private World Cup prediction pool app so that I know why I should join.
- As an invited participant, I want the join flow to feel clear and trustworthy so that I can enter my group without confusion.
- As a pool member, I want to see my active pool, upcoming matches, and pending predictions at a glance so that I know what to do next.
- As a pool member, I want prediction cards to be easy to scan and use on mobile so that I can submit guesses quickly before kickoff.
- As a pool member, I want the ranking to feel social and competitive so that I can understand my position against friends.
- As an admin or stakeholder, I want a realistic demo scenario so that I can evaluate visual quality and product clarity without needing live data.

## Core Features

- Mobile-first visual journey: The MVP covers the journey from landing page to pool activity and ranking, with each screen supporting the same visual language and user story.
- DESIGN.md alignment: Screens use the near-black canvas, premium typography, sharp cards, restrained BMW M tricolor accents, strong contrast, and confident uppercase labels from the design direction.
- Football competition adaptation: The interface keeps the premium motorsport-inspired foundation while adding subtle football, World Cup, and social competition context through copy, match content, and ranking emphasis.
- Happy-path mock scenario: The app presents one believable active pool with upcoming World Cup matches, participant names, prediction states, and ranking positions.
- Fast comprehension hierarchy: Each screen makes the primary next action obvious, especially on mobile. Secondary information supports context without crowding the screen.
- Fluid responsive behavior: The experience works from phone to desktop, but mobile is the primary acceptance target. Larger screens should expand the layout without changing the core journey.
- Demo-ready content quality: Mocked names, teams, match times, scores, and ranking values should feel realistic enough for stakeholder review and user testing.

## User Experience

The journey starts with a high-impact landing experience that communicates private World Cup prediction pools, social competition, and the main call to action. The visual tone should feel premium, dark, and energetic, with the M stripe used as a signature rather than decoration.

An invited user should be able to move from the landing or join context into a pool flow without decoding app structure. Labels, empty hints, and calls to action should explain the path in plain language.

Once inside a pool, the user should immediately see the current competition state: the active pool name, upcoming matches, prediction deadlines, and where they stand. Match cards should prioritize teams, kickoff timing, prediction action, and lock status. Ranking should make the user's own position easy to find.

The mocked scenario should support a complete read-through of the app: the user can see what the app is, why the pool matters, what prediction action comes next, and how points translate into ranking. The scenario should not attempt to cover every edge state in the MVP.

Accessibility expectations include strong contrast, readable text on small screens, touch-friendly controls, non-color-only status cues, and layouts that do not depend on hover behavior.

## High-Level Technical Constraints

- The experience must respect the existing product boundaries around private pools, predictions, ranking, and admin-managed invites.
- The visual demo must avoid real personal data and use safe representative content.
- The mobile experience should remain fast enough to feel immediate on typical phone connections.
- Mocked content must be clearly suitable for development, demo, and visual validation contexts, not production truth.

## Non-Goals (Out of Scope)

- Full redesign of the product strategy or domain model.
- Full design-system extraction as a standalone deliverable.
- Comprehensive empty, error, locked, completed, and edge-case states in the MVP.
- Achievement depth, streak systems, chat, notifications, or advanced social features.
- Live data integration changes.
- Admin workflow expansion beyond what is needed to keep the journey coherent.
- Desktop-first layouts or separate desktop-only experiences.

## Phased Rollout Plan

### MVP (Phase 1)

- Apply a cohesive `DESIGN.md`-aligned visual direction to the complete visitor-to-ranking journey.
- Use one happy-path mocked active pool scenario.
- Prioritize mobile comprehension and thumb-friendly interaction.
- Make ranking and prediction cards visually clear and demo-ready.
- Success criteria: a new user can describe the app's purpose, next action, and competitive outcome in under one minute on a phone.

### Phase 2

- Add important state variations: no pool, no predictions yet, prediction locked, match completed, and user not ranked.
- Expand mocked scenarios to cover these visual states.
- Improve admin and invite clarity where the MVP reveals friction.
- Success criteria: the product can support broader visual QA without relying on live data.

### Phase 3

- Add richer competition storytelling, such as achievements, form, history, close ranking battles, and social comparison.
- Refine content for higher-stakes demos and user testing.
- Success criteria: the experience feels engaging beyond the first use and supports repeated pool participation.

## Success Metrics

- First-time comprehension: users can explain the app proposition, current pool state, and next action in under one minute.
- Mobile task clarity: users can identify where to enter predictions and where to check ranking without guidance.
- Visual consistency: core screens feel like one product and follow `DESIGN.md` direction.
- Demo readiness: stakeholders can review the happy-path journey without setup, live data, or manual explanation.
- Responsive quality: phone, tablet, and desktop layouts preserve hierarchy without broken cards, cramped actions, or unreadable text.
- Content realism: mocked data feels plausible for a World Cup private pool and supports meaningful design review.

## Risks and Mitigations

- Risk: The BMW M-inspired style may feel too automotive for a football product.
  Mitigation: Use the design language as a premium visual foundation while copy, match cards, ranking, and pool context keep the experience grounded in football.

- Risk: A happy-path mock scenario may create false confidence.
  Mitigation: Keep MVP scope explicit and schedule state variations for Phase 2.

- Risk: The refresh could prioritize surface polish over user clarity.
  Mitigation: Use under-one-minute mobile comprehension as the primary success signal.

- Risk: Too many visual elements may compete on small screens.
  Mitigation: Prefer card hierarchy, restrained accent use, large touch targets, and one primary action per screen section.

- Risk: Stakeholders may expect live behavior from mocked content.
  Mitigation: Label the purpose of mocked content in project documentation and keep product claims focused on visual validation.

## Architecture Decision Records

- [ADR-001: Cohesive Mobile-First Demo Journey](adrs/adr-001.md) - Selects a complete mobile demo journey with happy-path mocked pool data over design-system-first or richer competition-demo alternatives.

## Open Questions

- Which exact screens will be considered mandatory for MVP acceptance after the TechSpec defines implementation scope?
- Should the mocked scenario use real World Cup 2026 teams only, or can it mix representative placeholder matchups for clarity?
- What level of visible admin experience is required in the first demo pass?
