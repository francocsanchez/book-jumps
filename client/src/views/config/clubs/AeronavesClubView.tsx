import { getClubByID } from "@/api/ClubAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { data, Link, useParams } from "react-router-dom";

export default function AeronavesClubView() {
  const params = useParams();
  const clubID = params.clubID!;

  const {
    data: dataClub,
    isLoading: loadClub,
    isError: errorClub,
  } = useQuery({
    queryKey: ["club", clubID],
    queryFn: () => getClubByID(clubID),
    retry: false,
  });

  if (loadClub) return <Loading />;
  if (errorClub) return <div>Error al cargar el club</div>;
  console.log(dataClub);
  if (dataClub)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{dataClub.nombre}</h1>
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

        {dataClub.aeronaves.length === 0 && <EmpyRegistros title={`No hay aeronaves registradas`} />}
      </div>
    );
}
