import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="rounded-full bg-sky-100 text-sky-600 p-4 mb-4 shadow-sm">
        <SearchX className="w-12 h-12" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">404 - Página no encontrada</h1>

      <p className="mt-2 text-slate-600 text-sm max-w-md text-center leading-snug">
        La página que estás buscando no existe o fue movida. Verificá la URL o volvé al inicio.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
