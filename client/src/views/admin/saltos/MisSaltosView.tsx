import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plane } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "@/hook/useAuth";
import Loading from "@/components/Loading";

// Util: nombre de mes en español corto
const monthName = (date: Date) => date.toLocaleDateString("es-AR", { month: "short" }).replace(".", "");

// Genera últimos 12 meses con cantidades de saltos (mock)
const buildMonthlyData = () => {
  const now = new Date();
  const data: { mes: string; saltos: number; key: string }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    // cantidad mock (ajustá a gusto)
    const saltos = Math.max(0, Math.round(2 + Math.random() * 6));
    data.push({ mes: `${monthName(d)} ${d.getFullYear()}`, saltos, key });
  }
  return data;
};

// Lista de saltos individuales mock (últimos N)
type Salto = {
  id: string;
  fecha: string; // ISO
  lugar: string;
  aeronave: string;
  altura: string;
  observacion?: string;
};

const buildSaltosList = (): Salto[] => {
  const lugares = ["Neuquén", "Centenario", "Plottier", "Añelo"];
  const aeronaves = ["Cessna 182", "Cessna 206", "PA-28", "C-210"];
  const alturas = ["8.000 ft", "10.000 ft", "12.000 ft"];
  const out: Salto[] = [];
  const now = new Date();

  for (let i = 0; i < 18; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i * 5);
    out.push({
      id: `S-${i + 1}`,
      fecha: d.toISOString(),
      lugar: lugares[i % lugares.length],
      aeronave: aeronaves[i % aeronaves.length],
      altura: alturas[i % alturas.length],
      observacion: i % 3 === 0 ? "Salto de práctica" : i % 5 === 0 ? "Salto con equipo rentado" : undefined,
    });
  }
  return out;
};

const fmtDate = (d: string) => new Date(d).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function MisSaltosView() {
  const { userData, userLoading } = useAuth();

  if (userLoading) return <Loading />;

  const navigate = useNavigate();

  const monthlyData = useMemo(() => buildMonthlyData(), []);
  const saltosList = useMemo(() => buildSaltosList(), []);

  const totalAnual = monthlyData.reduce((acc, m) => acc + m.saltos, 0);

  // Últimos 30 días (aprox): contamos los saltos con fecha dentro de 30 días
  const ult30 = useMemo(() => {
    const limit = new Date();
    limit.setDate(limit.getDate() - 30);
    return saltosList.filter((s) => new Date(s.fecha) >= limit).length;
  }, [saltosList]);

  return (
    <div className="space-y-6">
      {/* Header con botón volver */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-slate-800">
            <Plane className="w-5 h-5 text-sky-600" />
            <h1 className="text-lg md:text-xl font-semibold">Mis saltos</h1>
          </div>
        </div>

        {/* Resumen a la derecha */}
        <div className="flex items-center gap-3 text-sm">
          <div className="rounded-lg border bg-slate-50 px-3 py-1.5 text-center">
            <div className="text-slate-500">Totales</div>
            <div className="font-bold">{totalAnual}</div>
          </div>
          <div className="rounded-lg border bg-slate-50 px-3 py-1.5 text-center">
            <div className="text-slate-500">Total anual</div>
            <div className="font-bold">{totalAnual}</div>
          </div>
          <div className="rounded-lg border bg-slate-50 px-3 py-1.5 text-center">
            <div className="text-slate-500">Últimos 30 días</div>
            <div className="font-bold">{ult30}</div>
          </div>
        </div>
      </div>

      {/* Card chart */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-800">Saltos por mes</h2>
        <p className="text-xs text-slate-500 mt-1">Distribución de saltos en los últimos 12 meses.</p>

        <div className="mt-4" style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={monthlyData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12 }}
                axisLine={false} // quita línea del eje X
                tickLine={false} // quita las rayitas de los ticks
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                axisLine={false} // quita línea del eje Y
                tickLine={false} // quita las rayitas de los ticks
              />
              <Tooltip />
              <Bar
                dataKey="saltos"
                fill="#0ea5e9" // sky-500 (puedes cambiarlo según tu paleta)
                radius={[6, 6, 0, 0]} // redondeo en esquinas superiores
                barSize={40} // ancho opcional para que se vean más robustas
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de saltos */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-base font-semibold text-slate-800">Historial de saltos</h2>
        </div>

        {saltosList.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">No hay saltos registrados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Fecha</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Lugar</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Aeronave</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Altura</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Observación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {saltosList.map((s) => (
                  <tr key={s.id}>
                    <td className="px-6 py-3">{fmtDate(s.fecha)}</td>
                    <td className="px-6 py-3">{s.lugar}</td>
                    <td className="px-6 py-3">{s.aeronave}</td>
                    <td className="px-6 py-3">{s.altura}</td>
                    <td className="px-6 py-3">{s.observacion || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
