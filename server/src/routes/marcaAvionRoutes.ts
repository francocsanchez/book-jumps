import { Router } from "express";
import { MarcaAvionController } from "../controllers/MarcaAvionController";
import { ModeloAvionController } from "../controllers/ModeloAvionController";

const router = Router();

// TODO: implementar validaciones

// ------------------- Rutas CRUD marcas aviones
router.get("/", MarcaAvionController.getAll);
router.post("/", MarcaAvionController.create);
router.get("/:marcaAvionID", MarcaAvionController.getByID);
router.put("/:marcaAvionID", MarcaAvionController.updateByID);
router.delete("/:marcaAvionID", MarcaAvionController.deleteByID);

// ------------------- Rutas CRUD modelos aviones
router.get("/:marcaAvionID/modelos", ModeloAvionController.getAll);
router.post("/:marcaAvionID/modelos", ModeloAvionController.create);
router.get("/:marcaAvionID/:modeloAvionID", ModeloAvionController.getByID);
router.put("/:marcaAvionID/:modeloAvionID", ModeloAvionController.updateByID);
router.delete("/:marcaAvionID/:modeloAvionID", ModeloAvionController.deleteByID);

export default router;
