import { Schema, model, Document } from "mongoose";

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
}

const ClubSchema: Schema = new Schema<IClub>(
  {
    nombre: { type: String, required: true, trim: true },
    cuit: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{11}$/, "CUIT inválido (debe tener 11 dígitos)"],
    },
    direccion: { type: String, trim: true },
    imagen: { type: String, trim: true },
    activo: { type: Boolean, default: true },
    valores: {
      cuota: { type: Number, default: 0, min: 0 },
      salto: { type: Number, default: 0, min: 0 },
      alquilerEquipo: { type: Number, default: 0, min: 0 },
    },
    datosBancarios: {
      titular: { type: String, default: "", trim: true },
      banco: { type: String, default: "", trim: true },
      cbu: {
        type: String,
        default: "",
        trim: true,
        match: [/^\d{0}$|^\d{22}$/, "CBU inválido (debe tener 22 dígitos)"],
      },
      cuenta: { type: String, default: "", trim: true },
      alias: { type: String, default: "", trim: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IClub>("clubs", ClubSchema);
