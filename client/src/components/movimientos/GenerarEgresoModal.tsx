import { listConceptosEgresos } from "@/api/ConceptosAPI";
import type { MovimientoFormData } from "@/types/TMovimiento";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../Loading";
import { generarMovimientoEgreso } from "@/api/MovimientoAPI";

export default function GenerarEgresoModal() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewModal = queryParams.get("generarEgreso");
  const showModal = viewModal ? true : false;

  const { data: dataConceptos = [], isLoading: loadConceptos } = useQuery({
    queryKey: ["conceptos-egresos"],
    queryFn: listConceptosEgresos,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovimientoFormData>({
    defaultValues: {
      monto: 0,
      concepto: "",
      descripcion: "",
    },
  });

  const mutation = useMutation({
    mutationFn: generarMovimientoEgreso,
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
    onSuccess: () => {
      toast.success("Movimiento registrado correctamente");
      queryClient.invalidateQueries({ queryKey: ["movimientos"] });
      reset();
      navigate("", { replace: true });
    },
  });

  const handleForm = (formData: MovimientoFormData) => {
    mutation.mutate(formData);
  };

  if (loadConceptos) return <Loading />;
  if (dataConceptos)
    return (
      <Dialog as="div" className="relative z-50" open={showModal} onClose={() => navigate("", { replace: true })}>
        {/* Overlay */}
        <DialogBackdrop
          className="
              fixed inset-0 bg-black/60
              transition-opacity
              data-[closed]:opacity-0
            "
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Panel */}
            <DialogPanel
              className="
                  w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white
                  text-left align-middle shadow-xl
                  transition data-[closed]:opacity-0 data-[closed]:scale-95
                "
            >
              {/* Header */}
              <div className="px-6 pt-6">
                <DialogTitle as="h3" className="text-2xl md:text-3xl font-black text-gray-800">
                  Nuevo egreso
                </DialogTitle>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit(handleForm)} className="px-6 py-6 space-y-6" noValidate>
                {/* Monto */}
                <div>
                  <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-1">
                    Monto
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      id="monto"
                      {...register("monto", { required: "El monto es obligatorio", min: { value: 0.01, message: "El monto debe ser mayor a 0" } })}
                      placeholder="0,00"
                      className={`block w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400
         focus:outline-none ${errors.monto ? "border-red-400 focus:ring-red-400" : ""}`}
                    />
                  </div>
                  {errors.monto && <p className="text-red-500 text-xs mt-1">{errors.monto.message}</p>}
                </div>

                {/* Concepto */}
                <div>
                  <label htmlFor="concepto" className="block text-sm font-medium text-gray-700 mb-1">
                    Concepto
                  </label>
                  <select
                    id="concepto"
                    {...register("concepto", { required: "Seleccioná un concepto" })}
                    className={`block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm
       focus:outline-none ${errors.concepto ? "border-red-400 focus:ring-red-400" : ""}`}
                  >
                    <option value="" disabled>
                      Seleccionar...
                    </option>
                    {dataConceptos.map((concepto) => (
                      <option key={concepto._id} value={concepto._id}>
                        {concepto.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.concepto && <p className="text-red-500 text-xs mt-1">{errors.concepto.message}</p>}
                </div>

                {/* Descripción */}
                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    rows={3}
                    placeholder="Detalle del movimiento..."
                    {...register("descripcion", { required: "La descripción es obligatoria" })}
                    className={`block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400
    focus:outline-none ${errors.descripcion ? "border-red-400 focus:ring-red-400" : ""}`}
                  />
                  {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
                </div>

                {/* Botones */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => navigate("", { replace: true })}
                    className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
}
