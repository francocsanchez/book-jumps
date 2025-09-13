import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { validateUsuario } from "../middleware/usuario";
import { handleInputErrors } from "../middleware/validation";
import { body } from "express-validator";

const router = Router();
router.param("usuarioID", validateUsuario);

//* ------------------- Rutas usuarios extras
router.get("/activos", UsuarioController.getAllActivos);

//* ------------------- Rutas CRUD usuario
router.get("/", UsuarioController.getAll);
router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage(`El nombre no puede estar vacío`),
    body("apellido").notEmpty().withMessage(`El apellido no puede estar vacío`),
    body("email").isEmail().withMessage(`El email posee un formato inválido`),
    body("dni").notEmpty().withMessage(`El dni no puede estar vacío`),
    body("fechaNacimiento").notEmpty().withMessage(`La fecha de nacimiento no puede estar vacío`),
  ],
  handleInputErrors,
  UsuarioController.create
);
router.get("/:usuarioID", UsuarioController.getByID);
router.put("/:usuarioID", UsuarioController.updateByID);
router.delete("/:usuarioID", UsuarioController.deleteByID);
export default router;
