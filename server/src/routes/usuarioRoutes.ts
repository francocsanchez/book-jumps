import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { validateClub } from "../middleware/club";
import { validateUsuario } from "../middleware/usuario";

const router = Router();
router.param("usuarioID", validateUsuario);

// ------------------- Rutas CRUD usuario
router.get("/", UsuarioController.getAll);
router.post("/", UsuarioController.create);
router.get("/:usuarioID", UsuarioController.getByID);
router.put("/:usuarioID", UsuarioController.updateByID);
router.delete("/:usuarioID", UsuarioController.deleteByID);

// ------------------- Rutas membresias
export default router;
