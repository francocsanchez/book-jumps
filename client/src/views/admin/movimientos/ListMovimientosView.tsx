import GenerarIngresoModal from "@/components/movimientos/GenerarIngresoModal";
import GenerarEgresoModal from "@/components/movimientos/GenerarEgresoModal";
import { BookMinus, BookPlus, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { listMovimientos } from "@/api/MovimientoAPI";
import MetricCard from "@/components/movimientos/MetricCard";

export default function ListMovimientosView() {
  const { data: dataMovimientos = [], isLoading: loadMovimientos } = useQuery({
    queryKey: ["movimientos"],
    queryFn: listMovimientos,
  });

  if (loadMovimientos) return <Loading />;

  // --- Cálculos de resumen ---
  const ingresos = dataMovimientos.filter((m: any) => m.tipo === true).reduce((acc: number, m: any) => acc + (Number(m.monto) || 0), 0);
  const egresos = dataMovimientos.filter((m: any) => m.tipo === false).reduce((acc: number, m: any) => acc + (Number(m.monto) || 0), 0);
  const saldo = ingresos + egresos;

  // Para mostrar egresos como monto negativo visualmente claro
  const egresosLabel = `-$${Math.abs(egresos).toLocaleString("es-AR")}`;
  const ingresosLabel = `$${ingresos.toLocaleString("es-AR")}`;
  const saldoLabel = `${saldo < 0 ? "-" : ""}$${Math.abs(saldo).toLocaleString("es-AR")}`;

  if (dataMovimientos)
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-medium text-gray-600">Listado de movimientos</h1>
          <div className="flex items-center gap-2">
            <Link
              to={`?generarIngreso=true`}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition cursor-pointer"
            >
              <BookPlus className="w-4 h-4" />
              Ingreso
            </Link>
            <Link
              to={`?generarEgreso=true`}
              className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
            >
              <BookMinus className="w-4 h-4" />
              Egreso
            </Link>
          </div>
        </div>

        {/* Métricas (resumen) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Ingresos"
            value={ingresosLabel}
            icon={<BookPlus className="w-4 h-4" />}
            badgeClass="bg-emerald-50 text-emerald-700"
            className="border-emerald-100"
          />
          <MetricCard
            title="Egresos"
            value={egresosLabel}
            icon={<BookMinus className="w-4 h-4" />}
            badgeClass="bg-red-50 text-red-700"
            className="border-red-100"
          />
          <MetricCard
            title="Saldo"
            value={saldoLabel}
            icon={<Wallet className="w-4 h-4" />}
            badgeClass={saldo >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}
            className={saldo >= 0 ? "border-emerald-100" : "border-red-100"}
          />
        </div>

        {/* Listado */}
        <div className="space-y-2">
          {dataMovimientos.map((mov: any) => (
            <div
              key={mov._id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-3 shadow-sm hover:shadow transition"
            >
              {/* Lado izquierdo: tipo + concepto + descripción */}
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${mov.tipo ? "bg-emerald-500" : "bg-red-500"}`} />
                <div>
                  <p className="text-sm font-semibold text-gray-800 capitalize">{mov.concepto?.nombre || "Sin concepto"}</p>
                  <p className="text-xs text-gray-500">{mov.descripcion}</p>
                </div>
              </div>

              {/* Lado derecho: monto + fecha */}
              <div className="text-right">
                <p className={`text-sm font-semibold ${mov.tipo ? "text-emerald-600" : "text-red-600"}`}>
                  {mov.tipo ? `+$${Number(mov.monto).toLocaleString("es-AR")}` : `-$${Math.abs(Number(mov.monto)).toLocaleString("es-AR")}`}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(mov.createdAt).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modales */}
        <GenerarEgresoModal />
        <GenerarIngresoModal />
      </div>
    );

  return null;
}
