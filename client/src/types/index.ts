import { z } from "zod";

export const LicenciaSchema = z.object({
  _id: z.string(),
  tipo: z.string(),
  nivel: z.string(),
  activo: z.boolean(),
});

export const LicenciaSchemaFormData = LicenciaSchema.pick({
  tipo: true,
  nivel: true,
});

export type Licencia = z.infer<typeof LicenciaSchema>;
export type LicenciaFormData = Pick<Licencia, "tipo" | "nivel">;

export const listLicenciasSchema = z.array(LicenciaSchema);
