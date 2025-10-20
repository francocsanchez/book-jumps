import {
  UsersRound,
  ChevronRight,
  ChevronDown,
  Settings,
  Plane,
  CreditCard,
  Command,
  CircleDollarSign,
  Landmark,
  MapPinHouse,
  ClipboardList,
} from "lucide-react";
import NavLinkItem from "./NavLinkItem";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Menu() {
  const [openConfig, setOpenConfig] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const { pathname } = useLocation();

  const isConfigActive = pathname.startsWith("/config");
  const isAdminActive = pathname.startsWith("/admin");

  useEffect(() => {
    setOpenConfig(isConfigActive);
    setOpenAdmin(isAdminActive);
  }, [isConfigActive, isAdminActive]);

  return (
    <nav className="p-4 space-y-2">
      <NavLinkItem to="/socios" icon={<UsersRound />} label="Socios" />

      {/* Administracion */}
      <div>
        <button
          onClick={() => setOpenAdmin((v) => !v)}
          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition
                  ${isAdminActive ? "bg-sky-50 text-sky-700" : "hover:bg-gray-50 text-gray-700"}`}
          aria-expanded={openAdmin}
          aria-controls="config-submenu"
        >
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5" />
            <span>Administracion</span>
          </div>
          {openAdmin ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {openAdmin && (
          <div id="config-submenu" className="ml-8 mt-1 space-y-1">
            <NavLink
              to="/admin/movimientos"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <ClipboardList className="h-4" /> Movimientos
              </div>
            </NavLink>
            <NavLink
              to="/admin/vuelos"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <Plane className="h-4" /> Vuelos
              </div>
            </NavLink>
            <NavLink
              to="/admin/club"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <MapPinHouse className="h-4" /> Club
              </div>
            </NavLink>
            <NavLink
              to="/admin/cuotas"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <CircleDollarSign className="h-4" /> Cuotas
              </div>
            </NavLink>
            <NavLink
              to="/admin/pagos"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <Landmark className="h-4" /> Pagos
              </div>
            </NavLink>
          </div>
        )}
      </div>

      {/* Configuraciones */}
      <div>
        <button
          onClick={() => setOpenConfig((v) => !v)}
          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition
                  ${isConfigActive ? "bg-sky-50 text-sky-700" : "hover:bg-gray-50 text-gray-700"}`}
          aria-expanded={openConfig}
          aria-controls="config-submenu"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <span>Configuraciones</span>
          </div>
          {openConfig ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {openConfig && (
          <div id="config-submenu" className="ml-8 mt-1 space-y-1">
            <NavLink
              to="/config/aeronaves"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <Plane className="h-4" /> Conceptos
              </div>
            </NavLink>
            <NavLink
              to="/config/aeronaves"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <Plane className="h-4" /> Aviónes
              </div>
            </NavLink>
            <NavLink
              to="/config/licencias"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <CreditCard className="h-4" /> Licencias
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
