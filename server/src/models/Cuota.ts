import { Schema, model, Document, Types } from "mongoose";

export const ESTADO_CUOTA = ["pendiente", "pagada", "exenta"] as const;
export type EstadoCuota = (typeof ESTADO_CUOTA)[number];

export interface ICuota extends Document {
  usuario: Types.ObjectId;
  periodo: string;
  importe: number;
  estado: EstadoCuota;
  fechaPago?: Date;
  notas?: string;
}

const CuotaSchema: Schema = new Schema<ICuota>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "usuarios", required: true, index: true },
    periodo: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(v),
        message: 'El periodo debe tener formato "YYYY-MM".',
      },
    },
    importe: { type: Number, required: true, min: 0 },
    estado: { type: String, enum: ESTADO_CUOTA, default: "pendiente", index: true },
    fechaPago: { type: Date },
    notas: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CuotaSchema.index({ usuario: 1, periodo: 1 }, { unique: true });

export default model<ICuota>("cuotas", CuotaSchema);
