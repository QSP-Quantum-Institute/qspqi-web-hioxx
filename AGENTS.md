# HIOXX — Guía para Agentes

Calculadora especializada del QSP Quantum Institute. Proyecto React/Vite standalone embebido en qspqi-web-main via iframe.

## Inicio rápido

1. Leer [`docs/specs/BUSINESS.md`](docs/specs/BUSINESS.md) — lógica de negocio principal
2. Leer [`docs/specs/TECHNICAL-ARCHITECTURE.md`](docs/specs/TECHNICAL-ARCHITECTURE.md) — patrones técnicos
3. Si trabajas en un cálculo específico, leer `docs/specs/calculations/{tipo}.md`
4. Seguir skill: `.cursor/skills/hioxx-development/SKILL.md`

## Flujo de la aplicación

```
/ (IntakePage) → /resumen (SummaryPage) → /calculo (CalculationSelectPage) → /calculo/:type (ResultsPage)
```

## Mapa de responsabilidades

| Área | Ubicación |
|------|-----------|
| Captura de datos (stepper) | `src/features/intake/` |
| Resumen | `src/features/summary/` |
| Selector de cálculo | `src/features/calculation-selector/` |
| Módulos de cálculo | `src/features/calculations/{tipo}/` |
| Registry + types + guards | `src/features/calculations/core/` |
| UI primitivos | `src/components/ui/` |
| Store de sesión | `src/stores/hioxxSessionStore.ts` |
| Store del stepper | `src/features/intake/store/stepperStore.ts` |
| Validación Zod | `src/features/intake/schemas/` |
| Geocoding | `src/services/geocoding.ts` |
| Specs de negocio | `docs/specs/` |
| Planes de implementación | `docs/plans/` |

## Reglas clave

- Lógica de negocio **solo** en `*.engine.ts`, nunca en componentes React
- Cada módulo de cálculo es independiente; no acoplar módulos entre sí
- UI en español
- Actualizar spec MD cuando se implemente lógica de negocio
- Nuevos módulos: seguir checklist en `.cursor/skills/hioxx-development/MODULE-GUIDE.md`

## Tipos de cálculo

| Tipo | ID | Estado |
|------|----|--------|
| Pitagórico | `pitagorico` | Activo (stub) |
| Estudio Cuántico | `estudio-cuantico` | Próximamente |
| Hebreo | `hebreo` | Próximamente |
| Caldeo | `caldeo` | Próximamente |

## Stack

React 19, Vite 7, TypeScript, Tailwind, Zustand, Zod, React Router 7, Framer Motion, Leaflet, country-state-city
