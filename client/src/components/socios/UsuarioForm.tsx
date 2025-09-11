import type { UsuarioFormData } from "@/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type UsuarioFormPropos = {
  register: UseFormRegister<UsuarioFormData>;
  errors: FieldErrors<UsuarioFormData>;
};

const ROLES = ["paracaidista", "piloto", "asistente", "admin"] as const;

export default function UsuarioForm({ register, errors }: UsuarioFormPropos) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("email", {
            required: "El email es obligatorio",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
          })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.nombre ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre.message}</p>}
      </div>

      {/* Apellido */}
      <div>
        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
          Apellido
        </label>
        <input
          id="apellido"
          type="text"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.apellido ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("apellido", { required: "El apellido es obligatorio" })}
        />
        {errors.apellido && <p className="mt-1 text-xs text-red-600">{errors.apellido.message}</p>}
      </div>

      {/* DNI */}
      <div>
        <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
          DNI
        </label>
        <input
          id="dni"
          type="number"
          inputMode="numeric"
          className={`mt-1 w-full px-3 py-2 rounded-md text-sm border ${
            errors.dni ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
          {...register("dni", {
            required: "El DNI es obligatorio",
            valueAsNumber: true,
            min: { value: 1, message: "DNI inválido" },
          })}
        />
        {errors.dni && <p className="mt-1 text-xs text-red-600">{errors.dni.message}</p>}
      </div>

      {/* Fecha Nacimiento */}
      <div>
        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
          Fecha de nacimiento
        </label>
        <input
          id="fechaNacimiento"
          type="date"
          className="mt-1 w-full px-3 py-2 rounded-md text-sm border border-gray-300"
          {...register("fechaNacimiento")}
        />
        {errors.fechaNacimiento && <p className="mt-1 text-xs text-red-600">{String(errors.fechaNacimiento.message)}</p>}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input id="telefono" type="tel" className="mt-1 w-full px-3 py-2 rounded-md text-sm border border-gray-300" {...register("telefono")} />
        {errors.telefono && <p className="mt-1 text-xs text-red-600">{errors.telefono.message as string}</p>}
      </div>

      {/* Licencia */}
      <div>
        <label htmlFor="licencia" className="block text-sm font-medium text-gray-700">
          Licencia
        </label>
        <input id="licencia" type="text" className="mt-1 w-full px-3 py-2 rounded-md text-sm border border-gray-300" {...register("licencia")} />
        {errors.licencia && <p className="mt-1 text-xs text-red-600">{errors.licencia.message as string}</p>}
      </div>

      {/* Licencia CoP */}
      <div>
        <label htmlFor="licenciaCop" className="block text-sm font-medium text-gray-700">
          Licencia CoP
        </label>
        <input
          id="licenciaCop"
          type="text"
          placeholder="Ej: D 425"
          className="mt-1 w-full px-3 py-2 rounded-md text-sm border border-gray-300"
          {...register("licenciaCop")}
        />
        {errors.licenciaCop && <p className="mt-1 text-xs text-red-600">{errors.licenciaCop.message as string}</p>}
      </div>

      {/* Roles (tiposUsuario) */}
      <div className="md:col-span-2">
        <span className="block text-sm font-medium text-gray-700 mb-1">Roles</span>
        <div className="flex flex-wrap items-center gap-2">
          {ROLES.map((rol) => (
            <label key={rol} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-700 bg-slate-50">
              <input type="checkbox" value={rol} className="h-3.5 w-3.5" {...register("tiposUsuario")} />
              <span className="capitalize">{rol}</span>
            </label>
          ))}
        </div>
        {errors.tiposUsuario && <p className="mt-1 text-xs text-red-600">{errors.tiposUsuario.message as string}</p>}
      </div>
    </div>
  );
}
