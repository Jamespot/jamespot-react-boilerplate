---
name: prd-write
description: |
  Use when the user wants to author, resume, or inventory Product Requirement Documents (PRDs) under `.claude/prds/<NNN>-<name>/` (with `SPEC.md`, `TASK.md`, `DECISION.md`, `STATE.md` generated from `.claude/skills/prd-write/templates/`).

  TRIGGER when: user invokes `/prd-write create <name>`, `/prd-write load <number|name>`, or `/prd-write list`; user asks to "write a PRD", "create a PRD", "start a new PRD", "scaffold a spec", "open a feature plan", or "draft a SPEC.md/TASK.md"; user asks to resume an existing PRD, reload its `STATE.md` / `DECISION.md`, or list all PRDs with their current phase; user asks for the next auto-incremented PRD number under `.claude/prds/`.
argument-hint: "[create <name> | load <number|name> | list]"
---

# PRD Writer

Create, manage, and inspect Product Requirement Documents.

## Usage

- `/prd-write create <name>` — Create a new PRD with auto-incremented number
- `/prd-write load <number|name>` — Load an existing PRD's context (STATE.md + DECISION.md)
- `/prd-write list` — List all PRDs with their current state

## Behavior

### `create <name>`

1. Scan `.claude/prds/` directory for existing PRDs
2. Auto-increment the PRD number (format: `XXX`)
3. Create directory `.claude/prds/XXX-prd-<name>/` with 4 files:
   - `SPEC.md` — from template at `.claude/skills/prd-write/templates/SPEC.md`
   - `TASK.md` — from template at `.claude/skills/prd-write/templates/TASK.md`
   - `DECISION.md` — from template at `.claude/skills/prd-write/templates/DECISION.md`
   - `STATE.md` — from template at `.claude/skills/prd-write/templates/STATE.md`
4. Replace `{{NUMBER}}` with the PRD number and `{{NAME}}` with the PRD name in all templates
5. Replace `{{DATE}}` with today's date
6. Explore the relevant codebase to understand the current architecture
7. Fill in the SPEC.md with the feature requirements based on user input and codebase analysis
8. Fill in the TASK.md with phased implementation tasks
9. Display the created structure

### `load <number|name>`

1. Find the matching PRD in `.claude/prds/`
2. Read `STATE.md` to understand current progress
3. Read `DECISION.md` to understand architectural decisions
4. Summarize the current state to the user
5. Ask what they want to work on next

### `list`

1. List all directories in `.claude/prds/`
2. For each, read `STATE.md` to extract current phase
3. Display a table: Number | Name | Phase | Last Updated
