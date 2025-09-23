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

const PagoListView = PagoSchema.pick({
  _id: true,
  periodo: true,
  importe: true,
  notas: true,
  fechaPago: true,
}).extend({
  usuario: z.object({
    _id: z.string(),
    nombre: z.string(),
    apellido: z.string(),
  }),
});

const DataGraficoSchema = z.array(
  z.object({
    periodo: z.string(),
    total: z.number(),
  })
);

export const PagoListResponse = z.object({
  pagos: z.array(PagoListView),
  dataGrafico: DataGraficoSchema,
});

export type PagoGenerateFormData = z.infer<typeof PagoGenerateFormData>;
export const PagoListViewArray = z.array(PagoListView);
