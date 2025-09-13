import { Schema, model, Document, Types } from "mongoose";

export interface IPagoCuota extends Document {
  cuota: Types.ObjectId;
  usuario: Types.ObjectId;
  periodo: string;
  importe: number;
  fechaPago: Date;
  notas?: string;
}

const PagoCuotaSchema = new Schema<IPagoCuota>(
  {
    cuota: { type: Schema.Types.ObjectId, ref: "cuotas", required: true, index: true },
    usuario: { type: Schema.Types.ObjectId, ref: "usuarios", required: true, index: true },
    periodo: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(v),
        message: 'El periodo debe tener formato "YYYY-MM".',
      },
    },
    importe: { type: Number, required: true, min: 0.01 },
    fechaPago: { type: Date, default: Date.now, index: true },
    notas: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false }
);

// Índices útiles para consultas frecuentes
PagoCuotaSchema.index({ cuota: 1, fechaPago: -1 });
PagoCuotaSchema.index({ usuario: 1, periodo: 1, fechaPago: -1 });

export default model<IPagoCuota>("pagos_cuotas", PagoCuotaSchema);
