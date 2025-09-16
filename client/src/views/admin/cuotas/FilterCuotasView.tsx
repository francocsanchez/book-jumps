import { listCuotasPorPeriodo } from "@/api/CuotasAPI";
import Loading from "@/components/Loading";
import { fmtDate, fmtMoney } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
import { FileCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function EstadoBadge({ estado }: { estado: "pagada" | "pendiente" | "exenta" | string }) {
  const map: Record<string, string> = {
    pagada: "bg-emerald-100 text-emerald-800 border-emerald-200",
    pendiente: "bg-amber-100 text-amber-800 border-amber-200",
    exenta: "bg-slate-100 text-slate-800 border-slate-200",
  };
  const cls = map[estado] ?? "bg-gray-100 text-gray-800 border-gray-200";
  const label = estado.charAt(0).toUpperCase() + estado.slice(1);
  return <span className={`inline-flex px-2 py-0.5 text-xs rounded-md border ${cls}`}>{label}</span>;
}

export default function FilterCuotasView() {
  const { anioMes = "" } = useParams();
  const {
    data: dataCuotas = [],
    isLoading: loadCuotas,
    isError: errorCuotas,
  } = useQuery({
    queryKey: ["listCuotas", anioMes],
    queryFn: () => listCuotasPorPeriodo(anioMes),
    retry: false,
  });

  if (loadCuotas) return <Loading />;
  if (errorCuotas) return <div className="text-red-600">Error al cargar las cuotas</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Cuotas del período {anioMes}</h1>
        <Link to=".." relative="path" className="text-sm text-gray-600 hover:text-sky-700 transition">
          ← Volver
        </Link>
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Listado</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-medium px-6 py-3">Socio</th>
                <th className="text-estado font-medium px-6 py-3">Estado</th>
                <th className="text-center font-medium px-6 py-3">F. Pago</th>
                <th className="text-right font-medium px-6 py-3">Importe</th>
                <th className="font-medium px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataCuotas.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <div className="font-medium text-gray-800">{c?.usuario ? `${c.usuario.nombre} ${c.usuario.apellido}` : "—"}</div>
                    <div className="text-xs text-gray-500">{c.periodo}</div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <EstadoBadge estado={c.estado} />
                  </td>
                  <td className="px-6 py-3 text-center">{fmtDate(c.fechaPago)}</td>
                  <td className="px-6 py-3 text-right">{fmtMoney(c.importe)}</td>
                  <td className="px-6 py-3 text-center">
                    {c.estado === "pendiente" && (
                      <Link to={`./${c._id}`} className="text-emerald-700 hover:text-emerald-900 flex items-center gap-2 justify-center">
                        <FileCheck className="h-4 w-4" />
                        Generar pago
                      </Link>
                    )}
                  </td>
                </tr>
              ))}

              {dataCuotas.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                    No hay cuotas para mostrar en {anioMes}.
                  </td>
                </tr>
              )}
            </tbody>

            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-3 font-medium text-gray-700">Total</td>
                <td></td>
                <td></td>
                <td className="px-6 py-3 text-right font-medium text-gray-700">
                  {fmtMoney(dataCuotas.reduce((s: number, c: any) => s + Number(c.importe || 0), 0))}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
