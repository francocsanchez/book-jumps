import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayouts from "@/layouts/AppLayouts";

// ------------------- Rutas Licencias
import ListLicenciasView from "@/views/config/licencias/ListLicenciasView";
import CreateLienciaView from "@/views/config/licencias/CreateLienciaView";
import EditLienciaView from "@/views/config/licencias/EditLienciaView";

// ------------------- Rutas aeronaves
import ListAeronavesView from "@/views/config/aeronaves/ListAeronavesView";
import CreateAeronaveView from "@/views/config/aeronaves/CreateAeronaveView";
import ModelosAeronavesView from "@/views/config/aeronaves/ModelosAeronavesView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayouts />}>
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
