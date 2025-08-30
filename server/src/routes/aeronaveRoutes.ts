import { Router } from "express";
import { AeronaveController } from "../controllers/AeronaveController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateAeronave } from "../middleware/aeronave";

const router = Router();
router.param("aeronaveID", validateAeronave);

// ------------------- Rutas CRUD clubs
router.get("/", AeronaveController.getAll);
router.post(
  "/",
  [
    body("matricula").not().isEmpty().withMessage("La matrícula es obligatoria"),
    body("modeloID").not().isEmpty().withMessage("El modelo es obligatorio"),
    body("anoFabricacion")
      .optional()
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage(`El año de fabricación debe estar entre 1900 y ${new Date().getFullYear()}`),
  ],
  handleInputErrors,
  AeronaveController.create
);
router.get("/:aeronaveID", [param("aeronaveID").isMongoId().withMessage(`No es un ID válido`)], handleInputErrors, AeronaveController.getByID);
router.put("/:aeronaveID", [param("aeronaveID").isMongoId().withMessage(`No es un ID válido`)], handleInputErrors, AeronaveController.updateByID);
router.delete("/:aeronaveID", [param("aeronaveID").isMongoId().withMessage(`No es un ID válido`)], handleInputErrors, AeronaveController.deleteByID);

export default router;
