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
  )
  .refine(
    (name) => /^[A-Z0-9\s]+$/.test(name.trim()),
    "Solo se permiten letras, números y espacios"
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

export const birthTimeSchema = z
  .string()
  .min(1, "La hora de nacimiento es requerida")
  .regex(
    /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    "Formato de hora inválido (debe ser HH:mm)"
  );

export const STANDARD_BLOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export const bloodTypeSchema = z
  .string()
  .min(1, "El tipo de sangre es requerido")
  .refine(
    (type) => [...STANDARD_BLOOD_TYPES, "OTRA"].includes(type),
    "Tipo de sangre inválido"
  );

export const bloodTypeOtherSchema = z
  .string()
  .min(1, "Debes especificar el tipo de sangre");

export const locationSchema = z.object({
  country: z.string().min(1, "El país es requerido"),
  state: z.string().min(1, "El estado/departamento es requerido"),
  city: z.string().min(1, "La ciudad es requerida"),
});

export const stepperDataSchema = z.object({
  fullName: fullNameSchema,
  birthDate: birthDateSchema,
  birthTime: birthTimeSchema.nullable(),
  bloodType: bloodTypeSchema.nullable(),
  bloodTypeOther: z.string().nullable(),
  country: z.string().nullable(),
  state: z.string().nullable(),
  city: z.string().nullable(),
  countryName: z.string().nullable(),
  stateName: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export type StepperDataInput = z.infer<typeof stepperDataSchema>;
