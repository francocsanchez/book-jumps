import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Plane, User, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function SociosLayouts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    navigate("/", { replace: true });
    queryClient.clear();
    toast.success("Hasta luego!");
  };

  // TODO: reemplazar estos datos por los que vengan de la base
  const fakeUser = {
    nombre: "Franco",
    apellido: "Sanchez",
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <div className="flex-1 flex flex-col">
        {/* Navbar Superior */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
          {/* Nombre del sistema */}
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-sky-600" />
            <span className="font-bold text-slate-700">Si.Ge.Pa.</span>
          </div>

          {/* Usuario y salir */}
          <div className="flex items-center gap-4">
            <Link to={`perfil`} className="flex items-center gap-2 text-slate-600">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">
                {fakeUser.nombre} {fakeUser.apellido}
              </span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 transition"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 py-3 border-t">
          © {new Date().getFullYear()} Club de Paracaidismo y Rescate del Neuquén — Si.Ge.Pa.
        </footer>
      </div>
    </div>
  );
}
