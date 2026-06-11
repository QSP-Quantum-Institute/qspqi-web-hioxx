import type { CalculationModule, CalculationType } from "./types";
import { pitagoricoModule } from "../pitagorico/pitagorico.module";
import { estudioCuanticoModule } from "../estudio-cuantico/estudio-cuantico.module";
import { hebreoModule } from "../hebreo/hebreo.module";
import { caldeoModule } from "../caldeo/caldeo.module";

const modules: CalculationModule<unknown>[] = [
  pitagoricoModule as CalculationModule<unknown>,
  estudioCuanticoModule,
  hebreoModule,
  caldeoModule,
];

const moduleMap = new Map<CalculationType, CalculationModule<unknown>>(
  modules.map((m) => [m.type, m])
);

export function getModule(type: CalculationType): CalculationModule<unknown> | undefined {
  return moduleMap.get(type);
}

export function getActiveModules(): CalculationModule<unknown>[] {
  return modules.filter((m) => m.status === "active");
}

export function getAllModules(): CalculationModule<unknown>[] {
  return modules;
}

export function isValidCalculationType(type: string): type is CalculationType {
  return moduleMap.has(type as CalculationType);
}
