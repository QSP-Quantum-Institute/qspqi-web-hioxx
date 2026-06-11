---
name: hioxx-development
description: Guides development of the HIOXX calculator — modular calculations, spec-driven workflow, intake flow. Use when working on qspqi-web-hioxx, HIOXX calculations, stepper, or business logic implementation.
---

# HIOXX Development

## Workflow

1. Read `AGENTS.md` for project map
2. Read `docs/specs/BUSINESS.md` for business rules
3. If working on a specific calculation, read `docs/specs/calculations/{type}.md`
4. Read `docs/specs/TECHNICAL-ARCHITECTURE.md` for technical patterns
5. Implement following the module pattern below
6. Update the relevant spec MD when business logic is implemented

## Module Pattern

```
src/features/calculations/{name}/
├── {name}.engine.ts      # Pure logic — testable, no React
├── {name}.module.ts      # CalculationModule implementation
└── {Name}ResultsView.tsx # Output UI
```

## Key Rules

- Business logic ONLY in `*.engine.ts`
- Never couple calculation modules to each other
- Register all modules in `core/registry.ts`
- UI text in Spanish
- Validate with Zod schemas in `features/intake/schemas/`

## Current Status

- Intake stepper: implemented (5 steps)
- Post-intake flow: summary → calculation select → results
- Pitagorico: active stub (awaiting business spec)
- Other 3 calculations: coming-soon stubs

## Adding a New Calculation

See [MODULE-GUIDE.md](MODULE-GUIDE.md) for the step-by-step checklist.
