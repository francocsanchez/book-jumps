import { Link } from "react-router-dom";
import { Plane, AlertTriangle, Wallet, KeyRound, ChevronRight } from "lucide-react";
import CambiasPasswordModal from "@/components/usuarios/CambiasPasswordModal";
import { useAuth } from "@/hook/useAuth";
import Loading from "@/components/Loading";
import { fmtDate, fmtMoney, getEdad } from "@/helpers";

// =================== Mapeos visuales ===================
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

// =================== Datos falsos (mock) ===================

type Cuota = {
  _id: string;
  periodo: string; // "2025-09"
  estado: "pendiente" | "pagada";
  importe: number;
  fechaPago?: string;
};

const fakeCuotas: Cuota[] = [
  { _id: "c1", periodo: "2025-09", estado: "pendiente", importe: 15000 },
  { _id: "c2", periodo: "2025-08", estado: "pagada", importe: 15000, fechaPago: "2025-08-10T12:00:00.000Z" },
  { _id: "c3", periodo: "2025-07", estado: "pagada", importe: 15000, fechaPago: "2025-07-12T12:00:00.000Z" },
  { _id: "c4", periodo: "2025-06", estado: "pendiente", importe: 15000 },
];

const fakeSaltos = {
  total: 128,
  ultimos30Dias: 3,
  ultimoSalto: "2025-09-21T15:30:00.000Z",
};

// =================== Componente ===================
export default function MiPerfilView() {
  const { userData, userLoading } = useAuth();

  if (userLoading) return <Loading />;

  // Derivados (mock)

  const cuotasOrdenadas = [...fakeCuotas].sort((a, b) => (a.periodo < b.periodo ? 1 : -1));
  const totPend = cuotasOrdenadas.filter((c) => c.estado === "pendiente");

  const deuda = totPend.reduce((acc, c) => acc + (c.importe || 0), 0);

  // =================== Datos trabajados
  console.log(userData);

  const rolesLinea = userData.tiposUsuario?.map((r: string) => ROLE_LABEL[r] ?? r).join(" · ") || "Sin roles";
  const edad = getEdad(userData.fechaNacimiento);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">
            {userData.nombre[0].toUpperCase()}
            {userData.apellido[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
              {userData.nombre} {userData.apellido}
            </h1>
            <div className="text-xs text-slate-600 mt-0.5 truncate">{rolesLinea}</div>
          </div>
        </div>

        {/* Cambiar contraseña */}
        <Link
          to={`?changePassword=true`}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-sky-50 hover:text-sky-700 transition"
        >
          <KeyRound className="w-4 h-4" />
          Cambiar contraseña
        </Link>
      </div>

      {/* 2 columnas: Datos | (Balance + Saltos) */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Columna 1 - Datos personales */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-800">Datos personales</h2>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="font-medium break-all">{userData.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">DNI</dt>
              <dd className="font-medium">{userData.dni ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Fecha de nacimiento</dt>
              <dd className="font-medium">{fmtDate(userData.fechaNacimiento)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Edad</dt>
              <dd className="font-medium">{edad ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Teléfono</dt>
              <dd className="font-medium">{userData.telefono || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Estado</dt>
              <dd className="font-medium">
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-800">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${userData.activo ? "bg-emerald-500" : "bg-slate-400"}`} />
                  {userData.activo ? "Activo" : "Inactivo"}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-4 border-t pt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-slate-500">Licencia</div>
              <div className="font-medium">{userData.licencia || "—"}</div>
            </div>
            <div>
              <div className="text-slate-500">Licencia CoP</div>
              <div className="font-medium">{userData.licenciaCop || "—"}</div>
            </div>
          </div>
        </div>

        {/* Columna 2 - Card combinado: Balance + Saltos */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          {/* Balance */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800">Balance</h2>
            <Wallet className="w-5 h-5 text-sky-600" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Deuda total</div>
              <div className="text-xl font-bold">{fmtMoney(deuda)}</div>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Cuotas pendientes</div>
              <div className="text-xl font-bold">{totPend.length}</div>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Saltos pendientes</div>
              <div className="text-xl font-bold">{totPend.length}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-slate-200" />

          {/* Saltos */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800">Saltos</h2>
            <Plane className="w-5 h-5 text-sky-600" />
          </div>

          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Total de saltos</div>
              <div className="text-2xl font-bold">{fakeSaltos.total}</div>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Últimos 30 días</div>
              <div className="text-2xl font-bold">{fakeSaltos.ultimos30Dias}</div>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3 text-center">
              <div className="text-slate-500">Último salto</div>
              <div className="text-lg font-bold">{fmtDate(fakeSaltos.ultimoSalto)}</div>
            </div>
          </div>

          {/* Link a detalles */}
          <div className="mt-4 text-right">
            <Link
              to="/saltos/12312312/detalles" // <-- ajustá la ruta cuando tengas la vista
              className="inline-flex items-center gap-1 text-sm text-sky-700 hover:underline"
            >
              Ver detalles de saltos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tabla de cuotas (mock) */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-base font-semibold text-slate-800">Movimientos</h2>
        </div>

        {cuotasOrdenadas.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">No hay cuotas generadas.</div>
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
      <CambiasPasswordModal />
    </div>
  );
}
