import { Router } from "express";
import { MarcaAvionController } from "../controllers/MarcaAvionController";
import { ModeloAvionController } from "../controllers/ModeloAvionController";
import { validateMarcaAvion } from "../middleware/marcaAvion";
import { validateModeloAvion } from "../middleware/modeloAvion";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();
router.param("marcaAvionID", validateMarcaAvion);
router.param("modeloAvionID", validateModeloAvion);

// ------------------- Rutas CRUD marcas aviones
router.get("/", MarcaAvionController.getAll);
router.post("/", body("nombre").notEmpty().withMessage(`El nombre es obligatorio`), handleInputErrors, MarcaAvionController.create);
router.get("/:marcaAvionID", param("marcaAvionID").isMongoId().withMessage(`No es un ID válido`), handleInputErrors, MarcaAvionController.getByID);
router.put(
  "/:marcaAvionID",
  body("nombre").notEmpty().withMessage(`El nombre es obligatorio`),
  param("marcaAvionID").isMongoId().withMessage(`No es un ID válido`),
  handleInputErrors,
  MarcaAvionController.updateByID
);
router.delete("/:marcaAvionID", MarcaAvionController.deleteByID);

// ------------------- Rutas CRUD modelos aviones
router.get(
  "/:marcaAvionID/modelos",
  param("marcaAvionID").isMongoId().withMessage(`No es un ID válido`),
  handleInputErrors,
  ModeloAvionController.getAll
);

router.post(
  "/:marcaAvionID/modelos",
  body("nombre").notEmpty().withMessage(`El nombre es obligatorio`),
  param("marcaAvionID").isMongoId().withMessage(`No es un ID válido`),
  handleInputErrors,
  ModeloAvionController.create
);
router.get(
  "/:marcaAvionID/:modeloAvionID/modelo",
  param("marcaAvionID").isMongoId().withMessage(`No es un ID válido`),
  param("modeloAvionID").isMongoId().withMessage(`No es un ID válido`),
  handleInputErrors,
  ModeloAvionController.getByID
);
router.put(
  "/:marcaAvionID/:modeloAvionID",
  body("nombre").notEmpty().withMessage(`El nombre es obligatorio`),
  param("marcaAvionID").isMongoId().withMessage(`No es un ID válido`),
  param("modeloAvionID").isMongoId().withMessage(`No es un ID válido`),
  handleInputErrors,
  ModeloAvionController.updateByID
);
router.delete(
  "/:marcaAvionID/:modeloAvionID",
  param("marcaAvionID").isMongoId().withMessage(`No es un ID válido`),
  param("modeloAvionID").isMongoId().withMessage(`No es un ID válido`),
  handleInputErrors,
  ModeloAvionController.deleteByID
);

export default router;
