import type { LetterHomologMap } from "../core/letterHomolog.types";

/**
 * Pitagorean letter-to-number mapping (cycle 1-9).
 * Digits 0-9: identity mapping until business confirms otherwise.
 * [PENDIENTE — confirmar homólogos 0-9 con negocio]
 */
export const PITAGORICO_HOMOLOG_MAP = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
} as const satisfies LetterHomologMap;

export type PitagoricoHomologMap = typeof PITAGORICO_HOMOLOG_MAP;
