import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { validateUsuario } from "../middleware/usuario";
import { handleInputErrors } from "../middleware/validation";
import { body } from "express-validator";
import { authenticate } from "../middleware/auth";

const router = Router();
router.param("usuarioID", validateUsuario);

//* ------------------- Rutas usuarios login
router.post(
  "/login",
  [
    body("password").notEmpty().withMessage(`El password no puede estar vacío`),
    body("email").isEmail().withMessage(`El email posee un formato inválido`),
  ],
  handleInputErrors,
  UsuarioController.loginUser
);

router.get("/username", authenticate, UsuarioController.userData);

//* ------------------- Rutas usuarios extras
router.get("/activos", UsuarioController.getAllActivos);
router.get("/:usuarioID/view", UsuarioController.getUsuarioVIew);

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
