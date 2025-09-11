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

// ------------------- Rutas clubs
import ListClubsView from "@/views/config/clubs/ListClubsView";
import CreateClubView from "@/views/config/clubs/CreateClubView";
import AeronavesClubView from "@/views/config/clubs/AeronavesClubView";

// ------------------- Rutas usuarios
import ListUsuariosView from "@/views/usuarios/ListUsuariosView";
import CreateUsuarioView from "@/views/usuarios/CreateUsuarioView";
import EditUsuarioView from "@/views/usuarios/EditUsuarioView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayouts />}>
          <Route path="/" element={<InicioView />} />

          <Route path="/socios" element={<ListUsuariosView />} />
          <Route path="/socios/crear" element={<CreateUsuarioView />} />
          <Route path="/socios/:usuarioID/editar" element={<EditUsuarioView />} />

          <Route path="/config/licencias" element={<ListLicenciasView />} />
          <Route path="/config/licencias/crear" element={<CreateLienciaView />} />
          <Route path="/config/licencias/:licenciaID/editar" element={<EditLienciaView />} />

          <Route path="/config/aeronaves" element={<ListAeronavesView />} />
          <Route path="/config/aeronaves/crear" element={<CreateAeronaveView />} />
          <Route path="/config/aeronaves/:marcaAvionID/modelos" element={<ModelosAeronavesView />} />

          <Route path="/config/clubs" element={<ListClubsView />} />
          <Route path="/config/clubs/crear" element={<CreateClubView />} />
          <Route path="/config/clubs/:clubID/aeronaves" element={<AeronavesClubView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
