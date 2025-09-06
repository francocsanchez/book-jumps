import { UsersRound, ChevronRight, ChevronDown, Settings, AreaChartIcon, Plane, Boxes, CreditCard } from "lucide-react";
import NavLinkItem from "./NavLinkItem";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Menu() {
  const [openConfig, setOpenConfig] = useState(false);
  const { pathname } = useLocation();

  const isConfigActive = pathname.startsWith("/config");

  useEffect(() => {
    setOpenConfig(isConfigActive);
  }, [isConfigActive]);
  return (
    <nav className="p-4 space-y-2">
      <NavLinkItem to="/atenciones" icon={<UsersRound />} label="Socios" />

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
                <Plane className="h-4" /> Aviónes
              </div>
            </NavLink>
            <NavLink
              to="/config/modelo-avion"
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive ? "bg-sky-100 text-sky-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-1">
                <Boxes className="h-4" /> Clubes
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
