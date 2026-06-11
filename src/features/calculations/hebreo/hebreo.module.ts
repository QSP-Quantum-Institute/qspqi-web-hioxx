import type { CalculationModule } from "../core/types";

export const hebreoModule: CalculationModule = {
  type: "hebreo",
  label: "Cálculo Hebreo",
  description: "Gematría y tradiciones numéricas hebreas",
  status: "coming-soon",
  calculate: () => ({ status: "coming-soon" }),
  ResultsView: () => null,
};
