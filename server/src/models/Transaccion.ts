import { Schema, model, Document, Types } from "mongoose";

export interface ITransaccion extends Document {
  tipo: boolean;
  monto: number;
  concepto: Types.ObjectId;
  descripcion: string;
}

const TransaccionSchema: Schema = new Schema<ITransaccion>(
  {
    tipo: { type: Boolean, required: true },
    monto: { type: Number, required: true, default: 0 },
    descripcion: { type: String, required: true, loadClass: true },
    concepto: { type: Schema.Types.ObjectId, ref: "conceptos", required: true },
  },
  {
    timestamps: true,
  }
);

export default model<ITransaccion>("transacciones", TransaccionSchema);
