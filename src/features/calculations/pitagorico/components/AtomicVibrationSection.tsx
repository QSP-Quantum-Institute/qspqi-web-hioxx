import type { PitagoricoResult } from "../pitagorico.types";
import type { CalculationTheme } from "../../core/calculationThemes";
import { cn } from "../../../../utils/cn";

interface AtomicVibrationSectionProps {
  result: PitagoricoResult;
  theme: CalculationTheme;
}

export function AtomicVibrationSection({
  result,
  theme,
}: AtomicVibrationSectionProps) {
  const { words, totalSum } = result.section2;

  return (
    <div className="space-y-4">
      <h4 className="text-sm uppercase tracking-widest text-gray-400 font-light text-center md:text-left">
        Estructura Vibracional Atómica
      </h4>

      <div className="overflow-x-auto">
        <div className="min-w-[320px]">
          <div
            className={cn(
              "grid gap-px rounded-lg overflow-hidden border",
              theme.borderClass
            )}
            style={{
              gridTemplateColumns: `auto repeat(${words.length}, 1fr)`,
            }}
          >
            <div className={cn("p-3 md:p-4", theme.bgSoftClass)} />
            {words.map((row) => (
              <div
                key={`header-${row.word}`}
                className={cn(
                  "p-3 md:p-4 text-center display-font text-sm md:text-base text-dark/70",
                  theme.bgSoftClass
                )}
              >
                {row.word}
              </div>
            ))}

            <div
              className={cn(
                "p-3 md:p-4 text-xs md:text-sm text-gray-500 font-light flex items-center",
                "bg-gray-50/80"
              )}
            >
              Letras por palabra
            </div>
            {words.map((row) => (
              <div
                key={`count-${row.word}`}
                className="p-3 md:p-4 text-center tabular-nums text-dark/70 bg-white/60"
              >
                {row.letterCount}
              </div>
            ))}

            <div
              className={cn(
                "p-3 md:p-4 text-xs md:text-sm text-gray-500 font-light flex items-center",
                "bg-gray-50/80"
              )}
            >
              Suma por palabra
            </div>
            {words.map((row) => (
              <div
                key={`sum-${row.word}`}
                className={cn(
                  "p-3 md:p-4 text-center tabular-nums font-medium bg-white/60",
                  theme.textAccentClass
                )}
              >
                {row.letterSum}
              </div>
            ))}

            <div
              className={cn(
                "flex justify-between items-center px-4 py-4 mt-2 rounded-lg border",
                theme.borderClass,
                theme.bgSoftClass
              )}
            >
              <span className="text-sm text-gray-500 font-light">Suma total</span>
              <span
                className={cn(
                  "tabular-nums text-xl md:text-2xl font-medium display-font",
                  theme.textAccentClass
                )}
              >
                {totalSum}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
