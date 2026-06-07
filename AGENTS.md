# Bolao Dos Dengo - Agent Guide

## Product Intent

Bolao Dos Dengo is a mobile-first app for running World Cup 2026 prediction pools. The core experience is social competition inside private pools: users join a pool, submit score predictions, track rankings, and compare achievements with other members.

Optimize for a fast mobile flow, clear trust in scoring, and simple administration for WhatsApp-style groups.

## Source Documents

- Read `AGENTS.md` first for product, architecture, business rules, and agent workflow.
- Read `DESIGN.md` before changing UI, layout, colors, typography, or component styling. Treat it as the visual direction source of truth unless the user explicitly asks to replace it.
- When a plan file is attached, execute the plan exactly and do not edit the plan file unless asked.

## Core Domain Language

- `Pool`: tenant and competition group. Every prediction, invite, ranking, membership, and achievement is scoped to a pool unless explicitly global.
- `PoolMembership`: connects a global user to a pool with role `admin` or `member`.
- `Match`: a cached World Cup 2026 fixture/result from API-Football.
- `Prediction`: one user's score guess for one match within one pool.
- `Ranking`: derived from predictions and official match results.
- `Achievement`: non-scoring badge earned from user activity or prediction outcomes.

## Stack Decisions

- Use Next.js full-stack with TypeScript.
- Build mobile-first UI first; desktop can be a responsive expansion.
- Use Supabase Auth for authentication.
- Use Postgres/Supabase as the database and Prisma as the application data layer.
- Treat API-Football as the primary external football data provider, but never render screens directly from external API calls. Persist and upsert provider data locally first.

## Business Rules

- Users are global accounts and may belong to many pools.
- Pools are private by default and entered through an admin-generated invite link or code.
- Pool admins can manage membership and invite codes for their own pool only.
- Predictions can be created or edited until `match.kickoffAt` in UTC.
- After kickoff, predictions are locked and must remain auditable.
- Scoring:
  - 5 points for exact score.
  - 3 points for correct outcome: home win, away win, or draw.
  - 0 points otherwise.
- Knockout matches use the final score after extra time and before penalties. Penalty shootouts do not affect MVP scoring.
- Ranking tiebreakers:
  - total points;
  - exact score hits;
  - outcome hits;
  - earliest `lastPointsAt`;
  - visual tie if still equal.
- Achievements are automatic, simple, and do not add ranking points.

## API-Football Sync

- Use API-Football with World Cup data such as `league=1` and `season=2026`.
- Store provider IDs as `externalId` values and upsert by provider plus external ID.
- Keep a sync log with status, timestamps, endpoint, and error details.
- Prefer scheduled/manual sync jobs over client-triggered provider calls.
- Cache teams, competitions, matches, results, and match status in the database.

## Implementation Standards

- Keep tenant boundaries explicit. Any pool-scoped query must include `poolId` or derive it from a verified membership.
- Keep scoring and lock rules in pure, testable domain functions.
- Prefer server actions or route handlers for mutations; validate membership and role before writing.
- Do not put secrets in the repo. Document required environment variables in `.env.example`.
- Use small, vertical slices: auth, pool creation, invite join, prediction entry, ranking, and admin tools.
- Avoid premature provider abstraction unless a second real data provider is added.
- Use subagents whenever tasks can be separated by ownership or review angle. Good defaults are: one implementer for an isolated vertical slice, one reviewer for spec compliance, and one reviewer focused on security/performance.
- Before opening a PR, run the local verification suite and request a code-review subagent focused on security, tenancy boundaries, secrets handling, data access, performance, and missing tests.

## Testing Priorities

Add focused tests for:

- score calculation;
- prediction lock rules;
- ranking tiebreakers;
- pool membership authorization;
- API-Football upsert behavior.

Use test-first development for behavior changes when practical. Configuration and generated scaffold files do not require TDD.

## Skill Guidance

- Use planning skills for broad architecture or scope changes.
- Use TDD skills before implementing scoring, ranking, lock, or tenancy behavior.
- Use diagnose/debug skills for failing tests, broken auth/session flows, provider sync failures, and performance regressions.
- Use review skills after completing a major vertical slice.
- Use final verification skills before claiming work is complete.

## Subagent-Driven Development

Use SDD for non-trivial work and keep the controller agent focused on coordination:

1. Research: use read-only exploration or research subagents to understand the codebase, docs, API constraints, security risks, and performance hotspots.
2. Plan: consolidate decisions into a short implementation plan with explicit files, tests, risks, and acceptance criteria.
3. Tasks: split the plan into independent vertical slices. Each task should have enough context for a fresh subagent to work without inherited chat history.
4. Execute: dispatch subagents per task when possible, then dispatch separate review subagents for spec compliance and code quality. Fix Critical and Important feedback before moving on.

Prefer this loop:

- Research subagent finds context and constraints.
- Planning step defines the work and test strategy.
- Implementer subagent handles one isolated task.
- Code-review subagent checks security, performance, maintainability, and test gaps.
- Controller verifies locally with `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.

## Pull Request Standard

After implementation and verification, create a PR with:

- a concise title describing the user-facing outcome;
- a `## Summary` section with 2-4 bullets;
- a `## Test Plan` section listing the exact commands run;
- a `## Security And Performance Review` section summarizing subagent review findings and any residual risks.

Do not push secrets. Do not skip CI. If CI fails, diagnose before asking for merge.
