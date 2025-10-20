// src/routes/RoleRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import Loading from "@/components/Loading";

export type UserRole = "admin" | "piloto" | "paracaidista" | "asistente";

type RoleRouteProps = {
  allow: UserRole[]; // roles permitidos
  redirectTo?: string; // destino si no tiene rol
};

export default function RoleRoute({ allow, redirectTo = "/403" }: RoleRouteProps) {
  const { userData, userLoading, isAuthenticated } = useAuth();

  if (userLoading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  const rolesUsuario = userData?.tiposUsuario ?? [];
  const tienePermiso = allow.some((r) => rolesUsuario.includes(r));

  return tienePermiso ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
