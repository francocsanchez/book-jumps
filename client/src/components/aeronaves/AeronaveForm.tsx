import type { AeronaveFormData } from "@/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { getMarcaAviones } from "@/api/AeronaveAPI";
import Loading from "../Loading";

type AeronaveFormProps = {
  register: UseFormRegister<AeronaveFormData>;
  errors: FieldErrors<AeronaveFormData>;
};

export default function AeronaveForm({ register, errors }: AeronaveFormProps) {
  const { data: dataAeronaves, isLoading: loadAeronaves } = useQuery({
    queryKey: ["marca-aviones"],
    queryFn: getMarcaAviones,
  });

  if (loadAeronaves) return <Loading />;
  if (dataAeronaves)
    return (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700">Marca</label>
          <select
            id="marca"
            className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
              errors.marca ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
            {...register("marca", { required: "Debe seleccionar una marca de avion" })}
          >
            <option value="" disabled>
              Seleccione una
            </option>
            {dataAeronaves.map((marca) => (
              <option key={marca._id} value={marca._id}>
                {marca.nombre}
              </option>
            ))}
          </select>
          {errors.marca && <ErrorMessage>{errors.marca.message}</ErrorMessage>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
              errors.nombre ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
        </div>
      </>
    );
}
