import type { CalculationType } from "./types";

export interface CalculationTheme {
  id: CalculationType;
  label: string;
  primaryClass: string;
  bgSoftClass: string;
  borderClass: string;
  textAccentClass: string;
  hoverBgClass: string;
  gradientFrom: string;
}

export const CALCULATION_THEMES: Record<CalculationType, CalculationTheme> = {
  pitagorico: {
    id: "pitagorico",
    label: "Pitagórico",
    primaryClass: "text-gold",
    bgSoftClass: "bg-gold/5",
    borderClass: "border-gold/25",
    textAccentClass: "text-gold",
    hoverBgClass: "hover:bg-gold/10",
    gradientFrom: "from-gold/10",
  },
  "estudio-cuantico": {
    id: "estudio-cuantico",
    label: "Estudio Cuántico",
    primaryClass: "text-lightBlue",
    bgSoftClass: "bg-lightBlue/5",
    borderClass: "border-lightBlue/25",
    textAccentClass: "text-lightBlue",
    hoverBgClass: "hover:bg-lightBlue/10",
    gradientFrom: "from-lightBlue/10",
  },
  hebreo: {
    id: "hebreo",
    label: "Hebreo",
    primaryClass: "text-green",
    bgSoftClass: "bg-green/5",
    borderClass: "border-green/25",
    textAccentClass: "text-green",
    hoverBgClass: "hover:bg-green/10",
    gradientFrom: "from-green/10",
  },
  caldeo: {
    id: "caldeo",
    label: "Caldeo",
    primaryClass: "text-red",
    bgSoftClass: "bg-red/5",
    borderClass: "border-red/25",
    textAccentClass: "text-red",
    hoverBgClass: "hover:bg-red/10",
    gradientFrom: "from-red/10",
  },
};

export function getCalculationTheme(type: CalculationType): CalculationTheme {
  return CALCULATION_THEMES[type];
}
