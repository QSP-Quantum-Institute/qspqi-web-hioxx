# Guía para Agregar un Módulo de Cálculo

## Checklist

```
- [ ] 1. Crear spec en docs/specs/calculations/{nombre}.md
- [ ] 2. Crear carpeta src/features/calculations/{nombre}/
- [ ] 3. Definir tipos de output en {nombre}.types.ts (opcional)
- [ ] 4. Implementar {nombre}.engine.ts (función pura)
- [ ] 5. Implementar {Name}ResultsView.tsx
- [ ] 6. Crear {nombre}.module.ts (implementa CalculationModule)
- [ ] 7. Registrar en core/registry.ts
- [ ] 8. Cambiar status a "active" en el module
- [ ] 9. Agregar tests unitarios del engine
- [ ] 10. Actualizar spec con lógica implementada
- [ ] 11. Actualizar matriz en docs/specs/BUSINESS.md si aplica
```

## Template: engine

```typescript
// {nombre}.engine.ts
import type { HioxxProfile } from "../core/types";
import type { {Name}Result } from "./{nombre}.types";

export function calculate{Name}(profile: HioxxProfile): {Name}Result {
  // Pure business logic here
  return { ... };
}
```

## Template: module

```typescript
// {nombre}.module.ts
import type { CalculationModule } from "../core/types";
import { calculate{Name} } from "./{nombre}.engine";
import { {Name}ResultsView } from "./{Name}ResultsView";

export const {nombre}Module: CalculationModule<{Name}Result> = {
  type: "{nombre}",
  label: "Cálculo {Label}",
  description: "Descripción del cálculo",
  status: "active",
  calculate: calculate{Name},
  ResultsView: {Name}ResultsView,
};
```

## Template: ResultsView

```tsx
// {Name}ResultsView.tsx
import type { HioxxProfile } from "../core/types";
import type { {Name}Result } from "./{nombre}.types";

interface Props {
  result: {Name}Result;
  profile: HioxxProfile;
}

export function {Name}ResultsView({ result, profile }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Render result */}
    </div>
  );
}
```

## Template: spec

Copiar estructura de `docs/specs/calculations/pitagorico.md`:
- Estado, descripción, datos requeridos
- Reglas de negocio, algoritmo, formato de salida
- Casos de prueba, notas de implementación
