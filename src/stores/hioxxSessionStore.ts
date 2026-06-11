import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  AppPhase,
  CalculationType,
  HioxxProfile,
} from "../features/calculations/core/types";
import type { StepperData } from "../features/intake/types/stepper";
import { hioxxProfileSchema } from "../features/intake/schemas/profileSchemas";

interface HioxxSessionState {
  profile: Partial<HioxxProfile>;
  phase: AppPhase;
  selectedCalculation: CalculationType | null;
  setProfile: (profile: HioxxProfile) => void;
  setProfileFromStepper: (data: StepperData) => boolean;
  setPhase: (phase: AppPhase) => void;
  setSelectedCalculation: (type: CalculationType | null) => void;
  resetSession: () => void;
}

const initialState = {
  profile: {} as Partial<HioxxProfile>,
  phase: "intake" as AppPhase,
  selectedCalculation: null as CalculationType | null,
};

export const useHioxxSessionStore = create<HioxxSessionState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setProfile: (profile) => {
          set({ profile, phase: "summary" });
        },

        setProfileFromStepper: (data) => {
          const profile: HioxxProfile = {
            fullName: data.fullName,
            birthDate: data.birthDate!,
            birthTime: data.birthTime!,
            bloodType: data.bloodType!,
            bloodTypeOther: data.bloodTypeOther ?? undefined,
            country: data.country!,
            state: data.state!,
            city: data.city!,
            countryName: data.countryName ?? undefined,
            stateName: data.stateName ?? undefined,
            latitude: data.latitude,
            longitude: data.longitude,
          };

          const result = hioxxProfileSchema.safeParse(profile);
          if (!result.success) return false;

          set({ profile, phase: "summary" });
          return true;
        },

        setPhase: (phase) => set({ phase }),

        setSelectedCalculation: (type) =>
          set({ selectedCalculation: type, phase: "results" }),

        resetSession: () => set(initialState),
      }),
      {
        name: "hioxx-session-storage",
        partialize: (state) => ({
          profile: state.profile,
          phase: state.phase,
          selectedCalculation: state.selectedCalculation,
        }),
      }
    ),
    { name: "HioxxSessionStore" }
  )
);
