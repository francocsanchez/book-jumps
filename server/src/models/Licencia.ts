import { Schema, model, Document } from "mongoose";

export interface ILicencia extends Document {
  tipo: string;
  nivel: string;
  activo: boolean;
}

const LicenciaSchema: Schema = new Schema<ILicencia>(
  {
    tipo: { type: String, required: true, loadClass: true },
    nivel: { type: String, loadClass: true, required: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<ILicencia>("licencias", LicenciaSchema);
