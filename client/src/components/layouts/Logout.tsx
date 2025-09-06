import { UserCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Logout() {
  return (
    <div className="p-4 border-t space-y-2">
      <NavLink
        to="/perfil"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
            isActive ? "bg-gray-100 font-semibold text-sky-700" : "text-gray-700"
          }`
        }
      >
        <UserCircle className="w-5 h-5 mr-3" />
        Mi perfil
      </NavLink>

      <button onClick={() => console.log(``)} className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
        <LogOut className="w-5 h-5 mr-3" />
        Cerrar sesión
      </button>
    </div>
  );
}
