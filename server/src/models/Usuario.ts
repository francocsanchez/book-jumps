import { Schema, model, Document } from "mongoose";

const TIPOS_USUARIO = ["paracaidista", "piloto", "asistente", "admin"] as const;
export type TipoUsuario = (typeof TIPOS_USUARIO)[number];

export interface IUsuario extends Document {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  telefono?: string;
  dni: string;
  activo: boolean;
  licencia?: string;
  licenciaCop?: string;
  tiposUsuario: TipoUsuario[];
}

const UsuarioSchema: Schema = new Schema<IUsuario>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    telefono: { type: String },
    dni: { type: String, required: true, unique: true },
    activo: { type: Boolean, default: true },
    licencia: { type: String },
    licenciaCop: { type: String },
    tiposUsuario: {
      type: [String],
      enum: TIPOS_USUARIO,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.index({ email: 1 }, { unique: true });
UsuarioSchema.index({ dni: 1 }, { unique: true });

export default model<IUsuario>("usuarios", UsuarioSchema);
