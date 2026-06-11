import type { ReactNode } from "react";
import type { CalculationTheme } from "./calculationThemes";

interface CalculationThemeProviderProps {
  theme: CalculationTheme;
  children: ReactNode;
}

export function CalculationThemeProvider({
  theme,
  children,
}: CalculationThemeProviderProps) {
  return (
    <div
      data-calculation-theme={theme.id}
      className={`calculation-theme ${theme.bgSoftClass}`}
    >
      {children}
    </div>
  );
}
