import { Outlet } from "react-router-dom";

export default function LoginLayouts() {
  return (
    <>
      <div className="flex h-screen bg-gray-50 text-gray-800">
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
