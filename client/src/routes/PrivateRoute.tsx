import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import Loading from "@/components/Loading";

export default function PrivateRoute() {
  const { isAuthenticated, userLoading } = useAuth();

  if (userLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
