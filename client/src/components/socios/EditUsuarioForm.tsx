import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UsuarioForm from "./UsuarioForm";
import { updateUsuarioByID } from "@/api/SociosAPI";
import type { Usuario, UsuarioFormData } from "@/types/TUsuario";

type EditUsuarioFormProps = {
  data: UsuarioFormData;
  usuarioID: Usuario["_id"];
};

export default function EditUsuarioForm({ data, usuarioID }: EditUsuarioFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    defaultValues: {
      ...data,
      fechaNacimiento: data.fechaNacimiento?.slice(0, 10),
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateUsuarioByID,
    onError: (errors) => {
      toast.error(errors.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      queryClient.invalidateQueries({ queryKey: ["editUsuario", usuarioID] });
      toast.success(data.message);
      navigate(-1);
    },
  });

  const handleForm = (formData: UsuarioFormData) => {
    const data = {
      formData,
      usuarioID,
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
        <UsuarioForm register={register} errors={errors} />
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
