import { changeStatusLicencia, getLicencias } from "@/api/LicenciaAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ListLicenciasView() {
  const queryClient = useQueryClient();

  const { data: dataLicencias, isLoading: loadLicencias } = useQuery({
    queryKey: ["licencias"],
    queryFn: getLicencias,
  });

  const { mutate } = useMutation({
    mutationFn: changeStatusLicencia,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["licencias"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (loadLicencias) return <Loading />;
  if (dataLicencias)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de licencias</h1>
          <div className="flex items-center gap-2">
            <Link
              to={`crear`}
              className="inline-flex items-center gap-2 bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-sky-700 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar licencia
            </Link>
          </div>
        </div>

        {/* Tabla */}

        {dataLicencias.length ? (
          <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Tipo</th>
                    <th className="px-6 py-3 text-center">Nivel</th>
                    <th className="px-6 py-3 text-center">Estado</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLicencias.map((licencia) => (
                    <tr key={licencia._id} className="border-b hover:bg-sky-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{licencia.tipo}</td>
                      <td className="px-6 py-4">{licencia.nivel}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            licencia.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
                          }`}
                        >
                          {licencia.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-6 flex justify-center">
                        {licencia.activo && (
                          <Link to={`${licencia._id}/editar`} className="text-blue-600 hover:text-blue-800">
                            <Pencil className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => mutate(licencia._id)}
                          className={licencia.activo ? "text-red-600 hover:text-red-800" : "text-amber-600 hover:text-amber-800"}
                        >
                          {licencia.activo ? <Trash className="w-4 h-4" /> : <RefreshCcw className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmpyRegistros title={`No hay licencias registradas`} />
        )}
      </div>
    );
}
