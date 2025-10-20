import { Outlet } from "react-router-dom";
import Menu from "@/components/layouts/Menu";
import Logout from "@/components/layouts/Logout";
export default function AdminLayouts() {
  return (
    <>
      <div className="flex h-screen bg-gray-50 text-gray-800">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between">
          <div>
            <div className="h-16 flex items-center justify-center border-b">
              <div className="w-48">
                <h1 className="font-bold text-lg uppercase">Si.Ge.Pa</h1>
              </div>
            </div>

            {/* Menu */}
            <Menu />
          </div>

          {/* Logout */}
          <Logout />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </div>
          <footer className="text-center text-xs text-slate-400 py-3">
            © {new Date().getFullYear()} Club de Paracaidismo y Rescate del Neuquén — Si.Ge.Pa.
          </footer>
        </main>
      </div>
    </>
  );
}
