import { getClubs } from "@/api/ClubAPI";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";

export default function InicioView() {
  const { data: dataClub, isLoading: loadClub } = useQuery({
    queryKey: ["club"],
    queryFn: getClubs,
  });

  if (loadClub) return <Loading />;
  if (dataClub)
    return (
      <div className="">
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-10 [mask-image:linear-gradient(to_bottom,black,transparent)]">
            <img src="/logo.jpg" alt="Club de Paracaidismo y Rescate del Neuquén" className="w-full h-40 object-cover" />
          </div>

          <div className="max-w-6xl mx-auto px-4 pt-4 pb-4 text-center">
            <img
              src="/logo.jpg"
              alt="Escudo del Club"
              className="w-20 h-20 rounded-full ring-1 ring-white shadow mx-auto object-cover mb-2" /* antes 28 */
            />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">Club de Paracaidismo y Rescate del Neuquén</h1>
            <p className="mt-2 max-w-3xl mx-auto text-slate-600 text-sm leading-snug">
              Bienvenido a <b className="uppercase">Si.Ge.Pa</b> — Sistema de Gestión Paraca para administración de <b>Socios</b>, <b>Cuotas</b>,{" "}
              <b>Vuelos</b> y<b> Gastos</b>. Cada socio puede controlar su actividad y ver el estado de las finanzas del Club.
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              <span className="inline-block rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">Gestión interna</span>
              <span className="inline-block rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">Transparencia</span>
              <span className="inline-block rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">Acceso para socios</span>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 pb-12">
          <section className="mt-6">
            <div className="rounded-xl border bg-white shadow-sm p-4">
              <h3 className="text-base font-semibold mb-3">Valores</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border bg-slate-50 p-3 text-center">
                  <h4 className="text-sm font-medium">Cuota Social</h4>
                  <p className="text-lg font-bold mt-1">$ {dataClub.valores?.cuota}</p>
                </div>
                <div className="rounded-lg border bg-slate-50 p-3 text-center">
                  <h4 className="text-sm font-medium">Salto</h4>
                  <p className="text-lg font-bold mt-1">$ {dataClub.valores?.salto}</p>
                </div>
                <div className="rounded-lg border bg-slate-50 p-3 text-center">
                  <h4 className="text-sm font-medium">Alquiler equipo</h4>
                  <p className="text-lg font-bold mt-1">$ {dataClub.valores?.alquilerEquipo}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <div className="rounded-xl border bg-white shadow-sm p-4">
              <h3 className="text-base font-semibold mb-3">Datos para pagos</h3>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                <div className="text-sm">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">Titular</div>
                  <div className="font-medium break-all">{dataClub.datosBancarios?.titular}</div>
                </div>
                <div className="text-sm">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">CUIT</div>
                  <div className="font-medium break-all">{dataClub.cuit}</div>
                </div>
                <div className="text-sm">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">Banco</div>
                  <div className="font-medium break-all">{dataClub.datosBancarios?.banco}</div>
                </div>
                <div className="text-sm">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">Cuenta</div>
                  <div className="font-medium break-all">{dataClub.datosBancarios?.cuenta}</div>
                </div>
                <div className="text-sm">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">CBU</div>
                  <div className="font-medium break-all">{dataClub.datosBancarios?.cbu}</div>
                </div>
                <div className="text-sm">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">Alias</div>
                  <div className="font-medium break-all">{dataClub.datosBancarios?.alias}</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
}
