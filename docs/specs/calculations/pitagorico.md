# Cálculo Pitagórico

## Estado: active (Secciones 1 y 2 implementadas; extensible)

## Descripción

Cálculo basado en numerología pitagórica. Parte del nombre completo y define fundamentos reutilizables para el Cálculo Estudio Cuántico. Por ahora usa solo `fullName`; otros campos del perfil quedan disponibles para secciones futuras.

## Datos de entrada requeridos

| Campo | Requerido | Uso actual |
|-------|:---------:|------------|
| `fullName` | ✓ | Secciones 1 y 2 |
| `birthDate` | — | Secciones futuras |
| `birthTime` | — | Secciones futuras |
| Ubicación + coords | — | Secciones futuras |
| `bloodType` | — | Secciones futuras |

## Tabla homóloga (A-Z)

Ciclo pitagórico 1-9:

| A=1 | B=2 | C=3 | D=4 | E=5 | F=6 | G=7 | H=8 | I=9 |
| J=1 | K=2 | L=3 | M=4 | N=5 | O=6 | P=7 | Q=8 | R=9 |
| S=1 | T=2 | U=3 | V=4 | W=5 | X=6 | Y=7 | Z=8 |

## Homólogos dígitos (0-9)

**[PENDIENTE — confirmar con negocio]**

Los dígitos tienen homólogo configurable por tipo de cálculo. La estructura está lista en `pitagorico.homolog.ts`; valores por defecto usan identidad (0→0, 1→1, …) hasta confirmación.

## Sección 1 — Homólogo letra-número

1. Mostrar el nombre completo
2. Desglosar cada letra/dígito por palabra (separador: espacio)
3. Mostrar homólogo numérico alineado bajo cada carácter

## Sección 2 — Estructura de Vibración Atómica

Por cada palabra:

- **Letras por palabra:** conteo de caracteres (letras + dígitos)
- **Suma por palabra:** suma de homólogos de cada carácter

**Suma total:** suma de todas las sumas por palabra

## Algoritmo

```
words = split(fullName, " ")
for each word:
  cells = map each char to homolog via PITAGORICO_HOMOLOG_MAP
  letterCount = len(cells)
  letterSum = sum(cells.values)
totalSum = sum(letterSum for all words)
```

## Formato de salida

```typescript
interface PitagoricoResult {
  fullName: string;
  section1: { words: WordLetterBreakdown[] };
  section2: { words: WordVibrationRow[]; totalSum: number };
  completedSections: ("section1" | "section2")[];
}
```

## Casos de prueba de referencia

| Input | Letras/palabra | Sumas/palabra | Total |
|-------|----------------|---------------|-------|
| `JULIO ERNESTO ARIAS BECERRA` | 5, 7, 5, 7 | 22, 33, 21, 34 | 110 |

Verificación manual:
- JULIO: 1+3+3+9+6 = 22
- ERNESTO: 5+9+5+5+1+2+6 = 33
- ARIAS: 1+9+9+1+1 = 21
- BECERRA: 2+5+3+5+9+9+1 = 34

## UI

- Acordeón con secciones expandibles
- Tema color: `gold` (ver DESIGN-SYSTEM.md)
- Sección placeholder "Próximas secciones" para extensibilidad

## Notas para implementación

- Engine: `pitagorico.engine.ts`
- Homólogo: `pitagorico.homolog.ts`
- Utils compartidos: `calculations/core/letterHomolog.utils.ts`
- Tests: `pitagorico.engine.test.ts`

## Secciones futuras

[PENDIENTE — se documentarán cuando se proporcione la spec de negocio]
