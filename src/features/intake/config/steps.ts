import type { StepperData } from "../types/stepper";
import {
  fullNameSchema,
  birthDateSchema,
  birthTimeSchema,
  bloodTypeSchema,
  bloodTypeOtherSchema,
  locationSchema,
} from "../schemas/stepperSchemas";
import type { SafeParseReturnType } from "zod";

type ValidationResult = SafeParseReturnType<unknown, unknown>;

export interface IntakeStepConfig {
  id: string;
  label: string;
  description: string;
  validate: (data: StepperData) => ValidationResult;
  canProceed: (data: StepperData, errors: Partial<Record<keyof StepperData, string>>) => boolean;
}

export const INTAKE_STEPS: IntakeStepConfig[] = [
  {
    id: "name",
    label: "Nombre",
    description: "Ingresa tu nombre completo",
    validate: (data) => fullNameSchema.safeParse(data.fullName),
    canProceed: (data, errors) =>
      data.fullName.trim().length > 0 && !errors.fullName,
  },
  {
    id: "birthdate",
    label: "Fecha",
    description: "Ingresa tu fecha de nacimiento",
    validate: (data) => birthDateSchema.safeParse(data.birthDate),
    canProceed: (data, errors) =>
      data.birthDate !== null && !errors.birthDate,
  },
  {
    id: "birthtime",
    label: "Hora",
    description: "Ingresa tu hora de nacimiento",
    validate: (data) => birthTimeSchema.safeParse(data.birthTime),
    canProceed: (data, errors) =>
      data.birthTime !== null && !errors.birthTime,
  },
  {
    id: "location",
    label: "Ubicación",
    description: "Selecciona tu lugar de nacimiento",
    validate: (data) =>
      locationSchema.safeParse({
        country: data.country,
        state: data.state,
        city: data.city,
      }),
    canProceed: (data, errors) =>
      data.country !== null &&
      data.state !== null &&
      data.city !== null &&
      !errors.country &&
      !errors.state &&
      !errors.city,
  },
  {
    id: "bloodtype",
    label: "Tipo de sangre",
    description: "Selecciona tu tipo de sangre",
    validate: (data) => {
      const bloodResult = bloodTypeSchema.safeParse(data.bloodType);
      if (!bloodResult.success) return bloodResult;
      if (data.bloodType === "OTRA") {
        return bloodTypeOtherSchema.safeParse(data.bloodTypeOther);
      }
      return bloodResult;
    },
    canProceed: (data, errors) => {
      if (data.bloodType === null || errors.bloodType) return false;
      if (data.bloodType === "OTRA") {
        return (
          data.bloodTypeOther !== null &&
          data.bloodTypeOther.trim().length > 0 &&
          !errors.bloodTypeOther
        );
      }
      return true;
    },
  },
];
