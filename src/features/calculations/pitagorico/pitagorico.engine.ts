import type { HioxxProfile } from "../core/types";

export interface PitagoricoResult {
  status: "pending-spec";
  message: string;
}

export function calculatePitagorico(_profile: HioxxProfile): PitagoricoResult {
  return {
    status: "pending-spec",
    message:
      "La lógica del Cálculo Pitagórico está pendiente de especificación de negocio.",
  };
}
