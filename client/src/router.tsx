import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayouts from "@/layouts/AppLayouts";

import InicioView from "@/views/InicioView";

// ------------------- Rutas Licencias
import ListLicenciasView from "@/views/config/licencias/ListLicenciasView";
import CreateLienciaView from "@/views/config/licencias/CreateLienciaView";
import EditLienciaView from "@/views/config/licencias/EditLienciaView";

// ------------------- Rutas aeronaves
import ListAeronavesView from "@/views/config/aeronaves/ListAeronavesView";
import CreateAeronaveView from "@/views/config/aeronaves/CreateAeronaveView";
import ModelosAeronavesView from "@/views/config/aeronaves/ModelosAeronavesView";

// ------------------- Rutas usuarios
import ListUsuariosView from "@/views/usuarios/ListUsuariosView";
import CreateUsuarioView from "@/views/usuarios/CreateUsuarioView";
import EditUsuarioView from "@/views/usuarios/EditUsuarioView";
import ViewUsuarioView from "@/views/usuarios/ViewUsuarioView";

//* ------------------- Rutas club
import ClubView from "@/views/admin/club/ClubView";
import EditClubView from "@/views/admin/club/EditClubView";

//* ------------------- Rutas cuotas
import ListCuotasView from "@/views/admin/cuotas/ListCuotasView";
import FilterCuotasView from "@/views/admin/cuotas/FilterCuotasView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayouts />}>
          <Route path="/" element={<InicioView />} />

          <Route path="/admin/club" element={<ClubView />} />
          <Route path="/admin/club/editar" element={<EditClubView />} />

          <Route path="/admin/cuotas" element={<ListCuotasView />} />
          <Route path="/admin/cuotas/:anioMes" element={<FilterCuotasView />} />

          <Route path="/socios" element={<ListUsuariosView />} />
          <Route path="/socios/crear" element={<CreateUsuarioView />} />
          <Route path="/socios/:usuarioID" element={<ViewUsuarioView />} />
          <Route path="/socios/:usuarioID/editar" element={<EditUsuarioView />} />

          <Route path="/config/licencias" element={<ListLicenciasView />} />
          <Route path="/config/licencias/crear" element={<CreateLienciaView />} />
          <Route path="/config/licencias/:licenciaID/editar" element={<EditLienciaView />} />

          <Route path="/config/aeronaves" element={<ListAeronavesView />} />
          <Route path="/config/aeronaves/crear" element={<CreateAeronaveView />} />
          <Route path="/config/aeronaves/:marcaAvionID/modelos" element={<ModelosAeronavesView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
