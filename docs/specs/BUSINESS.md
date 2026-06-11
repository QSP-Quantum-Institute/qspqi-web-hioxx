# HIOXX — Lógica de Negocio Principal

## Propósito

HIOXX es una calculadora especializada del QSP Quantum Institute. No realiza operaciones aritméticas convencionales; ejecuta cálculos complejos según reglas de negocio específicas para personas, negocios o marcas.

## Tipos de cálculo

| Tipo | ID | Estado |
|------|-----|--------|
| Cálculo Pitagórico | `pitagorico` | Activo (Secciones 1 y 2) |
| Cálculo Estudio Cuántico | `estudio-cuantico` | Próximamente |
| Cálculo Hebreo | `hebreo` | Próximamente |
| Cálculo Caldeo | `caldeo` | Próximamente |

## Flujo general

```
Captura de datos (stepper) → Resumen → Selección de cálculo → Resultados
```

1. **Captura:** El usuario completa 5 pasos mediante un stepper.
2. **Resumen:** Se muestra toda la información recopilada para revisión.
3. **Selección:** El usuario elige el tipo de cálculo (solo Pitagórico habilitado por ahora).
4. **Resultados:** Se ejecuta el cálculo y se presenta el output del módulo seleccionado.

### Transiciones de estado

| Desde | Hacia | Condición |
|-------|-------|-----------|
| Captura | Resumen | Todos los campos validados |
| Resumen | Captura | Usuario elige "Editar" |
| Resumen | Selección | Usuario confirma datos |
| Selección | Resultados | Módulo activo seleccionado |
| Resultados | Selección | "Nuevo cálculo" |
| Resultados | Captura | "Reiniciar" |

---

## Datos de entrada

### 1. Nombre completo

- **Campo:** `fullName`
- **Formato:** Texto en MAYÚSCULAS
- **Caracteres permitidos:** Letras (A-Z), números (0-9) y espacios
- **Validación:**
  - Mínimo 2 palabras (nombre y apellido)
  - Mínimo 5 caracteres totales
  - Sin caracteres especiales ni acentos
- **Uso:** Persona, negocio o marca

### 2. Fecha de nacimiento

- **Campo:** `birthDate`
- **Formato interno:** `YYYY-MM-DD`
- **Captura:** Campos independientes — Día, Mes, Año
- **Validación:**
  - Fecha válida
  - Rango: 1900-01-01 hasta hoy
- **Requerido:** Sí

### 3. Hora de nacimiento

- **Campo:** `birthTime`
- **Formato:** Militar 24 horas (`HH:mm`)
- **Validación:** Regex `^([0-1][0-9]|2[0-3]):[0-5][0-9]$`
- **Requerido:** Sí

### 4. Lugar de nacimiento

- **Campos:**
  - `country` — Código ISO del país
  - `state` — Código ISO del departamento/estado
  - `city` — Nombre de la ciudad
  - `countryName`, `stateName` — Nombres legibles para display y geocoding
  - `latitude`, `longitude` — Coordenadas decimales (obtenidas por geocoding)
- **Validación:** País, departamento y ciudad requeridos
- **Integración mapa:** Al completar la selección, se geocodifica la ciudad y se muestra en mapa Leaflet
- **Coordenadas derivadas (DMS):**
  - Latitud: Grados, minutos, segundos — Norte/Sur
  - Longitud: Grados, minutos, segundos — Oeste/Oriente
- **Requerido:** País, departamento, ciudad (coordenadas deseables pero no bloquean)

### 5. RH (Tipo de sangre)

- **Campo:** `bloodType`
- **Opciones estándar:** A+, A-, B+, B-, AB+, AB-, O+, O-
- **Opción adicional:** OTRA
- **Campo condicional:** `bloodTypeOther` — texto libre obligatorio cuando `bloodType === "OTRA"`
- **Requerido:** Sí

---

## Matriz de datos por tipo de cálculo

| Dato | Pitagórico | Estudio Cuántico | Hebreo | Caldeo |
|------|:----------:|:----------------:|:------:|:------:|
| Nombre completo | ✓ | ✓ | ✓ | ✓ |
| Fecha nacimiento | ✓ | ✓ | ✓ | ✓ |
| Hora nacimiento | ✓ | ✓ | ✓ | ✓ |
| Ubicación + coords | ✓ | ✓ | ✓ | ✓ |
| RH | ✓ | ✓ | ✓ | ✓ |

> Detalle específico de qué subcampos usa cada cálculo se documentará en la spec de cada módulo.

---

## Perfil HIOXX (`HioxxProfile`)

Estructura unificada que agrupa todos los datos de entrada:

```typescript
interface HioxxProfile {
  fullName: string;
  birthDate: string;
  birthTime: string;
  bloodType: string;
  bloodTypeOther?: string;
  country: string;
  state: string;
  city: string;
  countryName?: string;
  stateName?: string;
  latitude: number | null;
  longitude: number | null;
}
```

---

## Cálculo Pitagórico

Implementado parcialmente. Ver [`calculations/pitagorico.md`](calculations/pitagorico.md).

**Secciones actuales:**
1. Homólogo letra-número (nombre → valores pitagóricos)
2. Estructura de Vibración Atómica (conteo y suma por palabra, total)

**Relación con Estudio Cuántico:** El pitagórico define fundamentos reutilizables (homólogos, desglose por palabra). El Estudio Cuántico consumirá estos resultados vía tipos/utils en `calculations/core/`.

**Secciones futuras:** [PENDIENTE — se documentarán en pitagorico.md]

**Diseño:** Tema `gold`, acordeón de secciones. Ver [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).

---

## Reglas transversales

1. Todos los cálculos se ejecutan en el frontend (sin backend por ahora).
2. La lógica de negocio vive en archivos `*.engine.ts`, nunca en componentes React.
3. Cada módulo de cálculo es independiente y se registra en un registry centralizado.
4. Los datos persisten en localStorage durante la sesión del usuario.
5. La UI está en español.
