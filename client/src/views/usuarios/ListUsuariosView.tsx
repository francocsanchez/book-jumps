import { changeStatusSocio, getSocios } from "@/api/SociosAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Book, Lock, LockOpen, Pencil, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ListUsuariosView() {
  const queryClient = useQueryClient();

  const { data: dataSocios, isLoading: loadSocios } = useQuery({
    queryKey: ["usuarios"],
    queryFn: getSocios,
  });

  const { mutate } = useMutation({
    mutationFn: changeStatusSocio,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (loadSocios) return <Loading />;
  if (dataSocios)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de socios</h1>
          <div className="flex items-center gap-2">
            <Link
              to={`crear`}
              className="inline-flex items-center gap-2 bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-sky-700 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar socio
            </Link>
          </div>
        </div>

        {/* Tabla */}

        {dataSocios.length ? (
          <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Apellido y Nombre</th>
                    <th className="px-6 py-3 text-center">Email</th>
                    <th className="px-6 py-3 text-center">Roles</th>
                    <th className="px-6 py-3 text-center">Estado</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSocios.map((socio) => (
                    <tr key={socio._id} className="border-b hover:bg-sky-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{`${socio.apellido}, ${socio.nombre}`}</td>
                      <td className="px-6 py-4 text-center">{socio.email}</td>
                      <td className="px-6 py-4 text-center">
                        {socio.tiposUsuario.map((rol) => (
                          <span key={rol} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] mx-1">
                            {rol}
                          </span>
                        ))}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            socio.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
                          }`}
                        >
                          {socio.activo ? "Activo" : "Bloqueado"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-6 flex justify-center">
                        <Link to={`${socio._id}`} className="text-green-600 hover:text-green-800">
                          <Book className="w-4 h-4" />
                        </Link>
                        {socio.activo && (
                          <>
                            <Link to={`${socio._id}/editar`} className="text-blue-600 hover:text-blue-800">
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </>
                        )}
                        <button
                          onClick={() => mutate(socio._id)}
                          className={socio.activo ? "text-red-600 hover:text-red-800" : "text-amber-600 hover:text-amber-800"}
                        >
                          {socio.activo ? <Lock className="w-4 h-4" /> : <LockOpen className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmpyRegistros title={`No hay socios registrados`} />
        )}
      </div>
    );
}
