import { z } from "zod";

export const PagoSchema = z.object({
  _id: z.string(),
  cuota: z.string(),
  usuario: z.string(),
  periodo: z.string(),
  importe: z.number(),
  fechaPago: z.string(),
  notas: z.string().optional(),
});

const PagoGenerateFormData = PagoSchema.pick({
  cuota: true,
  fechaPago: true,
  notas: true,
});

export type PagoGenerateFormData = z.infer<typeof PagoGenerateFormData>;
