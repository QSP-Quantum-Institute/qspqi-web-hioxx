import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { StepperData } from "../common/types/stepper";
import { stepperDataSchema } from "../common/schemas/stepperSchemas";

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
  country: null,
  state: null,
  city: null,
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
          const errors: Partial<Record<keyof StepperData, string>> = {};

          if (step === 0) {
            const result = stepperDataSchema
              .pick({ fullName: true })
              .safeParse({
                fullName: data.fullName,
              });
            if (!result.success) {
              errors.fullName = result.error.issues[0]?.message || "Error";
            }
          }

          if (step === 1) {
            const result = stepperDataSchema
              .pick({ birthDate: true })
              .safeParse({
                birthDate: data.birthDate,
              });
            if (!result.success) {
              errors.birthDate = result.error.issues[0]?.message || "Error";
            }
          }

          if (step === 2) {
            const result = stepperDataSchema
              .pick({ birthTime: true })
              .safeParse({
                birthTime: data.birthTime,
              });
            if (!result.success) {
              errors.birthTime = result.error.issues[0]?.message || "Error";
            }
          }

          if (step === 3) {
            const result = stepperDataSchema
              .pick({ bloodType: true })
              .safeParse({
                bloodType: data.bloodType,
              });
            if (!result.success) {
              errors.bloodType = result.error.issues[0]?.message || "Error";
            }
          }

          if (step === 4) {
            const result = stepperDataSchema
              .pick({ country: true, state: true, city: true })
              .safeParse({
                country: data.country,
                state: data.state,
                city: data.city,
              });
            if (!result.success) {
              const firstError = result.error.issues[0];
              if (firstError) {
                errors[firstError.path[0] as keyof StepperData] =
                  firstError.message || "Error";
              }
            }
          }

          set({ errors });
          return Object.keys(errors).length === 0;
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
    {
      name: "StepperStore",
    }
  )
);
