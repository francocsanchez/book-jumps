import { getUsuarioByID } from "@/api/SociosAPI";
import Loading from "@/components/Loading";
import EditUsuarioForm from "@/components/socios/EditUsuarioForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditUsuarioView() {
  const params = useParams();
  const usuarioID = params.usuarioID!;
  const {
    data: dataUsuario,
    isLoading: loadUsuario,
    isError: errorUsuario,
  } = useQuery({
    queryKey: ["editUsuario", usuarioID],
    queryFn: () => getUsuarioByID(usuarioID),
    retry: false,
  });

  if (loadUsuario) return <Loading />;
  if (errorUsuario) return <div>Error al cargar la licencia</div>;
  if (dataUsuario) return <EditUsuarioForm data={dataUsuario} usuarioID={usuarioID} />;
}
