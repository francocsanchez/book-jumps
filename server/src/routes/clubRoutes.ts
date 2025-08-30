import { Router } from "express";
import { ClubController } from "../controllers/ClubController";
import { validateClub } from "../middleware/club";
import { validateAeronave } from "../middleware/aeronave";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.param("clubID", validateClub);
router.param("aeronaveID", validateAeronave);

// ------------------- Rutas CRUD clubs
router.get("/", ClubController.getAll);
router.post("/", [body("nombre").notEmpty().withMessage("El nombre del club es obligatorio")], handleInputErrors, ClubController.create);
router.get("/:clubID", param("clubID").isMongoId().withMessage(`No es un ID válido`), handleInputErrors, ClubController.getByID);
router.put(
  "/:clubID",
  [param("clubID").isMongoId().withMessage(`No es un ID válido`), body("nombre").notEmpty().withMessage("El nombre del club es obligatorio")],
  handleInputErrors,
  ClubController.updateByID
);
router.delete("/:clubID", param("clubID").isMongoId().withMessage(`No es un ID válido`), handleInputErrors, ClubController.deleteByID);

// ------------------- Rutas Adicionales clubs
router.post(
  "/:clubID/:aeronaveID",
  [param("clubID").isMongoId().withMessage(`No es un ID válido`), param("aeronaveID").isMongoId().withMessage(`No es un ID válido`)],
  handleInputErrors,
  ClubController.addAeronaveToClub
);
router.delete(
  "/:clubID/:aeronaveID",
  [param("clubID").isMongoId().withMessage(`No es un ID válido`), param("aeronaveID").isMongoId().withMessage(`No es un ID válido`)],
  handleInputErrors,
  ClubController.removeAeronaveToClub
);

export default router;
