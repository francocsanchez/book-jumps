import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { LicenciaFormData } from "@/types";

type LicenciaFormProps = {
  register: UseFormRegister<LicenciaFormData>;
  errors: FieldErrors<LicenciaFormData>;
};

export default function LicenciaForm({ register, errors }: LicenciaFormProps) {
  return (
    <>
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo</label>
        <input
          type="text"
          id="tipo"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.tipo ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("tipo", {
            required: "El tipo es obligatorio",
          })}
        />
        {errors.tipo && <ErrorMessage>{errors.tipo.message}</ErrorMessage>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nivel</label>
        <input
          type="text"
          id="nivel"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.nivel ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("nivel", {
            required: "El nivel es obligatorio",
          })}
        />
        {errors.nivel && <ErrorMessage>{errors.nivel.message}</ErrorMessage>}
      </div>
    </>
  );
}
