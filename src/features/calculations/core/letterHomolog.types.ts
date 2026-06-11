export const HOMOLOG_LETTERS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I",
  "J", "K", "L", "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z",
] as const;

export const HOMOLOG_DIGITS = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
] as const;

export type HomologLetter = (typeof HOMOLOG_LETTERS)[number];
export type HomologDigit = (typeof HOMOLOG_DIGITS)[number];
export type HomologCharacter = HomologLetter | HomologDigit;

export type LetterHomologMap = Record<HomologCharacter, number>;

export interface LetterCell {
  character: string;
  value: number;
}

export interface WordLetterBreakdown {
  word: string;
  cells: LetterCell[];
}

export interface WordVibrationRow {
  word: string;
  letterCount: number;
  letterSum: number;
}
