import { z } from "zod";

export const ClubSchema = z.object({
  _id: z.string().optional(),
  cuit: z.string(),
  direccion: z.string().optional(),
  imagen: z.string().optional(),
  linkStatuto: z.string(),
  updatedAt: z.string().optional(),
  nombre: z.string(),
  datosBancarios: z.object({
    titular: z.string(),
    banco: z.string(),
    cbu: z.string(),
    cuenta: z.string(),
    alias: z.string(),
  }),
  valores: z.object({
    cuota: z.number(),
    salto: z.number(),
    alquilerEquipo: z.number(),
  }),
});

export type Club = z.infer<typeof ClubSchema>;
