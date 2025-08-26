import { Schema, model, Document } from "mongoose";

export interface IMarcaAvion extends Document {
  nombre: string;
  activo: boolean;
}

const MarcaAvionSchema: Schema = new Schema<IMarcaAvion>(
  {
    nombre: { type: String, required: true, loadClass: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<IMarcaAvion>("marcas_aviones", MarcaAvionSchema);
