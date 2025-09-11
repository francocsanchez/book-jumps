import { Router } from "express";
import { ClubController } from "../controllers/ClubController";
import { validateClub } from "../middleware/club";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.param("clubID", validateClub);

// ------------------- Rutas CRUD clubs
router.post("/", [body("nombre").notEmpty().withMessage("El nombre del club es obligatorio")], handleInputErrors, ClubController.create);
router.get("/", ClubController.getClub);
router.put(
  "/:clubID",
  [param("clubID").isMongoId().withMessage(`No es un ID válido`), body("nombre").notEmpty().withMessage("El nombre del club es obligatorio")],
  handleInputErrors,
  ClubController.updateByID
);

export default router;
