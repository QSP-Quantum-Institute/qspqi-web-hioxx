import type { ComponentType } from "react";

export type CalculationType =
  | "pitagorico"
  | "estudio-cuantico"
  | "hebreo"
  | "caldeo";

export type CalculationStatus = "active" | "coming-soon";

export type AppPhase =
  | "intake"
  | "summary"
  | "calculation-select"
  | "results";

export interface HioxxProfile {
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

export interface CalculationModule<TOutput = unknown> {
  type: CalculationType;
  label: string;
  description: string;
  status: CalculationStatus;
  calculate: (profile: HioxxProfile) => TOutput;
  ResultsView: ComponentType<{ result: TOutput; profile: HioxxProfile }>;
}
