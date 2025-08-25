import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();

// TODO: implementar validaciones

// ------------------- Rutas CRUD usuario ------------------ //
router.get("/", UsuarioController.getAll);
router.get("/:usuarioID", UsuarioController.getByID);
router.put("/:usuarioID", UsuarioController.updateByID);
router.delete("/:usuarioID", UsuarioController.deleteByID);

export default router;
