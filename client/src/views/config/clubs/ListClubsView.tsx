import { changeStatusClub, getClubs } from "@/api/ClubAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plane, Plus, RefreshCcw, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ListClubsView() {
  const queryClient = useQueryClient();

  const { data: dataClubs, isLoading: loadClubs } = useQuery({
    queryKey: ["clubs"],
    queryFn: getClubs,
  });

  const { mutate } = useMutation({
    mutationFn: changeStatusClub,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (loadClubs) return <Loading />;
  if (dataClubs)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de clubs</h1>
          <div className="flex items-center gap-2">
            <Link
              to={`crear`}
              className="inline-flex items-center gap-2 bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-sky-700 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar club
            </Link>
          </div>
        </div>

        {/* Tabla */}

        {dataClubs.length ? (
          <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3 text-center">Direccion</th>
                    <th className="px-6 py-3 text-center">Estado</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dataClubs.map((club) => (
                    <tr key={club._id} className="border-b hover:bg-sky-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{club.nombre}</td>
                      <td className="px-6 py-4">{club.direccion}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            club.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
                          }`}
                        >
                          {club.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-6 flex justify-center">
                        {club.activo && (
                          <>
                            <Link to={`${club._id}/aeronaves`} className="text-orange-600 hover:text-orange-800">
                              <Plane className="w-4 h-4" />
                            </Link>
                            <Link to={`${club._id}/editar`} className="text-blue-600 hover:text-blue-800">
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </>
                        )}
                        <button
                          onClick={() => mutate(club._id)}
                          className={club.activo ? "text-red-600 hover:text-red-800" : "text-amber-600 hover:text-amber-800"}
                        >
                          {club.activo ? <Trash className="w-4 h-4" /> : <RefreshCcw className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmpyRegistros title={`No hay clubs registrados`} />
        )}
      </div>
    );
}
