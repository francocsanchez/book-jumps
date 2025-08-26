import { Schema, model, Document, Types } from "mongoose";

export interface IModeloAvion extends Document {
  marca: Types.ObjectId;
  nombre: string;
  activo: boolean;
}

const ModeloAvionSchema: Schema = new Schema<IModeloAvion>(
  {
    marca: { type: Schema.Types.ObjectId, ref: "marcas_aviones", required: true },
    nombre: { type: String, required: true, loadClass: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default model<IModeloAvion>("modelos_aviones", ModeloAvionSchema);
