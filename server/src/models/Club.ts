import { Schema, model, Document } from "mongoose";

export interface IClub extends Document {
  nombre: string;
  direccion?: string;
  imagen?: string;
  activo: boolean;
}

const ClubSchema: Schema = new Schema<IClub>(
  {
    nombre: { type: String, required: true, loadClass: true },
    direccion: { type: String, loadClass: true },
    imagen: { type: String },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<IClub>("clubs", ClubSchema);
