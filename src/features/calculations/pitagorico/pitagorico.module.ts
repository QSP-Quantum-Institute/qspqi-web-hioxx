import type { CalculationModule } from "../core/types";
import { calculatePitagorico } from "./pitagorico.engine";
import type { PitagoricoResult } from "./pitagorico.types";
import { PitagoricoResultsView } from "./PitagoricoResultsView";

export const pitagoricoModule: CalculationModule<PitagoricoResult> = {
  type: "pitagorico",
  label: "Cálculo Pitagórico",
  description: "Numerología pitagórica basada en nombre, fecha y ubicación",
  status: "active",
  calculate: calculatePitagorico,
  ResultsView: PitagoricoResultsView,
};
