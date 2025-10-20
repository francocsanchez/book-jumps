import { listPagos } from "@/api/PagoAPI";
import EmpyRegistros from "@/components/EmpyRegistros";
import Loading from "@/components/Loading";
import { fmtDate, fmtMoney } from "@/helpers";
import { useQuery } from "@tanstack/react-query";

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

  const { pagos } = data;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Listado de pagos</h1>
      </div>

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
