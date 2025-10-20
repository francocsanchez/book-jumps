import { authenticaUser } from "@/api/UsuarioAPI";
import type { UsuarioLoginForm } from "@/types/TUsuario";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function InicioView() {
  const navigate = useNavigate();

  const initialValues: UsuarioLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioLoginForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: authenticaUser,
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: (data) => {
      toast.success(`Bienvenido`);
      navigate("/perfil");
    },
  });

  const handleLogin = (formData: UsuarioLoginForm) => mutate(formData);

  return (
    <div className="">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <img src="/logo.jpg" alt="Club de Paracaidismo y Rescate del Neuquén" className="w-full h-40 object-cover" />
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-4 pb-4 text-center">
          <img src="/logo.jpg" alt="Escudo del Club" className="w-20 h-20 rounded-full ring-1 ring-white shadow mx-auto object-cover mb-2" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">Club de Paracaidismo y Rescate del Neuquén</h1>
          <p className="mt-2 max-w-3xl mx-auto text-slate-600 text-sm leading-snug">
            Bienvenido a <b className="uppercase">Si.Ge.Pa</b> — Sistema de Gestión Paraca para administración de <b>Socios</b>, <b>Cuotas</b>,{" "}
            <b>Vuelos</b> y <b>Gastos</b>. Iniciá sesión para acceder a tu cuenta.
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pb-12 mt-8">
        <div className="rounded-xl border bg-white shadow-sm p-6">
          <h3 className="text-base font-semibold mb-4 text-center">Acceso para socios</h3>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[11px] uppercase tracking-wide text-slate-500">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="tu@email.com"
                {...register("email", { required: "El email es obligatorio" })}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-[11px] uppercase tracking-wide text-slate-500">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password", { required: "La contraseña es obligatoria" })}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center pt-1 justify-center">
              <a href="#" className="text-xs text-sky-700 hover:underline">
                Olvidé mi contraseña
              </a>
            </div>

            <button type="submit" className="w-full rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700 transition">
              Ingresar
            </button>

            <p className="text-[11px] text-slate-500 text-center">¿No tenés acceso? Contactá a la administración del Club.</p>
          </form>
        </div>
      </main>
    </div>
  );
}
