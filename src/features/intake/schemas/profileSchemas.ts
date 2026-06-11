import { z } from "zod";
import {
  fullNameSchema,
  birthDateSchema,
  birthTimeSchema,
  bloodTypeSchema,
  locationSchema,
} from "./stepperSchemas";

export const hioxxProfileSchema = z
  .object({
    fullName: fullNameSchema,
    birthDate: birthDateSchema,
    birthTime: birthTimeSchema,
    bloodType: bloodTypeSchema,
    bloodTypeOther: z.string().optional(),
    country: locationSchema.shape.country,
    state: locationSchema.shape.state,
    city: locationSchema.shape.city,
    countryName: z.string().optional(),
    stateName: z.string().optional(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
  })
  .refine(
    (data) => {
      if (data.bloodType === "OTRA") {
        return !!data.bloodTypeOther && data.bloodTypeOther.trim().length > 0;
      }
      return true;
    },
    { message: "Debes especificar el tipo de sangre", path: ["bloodTypeOther"] }
  );
