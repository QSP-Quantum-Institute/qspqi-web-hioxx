import type { HioxxProfile } from "../core/types";
import {
  buildLetterBreakdown,
  parseNameWords,
  sumCellValues,
} from "../core/letterHomolog.utils";
import { PITAGORICO_HOMOLOG_MAP } from "./pitagorico.homolog";
import type { PitagoricoResult } from "./pitagorico.types";

export type { PitagoricoResult } from "./pitagorico.types";

export function calculatePitagorico(profile: HioxxProfile): PitagoricoResult {
  const fullName = profile.fullName.trim().toUpperCase();
  const words = parseNameWords(fullName);

  const wordBreakdowns = words.map((word) =>
    buildLetterBreakdown(word, PITAGORICO_HOMOLOG_MAP)
  );

  const vibrationRows = wordBreakdowns.map(({ word, cells }) => ({
    word,
    letterCount: cells.length,
    letterSum: sumCellValues(cells),
  }));

  const totalSum = vibrationRows.reduce((acc, row) => acc + row.letterSum, 0);

  return {
    fullName,
    section1: { words: wordBreakdowns },
    section2: { words: vibrationRows, totalSum },
    completedSections: ["section1", "section2"],
  };
}
