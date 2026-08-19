# AGENTS.md

## Purpose
This repository defines three local Codex agents and one local skill so work can be executed consistently from within the project workspace.

## Agents

### Development Agent
- Goal: implement features, refactors, and bug fixes in the Next.js app.
- First steps: inspect affected files, confirm the runtime path, then edit the smallest surface that solves the task.
- Required verification: run the narrowest relevant command first, then run `pnpm.cmd qa` before closing substantial work.
- Default commands:
  - `pnpm.cmd dev`
  - `pnpm.cmd lint`
  - `pnpm.cmd typecheck`

### Unit Test Agent
- Goal: add or update deterministic unit tests for pure logic and validation rules.
- Test location: `tests/registrySchema.test.ts` is the initial pattern to follow.
- Preferred scope: schemas, utilities, formatters, and server-side helpers with low I/O coupling.
- Default command:
  - `pnpm.cmd test:unit`

### QA Agent
- Goal: validate code health before handoff.
- Required checks:
  - `pnpm.cmd lint`
  - `pnpm.cmd typecheck`
  - `pnpm.cmd test:unit`
- Aggregate command:
  - `pnpm.cmd qa`

### One-Off Operations
- Referral backfill for existing production users:
  - Preview only: `pnpm.cmd referrals:backfill -- --dry-run`
  - Execute and send emails: `pnpm.cmd referrals:backfill`
  - Execute without emails: `pnpm.cmd referrals:backfill -- --skip-email`
- The script is idempotent because it only processes users whose `referral_code` is still `null`.

## Local Skill

### `project-ops`
- Path: `.codex/skills/project-ops/SKILL.md`
- Use this skill when the task is to run the local development, unit test, or QA workflows from Codex.
- If the system skill registry is unavailable in the sandbox, this repo-local skill is the fallback source of truth.

## Cursor Cloud specific instructions

This is a Next.js 16 (Turbopack) waitlist landing page backed by PostgreSQL via Prisma 7 (using the `@prisma/adapter-pg` driver adapter). Resend handles email but is optional in dev. On Linux use plain `pnpm` (the `pnpm.cmd` in the rest of this file is Windows-only).

- Commands: see `package.json` scripts. `pnpm dev` (port 3000), `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, and `pnpm qa` (lint + typecheck + unit tests). Unit tests run with `node --experimental-strip-types` and need no database.
- PostgreSQL must be running before starting the app or applying migrations. It is not auto-started; start it each session with `sudo pg_ctlcluster 16 main start`. The dev DB is `equitty` with role `postgres`/`postgres`.
- Env: the app reads `.env` (gitignored, so it is not in the repo). If it is missing, recreate it from `.env.example` with `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/equitty?schema=public"` and `NEXT_PUBLIC_BASE_URL="http://localhost:3000"`.
- Apply schema with `pnpm exec prisma migrate deploy` (the `.env` `DATABASE_URL` is read via `prisma.config.ts`). The Prisma client is generated into `app/generated/prisma` by the `postinstall` hook, so it regenerates on every `pnpm install`.
- Email: when `EMAIL_FROM` is blank, signups skip sending real email (the server action just logs a warning) and still succeed. Leave it blank in dev unless testing Resend with a real `RESEND_API_KEY`.
- Core flow to smoke-test: open `http://localhost:3000/es`, submit an email in the hero waitlist form, and confirm a new row lands in `waitlist_signups` (a unique `referral_code` is generated per signup).
