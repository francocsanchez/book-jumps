import { createLicencia } from "@/api/LicenciaAPI";
import LicenciaForm from "@/components/licencias/LicenciaForm";
import type { LicenciaFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateLienciaView() {
  const navigate = useNavigate();
  const initialValues: LicenciaFormData = {
    tipo: "",
    nivel: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: createLicencia,
    onError: (errors) => {
      toast.error(`Ocurrio un error`);
      console.log(errors);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(-1);
    },
  });

  const handleForm = (formData: LicenciaFormData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Encabezado */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Nueva licencia</h1>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-sky-700 transition">
          ← Volver
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(handleForm)} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-4" noValidate>
        <LicenciaForm register={register} errors={errors} />
        {/* Botón de submit */}
        <div className="pt-4">
          <input
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition text-sm font-medium cursor-pointer uppercase"
            value={`Crear`}
          />
        </div>
      </form>
    </div>
  );
}
