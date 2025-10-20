import { changePassword } from "@/api/UsuarioAPI";
import type { UsuarioChangePassword } from "@/types/TUsuario";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FormValues = UsuarioChangePassword & {
  confirmPassword: string;
};

export default function CambiasPasswordModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewModal = queryParams.get("changePassword");
  const showModal = !!viewModal;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");

  const mutation = useMutation({
    mutationFn: changePassword,
    onError: (err: any) => {
      toast.error(err?.message ?? "Error al actualizar la contraseña");
      console.error(err);
    },
    onSuccess: () => {
      toast.success("Contraseña actualizada");
      reset();
      navigate("/perfil", { replace: true });
    },
  });

  const handleForm = (formData: FormValues) => {
    const payload: UsuarioChangePassword = { password: formData.password };

    mutation.mutate({
      formData: payload,
      usuarioID: "123",
    });
  };

  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={showModal}
      onClose={() => {
        reset();
        navigate("", { replace: true });
      }}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/60 transition-opacity data-[closed]:opacity-0" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition data-[closed]:opacity-0 data-[closed]:scale-95">
            {/* Header */}
            <div className="px-6 pt-6">
              <DialogTitle as="h3" className="text-2xl md:text-3xl font-black text-gray-800">
                Cambiar contraseña
              </DialogTitle>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit(handleForm)} className="px-6 py-6 space-y-5">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Nueva contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  aria-invalid={!!errors.password || undefined}
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Repetir contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Repetí la contraseña",
                    validate: (value) => value === passwordValue || "Las contraseñas no coinciden",
                  })}
                  aria-invalid={!!errors.confirmPassword || undefined}
                  className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    navigate("", { replace: true });
                  }}
                  className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || mutation.isPending}
                  className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
