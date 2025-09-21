// GeneratePagoModal.tsx
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generatePago } from "@/api/PagoAPI";
import type { PagoGenerateFormData } from "@/types/TPago";

type GeneratePagoModalProps = {
  showModal: boolean;
  cuotaID: string;
};

export default function GeneratePagoModal({ showModal, cuotaID }: GeneratePagoModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search] = useSearchParams();
  const anioMes = search.get("periodo") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PagoGenerateFormData>({
    defaultValues: { fechaPago: "", notas: "" },
  });

  const mutation = useMutation({
    mutationFn: generatePago,
    onError: (err: any) => {
      toast.error(err.message ?? "Error al registrar pago");
      console.error(err);
    },
    onSuccess: () => {
      toast.success("Pago registrado");
      queryClient.invalidateQueries({ queryKey: ["listCuotas", anioMes] });
      queryClient.invalidateQueries({ queryKey: ["listCuotas"] });
      queryClient.invalidateQueries({ queryKey: ["cuotas"] });
      reset();
      navigate("", { replace: true });
    },
  });

  const handleForm = (form: PagoGenerateFormData) => {
    mutation.mutate({ ...form, cuota: cuotaID });
  };

  return (
    <Dialog as="div" className="relative z-50" open={showModal} onClose={() => navigate("", { replace: true })}>
      <DialogBackdrop className="fixed inset-0 bg-black/60 transition-opacity data-[closed]:opacity-0" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition data-[closed]:opacity-0 data-[closed]:scale-95">
            <div className="px-6 pt-6">
              <DialogTitle as="h3" className="text-2xl md:text-3xl font-black text-gray-800">
                Registrar pago
              </DialogTitle>
            </div>

            <form onSubmit={handleSubmit(handleForm)} className="px-6 py-6 space-y-5">
              <div>
                <label htmlFor="fechaPago" className="block text-sm font-medium text-gray-700">
                  Fecha de pago
                </label>
                <input
                  id="fechaPago"
                  type="date"
                  className="mt-1 w-full px-3 py-2 rounded-md text-sm border border-gray-300"
                  {...register("fechaPago", { required: "La fecha de pago es obligatoria" })}
                />
                {errors.fechaPago && <p className="mt-1 text-xs text-red-600">{String(errors.fechaPago.message)}</p>}
              </div>

              <div>
                <label htmlFor="notas" className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <input
                  id="notas"
                  type="text"
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${errors.notas ? "border-red-500" : "border-gray-300"}`}
                  {...register("notas")}
                />
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
                  className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  Registrar pago
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
