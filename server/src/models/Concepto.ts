import { Schema, model, Document } from "mongoose";

export interface IConcepto extends Document {
  nombre: string;
  activo: boolean;
  tipo: boolean;
}

const ConceptoSchema: Schema = new Schema<IConcepto>(
  {
    nombre: { type: String, required: true, loadClass: true },
    activo: { type: Boolean, default: true },
    tipo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<IConcepto>("conceptos", ConceptoSchema);
