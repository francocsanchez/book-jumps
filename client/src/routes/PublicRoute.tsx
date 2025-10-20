import { useAuth } from "@/hook/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { isAuthenticated, userLoading } = useAuth();

  if (userLoading) return null;

  return isAuthenticated ? <Navigate to="/perfil" replace /> : <Outlet />;
}
