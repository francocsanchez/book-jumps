import { Router } from "express";
import { LicenciaController } from "../controllers/LicenciaController";

const router = Router();

// TODO: implementar validaciones

// ------------------- Rutas CRUD licencias
router.get("/", LicenciaController.getAll);
router.post("/", LicenciaController.create);
router.get("/:licenciaID", LicenciaController.getByID);
router.put("/:licenciaID", LicenciaController.updateByID);
router.delete("/:licenciaID", LicenciaController.deleteByID);

export default router;
