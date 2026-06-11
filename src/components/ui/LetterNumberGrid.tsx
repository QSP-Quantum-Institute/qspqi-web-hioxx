import type { WordLetterBreakdown } from "../../features/calculations/core/letterHomolog.types";
import { cn } from "../../utils/cn";

interface LetterNumberGridProps {
  words: WordLetterBreakdown[];
  fullName: string;
  bgSoftClass?: string;
  borderClass?: string;
  textAccentClass?: string;
}

export function LetterNumberGrid({
  words,
  fullName,
  bgSoftClass = "bg-gold/5",
  borderClass = "border-gold/20",
  textAccentClass = "text-gold",
}: LetterNumberGridProps) {
  return (
    <div className="space-y-6">
      <div
        className={cn(
          "px-6 py-4 rounded-lg border text-center",
          bgSoftClass,
          borderClass
        )}
      >
        <p className="display-font text-2xl md:text-3xl text-dark/80 tracking-widest">
          {fullName}
        </p>
      </div>

      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="inline-flex flex-col gap-0 min-w-full">
          <div className="flex flex-wrap gap-x-8 gap-y-6 justify-center">
            {words.map(({ word, cells }) => (
              <div key={word} className="flex flex-col items-center">
                <div className="flex gap-2 md:gap-3 mb-2">
                  {cells.map((cell, idx) => (
                    <div
                      key={`${word}-letter-${idx}`}
                      className="flex flex-col items-center min-w-[1.5rem] md:min-w-[2rem]"
                    >
                      <span className="display-font text-lg md:text-xl text-dark/70 tracking-wider">
                        {cell.character}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className={cn(
                    "flex gap-2 md:gap-3 px-3 py-2 rounded-md",
                    bgSoftClass
                  )}
                >
                  {cells.map((cell, idx) => (
                    <div
                      key={`${word}-value-${idx}`}
                      className="flex flex-col items-center min-w-[1.5rem] md:min-w-[2rem]"
                    >
                      <span
                        className={cn(
                          "tabular-nums text-base md:text-lg font-light",
                          textAccentClass
                        )}
                      >
                        {cell.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
