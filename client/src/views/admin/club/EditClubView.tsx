import { getInfoClub, updateInfoClub } from "@/api/ClubAPI";
import Loading from "@/components/Loading";
import type { Club } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EditClubView() {
  const navigate = useNavigate();

  // Form: defaultValues básicos; luego haremos reset con dataClub
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Club>({
    defaultValues: {
      nombre: "",
      cuit: "",
      direccion: "",
      linkStatuto: "",
      datosBancarios: {
        titular: "",
        banco: "",
        cbu: "",
        cuenta: "",
        alias: "",
      },
      valores: {
        cuota: 0,
        salto: 0,
        alquilerEquipo: 0,
      },
    },
  });

  const {
    data: dataClub,
    isLoading: loadClub,
    isError: errorClub,
    error,
  } = useQuery({
    queryKey: ["editClub"],
    queryFn: getInfoClub,
    retry: false,
  });

  // Cuando llegan los datos, seteamos el form
  useEffect(() => {
    if (dataClub) reset(dataClub);
  }, [dataClub, reset]);

  const mutation = useMutation({
    mutationFn: updateInfoClub,
    onError: (err: any) => {
      toast.error(err?.message ?? "Error actualizando club");
      console.error(err);
    },
    onSuccess: () => {
      toast.success("Club actualizado");
      navigate(-1);
    },
  });

  const handleForm = (formData: Club) => {
    mutation.mutate(formData);
  };

  return (
    <div className="mx-auto space-y-6 max-w-3xl">
      {/* Encabezado */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Editar club</h1>
        <button type="button" onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-sky-700 transition">
          ← Volver
        </button>
      </div>

      {/* Estados */}
      {loadClub && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4">
          <Loading />
        </div>
      )}
      {errorClub && (
        <div className="bg-white border border-red-200 rounded-lg shadow-sm px-6 py-4">
          <p className="text-red-600 text-sm">{(error as Error)?.message ?? "Error al cargar el club"}</p>
        </div>
      )}

      {!loadClub && !errorClub && (
        <form onSubmit={handleSubmit(handleForm)} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-6" noValidate>
          {/* Datos generales */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Datos generales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.nombre ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre.message}</p>}
              </div>

              <div>
                <label htmlFor="cuit" className="block text-sm font-medium text-gray-700">
                  CUIT
                </label>
                <input
                  id="cuit"
                  type="text"
                  placeholder="20xxxxxxxxx"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.cuit ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("cuit", {
                    required: "El CUIT es obligatorio",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "CUIT inválido (11 dígitos)",
                    },
                  })}
                />
                {errors.cuit && <p className="mt-1 text-xs text-red-600">{errors.cuit.message}</p>}
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  id="direccion"
                  type="text"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.direccion ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("direccion")}
                />
                {errors.direccion && <p className="mt-1 text-xs text-red-600">{errors.direccion.message}</p>}
              </div>
              <div>
                <label htmlFor="linkStatuto" className="block text-sm font-medium text-gray-700">
                  Link Estatuto
                </label>
                <input
                  id="linkStatuto"
                  type="url"
                  placeholder="https://..."
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.linkStatuto ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("linkStatuto", {
                    pattern: { value: /^https?:\/\/.+/i, message: "Debe ser una URL válida" },
                  })}
                />
                {errors.linkStatuto && <p className="mt-1 text-xs text-red-600">{errors.linkStatuto.message}</p>}
              </div>
            </div>
          </section>

          {/* Datos bancarios */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Datos bancarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titular</label>
                <input
                  type="text"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.datosBancarios?.titular ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("datosBancarios.titular", { required: "Requerido" })}
                />
                {errors.datosBancarios?.titular && <p className="mt-1 text-xs text-red-600">{errors.datosBancarios.titular.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Banco</label>
                <input
                  type="text"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.datosBancarios?.banco ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("datosBancarios.banco", { required: "Requerido" })}
                />
                {errors.datosBancarios?.banco && <p className="mt-1 text-xs text-red-600">{errors.datosBancarios.banco.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">CBU</label>
                <input
                  type="text"
                  placeholder="22 dígitos"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.datosBancarios?.cbu ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("datosBancarios.cbu", {
                    required: "Requerido",
                    pattern: { value: /^[0-9]{22}$/, message: "CBU inválido (22 dígitos)" },
                  })}
                />
                {errors.datosBancarios?.cbu && <p className="mt-1 text-xs text-red-600">{errors.datosBancarios.cbu.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cuenta</label>
                <input
                  type="text"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.datosBancarios?.cuenta ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("datosBancarios.cuenta", { required: "Requerido" })}
                />
                {errors.datosBancarios?.cuenta && <p className="mt-1 text-xs text-red-600">{errors.datosBancarios.cuenta.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Alias</label>
                <input
                  type="text"
                  placeholder="tubanco.tuusuario.cuenta"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.datosBancarios?.alias ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("datosBancarios.alias", { required: "Requerido" })}
                />
                {errors.datosBancarios?.alias && <p className="mt-1 text-xs text-red-600">{errors.datosBancarios.alias.message}</p>}
              </div>
            </div>
          </section>

          {/* Valores */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cuota</label>
                <input
                  type="number"
                  step="0.01"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.valores?.cuota ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("valores.cuota", {
                    valueAsNumber: true,
                    required: "Requerido",
                  })}
                />
                {errors.valores?.cuota && <p className="mt-1 text-xs text-red-600">{errors.valores.cuota.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Salto</label>
                <input
                  type="number"
                  step="0.01"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.valores?.salto ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("valores.salto", {
                    valueAsNumber: true,
                    required: "Requerido",
                  })}
                />
                {errors.valores?.salto && <p className="mt-1 text-xs text-red-600">{errors.valores.salto.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Alquiler equipo</label>
                <input
                  type="number"
                  step="0.01"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
                    errors.valores?.alquilerEquipo ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  {...register("valores.alquilerEquipo", {
                    valueAsNumber: true,
                    required: "Requerido",
                  })}
                />
                {errors.valores?.alquilerEquipo && <p className="mt-1 text-xs text-red-600">{errors.valores.alquilerEquipo.message}</p>}
              </div>
            </div>
          </section>

          {/* Acciones */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex justify-center px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition disabled:opacity-60"
            >
              {mutation.isPending ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex justify-center px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
