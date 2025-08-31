import { Schema, model, Document, Types } from "mongoose";

export const rolesEnClubConst = {
  MIEMBRO: "miembro",
  PARACAIDISTA: "paracaidista",
  INSTRUCTOR: "instructor",
  PILOTO: "piloto",
  STAFF: "staff",
  INACTIVO: "inactivo",
} as const;
type RolEnClub = (typeof rolesEnClubConst)[keyof typeof rolesEnClubConst];

export interface IMembresia extends Document {
  usuario: Types.ObjectId;
  club: Types.ObjectId;
  rolesEnClub: RolEnClub[];
  activo: boolean;
  notas?: string;
}

const MembresiaSchema = new Schema<IMembresia>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "usuarios", required: true },
    club: { type: Schema.Types.ObjectId, ref: "clubs", required: true },
    rolesEnClub: {
      type: [String],
      enum: Object.values(rolesEnClubConst),
      required: true,
    },
    activo: { type: Boolean, default: true },
    notas: { type: String },
  },
  { timestamps: true }
);

MembresiaSchema.pre("save", function (next) {
  if (Array.isArray(this.rolesEnClub)) {
    this.rolesEnClub = Array.from(new Set(this.rolesEnClub.map((r) => r.toLowerCase() as RolEnClub)));
  }
  next();
});

export default model<IMembresia>("membresias", MembresiaSchema);
