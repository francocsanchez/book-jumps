import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ConceptoController } from "../controllers/ConceptoController";
import { validateConcepto } from "../middleware/concepto";

const router = Router();
router.param("conceptoID", validateConcepto);

//* ------------------- Rutas CRUD clubs

router.get("/ingresos", ConceptoController.getIngresos);
router.get("/egresos", ConceptoController.getEgresos);

router.post(
  "/",
  [body("nombre").notEmpty().withMessage("El nombre del concepto es obligatorio").trim()],
  handleInputErrors,
  ConceptoController.create
);
router.get("/", ConceptoController.getAll);
router.get("/:conceptoID", [param("conceptoID").isMongoId().withMessage("ID no valido").trim()], handleInputErrors, ConceptoController.getConcepto);
router.put(
  "/:conceptoID",
  [
    param("conceptoID").isMongoId().withMessage("ID no valido").trim(),
    body("nombre").notEmpty().withMessage("El nombre del concepto es obligatorio").trim(),
  ],
  handleInputErrors,
  ConceptoController.updateByID
);

router.delete(
  "/:conceptoID",
  [param("conceptoID").isMongoId().withMessage("ID no valido").trim()],
  handleInputErrors,
  ConceptoController.changeStatus
);

export default router;
