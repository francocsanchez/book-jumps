import { useNavigate } from "react-router-dom";
import LicenciaForm from "./LicenciaForm";
import { useForm } from "react-hook-form";
import type { Licencia, LicenciaFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLicenciaByID } from "@/api/LicenciaAPI";
import { toast } from "sonner";

type EditLicenciaFormProps = {
  data: LicenciaFormData;
  licenciaID: Licencia["_id"];
};
export default function EditLicenciaForm({ data, licenciaID }: EditLicenciaFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipo: data.tipo,
      nivel: data.nivel,
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateLicenciaByID,
    onError: (errors) => {
      toast.error(`Ocurrio un error`);
      console.log(errors);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["licencias"] });
      queryClient.invalidateQueries({ queryKey: ["editLicencia", licenciaID] });
      toast.success(data.message);
      navigate(-1);
    },
  });

  const handleForm = (formData: LicenciaFormData) => {
    const data = {
      formData,
      licenciaID,
    };
    mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Encabezado */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Editar licencia</h1>
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
            value={`Guardar`}
          />
        </div>
      </form>
    </div>
  );
}
