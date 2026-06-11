import { describe, it, expect } from "vitest";
import { calculatePitagorico } from "./pitagorico.engine";
import type { HioxxProfile } from "../core/types";

const canonicalProfile: HioxxProfile = {
  fullName: "JULIO ERNESTO ARIAS BECERRA",
  birthDate: "1990-01-01",
  birthTime: "12:00",
  bloodType: "O+",
  country: "CO",
  state: "DC",
  city: "Bogota",
  latitude: null,
  longitude: null,
};

describe("calculatePitagorico", () => {
  it("computes canonical case: JULIO ERNESTO ARIAS BECERRA", () => {
    const result = calculatePitagorico(canonicalProfile);

    expect(result.fullName).toBe("JULIO ERNESTO ARIAS BECERRA");
    expect(result.section2.words.map((w) => w.letterCount)).toEqual([
      5, 7, 5, 7,
    ]);
    expect(result.section2.words.map((w) => w.letterSum)).toEqual([
      22, 33, 21, 34,
    ]);
    expect(result.section2.totalSum).toBe(110);
    expect(result.completedSections).toEqual(["section1", "section2"]);
  });

  it("maps JULIO letters correctly in section1", () => {
    const result = calculatePitagorico(canonicalProfile);
    const julio = result.section1.words.find((w) => w.word === "JULIO");
    expect(julio?.cells.map((c) => c.value)).toEqual([1, 3, 3, 9, 6]);
  });

  it("handles single word names", () => {
    const result = calculatePitagorico({
      ...canonicalProfile,
      fullName: "MARIA",
    });
    expect(result.section2.words).toHaveLength(1);
    expect(result.section2.words[0].letterCount).toBe(5);
  });
});
