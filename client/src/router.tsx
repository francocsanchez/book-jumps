import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";
import ListLicenciasView from "./views/config/licencias/ListLicenciasView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayouts />}>
          <Route path="/config/licencias" element={<ListLicenciasView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
