# HIOXX — Arquitectura Técnica

## Principios

1. **Modularidad:** Cada tipo de cálculo es un módulo autocontenido.
2. **Separación de responsabilidades:** Engine (lógica pura) → Module (integración) → ResultsView (UI).
3. **Registry pattern:** Un solo punto de registro para todos los módulos.
4. **Frontend-only:** Cálculos como funciones puras en el cliente.
5. **Spec-driven:** La lógica de negocio se documenta en `docs/specs/` antes de implementarse.

## Estructura de carpetas

```
src/
├── features/
│   ├── intake/              # Captura de datos (stepper)
│   ├── summary/             # Resumen post-captura
│   ├── calculation-selector/ # Selección de tipo de cálculo
│   └── calculations/
│       ├── core/            # Types, registry, guards
│       ├── pitagorico/
│       ├── estudio-cuantico/
│       ├── hebreo/
│       └── caldeo/
├── components/ui/           # Primitivos UI compartidos
├── stores/                  # Zustand stores
├── routes/                  # React Router
├── services/                # Servicios externos (geocoding)
└── utils/                   # Utilidades puras
```

## Patrón CalculationModule

```typescript
interface CalculationModule<TOutput = unknown> {
  type: CalculationType;
  label: string;
  description: string;
  status: "active" | "coming-soon";
  calculate: (profile: HioxxProfile) => TOutput;
  ResultsView: React.ComponentType<{ result: TOutput; profile: HioxxProfile }>;
}
```

### Capas por módulo

| Archivo | Responsabilidad |
|---------|-----------------|
| `*.engine.ts` | Lógica pura, sin dependencias React. Testeable unitariamente. |
| `*.module.ts` | Implementa `CalculationModule`, conecta engine + ResultsView. |
| `*ResultsView.tsx` | Componente React que renderiza el output. |

## Registry

Archivo: `src/features/calculations/core/registry.ts`

```typescript
const modules: CalculationModule[] = [
  pitagoricoModule,
  estudioCuanticoModule,
  hebreoModule,
  caldeoModule,
];

export function getModule(type: CalculationType): CalculationModule | undefined;
export function getActiveModules(): CalculationModule[];
export function getAllModules(): CalculationModule[];
```

Agregar un quinto cálculo = crear carpeta + registrar en el array.

## Store de sesión

Archivo: `src/stores/hioxxSessionStore.ts`

- **Profile:** Datos del usuario (`HioxxProfile`)
- **Phase:** Fase actual del flujo (`intake` | `summary` | `calculation-select` | `results`)
- **selectedCalculation:** Tipo de cálculo seleccionado
- **Persistencia:** localStorage via Zustand persist

El stepper store (`stepperStore`) maneja la captura paso a paso. Al completar, los datos se consolidan en el session store.

## Guards de rutas

Archivo: `src/features/calculations/core/guards.ts`

| Función | Verifica |
|---------|----------|
| `isProfileComplete(profile)` | Todos los campos requeridos presentes y válidos |
| `canAccessSummary(profile)` | Alias de isProfileComplete |
| `canAccessCalculationSelect(profile)` | Alias de isProfileComplete |
| `canAccessResults(type, profile)` | Profile completo + módulo activo |

Implementados como componentes `<RouteGuard>` o loaders de React Router.

## Rutas

| Ruta | Componente | Guard |
|------|-----------|-------|
| `/` | IntakePage | — |
| `/resumen` | SummaryPage | profile completo |
| `/calculo` | CalculationSelectPage | profile completo |
| `/calculo/:type` | ResultsPage | módulo activo + profile completo |

## Convenciones de naming

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Módulo de cálculo | kebab-case carpeta | `estudio-cuantico/` |
| Engine | `{name}.engine.ts` | `pitagorico.engine.ts` |
| Module | `{name}.module.ts` | `pitagorico.module.ts` |
| ResultsView | `{Name}ResultsView.tsx` | `PitagoricoResultsView.tsx` |
| Spec | `{name}.md` | `calculations/pitagorico.md` |
| Types | `types.ts` en core | — |

## Testing strategy

- **Engines:** Funciones puras → tests unitarios directos (Vitest).
- **Guards:** Tests con perfiles completos e incompletos.
- **Components:** Tests de integración opcionales; priorizar engines.
- **E2E:** Flujo completo captura → resumen → selección → resultados.

## Cómo agregar un nuevo módulo de cálculo

1. Crear spec en `docs/specs/calculations/{nombre}.md`
2. Crear carpeta `src/features/calculations/{nombre}/`
3. Implementar `{nombre}.engine.ts` con lógica pura
4. Implementar `{Name}ResultsView.tsx`
5. Crear `{nombre}.module.ts` que implemente `CalculationModule`
6. Registrar en `registry.ts`
7. Cambiar `status` a `"active"` cuando esté listo
8. Agregar tests unitarios del engine

Ver también: `.cursor/skills/hioxx-development/MODULE-GUIDE.md`

## Sistema de homólogos letra-número

Cada tipo de cálculo define su tabla en `{nombre}.homolog.ts`. Utils compartidos:

| Archivo | Rol |
|---------|-----|
| `core/letterHomolog.types.ts` | `LetterHomologMap`, `LetterCell` |
| `core/letterHomolog.utils.ts` | `parseNameWords`, `mapCharacter`, `buildLetterBreakdown` |
| `{modulo}/{modulo}.homolog.ts` | Mapa específico del cálculo |

Los dígitos 0-9 son configurables por tipo. Valores no confirmados: marcar `[PENDIENTE]` en spec.

## Temas y UI de resultados

| Archivo | Rol |
|---------|-----|
| `core/calculationThemes.ts` | Color primario por `CalculationType` |
| `components/ui/CalculationAccordion.tsx` | Secciones expandibles |
| `components/ui/LetterNumberGrid.tsx` | Grid letra/número |

Ver `docs/specs/DESIGN-SYSTEM.md`.

## Dependencias clave

| Paquete | Uso |
|---------|-----|
| `zustand` | State management + persist |
| `zod` | Validación de schemas |
| `react-router-dom` | Routing multi-fase |
| `country-state-city` | Selectores geográficos |
| `leaflet` + `react-leaflet` | Mapa interactivo |
| `framer-motion` | Animaciones UI |
| `dayjs` | Manejo de fechas |
