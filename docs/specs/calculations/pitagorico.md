# Cálculo Pitagórico

## Estado: active (lógica pendiente)

## Descripción

Cálculo basado en la numerología pitagórica. Utiliza el nombre completo, fecha, hora, ubicación y RH del sujeto para derivar valores numéricos e interpretaciones según reglas pitagóricas.

## Datos de entrada requeridos

| Campo | Requerido | Notas |
|-------|:---------:|-------|
| `fullName` | ✓ | Convertido a valores numéricos según tabla pitagórica |
| `birthDate` | ✓ | Componentes día/mes/año procesados individualmente |
| `birthTime` | ✓ | Hora militar descompuesta |
| `country`, `state`, `city` | ✓ | Ubicación de nacimiento |
| `latitude`, `longitude` | Deseable | Coordenadas para cálculos geográficos |
| `bloodType` | ✓ | Factor adicional en interpretación |

## Reglas de negocio

### [PENDIENTE — especificar con negocio]

- Tabla de conversión letra → número (A=1, B=2, ..., I=9, J=1, etc.)
- Reglas de reducción numérica (suma de dígitos hasta un solo dígito, excepto números maestros 11, 22, 33)
- Tratamiento de vocales vs consonantes
- Peso de cada componente en el cálculo final
- Influencia de coordenadas geográficas
- Influencia del tipo de sangre

## Algoritmo / fórmulas

### [PENDIENTE — especificar con negocio]

```
// Pseudocódigo placeholder
function calculatePitagorico(profile: HioxxProfile): PitagoricoResult {
  // 1. Convertir nombre a valores numéricos
  // 2. Calcular número de destino / camino de vida
  // 3. Calcular número de alma / deseo del corazón
  // 4. Calcular número de personalidad
  // 5. Aplicar factores de fecha, hora, ubicación, RH
  // 6. Generar interpretación
  return { ... };
}
```

## Formato de salida

### [PENDIENTE — especificar con negocio]

```typescript
interface PitagoricoResult {
  // Placeholder — se completará con la spec de negocio
  status: "pending-spec";
  message: string;
}
```

## Casos de prueba de referencia

### [PENDIENTE — especificar con negocio]

| # | Input | Expected Output |
|---|-------|-----------------|
| 1 | Nombre: "MARIA LOPEZ", Fecha: 1990-05-15, ... | TBD |
| 2 | Nombre: "EMPRESA123", Fecha: 2000-01-01, ... | TBD |

## Notas para implementación

- Engine: `src/features/calculations/pitagorico/pitagorico.engine.ts`
- Module: `src/features/calculations/pitagorico/pitagorico.module.ts`
- ResultsView: `src/features/calculations/pitagorico/PitagoricoResultsView.tsx`
- Actualmente retorna stub con mensaje "pendiente de configuración"
- Cuando se reciba la spec de negocio, implementar engine y actualizar este documento
