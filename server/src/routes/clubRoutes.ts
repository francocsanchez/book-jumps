import { Router } from "express";
import { ClubController } from "../controllers/ClubController";

const router = Router();

// TODO: implementar validaciones

// ------------------- Rutas CRUD clubs
router.get("/", ClubController.getAll);
router.post("/", ClubController.create);
router.get("/:clubID", ClubController.getByID);
router.put("/:clubID", ClubController.updateByID);
router.delete("/:clubID", ClubController.deleteByID);

export default router;
