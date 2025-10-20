// src/Router.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Layouts públicos/privados
import PublicRoute from "@/routes/PublicRoute";
import PrivateRoute from "@/routes/PrivateRoute";

import LoginLayouts from "@/layouts/LoginLayouts";

// Views públicas
import InicioView from "@/views/InicioView";
import NotFoundView from "@/views/NotFoundView";

// Admin
import ClubView from "@/views/admin/club/ClubView";
import EditClubView from "@/views/admin/club/EditClubView";
import ListCuotasView from "@/views/admin/cuotas/ListCuotasView";
import FilterCuotasView from "@/views/admin/cuotas/FilterCuotasView";
import ListPagosView from "@/views/admin/pagos/ListPagosView";
import ListVuelosView from "@/views/admin/vuelos/ListVuelosView";
import ListLicenciasView from "@/views/config/licencias/ListLicenciasView";
import CreateLienciaView from "@/views/config/licencias/CreateLienciaView";
import EditLienciaView from "@/views/config/licencias/EditLienciaView";
import ListAeronavesView from "@/views/config/aeronaves/ListAeronavesView";
import CreateAeronaveView from "@/views/config/aeronaves/CreateAeronaveView";
import ModelosAeronavesView from "@/views/config/aeronaves/ModelosAeronavesView";

// Socios
import ListUsuariosView from "@/views/usuarios/ListUsuariosView";
import CreateUsuarioView from "@/views/usuarios/CreateUsuarioView";
import EditUsuarioView from "@/views/usuarios/EditUsuarioView";
import ViewUsuarioView from "@/views/usuarios/ViewUsuarioView";
import RoleRoute from "./routes/RoleRoute";
import ForbiddenView from "./views/ForbiddenView";
import AdminLayouts from "./layouts/AdminLayouts";
import SociosLayouts from "./layouts/SociosLayouts";
import MiPerfilView from "./views/usuarios/MiPerfilView";
import MisSaltosView from "./views/admin/saltos/MisSaltosView";
import ListMovimientosView from "./views/admin/movimientos/ListMovimientosView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route element={<LoginLayouts />}>
            <Route path="/" element={<InicioView />} />
          </Route>
        </Route>

        {/* Rutas privadas (requiere login) */}
        <Route element={<PrivateRoute />}>
          {/* Bloque SOLO administradores */}
          <Route element={<RoleRoute allow={["admin", "asistente"]} />}>
            <Route element={<AdminLayouts />}>
              <Route path="/admin/movimientos" element={<ListMovimientosView />} />

              <Route path="/admin/vuelos" element={<ListVuelosView />} />
              <Route path="/admin/pagos" element={<ListPagosView />} />
              <Route path="/admin/club" element={<ClubView />} />
              <Route path="/admin/club/editar" element={<EditClubView />} />
              <Route path="/admin/cuotas" element={<ListCuotasView />} />
              <Route path="/admin/cuotas/:anioMes" element={<FilterCuotasView />} />

              <Route path="/config/licencias" element={<ListLicenciasView />} />
              <Route path="/config/licencias/crear" element={<CreateLienciaView />} />
              <Route path="/config/licencias/:licenciaID/editar" element={<EditLienciaView />} />
              <Route path="/config/aeronaves" element={<ListAeronavesView />} />
              <Route path="/config/aeronaves/crear" element={<CreateAeronaveView />} />
              <Route path="/config/aeronaves/:marcaAvionID/modelos" element={<ModelosAeronavesView />} />

              <Route path="/admin/socios" element={<ListUsuariosView />} />
              <Route path="/admin/socios/crear" element={<CreateUsuarioView />} />
              <Route path="/admin/socios/:usuarioID" element={<ViewUsuarioView />} />
              <Route path="/admin/socios/:usuarioID/editar" element={<EditUsuarioView />} />
            </Route>
          </Route>

          {/* Bloque socios/pilotos/paracaidistas (podés ajustar los roles permitidos) */}
          <Route element={<RoleRoute allow={["paracaidista", "piloto", "admin", "asistente"]} />}>
            <Route element={<SociosLayouts />}>
              <Route path="/perfil" element={<MiPerfilView />} />
              <Route path="/saltos/:usuarioID/detalles" element={<MisSaltosView />} />
            </Route>
          </Route>

          {/* 403 y 404 dentro de área privada */}
          <Route path="/403" element={<ForbiddenView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
