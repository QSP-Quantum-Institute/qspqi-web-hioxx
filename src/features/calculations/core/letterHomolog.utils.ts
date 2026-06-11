import type {
  LetterCell,
  LetterHomologMap,
  WordLetterBreakdown,
} from "./letterHomolog.types";

export function parseNameWords(fullName: string): string[] {
  return fullName.trim().split(/\s+/).filter(Boolean);
}

export function mapCharacter(
  char: string,
  map: LetterHomologMap
): number | null {
  const upper = char.toUpperCase();
  if (upper in map) {
    return map[upper as keyof LetterHomologMap];
  }
  return null;
}

export function buildLetterBreakdown(
  word: string,
  map: LetterHomologMap
): WordLetterBreakdown {
  const cells: LetterCell[] = [];

  for (const char of word) {
    const value = mapCharacter(char, map);
    if (value !== null) {
      cells.push({ character: char.toUpperCase(), value });
    }
  }

  return { word, cells };
}

export function sumCellValues(cells: LetterCell[]): number {
  return cells.reduce((acc, cell) => acc + cell.value, 0);
}

export function isMappableCharacter(
  char: string,
  map: LetterHomologMap
): boolean {
  return mapCharacter(char, map) !== null;
}
