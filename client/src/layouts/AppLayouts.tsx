import { Outlet } from "react-router-dom";
import Menu from "@/components/layouts/Menu";
import Logout from "@/components/layouts/Logout";
import { Toaster } from "sonner";
export default function AppLayout() {
  return (
    <>
      <div className="flex h-screen bg-gray-50 text-gray-800">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between">
          <div>
            <div className="h-16 flex items-center justify-center border-b">
              <div className="w-48">
                <h1 className="font-bold text-lg">ParacaSYS</h1>
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
          <footer className="border-t text-sm text-gray-500 px-6 py-3 bg-white text-center">
            © {new Date().getFullYear()} ParacaSYS. Todos los derechos reservados.
          </footer>
        </main>
      </div>

      <Toaster />
    </>
  );
}
