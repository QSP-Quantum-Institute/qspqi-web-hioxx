# Planes de implementación HIOXX

Este directorio contiene planes de implementación para fases del proyecto HIOXX.

## Convención

- Un archivo por fase o feature: `{fase}-{nombre}.md`
- Formato: objetivo, alcance, tareas, criterios de aceptación
- Los planes se crean antes de implementar y se marcan como completados al finalizar

## Planes existentes

| Plan | Estado | Descripción |
|------|--------|-------------|
| Estructuración inicial | Completado | Arquitectura modular, specs, agent context, flujo post-captura |
| Cálculo Pitagórico S1-S2 | Completado | Homólogos, engine, UI acordeón, reglas agente, diseño |

## Cómo crear un nuevo plan

1. Copiar la plantilla de abajo
2. Nombrar el archivo descriptivamente
3. Referenciar specs relevantes en `docs/specs/`
4. Al completar, actualizar la tabla de arriba

### Plantilla

```markdown
# [Nombre del plan]

## Objetivo
[Qué se busca lograr]

## Alcance
[Qué incluye y qué no]

## Prerequisitos
- [ ] Spec de negocio actualizada
- [ ] ...

## Tareas
- [ ] Tarea 1
- [ ] Tarea 2

## Criterios de aceptación
- [ ] Criterio 1
- [ ] Criterio 2
```
