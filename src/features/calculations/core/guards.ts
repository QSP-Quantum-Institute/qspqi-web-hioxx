import type { CalculationType, HioxxProfile } from "./types";
import { getModule } from "./registry";
import { hioxxProfileSchema } from "../../intake/schemas/profileSchemas";

export function isProfileComplete(
  profile: Partial<HioxxProfile>
): profile is HioxxProfile {
  return hioxxProfileSchema.safeParse(profile).success;
}

export function canAccessSummary(profile: Partial<HioxxProfile>): boolean {
  return isProfileComplete(profile);
}

export function canAccessCalculationSelect(
  profile: Partial<HioxxProfile>
): boolean {
  return isProfileComplete(profile);
}

export function canAccessResults(
  type: CalculationType,
  profile: Partial<HioxxProfile>
): boolean {
  if (!isProfileComplete(profile)) return false;
  const module = getModule(type);
  return module?.status === "active";
}
