import { z } from "zod";

export const MovimientoSchema = z.object({
  _id: z.string(),
  tipo: z.boolean(),
  monto: z.number(),
  concepto: z.string(),
  descripcion: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const MovimientoSchemaArray = MovimientoSchema.pick({
  _id: true,
  tipo: true,
  monto: true,

  descripcion: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  concepto: z.object({
    nombre: z.string(),
  }),
});

export const MovimientoSchemaFormData = MovimientoSchema.pick({
  monto: true,
  concepto: true,
  descripcion: true,
});

export const MovimientosArray = z.array(MovimientoSchemaArray);
export type MovimientoFormData = z.infer<typeof MovimientoSchemaFormData>;
