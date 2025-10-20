// src/views/ForbiddenView.tsx
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForbiddenView() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="rounded-full bg-amber-100 text-amber-600 p-4 mb-4 shadow-sm">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">403 - Acceso denegado</h1>
      <p className="mt-2 text-slate-600 text-sm max-w-md text-center leading-snug">No tenés permisos para ver esta sección.</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
