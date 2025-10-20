import { Router } from "express";
import { ClubController } from "../controllers/ClubController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

//* ------------------- Rutas CRUD clubs
router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage("El nombre del club es obligatorio").trim(),
    body("cuit")
      .notEmpty()
      .withMessage("El CUIT es obligatorio")
      .matches(/^\d{11}$/)
      .withMessage("CUIT inválido, debe tener 11 dígitos"),

    // Validación de valores
    body("valores.cuota").optional().isFloat({ min: 0 }).withMessage("La cuota debe ser un número mayor o igual a 0"),
    body("valores.salto").optional().isFloat({ min: 0 }).withMessage("El valor del salto debe ser un número mayor o igual a 0"),
    body("valores.alquilerEquipo").optional().isFloat({ min: 0 }).withMessage("El alquiler de equipo debe ser un número mayor o igual a 0"),

    // Validación de datos bancarios
    body("datosBancarios.cbu")
      .optional()
      .matches(/^$|^\d{22}$/)
      .withMessage("CBU inválido, debe estar vacío o tener 22 dígitos"),
  ],
  handleInputErrors,
  ClubController.create
);
router.get("/", ClubController.getClub);
router.put("/", ClubController.updateByID);

export default router;
