import type { HioxxProfile } from "../core/types";
import type { PitagoricoResult } from "./pitagorico.types";
import { getCalculationTheme } from "../core/calculationThemes";
import { CalculationThemeProvider } from "../core/CalculationThemeProvider";
import { CalculationAccordion } from "../../../components/ui/CalculationAccordion";
import { LetterHomologSection } from "./components/LetterHomologSection";
import { AtomicVibrationSection } from "./components/AtomicVibrationSection";
import { cn } from "../../../utils/cn";

interface Props {
  result: PitagoricoResult;
  profile: HioxxProfile;
}

export function PitagoricoResultsView({ result, profile }: Props) {
  const theme = getCalculationTheme("pitagorico");

  return (
    <CalculationThemeProvider theme={theme}>
      <div className="w-full space-y-8">
        <header className="text-center space-y-2">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-light display-font tracking-wide",
              theme.textAccentClass
            )}
          >
            Cálculo Pitagórico
          </h2>
          <p className="text-base text-dark/50 font-light">
            Resultado para{" "}
            <span
              className={cn(
                "display-font tracking-wider",
                theme.textAccentClass
              )}
            >
              {profile.fullName}
            </span>
          </p>
        </header>

        <CalculationAccordion
          borderClass={theme.borderClass}
          textAccentClass={theme.textAccentClass}
          items={[
            {
              id: "section1",
              title: "Homólogo letra-número",
              defaultOpen: true,
              content: <LetterHomologSection result={result} theme={theme} />,
            },
            {
              id: "section2",
              title: "Estructura de Vibración Atómica",
              defaultOpen: true,
              content: <AtomicVibrationSection result={result} theme={theme} />,
            },
            {
              id: "section-future",
              title: "Próximas secciones",
              disabled: true,
              content: null,
            },
          ]}
        />
      </div>
    </CalculationThemeProvider>
  );
}
