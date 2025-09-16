import { HandCoins, Clock, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { listCuotas } from "@/api/CuotasAPI";
import Loading from "@/components/Loading";
import { fmtMoney } from "@/helpers";

export default function ListCuotasView() {
  const { data: dataCuotas = [], isLoading: loadCuotas } = useQuery({
    queryKey: ["cuotas"],
    queryFn: listCuotas,
  });

  // 👉 Cálculos sencillos en un único useMemo
  const { totalPendientes, totalPendientesMonto, pendientePct, porPeriodo } = useMemo(() => {
    // 1) Listas básicas
    const pendientesList = dataCuotas.filter((c) => c.estado === "pendiente");
    const pagas = dataCuotas.filter((c) => c.estado === "pagada").length;

    // 2) Totales simples
    const totalPendientes = pendientesList.length;
    const totalPendientesMonto = pendientesList.reduce((s, c) => s + Number(c.importe || 0), 0);

    // 3) % pendientes sobre cobrables (pagas + pendientes)
    const cobrables = totalPendientes + pagas;
    const pendientePct = cobrables ? (totalPendientes / cobrables) * 100 : 0;

    // 4) Agrupar por período (YYYY-MM)
    const map: Record<string, { periodo: string; total: number; pagas: number; pendientes: number; exentas: number }> = {};
    for (const c of dataCuotas) {
      const p = c.periodo;
      map[p] ??= { periodo: p, total: 0, pagas: 0, pendientes: 0, exentas: 0 };
      const r = map[p];
      r.total++;
      if (c.estado === "pagada") r.pagas++;
      else if (c.estado === "pendiente") r.pendientes++;
      else if (c.estado === "exenta") r.exentas++;
    }

    const porPeriodo = Object.values(map).sort((a, b) => b.periodo.localeCompare(a.periodo));

    return { totalPendientes, totalPendientesMonto, pendientePct, porPeriodo };
  }, [dataCuotas]);

  if (loadCuotas) return <Loading />;
  if (dataCuotas)
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de cuotas</h1>
          <div className="flex items-center gap-2">
            <Link
              to={`crear`}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              <HandCoins className="w-4 h-4" />
              Generar cuotas
            </Link>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pendientes (cantidad) */}
          <MetricCard
            title="Pendientes (cant.)"
            value={totalPendientes}
            icon={<Clock className="w-5 h-5" />}
            className="border-amber-200"
            badgeClass="bg-amber-100 text-amber-800"
          />
          {/* Pendientes (ARS) */}
          <MetricCard
            title="Pendientes (ARS)"
            value={fmtMoney(totalPendientesMonto)}
            icon={<HandCoins className="w-5 h-5" />}
            className="border-sky-200"
            badgeClass="bg-sky-100 text-sky-800"
          />
          {/* % de cobranza - Pendientes */}
          <MetricCard
            title="% de cobranza (pend.)"
            value={`${pendientePct.toFixed(1)}%`}
            icon={<Percent className="w-5 h-5" />}
            className="border-violet-200"
            badgeClass="bg-violet-100 text-violet-800"
          />
        </div>

        {/* Tabla por período */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Cuotas por período</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left font-medium px-6 py-3">Período</th>
                  <th className="text-center font-medium px-6 py-3">Total</th>
                  <th className="text-center font-medium px-6 py-3">Pagas</th>
                  <th className="text-center font-medium px-6 py-3">Pendientes</th>
                  <th className="text-center font-medium px-6 py-3">Exentas</th>
                  <th className="text-center font-medium px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {porPeriodo.map((row) => (
                  <tr key={row.periodo} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-800">{row.periodo}</td>
                    <td className="px-6 py-3 text-center">{row.total}</td>
                    <td className="px-6 py-3 text-emerald-700 text-center">{row.pagas}</td>
                    <td className="px-6 py-3 text-amber-700 text-center">{row.pendientes}</td>
                    <td className="px-6 py-3 text-slate-700 text-center">{row.exentas}</td>
                    <td className="px-6 py-3 text-center">
                      <Link to={`./${row.periodo}`} className="text-sky-700 hover:text-sky-900 underline underline-offset-2">
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                ))}

                {porPeriodo.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-6 text-center text-gray-500">
                      No hay cuotas para mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

/** Card de métrica reutilizable */
function MetricCard({
  title,
  value,
  icon,
  className,
  badgeClass,
  subtitle,
  footer,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  className?: string;
  badgeClass?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`bg-white border ${className ?? "border-gray-200"} rounded-lg shadow-sm px-5 py-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-800">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
          {footer && <div className="mt-2">{footer}</div>}
        </div>
        <span className={`inline-flex items-center gap-2 text-sm px-2 py-1 rounded-md ${badgeClass ?? "bg-gray-100 text-gray-700"}`}>{icon}</span>
      </div>
    </div>
  );
}
