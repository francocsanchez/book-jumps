import { Schema, model, Document, Types, PopulatedDoc } from "mongoose";
import { IAeronave } from "./Aeronave";

export interface IClub extends Document {
  nombre: string;
  direccion?: string;
  imagen?: string;
  activo: boolean;
  aeronaves: PopulatedDoc<IAeronave & Document>[];
}

const ClubSchema: Schema = new Schema<IClub>(
  {
    nombre: { type: String, required: true, loadClass: true },
    direccion: { type: String, loadClass: true },
    imagen: { type: String },
    activo: { type: Boolean, default: true },
    aeronaves: [{ type: Types.ObjectId, ref: "aeronaves" }],
  },
  {
    timestamps: true,
  }
);

export default model<IClub>("clubs", ClubSchema);
