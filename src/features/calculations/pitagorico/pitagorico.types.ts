import type {
  WordLetterBreakdown,
  WordVibrationRow,
} from "../core/letterHomolog.types";

export type PitagoricoSectionId = "section1" | "section2";

export interface PitagoricoResult {
  fullName: string;
  section1: {
    words: WordLetterBreakdown[];
  };
  section2: {
    words: WordVibrationRow[];
    totalSum: number;
  };
  completedSections: PitagoricoSectionId[];
}
