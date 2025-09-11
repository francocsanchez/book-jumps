import { createUsuario } from "@/api/SociosAPI";
import UsuarioForm from "@/components/socios/UsuarioForm";
import type { UsuarioFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateUsuarioView() {
  const navigate = useNavigate();

  const initialValues: UsuarioFormData = {
    email: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    dni: 0,
    licencia: "",
    licenciaCop: "",
    tiposUsuario: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: createUsuario,
    onError: (errors) => {
      toast.error(errors.message);
      console.log(errors);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(-1);
    },
  });

  const handleForm = (formData: UsuarioFormData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Encabezado */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Nuevo socio</h1>
        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-sky-700 transition">
          ← Volver
        </button>
      </div>

      <form onSubmit={handleSubmit(handleForm)} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-4" noValidate>
        <UsuarioForm register={register} errors={errors} />
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
