import { z } from "zod";

// ------------------- Types Licencias

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

// ------------------- Types Marca-Aviones
export const MarcaAvionSchema = z.object({
  _id: z.string(),
  nombre: z.string(),
  activo: z.boolean(),
});

export const listMarcaAvionesSchema = z.array(MarcaAvionSchema);
export type MarcaAvion = z.infer<typeof MarcaAvionSchema>;

// ------------------- Types Aeronaves
export const AeronaveSchema = z.object({
  _id: z.string(),
  nombre: z.string(),
  marca: z.string(),
  activo: z.boolean(),
});

export const AeronaveSchemaFormData = AeronaveSchema.pick({
  nombre: true,
  marca: true,
});

export type Aeronave = z.infer<typeof AeronaveSchema>;
export type AeronaveFormData = Pick<Aeronave, "nombre" | "marca">;

// ------------------- Types Clubs
export const ClubSchema = z.object({
  _id: z.string().optional(),
  nombre: z.string(),
  cuit: z.string(),
  direccion: z.string().optional(),
  imagen: z.string().optional(),
  activo: z.boolean().optional(),
  valores: z
    .object({
      cuota: z.number(),
      salto: z.number(),
      alquilerEquipo: z.number(),
    })
    .optional(),
  datosBancarios: z
    .object({
      titular: z.string(),
      banco: z.string(),
      cbu: z.string(),
      cuenta: z.string(),
      alias: z.string(),
    })
    .optional(),
  linkStatuto: z.string().optional(),
});

export type Club = z.infer<typeof ClubSchema>;
export const listClubSchema = z.array(ClubSchema);
export type ClubFormData = Pick<Club, "nombre" | "direccion" | "imagen">;

// ------------------- Types Usuarios
export const TiposUsuarioEnum = z.enum(["paracaidista", "piloto", "asistente", "admin"]);

export const UsuarioSchema = z.object({
  _id: z.string().optional(),
  email: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  fechaNacimiento: z.string().optional(),
  telefono: z.string().optional(),
  dni: z.number().int(),
  activo: z.boolean().optional(),
  licencia: z.string().optional(),
  licenciaCop: z.string().optional(),
  tiposUsuario: z.array(TiposUsuarioEnum).default([]),
});

export type Socio = z.infer<typeof UsuarioSchema>;
export type UsuarioFormData = Pick<
  Socio,
  "email" | "nombre" | "apellido" | "fechaNacimiento" | "telefono" | "dni" | "licencia" | "licenciaCop" | "tiposUsuario"
>;
export const listUsuarioSchema = z.array(UsuarioSchema);
