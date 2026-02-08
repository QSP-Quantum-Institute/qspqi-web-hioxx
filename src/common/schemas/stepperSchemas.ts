import { z } from "zod";

export const fullNameSchema = z
  .string()
  .min(1, "El nombre es requerido")
  .refine(
    (name) => name.trim().split(/\s+/).length >= 2,
    "Por favor ingresa tu nombre completo (mínimo nombre y apellido)"
  )
  .refine(
    (name) => name.trim().length >= 5,
    "El nombre debe tener al menos 5 caracteres"
  );

export const birthDateSchema = z
  .string()
  .min(1, "La fecha de nacimiento es requerida")
  .refine(
    (date) => {
      const parsedDate = new Date(date);
      const today = new Date();
      const minDate = new Date("1900-01-01");
      return (
        !isNaN(parsedDate.getTime()) &&
        parsedDate <= today &&
        parsedDate >= minDate
      );
    },
    "Por favor ingresa una fecha de nacimiento válida"
  );

export const stepperDataSchema = z.object({
  fullName: fullNameSchema,
  birthDate: birthDateSchema,
});

export type StepperDataInput = z.infer<typeof stepperDataSchema>;
