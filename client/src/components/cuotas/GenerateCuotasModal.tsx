import { generateCuotas } from "@/api/CuotasAPI";
import type { CuotaGenerateFormDataType } from "@/types/TCuotas";
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ErrorMessage from "../ErrorMessage";

export default function GenerateCuotasModal() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewModal = queryParams.get("generateCuotas");
  const showModal = viewModal ? true : false;

  // helpers
  const pad = (n: number) => String(n).padStart(2, "0");
  const labelMMYYYY = (y: number, m: number) => `${pad(m)}-${y}`;
  const valueYYYYMM = (y: number, m: number) => `${y}-${pad(m)}`;

  const monthOptions = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const startMonth = today.getMonth() + 1; // 1..12
    const opts: { label: string; value: string }[] = [];
    for (let m = startMonth; m <= 12; m++) {
      opts.push({ label: labelMMYYYY(year, m), value: valueYYYYMM(year, m) });
    }
    return opts;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CuotaGenerateFormDataType>({
    defaultValues: {
      periodo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: generateCuotas,
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
    onSuccess: () => {
      toast.success("Cuotas generadas");
      queryClient.invalidateQueries({ queryKey: ["cuotas"] });
      reset();
      navigate("", { replace: true });
    },
  });

  const handleForm = (formData: CuotaGenerateFormDataType) => {
    mutation.mutate(formData);
  };

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
                Generar cuotas
              </DialogTitle>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit(handleForm)} className="px-6 py-6 space-y-5">
              <div>
                <label htmlFor="periodo" className="block text-sm font-medium text-gray-700">
                  Período (mm-aaaa)
                </label>
                <select
                  id="periodo"
                  className={`mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 ${
                      errors.periodo ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:ring-emerald-500 focus:border-emerald-500"
                    }`}
                  {...register("periodo", { required: "Debe seleccionar un periodo de mes" })}
                >
                  <option value="" disabled>
                    - Seleccione un periodo -
                  </option>
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.periodo && <ErrorMessage>{errors.periodo.message}</ErrorMessage>}
              </div>

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
                  className="
                    inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white
                    hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  Generar cuotas
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
