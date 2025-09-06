import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";

// ------------------- Rutas Licencias
import ListLicenciasView from "@/views/config/licencias/ListLicenciasView";
import CreateLienciaView from "@/views/config/licencias/CreateLienciaView";
import EditLienciaView from "@/views/config/licencias/EditLienciaView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayouts />}>
          <Route path="/config/licencias" element={<ListLicenciasView />} />
          <Route path="/config/licencias/crear" element={<CreateLienciaView />} />
          <Route path="/config/licencias/:licenciaID/editar" element={<EditLienciaView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
