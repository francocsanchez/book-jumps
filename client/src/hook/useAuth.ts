import { getUsuario } from "@/api/UsuarioAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const {
    data: userData,
    isError: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["usuario"],
    queryFn: getUsuario,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const isAuthenticated = !!userData && !userLoading && !userError;
  return { userData, userError, userLoading, isAuthenticated };
};
