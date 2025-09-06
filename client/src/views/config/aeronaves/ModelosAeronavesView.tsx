import { getAeronaves } from "@/api/AeronaveAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function ModelosAeronavesView() {
  const navigate = useNavigate();
  const params = useParams();
  const marcaAvionID = params.marcaAvionID!;

  const { data: dataAeronaves, isLoading: loadAeronaves } = useQuery({
    queryKey: ["aeronaves"],
    queryFn: () => getAeronaves(marcaAvionID),
  });

  if (loadAeronaves) return <Loading />;

  if (dataAeronaves)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de aeronaves</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-sky-700 transition">
              ← Volver
            </button>
          </div>
        </div>

        {dataAeronaves.length ? (
          <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Marca</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAeronaves.map((marcaAvion) => (
                    <tr key={marcaAvion._id} className="border-b hover:bg-sky-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{marcaAvion.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmpyRegistros title={`No hay modelos registrados`} />
        )}
      </div>
    );
}
