import { getUsuarioByIDWithCuotas } from "@/api/SociosAPI"; // devuelve { usuario, cuotas }
import Loading from "@/components/Loading";
import { fmtDate, fmtMoney, getEdad } from "@/helpers";
import { useAuth } from "@/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

const ROLE_LABEL: Record<string, string> = {
  paracaidista: "Paracaidista",
  piloto: "Piloto",
  asistente: "Asistente",
  admin: "Administrador",
};

const ESTADO_CUOTA_DOT: Record<string, string> = {
  pendiente: "bg-amber-500",
  pagada: "bg-emerald-500",
};

export default function ViewUsuarioView() {
  const navigate = useNavigate();
  const { usuarioID } = useParams();

  const {
    data: dataUsuario,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["viewUsuario", usuarioID],
    queryFn: () => getUsuarioByIDWithCuotas(usuarioID!),
    retry: false,
  });

  if (isLoading) return <Loading />;
  if (isError || !dataUsuario) return <div className="text-center text-sm text-red-600">Error al cargar el usuario</div>;

  const { usuario, cuotas } = dataUsuario;
  const edad = getEdad(usuario.fechaNacimiento);
  const rolesLinea = usuario.tiposUsuario?.map((r: string) => ROLE_LABEL[r] ?? r).join(" · ") || "Sin roles";

  const cuotasOrdenadas = [...(cuotas ?? [])].sort((a, b) => (a.periodo < b.periodo ? 1 : -1));
  const totPend = cuotasOrdenadas.filter((c) => c.estado === "pendiente").length;
  const totPag = cuotasOrdenadas.filter((c) => c.estado === "pagada").length;
  const deuda = cuotasOrdenadas.filter((c) => c.estado === "pendiente").reduce((acc, c) => acc + (c.importe || 0), 0);
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">
            {usuario.nombre[0].toUpperCase()}
            {usuario.apellido[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
              {usuario.nombre} {usuario.apellido}
            </h1>
            <div className="text-xs text-slate-600 mt-0.5 truncate">{rolesLinea}</div>
          </div>
        </div>

        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-sky-700 transition">
          ← Volver
        </button>
      </div>

      {/* Info principal */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Datos personales */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800">Datos personales</h2>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="font-medium break-all">{usuario.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">DNI</dt>
              <dd className="font-medium">{usuario.dni ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Fecha de nacimiento</dt>
              <dd className="font-medium">{fmtDate(usuario.fechaNacimiento)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Edad</dt>
              <dd className="font-medium">{edad ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Teléfono</dt>
              <dd className="font-medium">{usuario.telefono || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Estado</dt>
              <dd className="font-medium">
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-800">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${usuario.activo ? "bg-emerald-500" : "bg-slate-400"}`} />
                  {usuario.activo ? "Activo" : "Inactivo"}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-4 border-t pt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-slate-500">Licencia</div>
              <div className="font-medium">{usuario.licencia || "—"}</div>
            </div>
            <div>
              <div className="text-slate-500">Licencia CoP</div>
              <div className="font-medium">{usuario.licenciaCop || "—"}</div>
            </div>
          </div>
        </div>

        {/* Resumen de cuotas */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800">Resumen de cuotas</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Pendientes</div>
              <div className="text-xl font-bold">{totPend}</div>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Pagadas</div>
              <div className="text-xl font-bold">{totPag}</div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border bg-slate-50 p-3 text-center text-sm">
            <div className="text-slate-500">Deuda estimada</div>
            <div className="text-xl font-bold">{fmtMoney(deuda)}</div>
          </div>
        </div>
      </div>

      {/* Tabla de cuotas */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-base font-semibold text-slate-800">Cuotas</h2>
        </div>

        {cuotasOrdenadas.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">Este socio no tiene cuotas generadas.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Período</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Estado</th>
                  <th className="px-6 py-3 text-right font-medium text-slate-600">Importe</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">Fecha pago</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cuotasOrdenadas.map((c) => (
                  <tr key={c._id}>
                    <td className="px-6 py-3">{c.periodo}</td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${ESTADO_CUOTA_DOT[c.estado] ?? "bg-slate-400"}`} />
                        <span className="capitalize">{c.estado}</span>
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-medium">{fmtMoney(c.importe)}</td>
                    <td className="px-6 py-3">{c.fechaPago ? fmtDate(c.fechaPago) : "—"}</td>
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
