import type { PitagoricoResult } from "../pitagorico.types";
import type { CalculationTheme } from "../../core/calculationThemes";
import { LetterNumberGrid } from "../../../../components/ui/LetterNumberGrid";

interface LetterHomologSectionProps {
  result: PitagoricoResult;
  theme: CalculationTheme;
}

export function LetterHomologSection({
  result,
  theme,
}: LetterHomologSectionProps) {
  return (
    <LetterNumberGrid
      words={result.section1.words}
      fullName={result.fullName}
      bgSoftClass={theme.bgSoftClass}
      borderClass={theme.borderClass}
      textAccentClass={theme.textAccentClass}
    />
  );
}
