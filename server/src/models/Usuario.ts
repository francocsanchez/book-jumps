import { Schema, model, Document } from "mongoose";

export interface IUsuario extends Document {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  fechaNacimiento?: Date;
  telefono?: string;
  dni: number;
  activo: boolean;
}

const UsuarioSchema: Schema = new Schema<IUsuario>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true, loadClass: true },
    apellido: { type: String, required: true, loadClass: true },
    fechaNacimiento: { type: Date },
    telefono: { type: String },
    dni: { type: Number, required: true, unique: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<IUsuario>("usuarios", UsuarioSchema);
