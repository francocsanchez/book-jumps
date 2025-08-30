import { Schema, model, Document, Types } from "mongoose";

export interface IAeronave extends Document {
  matricula: string;
  activo: boolean;
  modelo: Types.ObjectId;
  anoFabricacion?: number;
}

const AeronaveSchema: Schema = new Schema<IAeronave>(
  {
    matricula: { type: String, required: true, loadClass: true },
    activo: { type: Boolean, default: true },
    modelo: { type: Schema.Types.ObjectId, ref: "modelos_aviones", required: true },
    anoFabricacion: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default model<IAeronave>("aeronaves", AeronaveSchema);
