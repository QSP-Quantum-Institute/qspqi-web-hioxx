import type { CalculationModule } from "../core/types";

export const caldeoModule: CalculationModule = {
  type: "caldeo",
  label: "Cálculo Caldeo",
  description: "Numerología caldea, uno de los sistemas más antiguos",
  status: "coming-soon",
  calculate: () => ({ status: "coming-soon" }),
  ResultsView: () => null,
};
