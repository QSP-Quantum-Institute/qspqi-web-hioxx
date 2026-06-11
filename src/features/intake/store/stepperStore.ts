import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { StepperData } from "../types/stepper";
import { INTAKE_STEPS } from "../config/steps";

interface StepperState {
  currentStep: number;
  data: StepperData;
  errors: Partial<Record<keyof StepperData, string>>;
  setCurrentStep: (step: number) => void;
  updateData: <K extends keyof StepperData>(
    key: K,
    value: StepperData[K]
  ) => void;
  validateStep: (step: number) => boolean;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
  setError: (key: keyof StepperData, error: string | null) => void;
}

const initialData: StepperData = {
  fullName: "",
  birthDate: null,
  birthTime: null,
  bloodType: null,
  bloodTypeOther: null,
  country: null,
  state: null,
  city: null,
  countryName: null,
  stateName: null,
  latitude: null,
  longitude: null,
};

export const useStepperStore = create<StepperState>()(
  devtools(
    persist(
      (set, get) => ({
        currentStep: 0,
        data: initialData,
        errors: {},

        setCurrentStep: (step) => {
          set({ currentStep: step });
        },

        updateData: (key, value) => {
          set((state) => ({
            data: { ...state.data, [key]: value },
            errors: { ...state.errors, [key]: undefined },
          }));
        },

        validateStep: (step) => {
          const { data } = get();
          const stepConfig = INTAKE_STEPS[step];
          if (!stepConfig) return false;

          const result = stepConfig.validate(data);
          const errors: Partial<Record<keyof StepperData, string>> = {};

          if (!result.success) {
            const firstError = result.error.issues[0];
            if (firstError) {
              const path = firstError.path[0] as keyof StepperData;
              errors[path] = firstError.message || "Error";
            }
          }

          set({ errors });
          return result.success;
        },

        nextStep: () => {
          const { currentStep, validateStep } = get();
          if (validateStep(currentStep)) {
            set({ currentStep: currentStep + 1 });
          }
        },

        previousStep: () => {
          const { currentStep } = get();
          if (currentStep > 0) {
            set({ currentStep: currentStep - 1 });
          }
        },

        reset: () => {
          set({
            currentStep: 0,
            data: initialData,
            errors: {},
          });
        },

        setError: (key, error) => {
          set((state) => ({
            errors: {
              ...state.errors,
              [key]: error || undefined,
            },
          }));
        },
      }),
      {
        name: "stepper-storage",
        partialize: (state) => ({
          data: state.data,
          currentStep: state.currentStep,
        }),
      }
    ),
    { name: "StepperStore" }
  )
);
