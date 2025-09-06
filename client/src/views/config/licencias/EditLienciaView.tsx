import { getLicenciaByID } from "@/api/LicenciaAPI";
import EditLicenciaForm from "@/components/licencias/EditLicenciaForm";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditLienciaView() {
  const params = useParams();
  const licenciaID = params.licenciaID!;

  const {
    data: dataLicencia,
    isLoading: loadLicencia,
    isError: errorLicencia,
  } = useQuery({
    queryKey: ["editLicencia", licenciaID],
    queryFn: () => getLicenciaByID(licenciaID),
    retry: false,
  });

  if (loadLicencia) return <Loading />;
  if (errorLicencia) return <div>Error al cargar la licencia</div>;
  if (dataLicencia) return <EditLicenciaForm data={dataLicencia} licenciaID={licenciaID} />;
}
