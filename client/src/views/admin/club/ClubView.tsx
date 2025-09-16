import { getInfoClub } from "@/api/ClubAPI";
import Loading from "@/components/Loading";
import { fmtDate, fmtMoney } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClubView() {
  const {
    data: dataClub,
    isLoading: loadClub,
    isError: errorClub,
  } = useQuery({
    queryKey: ["club"],
    queryFn: () => getInfoClub(),
    retry: false,
  });

  if (loadClub) return <Loading />;
  if (errorClub) return <p>Error cargando datos del club</p>;

  if (dataClub)
    return (
      <div className="mx-auto px-4 py-6 space-y-6">
        {/* Encabezado */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-5">
          <div className="flex items-center gap-4">
            <img src={dataClub.imagen || "/logo.jpg"} alt={dataClub.nombre} className="h-14 w-14 rounded-full object-cover border" />
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{dataClub.nombre}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                <span className="text-slate-400">•</span>
                <span>
                  CUIT: <b className="font-medium">{dataClub.cuit}</b>
                </span>
                {dataClub.direccion && (
                  <>
                    <span className="text-slate-400">•</span>
                    <span className="truncate">
                      Dirección: <b className="font-medium">{dataClub.direccion}</b>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Acciones: Estatuto + Editar (discreto) */}
            <div className="ml-auto flex items-center gap-2 flex-wrap">
              {dataClub.linkStatuto && (
                <a
                  href={dataClub.linkStatuto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition"
                >
                  Ver Estatuto (PDF)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              )}

              <Link
                type="button"
                to={`editar`}
                className="inline-flex items-center gap-2 rounded-lg border border-sky-200 text-sky-700 px-3 py-2 text-sm hover:bg-sky-50 active:scale-[.99] transition"
                title="Editar datos del club"
                aria-label="Editar datos del club"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </Link>
            </div>
          </div>
        </div>

        {/* Valores + Datos bancarios */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Valores */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <h2 className="text-base font-semibold text-slate-800">Valores</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border bg-slate-50 p-4 text-center">
                <div className="text-slate-500 text-sm">Cuota Social</div>
                <div className="text-2xl font-bold mt-1">{fmtMoney(dataClub.valores.cuota)}</div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-4 text-center">
                <div className="text-slate-500 text-sm">Salto</div>
                <div className="text-2xl font-bold mt-1">{fmtMoney(dataClub.valores.salto)}</div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-4 text-center">
                <div className="text-slate-500 text-sm">Alquiler de equipo</div>
                <div className="text-2xl font-bold mt-1">{fmtMoney(dataClub.valores.alquilerEquipo)}</div>
              </div>
            </div>
          </div>

          {/* Datos bancarios */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
            <h2 className="text-base font-semibold text-slate-800">Datos para pagos</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border bg-slate-50 px-4 py-3">
                <div className="text-slate-500 uppercase text-xs">Titular</div>
                <div className="font-medium break-all">{dataClub.datosBancarios?.titular || "—"}</div>
              </div>
              <div className="rounded-lg border bg-slate-50 px-4 py-3">
                <div className="text-slate-500 uppercase text-xs">Banco</div>
                <div className="font-medium break-all">{dataClub.datosBancarios?.banco || "—"}</div>
              </div>
              <div className="rounded-lg border bg-slate-50 px-4 py-3">
                <div className="text-slate-500 uppercase text-xs">Cuenta</div>
                <div className="font-medium break-all">{dataClub.datosBancarios?.cuenta || "—"}</div>
              </div>
              <div className="rounded-lg border bg-slate-50 px-4 py-3">
                <div className="text-slate-500 uppercase text-xs">CBU</div>
                <div className="font-medium break-all">{dataClub.datosBancarios?.cbu || "—"}</div>
              </div>
              <div className="rounded-lg border bg-slate-50 px-4 py-3 sm:col-span-2">
                <div className="text-slate-500 uppercase text-xs">Alias</div>
                <div className="font-medium break-all">{dataClub.datosBancarios?.alias || "—"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metadatos */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Actualizado: <b className="font-medium">{fmtDate(dataClub.updatedAt)}</b>
            </span>
          </div>
        </div>
      </div>
    );
}
