import { z } from "zod";

export const ConceptoSchema = z.object({
  _id: z.string(),
  nombre: z.string(),
  activo: z.boolean(),
  tipo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ConceptoListSchema = ConceptoSchema.pick({
  _id: true,
  nombre: true,
});

export type Concepto = z.infer<typeof ConceptoSchema>;
export const listConceptos = z.array(ConceptoListSchema);
