---
name: prd
description: |
  Use when the user wants to execute a PRD (Product Requirements Document) end-to-end from `.claude/prds/<number>-<name>/`, running every phase from `TASK.md` sequentially without stopping, with optional resume via `--from-phase N`.

  TRIGGER when: user invokes `/prd <number|name>` or `/prd <number> --from-phase N`; user says "execute the PRD", "run the PRD", "let's do the PRD for X", "continue the PRD", "resume the PRD"; user references a folder under `.claude/prds/` (e.g. `001-shortcuts-search-bar`) and asks to start or continue work on it; user asks to pick up an in-progress PRD from its `STATE.md` checkpoint.
disable-model-invocation: true
argument-hint: "<number|name> [--from-phase N]"
---

# PRD Execution

Execute a PRD from `.claude/prds/` by running all phases to completion.

## CRITICAL: COMPLETE EXECUTION REQUIRED

**NEVER stop execution before ALL phases are completed.** Do not pause to ask the user mid-execution. Do not invent tasks not in TASK.md.

## Usage

```
/prd 001-shortcuts-search-bar          # Execute PRD by number-name
/prd shortcuts-search-bar              # Execute PRD by name
/prd 001                               # Execute PRD by number
/prd 001 --from-phase 3               # Resume from specific phase
```

## Session Recovery

At the START of execution:

1. Find the matching PRD folder in `.claude/prds/`
2. Read `STATE.md` — if it exists, check current phase and completed tasks
3. Read `TASK.md` — count `- [x]` vs `- [ ]` to confirm position
4. Read `SPEC.md` only if this is the first session (no completed tasks) or for context
5. Read `DECISION.md` if it exists
6. If tasks are already checked → skip to first unchecked `- [ ]`
7. Announce: "Reprise Phase X, tache Y.Z" and **continue without asking**

## Pre-execution (first session only)

1. Read SPEC.md for full context
2. Read TASK.md for the task plan
3. Identify impacted projects from SPEC.md (Architecture section)
4. Address pre-requisites if any (install deps, create types)
5. Announce execution plan briefly, then **start immediately**

## For each PHASE

```
1. Announce: "Phase X: [name]"
2. Execute ALL tasks in the phase sequentially
3. After each task: mark [x] in TASK.md
4. Run phase validation (lint + tests on modified files)
5. Use code-reviewer agent on modified files (foreground)
6. CRITICAL gate:
   a. If CRITICAL findings → fix issues
   b. Re-run validation
   c. Re-review scoped to fixes only
   d. Repeat until no CRITICAL findings
7. Append findings + decisions to DECISION.md
8. Overwrite STATE.md with checkpoint
9. Commit: git commit -m "feat(scope): PRD XXX phase X - [description]"
10. Announce: "Phase X complete" then IMMEDIATELY start Phase X+1
```

## STATE.md Format

Overwritten (not appended) at each phase end:

```markdown
# State — PRD XXX: Name

## Last Updated
YYYY-MM-DD

## Current Phase
Phase X: [name] — COMPLETED

## Completed Tasks
- Phase 1 — [name]
  - Task 1.1: [description]
  - Task 1.2: [description]
- Phase 2 — [name]
  - ...

## In Progress
Phase X+1 — [name] (next)

## Blocked
_None._

## Key Decisions
- DEC-001: [summary]

## Files Modified
- `path/to/file.tsx` — [what changed]
```

## DECISION.md Format

Append-only log:

```markdown
## Phase X: [name]

### Reviewer findings
- **CRITICAL** [Category] `file.ts:42` — description → Fixed
- **WARNING** [Category] `file.ts:88` — description → Accepted/Fixed

### Decisions
- [Decision description and rationale]
```

## Validation Commands

### After each phase

Run on the **impacted project(s)** only:

```bash
# Lint modified files
npx eslint [modified files]

# Tests (if test files exist or were modified)
npx jest --runInBand --watchman=false --testPathPatterns="[pattern]" --no-coverage
```

### After ALL phases (final validation)

```bash
# Build the impacted project
cd [project] && pnpm build

# Run all tests in the project
npx jest --runInBand --watchman=false --no-coverage

# Lint all modified files across all phases
npx eslint [all modified files]
```

Note: `--watchman=false` is required in sandbox environments.

## On Completion

```
1. Run FULL validation (build + tests + lint)
2. Final commit if needed
3. Overwrite STATE.md with final state (all phases completed)
4. Mark all tasks [x] in TASK.md
5. Show summary of all changes
```

## Rules

**Follow TASK.md exactly:**
- Do NOT invent tasks not in the plan
- Do NOT add test types not specified (e.g. don't add RTL integration tests if only unit tests are listed)
- Do NOT skip tasks

**Never stop execution:**
- Do NOT pause mid-phase to ask questions
- Do NOT stop between phases to ask "should I continue?"
- Do NOT suggest manual verification — automate everything possible
- If blocked: report the blocker, suggest fix, continue after resolution

**Commit convention:**
- One commit per completed phase
- Format: `feat(scope): PRD XXX phase X - [description]`
- No AI attribution in commit messages

**Jamespot-specific:**
- Build order: user-api → front-business → react-components → react-core → react-extensions
- Only rebuild impacted projects, not all 5
- Jest 30: use `--testPathPatterns` (not `--testPathPattern`)
- Lazy components via `jCore.registry.getLazyComponent('Name')`
- Translations in `extension/translation/lang.json`
- Relative imports only (`./`, `../`), never `src/*`
