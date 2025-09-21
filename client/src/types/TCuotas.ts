import { z } from "zod";

export const EstadoCuotaEnum = z.enum(["pendiente", "pagada", "exenta"]);

export const CuotaSchema = z.object({
  _id: z.string(),
  usuario: z.string(),
  periodo: z.string(),
  importe: z.number(),
  estado: EstadoCuotaEnum,
  fechaPago: z.string().optional(),
  notas: z.string().optional(),
});

export const CuotasListSchema = CuotaSchema.pick({
  _id: true,
  periodo: true,
  importe: true,
  estado: true,
});

export const CuotasListUsueriosSchema = CuotasListSchema.extend({
  fechaPago: z.string().optional(),
  usuario: z.object({
    _id: z.string(),
    nombre: z.string(),
    apellido: z.string(),
  }),
});

export const CuotasGenerateFormData = CuotaSchema.pick({
  periodo: true,
});
export type CuotaGenerateFormDataType = z.infer<typeof CuotasGenerateFormData>;

export type Cuota = z.infer<typeof CuotaSchema>;
export const listCuotasView = z.array(CuotasListSchema);
export const listCuotasConUsuarioView = z.array(CuotasListUsueriosSchema);
