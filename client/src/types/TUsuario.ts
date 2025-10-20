import { z } from "zod";

// ------------------- Usuarios Schema
export const TiposUsuarioEnum = z.enum(["paracaidista", "piloto", "asistente", "admin"]);

export const UsuarioSchema = z.object({
  _id: z.string().optional(),
  email: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  fechaNacimiento: z.string().optional(),
  telefono: z.string().optional(),
  dni: z.string(),
  activo: z.boolean().optional(),
  licencia: z.string().optional(),
  licenciaCop: z.string().optional(),
  tiposUsuario: z.array(TiposUsuarioEnum).default([]),
  password: z.string(),
});

// ------------------- ListUsuariosView
export const UsuarioListSchema = UsuarioSchema.pick({
  _id: true,
  nombre: true,
  apellido: true,
  activo: true,
  email: true,
  tiposUsuario: true,
});

export const listUsuarioView = z.array(UsuarioListSchema);

export type Usuario = z.infer<typeof UsuarioSchema>;
export type UsuarioFormData = Pick<
  Usuario,
  "email" | "nombre" | "apellido" | "fechaNacimiento" | "telefono" | "dni" | "licencia" | "licenciaCop" | "tiposUsuario"
>;

// --- vista combinada ---

export const EstadoCuotaEnum = z.enum(["pendiente", "pagada", "exenta"]);
export const CuotaLiteSchema = z.object({
  _id: z.string(),
  periodo: z.string(),
  usuario: z.string(),
  estado: EstadoCuotaEnum,
  importe: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  fechaPago: z.string().optional(),
  notas: z.string().optional(),
});

export const UsuarioView = z.object({
  usuario: UsuarioSchema,
  cuotas: z.array(CuotaLiteSchema),
});

//* ------------------- LoginUsuario
export type UsuarioLoginForm = Pick<Usuario, "email" | "password">;
export type UsuarioChangePassword = Pick<Usuario, "password">;
