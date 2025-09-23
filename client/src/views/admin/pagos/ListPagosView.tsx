import { listPagos } from "@/api/PagoAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { fmtDate, fmtMoney } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";

export default function ListPagosView() {
  const {
    data,
    isLoading: loadPagos,
    isError: errorPagos,
  } = useQuery({
    queryKey: ["pagos"],
    queryFn: () => listPagos(),
    retry: false,
  });

  if (loadPagos) return <Loading />;
  if (!data) return <EmpyRegistros title={`No hay pagos registrados`} />;

  const { pagos, dataGrafico } = data;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de pagos</h1>
      </div>

      {/* Gráfico */}
      {dataGrafico.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Pagos por periodo</h2>
          <div className="max-w-2xl mx-auto">
            {" "}
            {/* limita el ancho del gráfico */}
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={dataGrafico}
                margin={{ top: 30, right: 20, left: 0, bottom: 0 }} // espacio extra arriba
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="periodo" />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="total" fill="#0ea5e9" radius={[10, 10, 0, 0]}>
                  <LabelList dataKey="total" position="top" fill="#374151" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tabla */}
      {pagos.length ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Socio</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3 text-center">Importe</th>
                <th className="px-6 py-3 text-center">Periodo</th>
                <th className="px-6 py-3 text-left">Nota</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago) => (
                <tr key={pago._id} className="border-b hover:bg-sky-50 transition">
                  <td className="px-6 py-4 text-left">
                    {pago.usuario.apellido}, {pago.usuario.nombre}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{fmtDate(pago.fechaPago)}</td>
                  <td className="px-6 py-4 text-center">{fmtMoney(pago.importe)}</td>
                  <td className="px-6 py-4 text-center">{pago.periodo}</td>
                  <td className="px-6 py-4 text-left space-x-6 ">{pago.notas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmpyRegistros title={`No hay pagos registrados`} />
      )}
    </div>
  );
}
