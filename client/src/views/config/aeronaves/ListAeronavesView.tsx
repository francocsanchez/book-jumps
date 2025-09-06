import { getMarcaAviones } from "@/api/AeronaveAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Plus, TicketsPlane } from "lucide-react";
import { Link } from "react-router-dom";

export default function ListAeronavesView() {
  const { data: dataMarcaAvion, isLoading: loadAeronaves } = useQuery({
    queryKey: ["marca-aciones"],
    queryFn: getMarcaAviones,
  });

  if (loadAeronaves) return <Loading />;
  if (dataMarcaAvion)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de aeronaves</h1>
          <div className="flex items-center gap-2">
            <Link
              to={`crear`}
              className="inline-flex items-center gap-2 bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-sky-700 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar aeronave
            </Link>
          </div>
        </div>

        {dataMarcaAvion.length ? (
          <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Marca</th>
                    <th className="px-6 py-3 text-center">Modelos</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMarcaAvion.map((marcaAvion) => (
                    <tr key={marcaAvion._id} className="border-b hover:bg-sky-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{marcaAvion.nombre}</td>
                      <td className="px-6 py-4 text-center space-x-6 flex justify-center">
                        <Link
                          className="flex items-center gap-2 cursor-pointer text-sky-600 hover:text-sky-800 font-medium"
                          to={`${marcaAvion._id}/modelos`}
                        >
                          <TicketsPlane className="h-5" /> Ver modelos
                        </Link>
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
