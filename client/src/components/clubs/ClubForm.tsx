import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ClubFormData } from "@/types";
import ErrorMessage from "../ErrorMessage";

type LicenciaFormProps = {
  register: UseFormRegister<ClubFormData>;
  errors: FieldErrors<ClubFormData>;
};

export default function ClubForm({ register, errors }: LicenciaFormProps) {
  return (
    <>
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="tipo"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.nombre ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("nombre", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Direccion</label>
        <input
          type="text"
          id="direccion"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.direccion ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("direccion")}
        />
        {errors.direccion && <ErrorMessage>{errors.direccion.message}</ErrorMessage>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL Imagen</label>
        <input
          type="text"
          id="imagen"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.imagen ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("imagen")}
        />
      </div>
    </>
  );
}
