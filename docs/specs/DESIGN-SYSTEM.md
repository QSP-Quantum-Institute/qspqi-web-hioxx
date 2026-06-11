# HIOXX — Sistema de Diseño

## Principios

- Minimalista artístico, limpio y organizado
- Cada tipo de cálculo tiene identidad visual diferenciada por color
- Aprovechar espacio horizontal en resultados (contenedores amplios)
- Tipografía legible en mayúsculas para nombres y datos numéricos alineados

## Temas por tipo de cálculo

| Cálculo | ID | Color primario | Tailwind token |
|---------|-----|----------------|----------------|
| Pitagórico | `pitagorico` | Dorado | `gold` |
| Estudio Cuántico | `estudio-cuantico` | Azul claro | `lightBlue` |
| Hebreo | `hebreo` | Verde | `green` |
| Caldeo | `caldeo` | Rojo | `red` |

Implementación: [`src/features/calculations/core/calculationThemes.ts`](../../src/features/calculations/core/calculationThemes.ts)

Cada tema define: color primario, fondo suave, borde, texto de acento.

## Tipografía

| Rol | Fuente | Clase CSS | Uso |
|-----|--------|-----------|-----|
| Títulos / nombres | Cormorant Garamond (300-500) | `.display-font` | Nombres completos, títulos de sección |
| UI / labels | DM Sans (300-400) | body default | Labels, botones, acordeón |
| Datos numéricos | DM Sans + tabular-nums | `.tabular-nums` | Grids letra-número, sumas |

## Layout de resultados

- Contenedor: `max-w-5xl` centrado
- Secciones: acordeón expandible (Radix-style custom con Framer Motion)
- Sección 1 (homólogo): grid horizontal con scroll suave en mobile
- Sección 2 (vibración atómica): matriz compacta — labels a la izquierda, columnas por palabra
- Espaciado generoso entre palabras en grids de letras

## Componentes UI compartidos

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `CalculationAccordion` | `components/ui/` | Secciones expandibles en resultados |
| `LetterNumberGrid` | `components/ui/` | Letra sobre número, alineación vertical |
| `CalculationThemeProvider` | `calculations/core/` | Wrapper temático por tipo |

## Paleta base QSP

Ver `tailwind.config.js` y `index.css`: dark, gold, red, green, lightBlue.

## Intake vs Resultados

- **Intake:** gradiente suave, inputs centrados, step titles con acento por paso
- **Resultados:** tema del cálculo seleccionado, layout más ancho, acordeón de secciones
