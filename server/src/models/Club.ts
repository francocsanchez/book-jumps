import { Schema, model, Document, Types, PopulatedDoc } from "mongoose";
import { IAeronave } from "./Aeronave";

export interface IClub extends Document {
  nombre: string;
  cuit: string;
  direccion?: string;
  imagen?: string;
  activo: boolean;
  valores?: {
    cuota: number;
    salto: number;
    alquilerEquipo: number;
  };
  datosBancarios?: {
    titular: string;
    banco: string;
    cbu: string;
    cuenta: string;
    alias: string;
  };
  linkStatuto?: string;
}

const ClubSchema: Schema = new Schema<IClub>(
  {
    nombre: { type: String, required: true, loadClass: true },
    cuit: { type: String, required: true, unique: true },
    direccion: { type: String, loadClass: true },
    imagen: { type: String },
    activo: { type: Boolean, default: true },
    valores: {
      cuota: { type: Number, default: 0 },
      salto: { type: Number, default: 0 },
      alquilerEquipo: { type: Number, default: 0 },
    },
    datosBancarios: {
      titular: { type: String, default: "" },
      banco: { type: String, default: "" },
      cbu: { type: String, default: "" },
      cuenta: { type: String, default: "" },
      alias: { type: String, default: "" },
    },
    linkStatuto: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default model<IClub>("clubs", ClubSchema);
